// Require  necessary NPM packages
const socketIO = require("socket.io");

// Database Models
const Player = require('./app/models/player');



//   This Function is Called when a Player is created
exports.initGame = (sio, socket) => {
    const io = sio;
    const gameSocket = socket;
    const userId = gameSocket.handshake.query.userId;
    console.log(`User is connected with ID: ${userId}`);

    // This Function called when player is disconnected, 
    // This function remove their document from DB
    playerDisconnect = () => {
        console.log("User is Disconnected");
        Player.findById(userId, (error, player) => {
            if (player) {
                player.remove();
            }
        });
    };
    // This Function called when player successfully create new room  
    createNewRoom = (roomId) => {
        console.log(this);
        console.log("room id: ",roomId);
        // Join the Room with the same name 
        gameSocket.join(roomId.toString());

    }
    gameSocket.on("disconnect", playerDisconnect);
    gameSocket.on('createNewRoom', createNewRoom);
    
}



