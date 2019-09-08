// Require  necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Require route files
const cardRoutes = require('./app/routes/card_routes');

// Require DB configuration file
const db = require('./config/db');

// Define Ports
const expressPort = 5000;
const reactPort = 3000;

// Establish DB connection
mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Initiate Express application object
const app = express();

// Define port for API to run on
const port = process.env.PORT || expressPort;


/*** Middleware ***/

// Add `bodyParser` middleware which will parse JSON requests into
// JS objects before they reach the route files.
//
// The method `.use` sets up middleware for the Express application
app.use(express.json());

// Set CORS headers on response from this API using the 'cors' NPM package
// 'CLIENT_ORIGIN' is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}` }));


/*** Routes ***/
// Mount imported Routers
app.use(cardRoutes);


// Run API on designated port
app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});