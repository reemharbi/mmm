// Require  necessary NPM packages
const socketIO = require("socket.io");

// Database Models
const Player = require('./app/models/player');
const Room = require('./app/models/room');
const Card = require('./app/models/card');

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
              // Call updateDB on all clients
              io.emit("updateDB", { for: "everyone" });
              // Call updateCurrentRoom for client who is in the room
              io.to(room._id).emit("updateCurrentRoom", room._id);


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
    io.emit("updateDB", { for: "everyone" })
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

            // Call updateCurrentRoom for client who is in the room
            io.to(data.roomID).emit("updateCurrentRoom", data.roomID);
            // Call updateDb on all clients
            io.emit("updateDB", { for: "everyone" });

            // const clients = io.sockets.adapter.rooms[data.roomID].sockets;
            // //to get the number of clients
            // var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
            // console.log(numClients);

            // Check if room is full
            if (room.players.length === room.limit) {
              // start game 

              setGame(room);
            }
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
            room.players.pull(userId);
            room.save();
            // Remove Player from socket room
            gameSocket.leave(data.roomID.toString());
            // Call updateCurrentRoom for client who is in the room
            io.to(data.roomID).emit("updateCurrentRoom", data.roomID);
            // Call updateDb on all clients
            io.emit("updateDB", { for: "everyone" });


          }
        });

      }
    });

  }

  setGame = (room) => {
    let card;
    Player.findById(room.players[Math.floor(Math.random() * room.limit)], (error, player) => {
      if (player) {
        player.role = 'inv';
        player.save();
      }
    });

    Card.find({}, (error, cards) => {
      if (!error) {

        card = cards[Math.floor(Math.random() * cards.length)];
        console.log(card);

        io.to(data.roomID).emit("setGame", card);

      }
    });

    io.to(room._id).emit("startGame");
    io.to(room._id).emit("updatePlayers");

  }



  gameSocket.on("disconnect", playerDisconnect);
  gameSocket.on('createNewRoom', createNewRoom);
  gameSocket.on('joinRoom', joinRoom);
  gameSocket.on("playerExitRoom", playerExitRoom);

}



