const mongoose = require("mongoose");
const remittanceVoucher = mongoose.Schema({
    remittanceCreater:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    remittanceDate:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    recipient:{
        type:String,
        required:true
    },
    recipientDetail:{
        type:String,
    },
    voucherNumber:{
        type:String,
    }
})
module.exports = mongoose.model("remittanceVoucher",remittanceVoucher)