const express = require("express");
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyPraser = require("body-parser")
app.use(cors());
app.use(cookieParser());

app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({extended:true}))

const remittanceVoucherController =  require("../controllers/remittanceVoucherController")
app.post("/createRemVoucher",remittanceVoucherController.create_rem_voucher)
app.get("/getRemVoucher",remittanceVoucherController.get_rem_voucher)
app.post("/updateRemVoucher",remittanceVoucherController.update_rem_voucher)
app.post("/deleteRemVoucher",remittanceVoucherController.delete_rem_voucher)
app.get("/searchRemVoucher",remittanceVoucherController.search_rem_voucher)

module.exports  = app;