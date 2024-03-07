const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
    },
    latitude: {
        type: Number,
    },
    maximumSpace: {
        type: Number,
        required: true
    },
    numberofvehicles: {
        type: Number,
        required: true
    }/*,
    vehicleIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]*/
});

const Parking = mongoose.model("Parking", ParkingSchema);
module.exports = Parking;
