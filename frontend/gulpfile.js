/**
 * This file describes all of our Gulp tasks. The default Gulp task watches
 * scripts and styles for changes, and bundles them up for distribution to
 * the client when a change is detected.
 */

const gulp = require('gulp');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const envify = require('envify/custom');
const watchify = require('watchify');
const del = require('del');
const merge = require('ordered-merge-stream');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babelify = require('babelify');
const sourcemaps = require('gulp-sourcemaps');
const concatCss = require('gulp-concat-css');

// List of npm modules to bundle separately from our application code
const libs = [
  'lodash',
  'marked',
  'moment',
  'pinkie-promise',
  'react-dom',
  'react-redux',
  'react',
  'redux-thunk',
  'redux',
  'simplemde'
];

// List of npm modules required only in dev mode
const devLibs = [
  'redux-devtools',
  'redux-devtools-dock-monitor',
  'redux-devtools-log-monitor'
];

// List of npm modules only ever used on the server
const serverOnlyLibs = [
  'request'
];

// Information about where project files are located
const paths = {
  scriptEntryPoint: 'src/client.js',
  styles: 'src/styles/**/*.css',
  vendorScripts: [],
  vendorStyles: [
    require.resolve('bootstrap/dist/css/bootstrap.css'),
    require.resolve('simplemde/dist/simplemde.min.css'),
    require.resolve('font-awesome/css/font-awesome.css')]
};

// Are we building for development or production?
const isDevEnv = process.env.NODE_ENV === 'development';

// Error handler
function onError(error) {
  gutil.log(error.stack);
  this.emit('end');
}

// Task to remove all build outputs
gulp.task('clean', () => {
  del(['dist']);
});

// Task to remove style outputs
gulp.task('cleanStyles', () => {
  del(['dist/css']);
});

// Task to remove script outputs
gulp.task('cleanScripts', () => {
  del(['dist/js/app.*']);
});

// Task to remove vendor script outputs
gulp.task('cleanVendorScripts', () => {
  del(['dist/js/vendor.*']);
});

// Task to bundle up styles
gulp.task('styles', ['cleanStyles'], () => {
  return merge([gulp.src(paths.vendorStyles), gulp.src(paths.styles)])
    .pipe(concatCss('app.css'))
    .on('error', onError)
    .pipe(gulp.dest('dist/css/'));
});

// Task to bundle up vendor scripts (dependencies)
gulp.task('vendorScripts', ['cleanVendorScripts'], () => {
  const requiredLibs = isDevEnv ? libs.concat(devLibs) : libs;
  // Stream for processing npm dependencies
  const vendorScriptsStream = browserify({ debug: isDevEnv })
    .require(requiredLibs)
    .bundle()
    .on('error', onError)
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(!isDevEnv, uglify()));

  // Stream for processing other dependencies
  const externalVendorScriptsStream = gulp.src(paths.vendorScripts)
    .on('error', onError)
    .pipe(sourcemaps.init({ loadMaps: true }));

  // Combine vendor files from all sources to produce a single output
  return merge([vendorScriptsStream, externalVendorScriptsStream])
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write('.', { sourceMappingURLPrefix: '/assets/js' }))
    .pipe(gulp.dest('dist/js'));
});

// Helper function for bundling application scripts
function bundleScripts(watch) {
  // Options for the browserify bundler
  const opts = {
    entries: [paths.scriptEntryPoint],
    debug: isDevEnv,
    plugin: [],
    // These properties are used by watchify for caching
    cache: {},
    packageCache: {}
  };

  // Use the watchify plugin when we want to watch for file changes
  if(watch) opts.plugin.push(watchify);

  // Create the bundler
  const bundler = browserify(opts)
    .transform(envify({ NODE_ENV: process.env.NODE_ENV, IN_BROWSER: true }))
    .transform([babelify, { sourceMap: true }])
    .external(libs.concat(devLibs).concat(serverOnlyLibs));

  // This function returns a stream which produces the final bundled output
  // from the bundler object
  function rebundle() {
    return bundler.bundle()
      .on('error', onError)
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(gulpif(!isDevEnv, uglify()))
      .pipe(sourcemaps.write('.', { sourceMappingURLPrefix: '/assets/js' }))
      .pipe(gulp.dest('dist/js'));
  }

  // Rebundle when watchify detects a change
  bundler.on('update', () => {
    rebundle();
    gutil.log('Rebundle...');
  });

  // Return bundling stream (mostly for when `watch` is false)
  return rebundle();
}

// Task to bundle up application scripts
gulp.task('scripts', ['cleanScripts'], () => {
  return bundleScripts(false);
});

// Task to watch files and automatically bundle when changes occur
gulp.task('watch', () => {
  bundleScripts(true);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('build', ['styles', 'scripts', 'vendorScripts']);

// Default task bundles up everything and then starts watch
gulp.task('default', ['watch', 'build']);
