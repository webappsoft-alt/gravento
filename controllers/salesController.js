const Sales = require("../models/salesModel");
const Customer = require("../models/customerModel");
const Product = require("../models/productModel");


const create_sales = async(req,res)=>{
    try {
        const customerValue = await Customer.findOne({_id:req?.body?.customerId})
        const productValue = await Product.findOne({_id:req?.body?.productId})
       const sales =  new Sales({
        customerId:req.body.customerId,
        productId:req.body.productId,  
        quantity:req.body.quantity,  
        paymentMethod:req.body.paymentMethod,
        quantityPrice:req?.body?.quantityPrice,
        remittance:req.body.remittance,
        customerDetail:customerValue?.firstName+' '+customerValue?.lastName,
        productDetail:productValue?.productName
        })
            const data = sales.save()
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

const get_sales = async (req,res)=>{
    try {
       const data =  await Sales.find({ }).sort( { _id : -1 } ).skip(req.body.last_id).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await Sales.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_sales = async (req,res)=>{
    try {
       const data =  await Sales.find({$or:[{customerDetail: {$regex : new RegExp(req?.body?.search),$options:'i'}},{productDetail: {$regex : new RegExp(req?.body?.search),$options:'i'}}
        ,{remittance: {$regex : new RegExp(req?.body?.search),$options:'i'}},{paymentMethod: {$regex : new RegExp(req?.body?.search),$options:'i'}},{quantity: {$regex : new RegExp(req?.body?.search),$options:'i'}}
        ,{quantityPrice: {$regex : new RegExp(req?.body?.search),$options:'i'}}]}).lean()
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
const update_sales = async (req,res) => {
    try {
        const customerValue = await Customer.findOne({_id:req?.body?.customerId})
        const productValue = await Product.findOne({_id:req?.body?.productId})
        const data = await Sales.findOneAndUpdate({
            _id:req.body.salesId
        },{
            customerId:req.body.customerId,
            productId:req.body.productId,  
            quantity:req.body.quantity,  
            paymentMethod:req.body.paymentMethod,
            remittance:req.body.remittance,
            quantityPrice:req?.body?.quantityPrice,
            customerDetail:customerValue?.firstName+' '+customerValue?.lastName,
            productDetail:productValue?.productName
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_sales = async(req,res) => {
    const deleteData = await Sales.findByIdAndDelete({ _id: req.body.salesId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_sales,
    get_sales,
    search_sales,
    update_sales,
    delete_sales
}