const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const expenseCategory =  require("../controllers/expenseCategory")
app.post("/createExpenseCat",expenseCategory.create_expense_cat)
app.get("/getExpenseCat",expenseCategory.get_expense_cat)
app.post("/updateExpenseCat",expenseCategory.update_expense_cat)
app.post("/deleteExpenseCat",expenseCategory.delete_expense_cat)

module.exports  = app;