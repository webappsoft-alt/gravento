const cldDispatch = require("../models/cldDispatchModel");
const Customer = require("../models/customerModel");
const Product = require("../models/productModel");


const create_dispatch = async(req,res)=>{
    try {
        const customerValue = await Customer.findOne({_id:req?.body?.customerId})
        const productValue = await Product.findOne({_id:req?.body?.productId})
       const cldDispatch =  new cldDispatch({
        customerId:req.body.customerId,
        productId:req.body.productId,  
        quantity:req.body.quantity,  
        paymentMethod:req.body.paymentMethod,
        remittance:req.body.remittance,
        customerDetail:customerValue?.firstName+' '+customerValue?.lastName,
        productDetail:productValue?.productName
        })
            const data = cldDispatch.save()
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

const get_dispatch = async (req,res)=>{
    try {
       const data =  await cldDispatch.find({ }).sort( { _id : -1 } ).skip(req.body.last_id).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await cldDispatch.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_dispatch = async (req,res)=>{
    try {
       const data =  await cldDispatch.find({$or:[{vehicleOrMachine: {$regex : new RegExp(req?.body?.search)}},{gallonsDispatched: {$regex : new RegExp(req?.body?.search)}}
        ,{percentageFilled: {$regex : new RegExp(req?.body?.search)}},{numberOfTrips: {$regex : new RegExp(req?.body?.search)}},{transportedEachTrip: {$regex : new RegExp(req?.body?.search)}}]}).lean()
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
const update_dispatch = async (req,res) => {
    try {
        const customerValue = await Customer.findOne({_id:req?.body?.customerId})
        const productValue = await Product.findOne({_id:req?.body?.productId})
        const data = await cldDispatch.findOneAndUpdate({
            _id:req.body.dispatchId
        },{
            customerId:req.body.customerId,
            productId:req.body.productId,  
            quantity:req.body.quantity,  
            paymentMethod:req.body.paymentMethod,
            remittance:req.body.remittance,
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

const delete_dispatch = async(req,res) => {
    const deleteData = await cldDispatch.findByIdAndDelete({ _id: req.body.dispatchId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_dispatch,
    get_dispatch,
    search_dispatch,
    update_dispatch,
    delete_dispatch
}