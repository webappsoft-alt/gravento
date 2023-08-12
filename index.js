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

//Expense 
const expenseRoute = require("./routes/expenseRoute")
app.use('/',expenseRoute)

//Production 
const productionRoute = require("./routes/productionRoute")
app.use('/',productionRoute)

//Inventory expenses
const inventoryRoute = require("./routes/inventoryRoute")
app.use('/',inventoryRoute)

//Vehicle 
const vehicleRoute = require("./routes/vehicleRoute")
app.use('/',vehicleRoute)

//Machinary 
const machinaryRoute = require("./routes/machinaryRoute")
app.use('/',machinaryRoute)

//Fuel Utilization 
const fuelUtilizationRoute = require("./routes/fuelUtilizationRoute")
app.use('/',fuelUtilizationRoute)

//Service 
const serviceRoute = require("./routes/serviceRoute")
app.use('/',serviceRoute)

//cld production 
const cldProductionRoute = require("./routes/cldProductionRoute")
app.use('/',cldProductionRoute)

//cld fuel usage 
const cldFuelUsageRoute= require("./routes/cldFuelUsageRoute")
app.use('/',cldFuelUsageRoute)

//cld dispatch usage 
const cldDispatchRoute= require("./routes/cldDispatchRoute")
app.use('/',cldDispatchRoute)

//cld Remittance usage 
const cldRemittanceRoute= require("./routes/cldRemittanceRoute")
app.use('/',cldRemittanceRoute)

//cld Expense usage 
const cldExpenseRoute= require("./routes/cldExpenseRoute")
app.use('/',cldExpenseRoute)

//Sales usage 
const salesRoute= require("./routes/salesRoute")
app.use('/',salesRoute)

//users usage 
const usersRoute= require("./routes/usersRoute")
app.use('/',usersRoute)

//Expense Graph 
const dashboardRoute= require("./routes/dashboardRoute")
app.use('/',dashboardRoute)

app.listen(3000,function(){
    console.log("Server is ready, running on 3000 port")
})


