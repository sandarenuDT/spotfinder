const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String,
        require: true
    },
    email : {
        type : String,
        require : true
    },
    vehiclenumber : {
        type : String,
        require : true
    },
    mobilenumber : {
        type : String,
        require : true
    },
    vehicleintime: {
        type : String,
        require : true
    },
    vehicleouttime: {
        type : String,
        require : true
    },
    password: {
        type : String,
        require : true
    },
    //new 
    parkingPlaceId: {
        type : String
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;