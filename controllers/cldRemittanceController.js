const CldRemittance = require("../models/cldRemittanceModel");
const RemittanceTable = require("../models/remittaceTableModel");
const create_cld_remittance = async(req,res)=>{
    try {
       const cldRemittance =  new CldRemittance({
        remittanceCreater:req.body.remittanceCreater,
        status:req.body.status,  
        remittanceDate:req.body.remittanceDate,  
        quantity:req.body.quantity,  
        recipient:req.body.recipient,
        voucherNumber:Math.floor(100000 + Math.random() * 900000)
        })
            const data = cldRemittance.save()
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

const get_cld_remittance = async (req,res)=>{
    try {
       const data =  await CldRemittance.find({ }).sort( { _id : -1 } ).skip(req.body.last_id).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await CldRemittance.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_cld_remittance = async (req,res)=>{
    try {
       const data =  await CldRemittance.find({$or:[{remittanceCreater: {$regex : new RegExp(req?.body?.search),$options:'i'}},{status: {$regex : new RegExp(req?.body?.search),$options:'i'}}
       ,{remittanceDate: {$regex : new RegExp(req?.body?.search),$options:'i'}},{quantity: {$regex : new RegExp(req?.body?.search),$options:'i'}},{recipient: {$regex : new RegExp(req?.body?.search),$options:'i'}}]}).lean()
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
const update_cld_remittance = async (req,res) => {
    try {
        const data = await CldRemittance.findOneAndUpdate({
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

const delete_dispatch = async(req,res) => {
    const deleteData = await CldRemittance.findByIdAndDelete({ _id: req.body.remId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_cld_remittance,
    get_cld_remittance,
    search_cld_remittance,
    update_cld_remittance,
    delete_dispatch
}