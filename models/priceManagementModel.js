const mongoose = require("mongoose");
const priceManagementSchema = mongoose.Schema({
    customerId:{
        type:String,
        required:true
    },
    customerDetail:{
        type:String,
    },
    productId:{
        type:String,
        required:true
    },
    productDetail:{
        type:String,
    },
    price:{
        type:String,
        required:true
    },
})
module.exports = mongoose.model("PriceManagement",priceManagementSchema)