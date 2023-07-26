const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const user =  require("../controllers/usersController")
app.post('/login',user.login)
app.post("/createVehicle",user.create_users)
app.post("/getuser",user.get_users)
// app.post("/updateuser",user.update_user)
app.post("/deleteuser",user.delete_users)
app.post("/searchuser",user.search_users)

module.exports  = app;