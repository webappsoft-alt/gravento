const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const sales =  require("../controllers/salesController")
app.post("/createSales",sales.create_sales)
app.post("/getSales",sales.get_sales)
app.post("/updateSales",sales.update_sales)
app.post("/deleteSales",sales.delete_sales)
app.post("/searchSales",sales.search_sales)

module.exports  = app;