const mongoose = require("mongoose");
const cldProduction = mongoose.Schema({
    productRequest:{
        type:String,
        required:true
    },
//     machineUsageTime:{
//         type:String,
//     },
//    startTime:{
//         type:String,
//     },
//     endTime:{
//         type:String,
//     },
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
module.exports = mongoose.model("cldProduction",cldProduction)