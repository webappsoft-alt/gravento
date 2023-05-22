const express = require("express");
const app = express()
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const DB = 'mongodb+srv://danishgoheer17:danishgoheer@cluster0.f0pk1iv.mongodb.net/gravacentro';
mongoose.connect(DB,{
    useNewURlParser: true,
    useUnifiedTopology: true,
  })

//customer route
const customerRoute = require("./routes/customerRoute")
app.use('/',customerRoute)

//product route
const productRoute = require("./routes/productRoute")
app.use('/',productRoute)

//Price Management route
const priceManagementRoute = require("./routes/priceManagementRoute")
app.use('/',priceManagementRoute)

//Remittence Voucher route
const remittanceVoucher = require("./routes/remittanceVoucherRoute")
app.use('/',remittanceVoucher)

//Remittence Table route
const remittanceTable = require("./routes/remittanceTableRoute")
app.use('/',remittanceTable)

//Expense Category route
const expenseCategory = require("./routes/expenseCatRoute")
app.use('/',expenseCategory)

//Expense Sub Category route
const expenseSubCategory = require("./routes/expenseSubCatRoute")
app.use('/',expenseSubCategory)

//Expense expenses
const expenseRoute = require("./routes/expenseRoute")
app.use('/',expenseRoute)

app.listen(3000,function(){
    console.log("Server is ready, running on 3000 port")
})