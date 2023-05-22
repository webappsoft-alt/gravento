const ExpenseCategory = require("../models/expenseCategory");
const ExpenseSubCategory = require("../models/expenseSubCategory");

const create_expense_subcat = async(req,res)=>{
    try {
       const expenseSubCategory =  new ExpenseSubCategory({
        subCatName:req.body.subCatName,
        catId:req.body.catId  
        })
            const data = expenseSubCategory.save()
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

const get_expense_subcat = async (req,res)=>{
    try {
       const data =  await ExpenseSubCategory.find({ }).sort( { _id : -1 } )
       for(let i=0;i<data.length;i++){
        let cat = await ExpenseCategory.findOne({_id:data[i].catId})
         data[i].catName = await cat?.catName
    }
        if(data){
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_expense_subcat = async (req,res) => {
    try {
        const data = await ExpenseSubCategory.findOneAndUpdate({
            _id:req.body.subCatId
        },{
            subCatName:req.body.subCatName,
            catId:req.body.catId
        })
        if (data) {
            res.status(200).send({result:true,message:'Update Successfully'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_expense_subcat = async(req,res) => {
    const deleteData = await ExpenseSubCategory.findByIdAndDelete({ _id: req.body.subCatId });
    try {
      if(deleteData){
        res.status(200).send({result:true,message:'Deleted Successfully'})
      }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_expense_subcat,
    get_expense_subcat,
    update_expense_subcat,
    delete_expense_subcat
}