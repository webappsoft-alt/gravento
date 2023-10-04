const cldFuelUsage = require("../models/cldFuelUsageModel");
const Expense = require("../models/expensesModel");
const Vehicle = require("../models/vehiclesModel");

const create_fuel_usage = async (req, res) => {
    try {
        let vehicleValue = ""
        const expenseValue = await Expense.findOne({ _id: req?.body?.expenseId })
        if (req?.body?.vehicleId) {
            vehicleValue = await Vehicle.findOne({ _id: req?.body?.vehicleId })
        }
        const fuel = new cldFuelUsage({
            expenseId: req.body.expenseId,
            vehicleId: req.body.vehicleId,
            quantity: req.body.quantity,
            utilization: req.body.utilization,
            numberTrips: req.body.numberTrips,
            milleage: req.body.milleage,
            machineId: req.body.machineId,
            machineNumber: req.body.machineNumber,
            expense: expenseValue?.invoice,
            vehicle: vehicleValue ? `${vehicleValue?.vehicleType} (${vehicleValue?.vehicleNumber})` : ""
        })
        const data = fuel.save()
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

const get_fuel_usage = async (req, res) => {
    try {
        const data = await cldFuelUsage.find({}).sort({ _id: -1 }).skip(req.body.last_id).limit(10).lean()
        if (data) {
            if (req?.body?.last_id == 0) {
                const data1 = await cldFuelUsage.find({}).count()
                res.status(200).json({ data: data, count: data1 })
            } else {
                res.status(200).json({ data: data, count: '' })
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const search_fuel_usage = async (req, res) => {
    try {
        const data = await cldFuelUsage.find({
            $or: [{ quantity: { $regex: new RegExp(req?.body?.search), $options: 'i' } }, { utilization: { $regex: new RegExp(req?.body?.search), $options: 'i' } },
            { numberTrips: { $regex: new RegExp(req?.body?.search), $options: 'i' } },
            { machineNumber: { $regex: new RegExp(req?.body?.search), $options: 'i' } },
            { milleage: { $regex: new RegExp(req?.body?.search), $options: 'i' } }, { expense: { $regex: new RegExp(req?.body?.search), $options: 'i' } }
                , { vehicle: { $regex: new RegExp(req?.body?.search), $options: 'i' } }]
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
const update_fuel_usage = async (req, res) => {
    try {
        const expenseValue = await Expense.findOne({ _id: req?.body?.expenseId })
        // const vehicleValue = await Vehicle.findOne({ _id: req?.body?.vehicleId })
        let vehicleValue = ""
        if (req?.body?.vehicleId) {
            vehicleValue = await Vehicle.findOne({ _id: req?.body?.vehicleId })
        }
        const data = await cldFuelUsage.findOneAndUpdate({
            _id: req.body.utilId
        }, {
            expenseId: req.body.expenseId,
            vehicleId: req.body.vehicleId,
            quantity: req.body.quantity,
            utilization: req.body.utilization,
            numberTrips: req.body.numberTrips,
            machineId: req.body.machineId,
            machineNumber: req.body.machineNumber,
            milleage: req.body.milleage,
            expense: expenseValue.invoice,
            vehicle: vehicleValue ? vehicleValue.vehicleNumber : ""
        })
        if (data) {
            res.status(200).send({ result: true, message: 'Update Successfully' })
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const delete_fuel_usage = async (req, res) => {
    const deleteData = await cldFuelUsage.findByIdAndDelete({ _id: req.body.utilId });
    try {
        if (deleteData) {
            res.status(200).send({ result: true, message: 'Deleted Successfully' })
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    create_fuel_usage,
    get_fuel_usage,
    search_fuel_usage,
    delete_fuel_usage,
    update_fuel_usage
}