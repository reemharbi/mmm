// Require necessary NPM Packages
const express = require('express');

// Pull in Mongoose model for player
const Player = require('../models/player');

// Instantiate a router (mini app the only handles routes)
const router = express.Router();

/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/players
 * Description: Get all players
 */
router.get('/api/players', (req, res) => {
    Player.find({}, (error, players) => {
        // Return all players
        if (!error) {
            res.status(200).json({ players: players });
        } else {
            // if there are any errors 
            res.status(500).json({ error: error });
        }
    });
});

/**
 * Action:      SHOW
 * Method:      GET
 * URI:         /api/players/:id
 * Description: Get a player by player ID
 */
router.get('/api/players/:id', (req, res) => {
    Player.findById(req.params.id, (error, player) => {
        if (!error) {
            if (player) {
                // Return the player
                res.status(200).json({ player: player });
            } else {
                // if there are no player with a matching ID
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
 * URI:         /api/players
 * Description: Create new player
 */
router.post('/api/players', (req, res) => {
    Player.create(req.body, (error, newPlayer) => {
        if (!error) {
            // On a successful create action, respond with the new player
            // and 201 HTTP status
            res.status(201).json({ player: newPlayer });
        } else {
            // if there are any errors
            res.status(500).json({ error: error });
        }
    });
});

/**
 * Action:      UPDATE
 * Method:      PATCH
 * URI:         /api/players/:id
 * Description: Update a player by player ID
 */
router.patch('/api/players/:id', (req, res) => {
    Player.findById(req.params.id, (error, player) => {
        if (!error) {
            if (player) {
                player.update(req.body, (error, player) => {
                    if (!error) {
                        res.status(204).end();
                    } else {
                        res.status(500).json({ error: error });
                    }
                });
            } else {
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided Id doesn\'t match any documents'
                    }
                });
            }
        } else {
            res.status(500).json({ error: error })
        }
    });
});

/**
 * Action:      DESTROY
 * Method:      DELETE
 * URI:         /api/players/:id
 * Description: Delete a player by player ID
 */
router.delete('/api/players/:id', (req, res) => {
    Player.findById(req.params.id, (error, player) => {
        if (!error) {
            if (player) {
                player.remove((error, player) => {
                    if (!error) {
                        res.status(204).end();
                    } else {
                        res.status(500).json({ error: error });
                    }
                });
            } else {
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided Id doesn\'t match any documents'
                    }
                });
            }
        } else {
            res.status(500).json({ error: error })
        }
    });
});
module.exports = router;