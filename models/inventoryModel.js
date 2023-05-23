const mongoose = require("mongoose");
const inventory = mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    expenseId:{
        type:String,
        required:true
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
    }
})
module.exports = mongoose.model("inventory",inventory)