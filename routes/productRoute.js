const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const productController =  require("../controllers/productController")
app.post("/createProduct",productController.create_product)
app.get("/getProduct",productController.get_product)
app.post("/deleteProduct",productController.delete_product)
app.post("/updateProduct",productController.update_product)
app.get("/searchProduct",productController.search_product)

module.exports  = app;