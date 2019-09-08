// Require necessary NPM Packages
const express = require('express');

// Pull in Mongoose model for Card
const Card = require('../models/card');

// Instantiate a router (mini app the only handles routes)
const router = express.Router();

/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/cards
 * Description: Get all Cards
 */
router.get('/api/articles', (req, res) => {
    Card.find({}, (error, cards) => {
        // Return all cards
        if (!error) {
            res.status(200).json({ cards: cards });
        } else {
            // if there are any errors 
            res.status(500).json({ error: error });
        }
    });
});

/**
 * Action:      SHOW
 * Method:      GET
 * URI:         /api/cards/:id
 * Description: Get a Card by Card ID
 */
router.get('/api/cards/:id', (req, res) => {
    Card.findById(req.params.id, (error, card) => {
        if (!error) {
            if (card) {
                // Return the card
                res.status(200).json({ card: card });
            } else {
                // if there are no card with a matching ID
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided Id doesn\'t match any documents'
                    }
                });
            }
        } else {
            //if there are any errors
            res.status(500).json({ error: error });
        }
    });
});

/**
 * Action:      CREATE
 * Method:      POST
 * URI:         /api/cards
 * Description: Create new Card
 */
router.post('/api/cards', (req, res) => {
    Card.create(req.body.card, (error, newCard) => {
        if (!error) {
            // On a successful create action, respond with the new card
            // and 201 HTTP status
            res.status(201).json({ card: newCard });
        } else {
            // if there are any errors
            res.status(500).json({ error: error });
        }
    });
});