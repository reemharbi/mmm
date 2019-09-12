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
            // Check if room is full
            if (room.players.length === room.limit) {

              io.to(data.roomID).emit("updateCurrentRoom", data.roomID);
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

            if(room.players.length == 0 ){
              Room.find({_id: room._id}).remove().exec()
              console.log("i am activated in the exit shit")
            }

          }
        });

      }
    });

  }

  setGame = (r_room) => {
    let card;
    console.log("Set Game - number of players: ", r_room.players.length);


      Card.find({}, (error, cards) => {
        if (!error) {

          card = cards[Math.floor(Math.random() * cards.length)];

          io.to(r_room._id).emit("setGame", card);

          io.to(r_room._id).emit("startGame", card);
        }
      });
      if (r_room.players.length === r_room.limit ) {
        Room.findById(r_room._id).populate('players').exec((error, room) =>{
          if(!room.players.some(player => player.role === 'inv')){
            Player.findById(room.players[Math.floor(Math.random() * room.limit)], (error, player) => {
              if (player) {
                player.role = 'inv';
                player.save();
              }
            });
          } 
        })
      io.to(r_room._id).emit("updateCurrentRoom", r_room._id);

    }

  }




  checkIfAllSumbited = (currentRoom)=>{
    let counter = 0;
    let players = [];
    Room.findById(currentRoom._id).populate('players').exec((error, room) => {
      room.players.forEach( player =>{
        if (player.approach){
          counter++;
          players.push(player)
        }
      });
      if (counter == 2){
        io.to(currentRoom._id).emit("finalPhase" ,players);
      }
  }
    )}


  
  sendWinner = (player ,room) => {
    io.to(room._id).emit("gameResult" , player)

  }


  gameSocket.on("disconnect", playerDisconnect);
  gameSocket.on('createNewRoom', createNewRoom);
  gameSocket.on('joinRoom', joinRoom);
  gameSocket.on("playerExitRoom", playerExitRoom);
  gameSocket.on("playerIsReady", setGame);
  gameSocket.on("submitApproach", checkIfAllSumbited);
  gameSocket.on("gameWinner", sendWinner);
  
}



