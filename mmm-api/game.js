// Require  necessary NPM packages
const socketIO = require("socket.io");

// Database Models
const Player = require('./app/models/player');
const Room = require('./app/models/room');


//   This Function is Called when a Player is created
exports.initGame = (sio, socket) => {
    const io = sio;
    const gameSocket = socket;
    const userId = gameSocket.handshake.query.userId;
    console.log(`User is connected with ID: ${userId}`);

    // This function called when player is disconnected, 
    // This function remove their document from DB
    playerDisconnect = () => {
        console.log("User is Disconnected");
        Player.findById(userId, (error, player) => {
            if (player) {
                player.remove((error, player) => {
                    // Check if player exist in room 
                    // if they do remove their id from room.players
                    Room.findOne({ players: player }, (error, room) => {
                        if (room) {
                            room.players.pull(userId);
                            room.save();
                        }
                    });

                });
            }
        });
    };
    // This Function called when player successfully create new room  
    createNewRoom = (roomId) => {
        console.log("room id: ", roomId);
        // Join the Room with the same name 
        gameSocket.join(roomId.toString());

    }
    joinRoom = (data) => {
        // console.log("hello" , data)
        Room.findById(data.roomID, (error, room) => {
            if (room) {
                console.log(room.players.length);
                if (room.players.length < room.limit) {
                    room.players.push({ _id: data.userID });
                    room.save();
                    gameSocket.join(data.roomID.toString());
                    gameSocket.emit("playerJoinedRoom", data.roomID);

                } else {

                    gameSocket.emit("playerFailedToJoin");
                }
            }
        })

    }
    gameSocket.on("disconnect", playerDisconnect);
    gameSocket.on('createNewRoom', createNewRoom);
    gameSocket.on('joinRoom', joinRoom);

}



