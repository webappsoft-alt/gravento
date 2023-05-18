const express = require("express");
const customer_route = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
customer_route.use(cookieParser());

customer_route.use(bodyPraser.json())
customer_route.use(bodyPraser.urlencoded({extended:true}))

// const multer = require('multer');
// const path = require('path')

// customer_route.use(express.static('public'))

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
customer_route.post("/createCustomer",customerController.create_customer)
customer_route.get("/getCustomer",customerController.get_customer)
customer_route.post("/updateCustomer",customerController.update_customer)
customer_route.post("/deleteCustomer",customerController.delete_customer)

module.exports  = customer_route;