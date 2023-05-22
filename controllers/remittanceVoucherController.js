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
           recipientDetail:'',
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
       const data =  await RemittanceVoucher.find({ }).sort( { _id : -1 } )
        for(let i=0;i<data.length;i++){
            let customer = await Customer.findOne({_id:data[i].customerId})
             data[i].customerDetail = await customer?.firstName+' '+customer?.lastName
        }
        if(data){
            res.status(200).json(data)
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
    delete_rem_voucher
}