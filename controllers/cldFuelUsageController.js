const cldFuelUsage = require("../models/cldFuelUsageModel");


const create_fuel_usage = async(req,res)=>{
    try {
       const fuelUsage =  new cldFuelUsage({
        vehicleOrMachine:req.body.vehicleOrMachine,
        gallonsDispatched:req.body.gallonsDispatched,  
        percentageFilled:req.body.percentageFilled,  
        numberOfTrips:req.body.numberOfTrips,
        transportedEachTrip:req.body.transportedEachTrip
        })
            const data = fuelUsage.save()
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

const get_fuel_usage = async (req,res)=>{
    try {
       const data =  await cldFuelUsage.find({ }).sort( { _id : -1 } ).skip(req.body.last_id).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await cldProduction.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_fuel_usage = async (req,res)=>{
    try {
       const data =  await cldFuelUsage.find({$or:[{vehicleOrMachine: {$regex : new RegExp(req?.body?.search)}},{gallonsDispatched: {$regex : new RegExp(req?.body?.search)}}
        ,{percentageFilled: {$regex : new RegExp(req?.body?.search)}},{numberOfTrips: {$regex : new RegExp(req?.body?.search)}},{transportedEachTrip: {$regex : new RegExp(req?.body?.search)}}]}).lean()
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
const update_fuel_usage = async (req,res) => {
    try {
        const data = await cldFuelUsage.findOneAndUpdate({
            _id:req.body.fuelUsageId
        },{
            vehicleOrMachine:req.body.vehicleOrMachine,
            gallonsDispatched:req.body.gallonsDispatched,  
            percentageFilled:req.body.percentageFilled,  
            numberOfTrips:req.body.numberOfTrips,
            transportedEachTrip:req.body.transportedEachTrip
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_fuel_usage = async(req,res) => {
    const deleteData = await cldFuelUsage.findByIdAndDelete({ _id: req.body.fuelUsageId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_fuel_usage,
    get_fuel_usage,
    search_fuel_usage,
    delete_fuel_usage,
    update_fuel_usage
}