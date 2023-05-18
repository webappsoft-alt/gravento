const Product = require("../models/productModel");
const Customer = require("../models/customerModel");
const PriceManagement = require("../models/priceManagementModel");

const create_price = async(req,res)=>{
    try {
       const price =  new PriceManagement({
            customerId:req.body.customerId,
            productId:req.body.productId,  
            price:req.body.price,  
            customerDetail:'',  
            productDetail:''  
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
       const data =  await PriceManagement.find()
        for(let i=0;i<data.length;i++){
            let customer = await Customer.findOne({_id:data[i].customerId})
            let productt = await Product.findOne({_id:data[i].productId})
             data[i].customerDetail = await customer
             data[i].productData = await productt
        }
        if(data){
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_price = async (req,res) => {
    try {
        const productData = await PriceManagement.findOneAndUpdate({
            _id:req.body.priceManagementId
        },{
            customerId:req.body.customerId,
            productId:req.body.productId,  
            price:req.body.price,  
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
    delete_price
}