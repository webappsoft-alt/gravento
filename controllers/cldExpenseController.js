const cldExpense = require("../models/cldExpenseModel");
const ExpenseCategory = require("../models/expenseCategory");
const ExpenseSubCategory = require("../models/expenseSubCategory");


const create_cld_expense = async(req,res)=>{
    try {
        const catValue = await ExpenseCategory.findOne({_id:req?.body?.catId})
        const subCatValue = await ExpenseSubCategory.findOne({_id:req?.body?.subCatId})
       const cldExpense_ =  new cldExpense({
        catId:req.body.catId,
        subCatId:req.body.subCatId,
        expensesDate:req.body.expensesDate,
        invoice:req.body.invoice,  
        reason:req.body.reason,  
        total:req.body.total,
        cat_name:catValue.catName,
        subCatName:subCatValue.subCatName
        })
            const data = cldExpense_.save()
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

const get_cld_expense = async (req,res)=>{
    try {
       const data =  await cldExpense.find({ }).sort( { _id : -1 } ).skip(req.body.last_id).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await cldExpense.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_cld_expense = async (req,res)=>{
    try {
       const data =  await cldExpense.find({$or:[{expensesDate: {$regex : new RegExp(req?.body?.search),$options:'i'}},{invoice: {$regex : new RegExp(req?.body?.search),$options:'i'}},{reason: {$regex : new RegExp(req?.body?.search),$options:'i'}},
       {total: {$regex : new RegExp(req?.body?.search),$options:'i'}},{cat_name: {$regex : new RegExp(req?.body?.search),$options:'i'}},{subCatName: {$regex : new RegExp(req?.body?.search),$options:'i'}}]}).lean()
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
const update_cld_expense = async (req,res) => {
    try {
        const catValue = await ExpenseCategory.findOne({_id:req?.body?.catId})
        const subCatValue = await ExpenseSubCategory.findOne({_id:req?.body?.subCatId})
        const data = await cldExpense.findOneAndUpdate({
            _id:req.body.expenseId
        },{
            expensesDate:req.body.expensesDate,
            invoice:req.body.invoice,  
            reason:req.body.reason,  
            total:req.body.total,
            catId:req.body.catId,
            subCatId:req.body.subCatId,
            cat_name:catValue.catName,
            subCatName:subCatValue.subCatName
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_cld_expense = async(req,res) => {
    const deleteData = await cldExpense.findByIdAndDelete({ _id: req.body.expenseId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_cld_expense,
    get_cld_expense,
    search_cld_expense,
    update_cld_expense,
    delete_cld_expense
}