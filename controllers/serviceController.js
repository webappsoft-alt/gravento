const Vehicle = require("../models/vehiclesModel");
const Service = require("../models/serviceModel");


const create_service = async(req,res)=>{
    try {
       const vehicle =  new Service({
        vehicleId:req.body.vehicleId,
        serviceName:req.body.serviceName,  
        serviceDate:req.body.serviceDate,  
        value:req.body.value,
        vehicleDetail:""  
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
       const data =  await Service.find({ }).sort( { _id : -1 } )
       for(let i=0;i<data.length;i++){
        let vehicle = await Vehicle.findOne({_id:data[i].vehicleId})
         data[i].vehicleDetail = await vehicle?.vehicleNumber
    }
        if(data){
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_service = async (req,res) => {
    try {
        const data = await Service.findOneAndUpdate({
            _id:req.body.serviceId
        },{
            vehicleId:req.body.vehicleId,
            serviceName:req.body.serviceName,  
            serviceDate:req.body.serviceDate,  
            value:req.body.value,
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
    delete_service
}