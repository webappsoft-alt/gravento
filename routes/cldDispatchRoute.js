const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const cldDispatch =  require("../controllers/cldDispatchController")
app.post("/createCldDispatch",cldDispatch.create_dispatch)
app.post("/getCldDispatch",cldDispatch.get_dispatch)
app.post("/updateCldDispatch",cldDispatch.update_dispatch)
app.post("/deleteCldDispatch",cldDispatch.delete_dispatch)
app.post("/searchCldDispatch",cldDispatch.search_dispatch)

module.exports  = app;