/**
 * In this file the Express application is created. All of the frontend routes
 * are defined in this file:
 *   - /assets: All static assets, including the bundled scripts and styles,
 *              are made available from here.
 *   - /      : The index route serves the web application itself.
 *
 * Note that '/api' also exists, but that route is handled by NGINX and
 * redirects to the backend application.
 */

const path = require('path');
const express = require('express');

// Create a new Express app
const app = express();

// Serve up our static assets from 'dist/'
app.use('/assets', express.static(path.join(__dirname, '..', 'dist')));

// Serve up font-awesome fonts from vendor folder
app.use('/assets/font-awesome/fonts', express.static(
  path.dirname(require.resolve('font-awesome/fonts/FontAwesome.otf'))));

// Set up the index route
app.get('/', (req, res) => {
  try {
    const htmlDocument = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">

          <title>Neverwrote</title>
          <link rel="stylesheet" type="text/css" href="/assets/css/app.css">
          <script src="/assets/js/vendor.js"></script>
          <script src="/assets/js/app.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <script>main();</script>
        </body>
      </html>`;

    // Respond with the complete HTML page
    res.send(htmlDocument);
  } catch(ex) {
    console.error(ex.stack);
    res.status(500).send(ex.stack);
  }
});

module.exports = app;
