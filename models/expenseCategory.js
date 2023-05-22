const mongoose = require("mongoose");
const expenseCategory = mongoose.Schema({
    catName:{
        type:String,
        required:true
    },
})
module.exports = mongoose.model("expenseCategory",expenseCategory)