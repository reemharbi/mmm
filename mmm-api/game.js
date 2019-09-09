// Require  necessary NPM packages
const socketIO = require("socket.io");

// Database Models
const Player = require('./app/models/player');



//  Function Called when Player is created
exports.initGame = (sio, socket) => {
    const io = sio;
    const gameSocket = socket;
    const userId = gameSocket.handshake.query.userId;
    console.log(`User is connected ${userId}`);

    // When player is disconnected remove their document from DB
    playerDisconnect = () => {
        console.log("User is Disconnected");
        Player.findById(userId, (error, player) => {
            if (player) {
                player.remove();
            }
        });
    }
    gameSocket.on("disconnect", playerDisconnect);


}



