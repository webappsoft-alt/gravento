const mongoose = require("mongoose");
const cldExpense = mongoose.Schema({
    diesel:{
        type:String,
        required:true
    },
    payroll:{
        type:String,
        required:true
    },
   vehicleId:{
        type:String,
        required:true
    },
    vehicleName:{
        type:String,
        required:true
    },
    machineId:{
        type:String,
        required:true
    },
    machineName:{
        type:String,
    },
    transportFreight:{
        type:String,
    }
})
module.exports = mongoose.model("cldExpense",cldExpense)