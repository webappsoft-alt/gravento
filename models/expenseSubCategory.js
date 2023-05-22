const mongoose = require("mongoose");
const expenseSubCategory = mongoose.Schema({
    subCatName:{
        type:String,
        required:true
    },
    catId:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("expenseSubCategory",expenseSubCategory)