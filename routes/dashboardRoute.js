const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const dashboard =  require("../controllers/dashboardController")
app.post("/expenseGraph",dashboard.expense_grpah)
app.post("/salesGraph",dashboard.sales_grpah)
app.post('/productSalesGrpah',dashboard.productSales_grpah)
app.post('/customerSalesGrpah',dashboard.customerSales_grpah)
app.post('/inventoryGraph',dashboard.inventories_grpah)
app.post('/productionGraph',dashboard.production_grpah)


module.exports  = app;