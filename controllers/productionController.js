const Production = require("../models/productionModel");
const Product = require("../models/productModel");


const create_prod_table = async(req,res)=>{
    try {
       const production =  new Production({
        startTime:req.body.startTime,
        endTime:req.body.endTime,  
        productId:req.body.productId,  
        quantity:req.body.quantity,  
        productionDate:req.body.productionDate,
        productionUsageTime:req.body.productionUsageTime,
        machineUsageTime:req.body.machineUsageTime,
        productDetail:""
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

const get_prod_table = async (req,res)=>{
    try {
       const data =  await Production.find({ }).sort( { _id : -1 } )
       for(let i=0;i<data.length;i++){
           let productt =  await Product.findOne({_id:data[i].productId})
           data[i].productDetail = productt?.productName

       }
        if(data){
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_prod_Table = async (req,res) => {
    try {
        const data = await Production.findOneAndUpdate({
            _id:req.body.prodId
        },{
            startTime:req.body.startTime,
            endTime:req.body.endTime,  
            productId:req.body.productId,  
            quantity:req.body.quantity,  
            productionDate:req.body.productionDate,
            productionUsageTime:req.body.productionUsageTime,
            machineUsageTime:req.body.machineUsageTime
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_prod_table = async(req,res) => {
    const deleteData = await Production.findByIdAndDelete({ _id: req.body.prodId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_prod_table,
    get_prod_table,
    update_prod_Table,
    delete_prod_table
}