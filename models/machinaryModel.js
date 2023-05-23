const mongoose = require("mongoose");
const machinary = mongoose.Schema({
    machineNumber:{
        type:String,
        required:true
    },
    machineType:{
        type:String,
    },
    technicalData:{
        type:String
    }
})
module.exports = mongoose.model("machinary",machinary)