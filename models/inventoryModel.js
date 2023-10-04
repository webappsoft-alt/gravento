const mongoose = require("mongoose");
const inventory = mongoose.Schema({
    productId:{
        type:String,
    },
    anotherItem:{
        type:String,
    },
    inventoryType:{
        type:String,
    },
    expenseId:{
        type:String,
    },
    productDetail:{
        type:String
    },
    expenseDetail:{
        type:String
    },
   quantity:{
        type:String,
        required:true
    },
    value:{
        type:String,
    },
    createdAt:{
        type:String
    },
    units:{
        type:String
    }
})
module.exports = mongoose.model("inventory",inventory)