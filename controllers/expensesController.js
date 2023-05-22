const Expense = require("../models/expensesModel");
const ExpenseCategory = require("../models/expenseCategory");
const ExpenseSubCategory = require("../models/expenseSubCategory");
const create_expenses = async(req,res)=>{
    try {
       const expense =  new Expense({
        catId:req.body.catId,
        subCatId:req.body.subCatId,
        expensesDate:req.body.expensesDate,
        invoice:req.body.invoice,  
        reason:req.body.reason,  
        total:req.body.total,
        cat_name:'',
        subCatName:''
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
       const data =  await Expense.find({ }).sort( { _id : -1 } )
       for(let i=0;i<data.length;i++){
        let cat = await ExpenseCategory.findOne({_id:data[i].catId})
         data[i].cat_name = await cat?.catName
         let subcat = await ExpenseSubCategory.findOne({_id:data[i].subCatId})
         data[i].subCatName = await subcat?.subCatName

    }
        if(data){
            res.status(200).json(data)
    
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_expenses = async (req,res) => {
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
    delete_expenses
}