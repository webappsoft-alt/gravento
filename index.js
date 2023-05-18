const express = require("express");
const app = express()
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const DB = 'mongodb+srv://danishgoheer17:danishgoheer@cluster0.f0pk1iv.mongodb.net/gravacentrot';
mongoose.connect(DB,{
    useNewURlParser: true,
    useUnifiedTopology: true,
  })

//customer route
const customerRoute = require("./routes/customerRoute")
app.use('/',customerRoute)

//product route
const productRoute = require("./routes/productRoute")
app.use('/',productRoute)

//Price Management route
const priceManagementRoute = require("./routes/priceManagementRoute")
app.use('/',priceManagementRoute)

app.listen(3000,function(){
    console.log("Server is ready, running on 3000 port")
})