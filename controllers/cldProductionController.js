const cldProduction = require("../models/cldProductionModel");
const Product = require("../models/productModel");


const create_cld_prod = async(req,res)=>{
    try {
        const productValue = await Product.findOne({_id:req?.body?.productId})
       const production =  new cldProduction({
        productRequest:req.body.productRequest,
        startTime:req.body.startTime,
        endTime:req.body.endTime,  
        productId:req.body.productId,  
        quantity:req.body.quantity,  
        productionDate:req.body.productionDate,
        productionUsageTime:req.body.productionUsageTime,
        machineUsageTime:req.body.machineUsageTime,
        productDetail:productValue?.productName
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
        const data =  await cldProduction.find({$or:[{productRequest: {$regex : new RegExp(req?.body?.search),$options:'i'}},{startTime: {$regex : new RegExp(req?.body?.search),$options:'i'}},{endTime: {$regex : new RegExp(req?.body?.search),$options:'i'}}
         ,{productDetail: {$regex : new RegExp(req?.body?.search),$options:'i'}},{quantity: {$regex : new RegExp(req?.body?.search),$options:'i'}},{productionDate: {$regex : new RegExp(req?.body?.search),$options:'i'}}
         ,{productionUsageTime: {$regex : new RegExp(req?.body?.search),$options:'i'}},{machineUsageTime: {$regex : new RegExp(req?.body?.search),$options:'i'}}]}).lean()
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
        const productValue = await Product.findOne({_id:req?.body?.productId})
        const data = await cldProduction.findOneAndUpdate({
            _id:req.body.cldProdId
        },{
            productRequest:req.body.productRequest,
            startTime:req.body.startTime,
            endTime:req.body.endTime,  
            productId:req.body.productId,  
            quantity:req.body.quantity,  
            productionDate:req.body.productionDate,
            productionUsageTime:req.body.productionUsageTime,
            machineUsageTime:req.body.machineUsageTime,
            productDetail:productValue?.productName
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