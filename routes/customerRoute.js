const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

// const multer = require('multer');
// const path = require('path')

// app.use(express.static('public'))

// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,path.join(__dirname,'../public/images'),function(error,success){
//             if(error){
//                 throw error
//             }
//         })
//     },
//     filename:function(req,file,cb){
//        const name =  Date.now()+'-'+file.originalname;
//        cb(null,name,function(error1,success1){
//         if(error1) throw error1
//        })
//     }
// });
// const upload = multer({storage:storage})

const customerController =  require("../controllers/customerController")
app.post("/createCustomer",customerController.create_customer)
app.post("/getCustomer",customerController.get_customer)
app.post("/updateCustomer",customerController.update_customer)
app.post("/deleteCustomer",customerController.delete_customer)
app.post("/searchCustomer",customerController.search_customer)

module.exports  = app;