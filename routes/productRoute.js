const express = require("express");
const customer_route = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
customer_route.use(cors());
customer_route.use(cookieParser());

customer_route.use(bodyPraser.json())
customer_route.use(bodyPraser.urlencoded({extended:true}))

const productController =  require("../controllers/productController")
customer_route.post("/createProduct",productController.create_product)
customer_route.get("/getProduct",productController.get_product)
customer_route.post("/updateProduct",productController.update_product)
customer_route.post("/deleteProduct",productController.delete_product)

module.exports  = customer_route;