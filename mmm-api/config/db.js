'use strict';

// Creating a base name for the MongoDB
const mongooseBaseName = 'mmm';

// Create the MongoDB URI for development and test
const database = {
    development: `mongodb://localhost/${mongooseBaseName}-development`,
    test: `mongodb://localhost/${mongooseBaseName}-test`
}

// Identify if development environment is test of development 
// Select the DB based on wether a test file was executed before `server.js`
const localDB = process.env.TESTENV ? database.test : database.development

// Environment variable MONGODB_URI will be available in
// Heroku production environment otherwise use test or development DB
const currentDB = process.env.MONGODB_URI || localDB

// Export the appropriate DB based on the current environment 
module.exports = currentDB;