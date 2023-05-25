const Customer = require("../models/customerModel");
const bcryptJs = require("bcryptjs")

// const securePassword = async(password)=>{
// try {
//    const passwordHash =  await bcryptJs.hash(password,10)
//    return passwordHash;
// } catch (error) {
//     res.status(400).send(error.message); 
// }
// }

const create_customer = async(req,res)=>{
    try {
        // const sPassword = await securePassword(req.body.password)
       const customer =  new Customer({
            firstName:req.body.firstName,
            lastName:req.body.lastName,  
            email:req.body.email,  
            phone:req.body.phone,  
            address:req.body.address,  
            billingData:req.body.billingData,
            tin:req.body.tin
        })

        const customerData = await Customer.findOne({email:req.body.email})
        if(customerData){
            res.status(200).send({result:false,message:'Email already exist, Please use new one or login from your existing account'})
        }else{
            const user_data = customer.save()
            try {
                if(user_data){
                  res.status(200).send({result:true,message:'Added Successfully'})
                }   
            } catch (error) {
                res.status(200).send(error.message)
            }
           
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const get_customer = async (req,res)=>{
    try {
       const data =  await Customer.find({}).sort({ _id : -1 }).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await Customer.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const search_customer = async (req,res)=>{
    try {
       const data =  await Customer.find({$or:[{firstName: {$regex : new RegExp(req?.body?.search)}},{lastName: {$regex : new RegExp(req?.body?.search)}}]}).lean()
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

const update_customer = async (req,res) => {
    try {
        const customerData = await Customer.findOneAndUpdate({
            _id:req.body.customerId
        },{
            firstName:req.body.firstName,
            lastName:req.body.lastName,  
            email:req.body.email,  
            phone:req.body.phone,  
            address:req.body.address,  
            billingData:req.body.billingData,
            tin:req.body.tin
        })
        if (customerData) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_customer = async(req,res) => {
    const deleteData = await Customer.findByIdAndDelete({ _id: req.body.customerId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = {
    create_customer,
    get_customer,
    update_customer,
    delete_customer,
    search_customer
}