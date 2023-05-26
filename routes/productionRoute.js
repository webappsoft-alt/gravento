const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const production =  require("../controllers/productionController")
app.post("/createProduction",production.create_prod_table)
app.post("/getProduction",production.get_prod_table)
app.post("/updateProduction",production.update_prod_Table)
app.post("/deleteProduction",production.delete_prod_table)
app.post("/searchProduction",production.search_prod_table)

module.exports  = app;