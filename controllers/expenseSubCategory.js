const ExpenseCategory = require("../models/expenseCategory");
const ExpenseSubCategory = require("../models/expenseSubCategory");

const create_expense_subcat = async(req,res)=>{
    try {
        const catValue = await ExpenseCategory.findOne({_id:req?.body?.catId})
       const expenseSubCategory =  new ExpenseSubCategory({
        subCatName:req.body.subCatName,
        catId:req.body.catId,
        catName:catValue.catName
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
       const data =  await ExpenseSubCategory.find({ }).sort( { _id : -1 } ).limit(10).lean()
        if(data){
            if(req?.body?.last_id == 0){
                const data1 = await ExpenseSubCategory.find({}).count()
                res.status(200).json({data:data,count:data1})
            }else{
                res.status(200).json({data:data,count:''})
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const search_expense_subcat = async (req,res)=>{
    try {
       const data =  await ExpenseSubCategory.find({subCatName: {$regex : new RegExp(req?.body?.search)}},{catName: {$regex : new RegExp(req?.body?.search)}}).lean()
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
const update_expense_subcat = async (req,res) => {
    try {
        const catValue = await ExpenseCategory.findOne({_id:req?.body?.catId})
        const data = await ExpenseSubCategory.findOneAndUpdate({
            _id:req.body.subCatId
        },{
            subCatName:req.body.subCatName,
            catId:req.body.catId,
            catName:catValue.catName
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
    delete_expense_subcat,
    search_expense_subcat
}