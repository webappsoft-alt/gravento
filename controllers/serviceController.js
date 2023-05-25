const Vehicle = require("../models/vehiclesModel");
const Service = require("../models/serviceModel");


const create_service = async(req,res)=>{
    try {
        const vehicleValue = await Vehicle.findOne({_id:req?.body?.vehicleId})
       const vehicle =  new Service({
        vehicleId:req.body.vehicleId,
        serviceName:req.body.serviceName,  
        serviceDate:req.body.serviceDate,  
        value:req.body.value,
        vehicleDetail:vehicleValue?.vehicleNumber
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

const get_service = async (req,res)=>{
    try {
       const data =  await Service.find({ }).sort( { _id : -1 } ).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await Service.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_service = async (req,res)=>{
    try {
       const data =  await Service.find({$or:[{vehicleDetail: {$regex : new RegExp(req?.body?.search)}},{value: {$regex : new RegExp(req?.body?.search)}}
        ,{serviceDate: {$regex : new RegExp(req?.body?.search)}},{serviceName: {$regex : new RegExp(req?.body?.search)}}]}).lean()
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

const update_service = async (req,res) => {
    try {
        const vehicleValue = await Vehicle.findOne({_id:req?.body?.vehicleId})
        const data = await Service.findOneAndUpdate({
            _id:req.body.serviceId
        },{
            vehicleId:req.body.vehicleId,
            serviceName:req.body.serviceName,  
            serviceDate:req.body.serviceDate,  
            value:req.body.value,
            vehicleDetail:vehicleValue?.vehicleNumber
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_service = async(req,res) => {
    const deleteData = await Service.findByIdAndDelete({ _id: req.body.serviceId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_service,
    get_service,
    update_service,
    delete_service,
    search_service
}