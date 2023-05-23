const Inventory = require("../models/inventoryModel");
const Product = require("../models/productModel");
const Expense = require("../models/expensesModel");


const create_inventory = async(req,res)=>{
    try {
       const inventory =  new Inventory({
        productId:req.body.productId,
        expenseId:req.body.expenseId,  
        quantity:req.body.quantity,  
        value:req.body.value,  
        productDetail:"",
        expenseDetail:""
        })
            const data = inventory.save()
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

const get_inventory = async (req,res)=>{
    try {
       const data =  await Inventory.find({ }).sort( { _id : -1 } )
       for(let i=0;i < data.length; i++){
           let productt =  await Product.findOne({_id:data[i].productId})
           data[i].productDetail = productt?.productName

           let expense =  await Expense.findOne({_id:data[i].expenseId})
           data[i].expenseDetail = expense?.invoice
       }
        if(data){
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_inventory = async (req,res) => {
    try {
        const data = await Inventory.findOneAndUpdate({
            _id:req.body.inventoryId
        },{
            productId:req.body.productId,
            expenseId:req.body.expenseId,  
            quantity:req.body.quantity,  
            value:req.body.value, 
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_inventory = async(req,res) => {
    const deleteData = await Inventory.findByIdAndDelete({ _id: req.body.inventoryId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_inventory,
    get_inventory,
    update_inventory,
    delete_inventory
}