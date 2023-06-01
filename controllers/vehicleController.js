const Vehicle = require("../models/vehiclesModel");
const create_vehicle = async(req,res)=>{
    try {
       const vehicle =  new Vehicle({
        vehicleNumber:req.body.vehicleNumber,
        vehicleModel:req.body.vehicleModel,  
        vehicleType:req.body.vehicleType,  
        technicalData:req.body.technicalData,  
        })
            const data = vehicle.save()
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

const get_vehicle = async (req,res)=>{
    try {
       const data =  await Vehicle.find({ }).sort( { _id : -1 } ).limit(10).skip(req.body.last_id).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await Vehicle.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_vehicle = async (req,res)=>{
    try {
       const data =  await Vehicle.find({$or:[{vehicleNumber: {$regex : new RegExp(req?.body?.search),$options:'i'}},{vehicleModel: {$regex : new RegExp(req?.body?.search),$options:'i'}}
        ,{vehicleType: {$regex : new RegExp(req?.body?.search),$options:'i'}},{technicalData: {$regex : new RegExp(req?.body?.search),$options:'i'}}]}).lean()
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
const update_vehicle = async (req,res) => {
    try {
        const data = await Vehicle.findOneAndUpdate({
            _id:req.body.vehicleId
        },{
            vehicleNumber:req.body.vehicleNumber,
            vehicleModel:req.body.vehicleModel,  
            vehicleType:req.body.vehicleType,  
            technicalData:req.body.technicalData, 
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_vehicle = async(req,res) => {
    const deleteData = await Vehicle.findByIdAndDelete({ _id: req.body.vehicleId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_vehicle,
    get_vehicle,
    update_vehicle,
    delete_vehicle,
    search_vehicle
}