const express = require("express");
const app = express()
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://danishgoheer17:danishgoheer@cluster0.f0pk1iv.mongodb.net/gravacentro")

//customer route
const customerRoute = require("./routes/customerRoute")
app.use('/api',customerRoute)

//product route
const productRoute = require("./routes/productRoute")
app.use('/api',productRoute)

//Price Management route
const priceManagementRoute = require("./routes/priceManagementRoute")
app.use('/api',priceManagementRoute)

app.listen(3000,function(){
    console.log("Server is ready")
})