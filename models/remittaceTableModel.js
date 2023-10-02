const mongoose = require("mongoose");
const remittanceTable = mongoose.Schema({
    // remittanceType:{
    //     type:String,
    //     required:true
    // },
    amount:{
        type:String,
        required:true
    },
   remittanceTabledate:{
        type:String,
        required:true
    },
    // voucherNumber:{
    //     type:String,
    //     required:true
    // }
})
module.exports = mongoose.model("remittanceTable",remittanceTable)