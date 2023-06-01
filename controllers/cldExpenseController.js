const cldExpense = require("../models/cldExpenseModel");
const Vehicle = require("../models/vehiclesModel");
const Machinary = require("../models/machinaryModel");


const create_cld_expense = async(req,res)=>{
    try {
        const vehicleValue = await Vehicle.findOne({_id:req?.body?.vehicleId})
        const machineValue = await Machinary.findOne({_id:req?.body?.machineId})
       const cldExpense_ =  new cldExpense({
        diesel:req.body.diesel,
        payroll:req.body.payroll,  
        vehicleId:req.body.vehicleId,  
        machineId:req.body.machineId,
        vehicleNumber:vehicleValue?.vehicleNumber,
        machineNumber:machineValue?.machineNumber,
        transportFreight:req.body?.transportFreight
        })
            const data = cldExpense_.save()
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

const get_cld_expense = async (req,res)=>{
    try {
       const data =  await cldExpense.find({ }).sort( { _id : -1 } ).skip(req.body.last_id).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await cldExpense.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_cld_expense = async (req,res)=>{
    try {
       const data =  await cldExpense.find({$or:[{diesel: {$regex : new RegExp(req?.body?.search)}},{payroll: {$regex : new RegExp(req?.body?.search)}}
        ,{vehicleNumber: {$regex : new RegExp(req?.body?.search)}},{machineNumber: {$regex : new RegExp(req?.body?.search)}},{transportFreight: {$regex : new RegExp(req?.body?.search)}}]}).lean()
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
const update_cld_expense = async (req,res) => {
    try {
        const vehicleValue = await Vehicle.findOne({_id:req?.body?.vehicleId})
        const machineValue = await Machinary.findOne({_id:req?.body?.machineId})
        const data = await cldExpense.findOneAndUpdate({
            _id:req.body.expenseId
        },{
            diesel:req.body.diesel,
            payroll:req.body.payroll,  
            vehicleId:req.body.vehicleId,  
            machineId:req.body.machineId,
            vehicleNumber:vehicleValue?.vehicleNumber,
            machineNumber:machineValue?.machineNumber,
            transportFreight:req.body?.transportFreight
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_cld_expense = async(req,res) => {
    const deleteData = await cldExpense.findByIdAndDelete({ _id: req.body.expenseId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_cld_expense,
    get_cld_expense,
    search_cld_expense,
    update_cld_expense,
    delete_cld_expense
}