// Require necessary NPM Packages
const mongoose = require('mongoose');

// Define Card Schema
const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
        timestamps: true
});

// Compile model based on the schema
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;