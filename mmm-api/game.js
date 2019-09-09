// Require  necessary NPM packages
const socketIO = require("socket.io");

// Database Models
const Player = require('./app/models/player');

let io;
let gameSocket;
let userId;

//  Function Called when Player is created
exports.initGame = (sio, socket) => {
    io = sio;
    gameSocket = socket;
    userId = socket.handshake.query.userId;
    console.log(`User is connected ${userId}`);
    gameSocket.on("disconnect", playerDisconnect);
}


// When player is disconnected remove their document from DB
 playerDisconnect = () => {
    console.log("User is Disconnected");
    Player.findById(userId, (error, player) => {
        if(player){
            player.remove();
        }
    });
}
