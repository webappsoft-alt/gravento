const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const machinary =  require("../controllers/machinaryController")
app.post("/createMachinary",machinary.create_machinary)
app.get("/getMachinary",machinary.get_machinary)
app.post("/updateMachinary",machinary.update_machinary)
app.post("/deleteMachinary",machinary.delete_machinary)
app.get("/searchMachinary",machinary.search_machinary)

module.exports  = app;