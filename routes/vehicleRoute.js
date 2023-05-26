const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const vehicle =  require("../controllers/vehicleController")
app.post("/createVehicle",vehicle.create_vehicle)
app.post("/getVehicle",vehicle.get_vehicle)
app.post("/updateVehicle",vehicle.update_vehicle)
app.post("/deleteVehicle",vehicle.delete_vehicle)
app.post("/searchVehicle",vehicle.search_vehicle)

module.exports  = app;