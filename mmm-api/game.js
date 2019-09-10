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

    // This Function called when player is disconnected, 
    // This function remove their document from DB
    playerDisconnect = () => {
        console.log("User is Disconnected");
        Player.findById(userId, (error, player) => {
            if (player) {
                player.remove((error, player) => {
                    Room.findOne({ players: player }, (error, room) => {
                        if (room) {
                            console.log("in room before: ", room.players.length);
                            room.players.pull(userId);
                            room.save();
                            console.log("in room after: ", room.players.length);
                            io.emit("updateDB" , {for: "everyone"})
               
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
        io.emit("updateDB" , {for: "everyone"})
        gameSocket.join(roomId.toString());

    }
    joinRoom = (data) => {
        // console.log("hello" , data)
        Room.findById(data.roomID, (error, room) => {
            if (room) {
                console.log(room.players.length);
                if (room.players.length < room.limit) {
                    room.players.push({ _id: data.userID });
                    room.save(error => {

                        gameSocket.join(data.roomID.toString());
                        gameSocket.emit("playerJoinedRoom", data.roomID);
                        io.emit("updateDB" , {for: "everyone"})
                    });

                } else {

                    gameSocket.emit("playerFailedToJoin");
                }
            }
        })

    }

    playerExitRoom = (data) => {
        console.log("User is exited room");
        Player.findById(data.userID, (error, player) => {
            if (player) {
                    Room.findOne({ players: player }, (error, room) => {
                        if (room) {
                            console.log("in room before: ", room.players.length);
                            room.players.pull(userId);
                            room.save();
                            console.log("in room after: ", room.players.length);
                            io.emit("updateDB" , {for: "everyone"})
               
                        }
                    });

            }
        });
        
    }



    gameSocket.on("disconnect", playerDisconnect);
    gameSocket.on('createNewRoom', createNewRoom);
    gameSocket.on('joinRoom', joinRoom);
    gameSocket.on("playerExitRoom" , playerExitRoom)

}



