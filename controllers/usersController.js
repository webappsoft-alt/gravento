const Users = require("../models/usersModel");

const bcryptJs = require("bcryptjs")

const securePassword = async(password)=>{
    try {
       const passwordHash =  await bcryptJs.hash(password,10)
       return passwordHash;
    } catch (error) {
        console.log(error.message); 
    }
}

const login = async (req,res)=>{
    try {
        const sPassword = await securePassword(req?.body?.password)
        if(sPassword){
            const email = req?.body?.email;
           const password = sPassword;
         const data = await Users.findOne({email:email},{password:password}).then(async res_=>{
            if(res_){
                const user = await Users.findOne({_id:res_._id}, { projection: { password: 0 }})
                res.status(200).send({result:true,message:'Added Successfully',data:user})
            }else{
                res.status(200).send({result:false,message:'Error, Try again'})           
            }
         })
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const create_users = async(req,res)=>{
    try {
        const sPassword = await securePassword(req?.body?.password)
        if(sPassword){
            const users =  new Users({
            firstName:req.body.firstName,
            lastName:req.body.lastName,  
            email:req.body.email,  
            password:req.body.password,  
            phone:req.body.phone,  
            status:req.body.status,  
            })
            const data = users.save()
            try {
                if(data){
                  res.status(200).send({result:true,message:'Added Successfully'})
                }   
            } catch (error) {
                res.status(200).send({result:false,message:'Error, Try again'})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const get_users = async (req,res)=>{
    try {
       const data =  await Users.find({ }).sort( { _id : -1 } ).limit(10).skip(req.body.last_id).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await users.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_users = async (req,res)=>{
    try {
       const data =  await Users.find({$or:[{firstName: {$regex : new RegExp(req?.body?.search),$options:'i'}},{lastName: {$regex : new RegExp(req?.body?.search),$options:'i'}}
        ,{email: {$regex : new RegExp(req?.body?.search),$options:'i'}},{phone: {$regex : new RegExp(req?.body?.search),$options:'i'}}]}).lean()
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
// const update_vehicle = async (req,res) => {
//     try {
//         const data = await Vehicle.findOneAndUpdate({
//             _id:req.body.vehicleId
//         },{
//             firstName:req.body.firstName,
//             lastName:req.body.lastName,  
//             email:req.body.email,  
//             password:req.body.password, 
//         })
//         if (data) {
//             res.status(200).send({result:true,message:'Update Successfully'})
//         }
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }

const delete_users = async(req,res) => {
    const deleteData = await Users.findByIdAndDelete({ _id: req.body.vehicleId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    login,
    create_users,
    get_users,
    // update_vehicle,
    delete_users,
    search_users
}