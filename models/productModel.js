const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    // customerId:{
    //     type:String,
    //     required:true
    // },
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    costData:{
        type:String,
    },
    // customerDetail:{
    //     type:String,
    // }
})
module.exports = mongoose.model("Product",productSchema)