const FuelUtilization = require("../models/fuelUtilizationModel");

const create_fuel = async(req,res)=>{
    try {
       const fuel =  new FuelUtilization({
        expenseId:req.body.expenseId,
        vehicleId:req.body.vehicleId,  
        quantity:req.body.quantity,  
        utilization:req.body.utilization,
        numberTrips:req.body.numberTrips,
        milleage:req.body.milleage,
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
       const data =  await FuelUtilization.find({ }).sort( { _id : -1 } )
        if(data){
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_fuel = async (req,res) => {
    try {
        const data = await FuelUtilization.findOneAndUpdate({
            _id:req.body.utilId
        },{
            expenseId:req.body.expenseId,
            vehicleId:req.body.vehicleId,  
            quantity:req.body.quantity,  
            utilization:req.body.utilization,
            numberTrips:req.body.numberTrips,
            milleage:req.body.milleage,
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
    delete_fuel
}