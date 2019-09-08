// Require necessary NPM Packages
const mongoose = require('mongoose');

// Define Room Schema
const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }],
    limit: {
        type: Number,
        default: 3
    }
}, {
        timestamps: true
    });

// Compile model based on the schema
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;