const RemittanceVoucher = require("../models/remittanceVoucherModel");
const RemittanceTable = require("../models/remittaceTableModel");

const create_rem_table = async(req,res)=>{
    try {
       const remittanceTable =  new RemittanceTable({
          remittanceType:req.body.remittanceType,
           amount:req.body.amount,  
           remittanceTabledate:req.body.remittanceTabledate,  
           voucherNumber:req.body.voucherNumber,  
        })
            const data = remittanceTable.save()
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

const get_rem_table = async (req,res)=>{
    try {
       const data =  await RemittanceTable.find({ }).sort( { _id : -1 } ).skip(req.body.last_id).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await RemittanceTable.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_rem_Table = async (req,res)=>{
    try {
       const data =  await RemittanceTable.find({$or:[{remittanceType: {$regex : new RegExp(req?.body?.search),$options:'i'}},{amount: {$regex : new RegExp(req?.body?.search),$options:'i'}}
        ,{remittanceTabledate: {$regex : new RegExp(req?.body?.search),$options:'i'}},{voucherNumber: {$regex : new RegExp(req?.body?.search),$options:'i'}}]}).lean()
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

const update_rem_Table = async (req,res) => {
    try {
        const data = await RemittanceVoucher.findOneAndUpdate({
            _id:req.body.remTableId
        },{
            remittanceType:req.body.remittanceType,
            amount:req.body.amount,  
            remittanceTabledate:req.body.remittanceTabledate,  
            voucherNumber:req.body.voucherNumber, 
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_rem_table = async(req,res) => {
    const deleteData = await RemittanceTable.findByIdAndDelete({ _id: req.body.remTableId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_rem_table,
    get_rem_table,
    update_rem_Table,
    delete_rem_table,
    search_rem_Table
}