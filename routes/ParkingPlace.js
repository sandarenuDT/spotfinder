const express = require('express');
const router = express.Router();
const Parking = require('../models/ParkingPlace'); // Import the Parking model

router.post('/parking', async (req, res) => {
    try {
        const { name, longitude, latitude, maximumSpace, numberofvehicles } = req.body;
        const newParking = new Parking({
            name,
            longitude,
            latitude,
            maximumSpace,
            numberofvehicles, // Initialize numberofvehicles to 0
            //vehicleIds: [], // Initialize vehicleIds as an empty array
        });
        const savedParking = await newParking.save();
        res.json(savedParking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




router.delete('/parking/:id', async (req, res) => {
    try {
        const deletedParking = await Parking.findByIdAndDelete(req.params.id);
        if (!deletedParking) {
            return res.status(404).json({ message: "Parking place not found" });
        }
        res.json({ message: "Parking place deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



router.get('/parking', async (req, res) => {
    try {
        const parkingLocations = await Parking.find();
        res.json(parkingLocations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Example route to update numberofvehicles
router.post('/parking/updateNumberofVehicles/:placeId', async (req, res) => {
    const { placeId } = req.params;
    const { newNumberofvehicles } = req.body;

    try {
        // Find the parking place by ID
        const parkingPlace = await Parking.findById(placeId);

        if (!parkingPlace) {
            return res.status(404).json({ message: 'Parking place not found' });
        }

        // Update the numberofvehicles field
        parkingPlace.numberofvehicles = newNumberofvehicles;

        // Save the updated parking place
        const updatedPlace = await parkingPlace.save();
        return res.json(updatedPlace);
    } catch (error) {
        res.status(500).json({ message: 'Error updating numberofvehicles', error: error.message });
    }
});


module.exports = router;
