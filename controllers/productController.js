const Product = require("../models/productModel");
const Customer = require("../models/customerModel");

const create_product = async(req,res)=>{
    try {
        const customerValue = await Customer.findOne({_id:req?.body?.customerId})
       const product =  new Product({
            customerId:req.body.customerId,
            productName:req.body.productName,  
            price:req.body.price,  
            costData:req.body.costData,  
            customerDetail:customerValue?.firstName+' '+customerValue?.lastName
        })
            const product_data = product.save()
            try {
                if(product_data){
                  res.status(200).send({result:true,message:'Added Successfully'})
                }   
            } catch (error) {
                res.status(200).send(error.message)
            }
            } catch (error) {
            res.status(400).send(error.message);
    }
}

const get_product = async (req,res)=>{
    try {
       const data =  await Product.find({ }).sort({ _id : -1 }).limit(10)
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await Product.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const search_product = async (req,res)=>{
    try {
       const data =  await Product.find({$or:[{productName: {$regex : new RegExp(req?.body?.search)}},{price: {$regex : new RegExp(req?.body?.search)}}
        ,{costData: {$regex : new RegExp(req?.body?.search)}},{customerDetail: {$regex : new RegExp(req?.body?.search)}}]}).lean()
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

const update_product = async (req,res) => {
    try {
        const customerValue = await Customer.findOne({_id:req?.body?.customerId})
        const productData = await Product.findOneAndUpdate({
            _id:req.body.productId
        },{
            customerId:req.body.customerId,
            productName:req.body.productName,  
            price:req.body.price,  
            costData:req.body.costData, 
            customerDetail:customerValue?.firstName+' '+customerValue?.lastName
        })
        if (productData) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_product = async(req,res) => {
    const deleteData = await Product.findByIdAndDelete({ _id: req.body.productId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_product,
    get_product,
    update_product,
    delete_product,
    search_product
}