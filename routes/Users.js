const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/users', async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            vehiclenumber: req.body.vehiclenumber,
            mobilenumber: req.body.mobilenumber,
            vehicleintime: req.body.vehicleintime,
            vehicleouttime: req.body.vehicleouttime, // Add vehicleouttime
            password: req.body.password,
            parkingPlaceId: req.body.parkingPlaceId //new
        });
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: 'User not found' });
    }
});

// Update a user by ID
router.patch('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    vehiclenumber: req.body.vehiclenumber,
                    mobilenumber: req.body.mobilenumber,
                    vehicleintime: req.body.vehicleintime,
                    vehicleouttime: req.body.vehicleouttime, // Update vehicleouttime
                    password: req.body.password,
                    parkingPlaceId: req.body.parkingPlaceId //new
                },
            },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(404).json({ message: 'User not found' });
    }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
