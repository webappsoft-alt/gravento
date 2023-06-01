const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const cldExpense =  require("../controllers/cldExpenseController")
app.post("/createCldExpense",cldExpense.create_cld_expense)
app.post("/getCldExpense",cldExpense.get_cld_expense)
app.post("/updateCldExpense",cldExpense.update_cld_expense)
app.post("/deleteCldExpense",cldExpense.delete_cld_expense)
app.post("/searchCldExpense",cldExpense.search_cld_expense)

module.exports  = app;