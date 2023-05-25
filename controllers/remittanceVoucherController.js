const RemittanceVoucher = require("../models/remittanceVoucherModel");
const Customer = require("../models/customerModel");

const create_rem_voucher = async(req,res)=>{
    try {
       const remittanceVoucher =  new RemittanceVoucher({
           remittanceCreater:req.body.remittanceCreater,
           status:req.body.status,  
           remittanceDate:req.body.remittanceDate,  
           quantity:req.body.quantity,  
           recipient:req.body.recipient,
           voucherNumber:Math.floor(100000 + Math.random() * 900000)
        })
            const data = remittanceVoucher.save()
            try {
                if(data){
                  res.status(200).send({result:true,message:'Added Successfully'})
                }   
            } catch (error) {
                res.status(200).send(error.message)
            }
            } catch (error) {
            res.status(400).send(error.message);
    }
}

const get_rem_voucher = async (req,res)=>{
    try {
       const data =  await RemittanceVoucher.find({ }).sort( { _id : -1 } ).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await RemittanceVoucher.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const search_rem_voucher = async (req,res)=>{
    try {
       const data =  await RemittanceVoucher.find({$or:[{remittanceCreater: {$regex : new RegExp(req?.body?.search)}},{status: {$regex : new RegExp(req?.body?.search)}}
        ,{remittanceDate: {$regex : new RegExp(req?.body?.search)}},{quantity: {$regex : new RegExp(req?.body?.search)}},{recipient: {$regex : new RegExp(req?.body?.search)}}]}).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = data.length
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_rem_voucher = async (req,res) => {
    try {
        const data = await RemittanceVoucher.findOneAndUpdate({
            _id:req.body.remId
        },{
            remittanceCreater:req.body.remittanceCreater,
            status:req.body.status,  
            remittanceDate:req.body.remittanceDate,  
            quantity:req.body.quantity,  
            recipient:req.body.recipient,
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_rem_voucher = async(req,res) => {
    const deleteData = await RemittanceVoucher.findByIdAndDelete({ _id: req.body.remId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_rem_voucher,
    get_rem_voucher,
    update_rem_voucher,
    delete_rem_voucher,
    search_rem_voucher
}