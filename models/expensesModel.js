const mongoose = require("mongoose");
const expenses = mongoose.Schema({
    catId:{
        type:String,
        required:true
    },
    subCatId:{
        type:String,
        required:true
    },
    expensesDate:{
        type:String,
        required:true
    },
    invoice:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    total:{
        type:String,
        required:true
    },
    cat_name:{
        type:String
    },
    subCatName:{
        type:String
    }
})
module.exports = mongoose.model("expenses",expenses)