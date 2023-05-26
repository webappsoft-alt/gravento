const mongoose = require("mongoose");
const cldFuelUsage = mongoose.Schema({
    vehicleOrMachine:{
        type:String,
        required:true
    },
    gallonsDispatched:{
        type:String,
        required:true
    },
   percentageFilled:{
        type:String,
        required:true
    },
    numberOfTrips:{
        type:String,
        required:true
    },
    transportedEachTrip:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("cldFuelUsage",cldFuelUsage)