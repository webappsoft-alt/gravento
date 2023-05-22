const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const expenseSubCategory =  require("../controllers/expenseSubCategory")
app.post("/createExpenseSubCat",expenseSubCategory.create_expense_subcat)
app.get("/getExpenseSubCat",expenseSubCategory.get_expense_subcat)
app.post("/updateExpenseSubCat",expenseSubCategory.update_expense_subcat)
app.post("/deleteExpenseSubCat",expenseSubCategory.delete_expense_subcat)

module.exports  = app;