const mongoose = require("mongoose");
const cldDispatch = mongoose.Schema({
    customerId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
   quantity:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    remittance:{
        type:String,
        required:true
    },
    customerDetail:{
        type:String,
    },
    productDetail:{
        type:String,
    }
})
module.exports = mongoose.model("cldDispatch",cldDispatch)