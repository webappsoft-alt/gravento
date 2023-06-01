const Machinary = require("../models/machinaryModel");

const create_machinary = async(req,res)=>{
    try {
       const machinary =  new Machinary({
        machineNumber:req.body.machineNumber,
        machineType:req.body.machineType,  
        technicalData:req.body.technicalData,  
        })
            const data = machinary.save()
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

const get_machinary = async (req,res)=>{
    try {
       const data =  await Machinary.find({ }).sort( { _id : -1 } ).skip(req.body.last_id).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await Machinary.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const search_machinary = async (req,res)=>{
    try {
       const data =  await Machinary.find({$or:[{machineNumber: {$regex : new RegExp(req?.body?.search),$options:'i'}},{machineType: {$regex : new RegExp(req?.body?.search),$options:'i'}}
        ,{technicalData: {$regex : new RegExp(req?.body?.search),$options:'i'}}]}).lean()
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

const update_machinary = async (req,res) => {
    try {
        const data = await Machinary.findOneAndUpdate({
            _id:req.body.machinaryId
        },{
            machineNumber:req.body.machineNumber,
            machineType:req.body.machineType,  
            technicalData:req.body.technicalData,
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_machinary = async(req,res) => {
    const deleteData = await Machinary.findByIdAndDelete({ _id: req.body.machinaryId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_machinary,
    get_machinary,
    update_machinary,
    delete_machinary,
    search_machinary
}