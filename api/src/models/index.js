const Sequelize = require('sequelize');

// Load our database configuration
const dbConfig = require('../config/database');

// Connect Sequelize to the database
const sequelize = new Sequelize(dbConfig.database, dbConfig.user,
  dbConfig.password, dbConfig);

// Load all of our model definitions
const models = {
  /* *** TODO: Import your models here *** */
  // eg. `Note: sequelize.import(require.resolve('./note'))` if you have a model in models/note.js
};

/* *** TODO: Set up Sequelize associations here *** */

// Store the database connection (used in tests)
models.database = sequelize;

// Export our model definitions
module.exports = models;
