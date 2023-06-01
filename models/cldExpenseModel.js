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
    vehicleNumber:{
        type:String,
        required:true
    },
    machineId:{
        type:String,
        required:true
    },
    machineNumber:{
        type:String,
    },
    transportFreight:{
        type:String,
    }
})
module.exports = mongoose.model("cldExpense",cldExpense)