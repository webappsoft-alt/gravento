const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const remittanceTableController =  require("../controllers/remittanceTableController")
app.post("/createRemTable",remittanceTableController.create_rem_table)
app.get("/getRemTable",remittanceTableController.get_rem_table)
app.post("/updateRemTable",remittanceTableController.update_rem_Table)
app.post("/deleteRemTable",remittanceTableController.delete_rem_table)
app.get("/searchRemTable",remittanceTableController.search_rem_Table)

module.exports  = app;