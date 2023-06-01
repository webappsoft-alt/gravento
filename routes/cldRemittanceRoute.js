const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const cldRemittance =  require("../controllers/cldRemittanceController")
app.post("/createCldRemittance",cldRemittance.create_cld_remittance)
app.post("/getCldRemittance",cldRemittance.get_cld_remittance)
app.post("/updateCldRemittance",cldRemittance.update_cld_remittance)
app.post("/deleteCldRemittance",cldRemittance.delete_dispatch)
app.post("/searchCldRemittance",cldRemittance.search_cld_remittance)

module.exports  = app;