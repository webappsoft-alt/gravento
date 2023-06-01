const Product = require("../models/productModel");
const Customer = require("../models/customerModel");
const PriceManagement = require("../models/priceManagementModel");

const create_price = async(req,res)=>{
    try {
        const customerValue = await Customer.findOne({_id:req?.body?.customerId})
        // const productValue = await Product.findOne({_id:req?.body?.productId})
       const price =  new PriceManagement({
            customerId:req.body.customerId,
            // productId:req.body.productId,  
            price:req.body.price,  
            reason:req.body.reason,
            customerDetail:customerValue?.firstName+' '+customerValue?.lastName,  
            // productDetail:productValue?.productName  
        })
            const price_data = price.save()
            try {
                if(price_data){
                  res.status(200).send({result:true,message:'Added Successfully'})
                }   
            } catch (error) {
                res.status(200).send(error.message)
            }
            } catch (error) {
            res.status(400).send(error.message);
    }
}

const get_price = async (req,res)=>{
    try {
       const data =  await PriceManagement.find({ }).sort( { _id : -1 } ).skip(req.body.last_id).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await PriceManagement.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_price = async (req,res)=>{
    try {
       const data =  await PriceManagement.find({$or:[{price: {$regex : new RegExp(req?.body?.search),$options:'i'}},{reason: {$regex : new RegExp(req?.body?.search),$options:'i'}}
        ,{customerDetail: {$regex : new RegExp(req?.body?.search),$options:'i'}}]}).lean()
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
const update_price = async (req,res) => {
    const customerValue = await Customer.findOne({_id:req?.body?.customerId})
    // const productValue = await Product.findOne({_id:req?.body?.productId})
    try {
        const productData = await PriceManagement.findOneAndUpdate({
            _id:req.body.priceManagementId
        },{
            customerId:req.body.customerId,
            // productId:req.body.productId,  
            price:req.body.price,  
            reason:req.body.reason,
            customerDetail:customerValue?.firstName+' '+customerValue?.lastName,  
            // productDetail:productValue?.productName  
        })
        if (productData) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_price = async(req,res) => {
    const deleteData = await PriceManagement.findByIdAndDelete({ _id: req.body.priceManagementId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_price,
    get_price,
    update_price,
    delete_price,
    search_price
}