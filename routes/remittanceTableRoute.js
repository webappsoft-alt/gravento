const express = require("express");
const customer_route = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
customer_route.use(cors());
customer_route.use(cookieParser());

customer_route.use(bodyPraser.json())
customer_route.use(bodyPraser.urlencoded({extended:true}))

const remittanceTableController =  require("../controllers/remittanceTableController")
customer_route.post("/createRemTable",remittanceTableController.create_rem_table)
customer_route.get("/getRemTable",remittanceTableController.get_rem_table)
customer_route.post("/updateRemTable",remittanceTableController.update_rem_Table)
customer_route.post("/deleteRemTable",remittanceTableController.delete_rem_table)

module.exports  = customer_route;