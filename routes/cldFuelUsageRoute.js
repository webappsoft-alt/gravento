const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const cldFuelUsage =  require("../controllers/cldFuelUsageController")
app.post("/createCldProduction",cldFuelUsage.create_fuel_usage)
app.post("/getcldFuelUsage",cldFuelUsage.get_fuel_usage)
app.post("/updatecldFuelUsage",cldFuelUsage.update_fuel_usage)
app.post("/deletecldFuelUsage",cldFuelUsage.delete_fuel_usage)
app.post("/searchcldFuelUsage",cldFuelUsage.search_fuel_usage)

module.exports  = app;