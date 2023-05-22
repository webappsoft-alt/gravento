const express = require("express");
const customer_route = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
customer_route.use(cors());
customer_route.use(cookieParser());

customer_route.use(bodyPraser.json())
customer_route.use(bodyPraser.urlencoded({extended:true}))

const remittanceVoucherController =  require("../controllers/remittanceVoucherController")
customer_route.post("/createRemVoucher",remittanceVoucherController.create_rem_voucher)
customer_route.get("/getRemVoucher",remittanceVoucherController.get_rem_voucher)
customer_route.post("/updateRemVoucher",remittanceVoucherController.update_rem_voucher)
customer_route.post("/deleteRemVoucher",remittanceVoucherController.delete_rem_voucher)

module.exports  = customer_route;