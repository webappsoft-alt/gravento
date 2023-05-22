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
       const data =  await RemittanceTable.find({ }).sort( { _id : -1 } )
        if(data){
            res.status(200).json(data)
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
    delete_rem_table
}