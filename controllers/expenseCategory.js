const ExpenseCategory = require("../models/expenseCategory");

const create_expense_cat = async(req,res)=>{
    try {
       const expenseCategory =  new ExpenseCategory({
          catName:req.body.catName,  
        })
            const data = expenseCategory.save()
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

const get_expense_cat = async (req,res)=>{
    try {
       const data =  await ExpenseCategory.find({ }).sort( { _id : -1 } )
        if(data){
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_expense_cat = async (req,res) => {
    try {
        const data = await ExpenseCategory.findOneAndUpdate({
            _id:req.body.catId
        },{
            catName:req.body.catName,
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_expense_cat = async(req,res) => {
    const deleteData = await ExpenseCategory.findByIdAndDelete({ _id: req.body.catId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_expense_cat,
    get_expense_cat,
    update_expense_cat,
    delete_expense_cat
}