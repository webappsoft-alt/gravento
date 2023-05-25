const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const service =  require("../controllers/serviceController")
app.post("/createService",service.create_service)
app.get("/getService",service.get_service)
app.post("/updateService",service.update_service)
app.post("/deleteService",service.delete_service)
app.get("/searchService",service.search_service)

module.exports  = app;