const mongoose = require("mongoose");
const production = mongoose.Schema({
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
   productId:{
        type:String,
        required:true
    },
    productDetail:{
        type:String,
    },
    quantity:{
        type:String,
        required:true
    },
    productionDate:{
        type:String,
        required:true
    },
    productionUsageTime:{
        type:String,
        required:true
    },
    machineUsageTime:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("production",production)