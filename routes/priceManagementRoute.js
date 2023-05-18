const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cors({origin:'https://stupendous-mochi-9cb249.netlify.app'}));
app.options('*', cors())
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const priceController =  require("../controllers/priceManagementController")
app.post("/createPrice",priceController.create_price)
app.get("/getPrice",priceController.get_price)
app.post("/updatePrice",priceController.update_price)
app.post("/deletePrice",priceController.delete_price)

module.exports  = app;