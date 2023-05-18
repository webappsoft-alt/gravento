const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    tin:{
        type:String,
    },
    billingData:{
        type:String,
    }
})
module.exports = mongoose.model("Customer",customerSchema)