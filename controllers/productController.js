const Product = require("../models/productModel");
const Customer = require("../models/customerModel");

const create_product = async(req,res)=>{
    try {
       const product =  new Product({
            customerId:req.body.customerId,
            productName:req.body.productName,  
            price:req.body.price,  
            costData:req.body.costData,  
            customerDetail:''  
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
       const data =  await Product.find({ }).sort( { _id : -1 } )
        for(let i=0;i<data.length;i++){
            let customer = await Customer.findOne({_id:data[i].customerId})
             data[i].customerDetail = await customer.firstName+' '+customer.lastName
        }
        if(data){
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_product = async (req,res) => {
    try {
        const productData = await Product.findOneAndUpdate({
            _id:req.body.productId
        },{
            customerId:req.body.customerId,
            productName:req.body.productName,  
            price:req.body.price,  
            costData:req.body.costData, 
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
    delete_product
}