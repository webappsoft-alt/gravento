const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const cldProduction =  require("../controllers/cldProductionController")
app.post("/createCldProduction",cldProduction.create_cld_prod)
app.post("/getCldProduction",cldProduction.get_cld_prod)
app.post("/updateCldProduction",cldProduction.update_cld_prod)
app.post("/deleteCldProduction",cldProduction.delete_cld_prod)
app.post("/searchCldProduction",cldProduction.search_cld_prod)

module.exports  = app;