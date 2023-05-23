const mongoose = require("mongoose");
const service = mongoose.Schema({
    vehicleId:{
        type:String,
        required:true
    },
    vehicleDetail:{
        type:String,
    },
    serviceName:{
        type:String,
        required:true
    },
    serviceDate:{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("service",service)