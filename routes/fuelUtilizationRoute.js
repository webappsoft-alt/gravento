const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const fuelUtilization =  require("../controllers/fuelUtilizationController")
app.post("/createFuel",fuelUtilization.create_fuel)
app.get("/getFuel",fuelUtilization.get_fuel)
app.post("/updateFuel",fuelUtilization.update_fuel)
app.post("/deleteFuel",fuelUtilization.delete_fuel)
app.get("/searchFuel",fuelUtilization.search_fuel)

module.exports  = app;