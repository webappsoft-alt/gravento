const mongoose = require("mongoose");
const cldFuelUsage = mongoose.Schema({
    expenseId:{
        type:String,
        required:true
    },
    vehicleId:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    utilization:{
        type:String,
        required:true
    },
    numberTrips:{
        type:String,
        required:true
    },
    milleage:{
        type:String,
        required:true
    },
    expense:{
        type:String,
    },
    vehicle:{
        type:String,
    }
})
module.exports = mongoose.model("cldFuelUsage",cldFuelUsage)