const Expense = require("../models/expensesModel");
const ExpenseCategory = require("../models/expenseCategory");
const ExpenseSubCategory = require("../models/expenseSubCategory");
const create_expenses = async(req,res)=>{
    try {
        const catValue = await ExpenseCategory.findOne({_id:req?.body?.catId})
        const subCatValue = await ExpenseSubCategory.findOne({_id:req?.body?.subCatId})
       const expense =  new Expense({
        catId:req.body.catId,
        subCatId:req.body.subCatId,
        expensesDate:req.body.expensesDate,
        invoice:req.body.invoice,  
        reason:req.body.reason,  
        total:req.body.total,
        cat_name:catValue.catName,
        subCatName:subCatValue.subCatName
        })
            const data = expense.save()
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

const get_expenses = async (req,res)=>{
    try {
       const data =  await Expense.find({ }).sort( { _id : -1 } ).skip(req.body.last_id).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await Expense.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
    
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const search_expense = async (req,res)=>{
    try {
       const data =  await Expense.find({$or:[{expensesDate: {$regex : new RegExp(req?.body?.search),$options:'i'}},{invoice: {$regex : new RegExp(req?.body?.search),$options:'i'}},{reason: {$regex : new RegExp(req?.body?.search),$options:'i'}},
        {total: {$regex : new RegExp(req?.body?.search),$options:'i'}},{cat_name: {$regex : new RegExp(req?.body?.search),$options:'i'}},{subCatName: {$regex : new RegExp(req?.body?.search),$options:'i'}}]}).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await Expense.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_expenses = async (req,res) => {
    const catValue = await ExpenseCategory.findOne({_id:req?.body?.catId})
    const subCatValue = await ExpenseSubCategory.findOne({_id:req?.body?.subCatId})
    try {
        const data = await Expense.findOneAndUpdate({
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

const delete_expenses = async(req,res) => {
    const deleteData = await Expense.findByIdAndDelete({ _id: req.body.expenseId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_expenses,
    get_expenses,
    update_expenses,
    delete_expenses,
    search_expense
}