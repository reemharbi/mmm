// Require  necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require("http");
const socketIO = require("socket.io");
const game = require('./game');

// Require route files
const cardRoutes = require('./app/routes/card_routes');
const playerRoutes = require('./app/routes/player_router');
const roomRoutes = require('./app/routes/room_routers');

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
// Server instance
const server = http.createServer(app);
// Create Socket using the server instance
const io = socketIO(server);

// Socket
io.on("connection", socket => {
    game.initGame(io, socket);
});

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
app.use(playerRoutes);
app.use(roomRoutes);

// Run API on designated port
server.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});