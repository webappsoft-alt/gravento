const cldDispatch = require("../models/cldDispatchModel");
const Customer = require("../models/customerModel");
const Product = require("../models/productModel");
const Inventory = require("../models/inventoryModel");

const create_dispatch = async (req, res) => {
    try {
        const customerValue = await Customer.findOne({ _id: req?.body?.customerId })
        const productValue = await Product.findOne({ _id: req?.body?.productId })
        const cldDispatch_ = new cldDispatch({
            customerId: req.body.customerId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            paymentMethod: req.body.paymentMethod,
            remittance: req.body.remittance,
            customerDetail: customerValue?.firstName + ' ' + customerValue?.lastName,
            productDetail: productValue?.productName,
            comment: req.body.comment,
        })
        const data = cldDispatch_.save()
        try {
            if (data) {
                res.status(200).send({ result: true, message: 'Added Successfully' })
                const inventory = await Inventory.findOne({ productId: req?.body?.productId })
                if (inventory) {
                    quantity = parseInt(inventory?.quantity) - parseInt(req.body.quantity)
                    const data = await Inventory.findOneAndUpdate({
                        productId: req.body.productId
                    }, {
                        quantity: quantity,
                    })
                } else {
                    let currDate = new Date();
                    let month = parseFloat(currDate.getMonth()) + 1;
                    month = month < 10 ? '0' + month : month

                    let day = parseFloat(currDate.getDate());
                    day = day < 10 ? '0' + day : day

                    const inventory = new Inventory({
                        productId: req.body.productId,
                        expenseId: '',
                        quantity: req.body.quantity,
                        value: '',
                        productDetail: productValue?.productName,
                        expenseDetail: '',
                        createdAt: currDate.getFullYear() + '/' + month + '/' + day
                    })
                    const data = inventory.save()
                }
            }
        } catch (error) {
            res.status(200).send(error.message)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const get_dispatch = async (req, res) => {
    try {
        let arr = []
        let prod;
        const data = await cldDispatch.find({}).sort({ _id: -1 }).skip(req.body.last_id).limit(10).lean()
        if (data) {
            for (let i = 0; i < data.length; i++) {
                prod = await Product.findOne({ _id: data[i]?.productId })
                arr.push({
                    _id: data[i]._id,
                    comment: data[i].comment,
                    customerDetail: data[i].customerDetail, productDetail: data[i].productDetail, customerId: data[i].customerId, dateAdded: data[i].dateAdded, paymentMethod: data[i].paymentMethod,
                    productId: data[i].productId, quantity: data[i].quantity, remittance: data[i].remittance, price: prod?.price,
                })
            }
            if (req?.body?.last_id == 0) {
                const data1 = await cldDispatch.find({}).count()
                res.status(200).json({ data: arr, count: data1 })
            } else {
                res.status(200).json({ data: arr, count: '' })
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_dispatch = async (req, res) => {
    try {
        const data = await cldDispatch.find({
            $or: [{ customerDetail: { $regex: new RegExp(req?.body?.search), $options: 'i' } }, { productDetail: { $regex: new RegExp(req?.body?.search), $options: 'i' } }
                , { remittance: { $regex: new RegExp(req?.body?.search), $options: 'i' } }, { comment: { $regex: new RegExp(req?.body?.search), $options: 'i' } }, { paymentMethod: { $regex: new RegExp(req?.body?.search), $options: 'i' } }, { quantity: { $regex: new RegExp(req?.body?.search), $options: 'i' } }]
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
const update_dispatch = async (req, res) => {
    try {
        const customerValue = await Customer.findOne({ _id: req?.body?.customerId })
        const productValue = await Product.findOne({ _id: req?.body?.productId })
        const data = await cldDispatch.findOneAndUpdate({
            _id: req.body.dispatchId
        }, {
            customerId: req.body.customerId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            paymentMethod: req.body.paymentMethod,
            remittance: req.body.remittance,
            customerDetail: customerValue?.firstName + ' ' + customerValue?.lastName,
            productDetail: productValue?.productName,
            comment: req.body.comment,

        })
        if (data) {
            res.status(200).send({ result: true, message: 'Update Successfully' })
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_dispatch = async (req, res) => {
    const deleteData = await cldDispatch.findByIdAndDelete({ _id: req.body.dispatchId });
    try {
        if (deleteData) {
            res.status(200).send({ result: true, message: 'Deleted Successfully' })
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_dispatch,
    get_dispatch,
    search_dispatch,
    update_dispatch,
    delete_dispatch
}