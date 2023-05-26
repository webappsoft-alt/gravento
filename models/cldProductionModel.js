const mongoose = require("mongoose");
const cldProduction = mongoose.Schema({
    productRequest:{
        type:String,
        required:true
    },
    machineUsageTime:{
        type:String,
    },
   startTime:{
        type:String,
    },
    endTime:{
        type:String,
    }
})
module.exports = mongoose.model("cldProduction",cldProduction)