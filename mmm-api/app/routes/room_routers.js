// Require necessary NPM Packages
const express = require('express');

// Pull in Mongoose model for room
const Room = require('../models/room');

// Instantiate a router (mini app the only handles routes)
const router = express.Router();

/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/rooms
 * Description: Get all rooms
 */
router.get('/api/rooms', (req, res) => {
    Room.find({}).populate("players").exec((error, rooms) => {
        // Return all rooms
        if (!error) {
            res.status(200).json({ rooms: rooms });
        } else {
            // if there are any errors 
            res.status(500).json({ error: error });
        }
    });
});

/**
 * Action:      SHOW
 * Method:      GET
 * URI:         /api/rooms/:id
 * Description: Get a room by room ID
 */
router.get('/api/rooms/:id', (req, res) => {
    Room.findById(req.params.id).populate().exec((error, room) => {
        if (!error) {
            if (room) {
                // Return the room
                res.status(200).json({ room: room });
            } else {
                // if there are no room with a matching ID
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
 * URI:         /api/rooms
 * Description: Create new room
 */
router.post('/api/rooms', (req, res) => {
    Room.create(req.body, (error, newRoom) => {
        if (!error) {
            // On a successful create action, respond with the new room
            // and 201 HTTP status
            res.status(201).json({ room: newRoom });
        } else {
            // if there are any errors
            res.status(500).json({ error: error });
        }
    });
});

/**
 * Action:      UPDATE
 * Method:      PATCH
 * URI:         /api/rooms/:id
 * Description: Update a room by room ID
 */
router.patch('/api/rooms/:id', (req, res) => {
    Room.findById(req.params.id, (error, room) => {
        if (!error) {
            if (room) {
                room.update(req.body, (error, room) => {
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
 * URI:         /api/rooms/:id
 * Description: Delete a room by room ID
 */
router.delete('/api/rooms/:id', (req, res) => {
    Room.findById(req.params.id, (error, room) => {
        if (!error) {
            if (room) {
                room.remove((error, room) => {
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