const mongoose = require("mongoose");
const vehicle = mongoose.Schema({
    vehicleNumber:{
        type:String,
        required:true
    },
    vehicleModel:{
        type:String,
    },
    vehicleType:{
        type:String
    },
    technicalData:{
        type:String
    }
})
module.exports = mongoose.model("vehicle",vehicle)