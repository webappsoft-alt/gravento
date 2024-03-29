const Inventory = require("../models/inventoryModel");
const Product = require("../models/productModel");
const Expense = require("../models/expensesModel");


const create_inventory = async (req, res) => {
    try {
        let productValue = ""
        const expenseValue = await Expense.findOne({ _id: req?.body?.expenseId })

        let currDate = new Date();
        let month = parseFloat(currDate.getMonth()) + 1;
        month = month < 10 ? '0' + month : month

        let day = parseFloat(currDate.getDate());
        day = day < 10 ? '0' + day : day
        if (req?.body?.productId) {
            productValue = await Product.findOne({ _id: req?.body?.productId })
        }
        const inventory = new Inventory({
            productId: req.body.productId,
            anotherItem: req.body.anotherItem,
            inventoryType: req.body.inventoryType,
            expenseId: req.body.expenseId,
            quantity: req.body.quantity,
            value: req.body.value,
            units: req.body.units,
            productDetail: productValue ? productValue?.productName : "",
            expenseDetail: expenseValue?.invoice,
            createdAt: currDate.getFullYear() + '/' + month + '/' + day
        })
        const data = inventory.save()
        try {
            if (data) {
                res.status(200).send({ result: true, message: 'Added Successfully' })
            }
        } catch (error) {
            res.status(200).send(error.message)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const get_inventory = async (req, res) => {
    try {
        if (req.body.inventoryType === "forProduction") {
            const data = await Inventory.find({ inventoryType: { $ne: 'other' } })
                .sort({ _id: -1 })
                .skip(req.body.last_id)
                .limit(10)
                .lean();

            if (data) {
                if (req?.body?.last_id == 0) {
                    const data1 = await Inventory.find({ inventoryType: { $ne: 'other' } }).countDocuments();
                    res.status(200).json({ data: data, count: data1 });
                } else {
                    res.status(200).json({ data: data, count: '' });
                }
            }

        } else if (req.body.inventoryType === "other") {
            const data = await Inventory.find({ inventoryType: req.body.inventoryType }).sort({ _id: -1 }).skip(req.body.last_id).limit(10).lean()
            if (data) {
                if (req?.body?.last_id == 0) {
                    const data1 = await Inventory.find({}).count()
                    res.status(200).json({ data: data, count: data1 })
                } else {
                    res.status(200).json({ data: data, count: '' })
                }
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_inventory = async (req, res) => {
    try {
        let productValue = ""

        // const productValue = await Product.findOne({ _id: req?.body?.productId })
        const expenseValue = await Expense.findOne({ _id: req?.body?.expenseId })
        if (req?.body?.productId) {
            productValue = await Product.findOne({ _id: req?.body?.productId })
        }
        const data = await Inventory.findOneAndUpdate({
            _id: req.body.inventoryId
        }, {
            productId: req.body.productId,
            expenseId: req.body.expenseId,
            quantity: req.body.quantity,
            value: req.body.value,
            anotherItem: req.body.anotherItem,
            inventoryType: req.body.inventoryType,
            units: req.body.units,
            productDetail: productValue ? productValue?.productName : "",
            expenseDetail: expenseValue?.invoice
        })
        if (data) {
            res.status(200).send({ result: true, message: 'Update Successfully' })
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const search_inventory = async (req, res) => {
    try {
        const data = await Inventory.find({
            $or: [{ quantity: { $regex: new RegExp(req?.body?.search), $options: 'i' } }, { value: { $regex: new RegExp(req?.body?.search), $options: 'i' } }
                , { productDetail: { $regex: new RegExp(req?.body?.search), $options: 'i' } }
                , { units: { $regex: new RegExp(req?.body?.search), $options: 'i' } }
                , { anotherItem: { $regex: new RegExp(req?.body?.search), $options: 'i' } }
                , { inventoryType: { $regex: new RegExp(req?.body?.search), $options: 'i' } }
                , { expenseDetail: { $regex: new RegExp(req?.body?.search), $options: 'i' } }]
        }).lean()
        if (data) {
            if (req?.body?.last_id == 0) {
                const data1 = data.length
                res.status(200).json({ data: data, count: data1 })
            } else {
                res.status(200).json({ data: data, count: '' })
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const delete_inventory = async (req, res) => {
    const deleteData = await Inventory.findByIdAndDelete({ _id: req.body.inventoryId });
    try {
        if (deleteData) {
            res.status(200).send({ result: true, message: 'Deleted Successfully' })
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_inventory,
    get_inventory,
    update_inventory,
    delete_inventory,
    search_inventory
}