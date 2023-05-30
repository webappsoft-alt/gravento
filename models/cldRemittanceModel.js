const mongoose = require("mongoose");
const cldRemittance = mongoose.Schema({
    remittanceType:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
   voucherNo:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("cldRemittance",cldRemittance)