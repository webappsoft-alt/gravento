const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const inventory =  require("../controllers/inventoryController")
app.post("/createInventory",inventory.create_inventory)
app.post("/getInventory",inventory.get_inventory)
app.post("/updateInventory",inventory.update_inventory)
app.post("/deleteInventory",inventory.delete_inventory)
app.post("/searchInventory",inventory.search_inventory)

module.exports  = app;