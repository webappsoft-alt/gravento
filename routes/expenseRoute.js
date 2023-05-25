const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const expenses =  require("../controllers/expensesController")
app.post("/createExpenses",expenses.create_expenses)
app.get("/getExpenses",expenses.get_expenses)
app.post("/updateExpenses",expenses.update_expenses)
app.post("/deleteExpenses",expenses.delete_expenses)
app.get("/searchExpenses",expenses.search_expense)
module.exports  = app;