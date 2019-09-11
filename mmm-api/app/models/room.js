// Require necessary NPM Packages
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Define Room Schema
const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }],
    limit: {
        type: Number,
        default: 3
    },
    ready: {
        type: Number,
        default: 0
    }
}, {
        timestamps: true
    });

// Compile model based on the schema
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;