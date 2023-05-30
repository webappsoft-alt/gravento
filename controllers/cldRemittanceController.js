const CldRemittance = require("../models/cldRemittanceModel");

const create_cld_remittance = async(req,res)=>{
    try {
       const cldRemittance =  new CldRemittance({
        remittanceType:req.body.remittanceType,
        amount:req.body.amount,  
        voucherNo:req.body.voucherNo,  
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
                const data1 = await cldDispatch.find({}).count()
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
       const data =  await CldRemittance.find({$or:[{remittanceType: {$regex : new RegExp(req?.body?.search)}},{amount: {$regex : new RegExp(req?.body?.search)}}
        ,{voucherNo: {$regex : new RegExp(req?.body?.search)}}]}).lean()
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
        const data = await cldDispatch.findOneAndUpdate({
            _id:req.body.remittanceId
        },{
            remittanceType:req.body.remittanceType,
            amount:req.body.amount,  
            voucherNo:req.body.voucherNo,  
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_dispatch = async(req,res) => {
    const deleteData = await cldDispatch.findByIdAndDelete({ _id: req.body.remittanceId });
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