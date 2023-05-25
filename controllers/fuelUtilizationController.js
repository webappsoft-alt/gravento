const FuelUtilization = require("../models/fuelUtilizationModel");
const Expense = require("../models/expensesModel");
const Vehicle = require("../models/vehiclesModel");

const create_fuel = async(req,res)=>{
    try {
        const expenseValue = await Expense.findOne({_id:req?.body?.expenseId})
        const vehicleValue = await Vehicle.findOne({_id:req?.body?.vehicleId})
       const fuel =  new FuelUtilization({
        expenseId:req.body.expenseId,
        vehicleId:req.body.vehicleId,  
        quantity:req.body.quantity,  
        utilization:req.body.utilization,
        numberTrips:req.body.numberTrips,
        milleage:req.body.milleage,
        expense:expenseValue.invoice,
        vehicle:vehicleValue.vehicleNumber
        })
            const data = fuel.save()
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

const get_fuel = async (req,res)=>{
    try {
       const data =  await FuelUtilization.find({ }).sort( { _id : -1 } ).skip(req.body.last_id).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await FuelUtilization.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_fuel = async (req,res)=>{
    try {
       const data =  await FuelUtilization.find({$or:[{quantity: {$regex : new RegExp(req?.body?.search)}},{utilization: {$regex : new RegExp(req?.body?.search)}},
        {numberTrips: {$regex : new RegExp(req?.body?.search)}},{milleage: {$regex : new RegExp(req?.body?.search)}},{expense: {$regex : new RegExp(req?.body?.search)}}
        ,{vehicle: {$regex : new RegExp(req?.body?.search)}}]}).lean()
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
const update_fuel = async (req,res) => {
    try {
        const expenseValue = await Expense.findOne({_id:req?.body?.expenseId})
        const vehicleValue = await Vehicle.findOne({_id:req?.body?.vehicleId})
        const data = await FuelUtilization.findOneAndUpdate({
            _id:req.body.utilId
        },{
            expenseId:req.body.expenseId,
            vehicleId:req.body.vehicleId,  
            quantity:req.body.quantity,  
            utilization:req.body.utilization,
            numberTrips:req.body.numberTrips,
            milleage:req.body.milleage,
            expense:expenseValue.invoice,
            vehicle:vehicleValue.vehicleNumber
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_fuel = async(req,res) => {
    const deleteData = await FuelUtilization.findByIdAndDelete({ _id: req.body.utilId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_fuel,
    get_fuel,
    update_fuel,
    delete_fuel,
    search_fuel
}