const cldProduction = require("../models/cldProductionModel");


const create_cld_prod = async(req,res)=>{
    try {
       const production =  new cldProduction({
        productRequest:req.body.productRequest,
        machineUsageTime:req.body.machineUsageTime,  
        startTime:req.body.startTime,  
        endTime:req.body.endTime
        })
            const data = production.save()
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

const get_cld_prod = async (req,res)=>{
    try {
       const data =  await cldProduction.find({ }).sort( { _id : -1 } ).skip(req.body.last_id).limit(10).lean()
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
const search_cld_prod = async (req,res)=>{
    try {
       const data =  await cldProduction.find({$or:[{productRequest: {$regex : new RegExp(req?.body?.search)}},{endTime: {$regex : new RegExp(req?.body?.search)}}
        ,{machineUsageTime: {$regex : new RegExp(req?.body?.search)}},{startTime: {$regex : new RegExp(req?.body?.search)}}]}).lean()
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
const update_cld_prod = async (req,res) => {
    try {
        const data = await cldProduction.findOneAndUpdate({
            _id:req.body.cldProdId
        },{
            productRequest:req.body.productRequest,
            machineUsageTime:req.body.machineUsageTime,  
            startTime:req.body.startTime,  
            endTime:req.body.endTime
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_cld_prod = async(req,res) => {
    const deleteData = await cldProduction.findByIdAndDelete({ _id: req.body.cldProdId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_cld_prod,
    get_cld_prod,
    search_cld_prod,
    delete_cld_prod,
    update_cld_prod
}