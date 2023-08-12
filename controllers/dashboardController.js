const Expense = require("../models/expensesModel");
const Sales = require("../models/salesModel");
const Inventory = require("../models/inventoryModel");
const Production = require("../models/productionModel");

const expense_grpah = async(req,res)=>{     
// Group documents by month based on the expenseDate field
const aggregationPipeline = [
    {
      $addFields: {
        year: { $toInt: { $substr: ['$expensesDate', 0, 4] } },
        month: { $toInt: { $substr: ['$expensesDate', 5, 2] } },
        day: { $toInt: { $substr: ['$expensesDate', 8, 2] } },
        totalAsInt: { $toInt: '$total' } 
      }
    },
    {
        $addFields: {
          parsedExpenseDate: {
            $dateFromParts: {
              year: '$year',
              month: '$month',
              day: '$day',
            }
          }
        }
    },
    {
    $group: {
        _id: { year: '$year', month: '$month' }, // Group by year and month
        dailyData: { $push: '$$ROOT' },           // Collect the grouped results
        totalSum: { $sum: '$totalAsInt' },        // Sum total values
        count: { $sum: 1 },                       // Count documents in each group
    },
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1, // Sort by year and month (ascending)
      },
    },
    {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          day: '$_id.day',
          totalSum: 1,
          count: 1,
        },
    }
  ];
  
  Expense.aggregate(aggregationPipeline)
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).send({expenses:result})
    })
    .catch(err => {
      console.error(err);
    });
}


const sales_grpah = async(req,res)=>{     
    const aggregationPipeline1 = [
        {
          $addFields: {
            year: { $toInt: { $substr: ['$createdAt', 0, 4] } },
            month: { $toInt: { $substr: ['$createdAt', 5, 2] } },
            day: { $toInt: { $substr: ['$createdAt', 8, 2] } },
            quantityPrice: {
              $cond: {
                if: { $regexMatch: { input: '$quantityPrice', regex: /^[0-9]+$/ } },
                then: '$quantityPrice',
                else: '0' // or an appropriate default value
              }
            }
          }
        },
        {
          $addFields: {
            totalAsInt: { $toInt: '$quantityPrice' }
          }
        },
        {
          $addFields: {
            parsedCreatedAt: {
              $dateFromParts: {
                year: '$year',
                month: '$month',
                day: '$day',
              }
            }
          }
        },
        {
          $group: {
            _id: { year: '$year', month: '$month' },
            dailyData: { $push: '$$ROOT' },
            totalSum: { $sum: '$totalAsInt' },
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1,
          },
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            day: '$_id.day',
            totalSum: 1,
            count: 1,
          },
        },
      ];
      
      Sales.aggregate(aggregationPipeline1)
        .exec()
        .then(result => {
          console.log(result);
          res.status(200).send({ sales: result });
        })
        .catch(err => {
          console.error(err);
          res.status(500).send({ error: 'An error occurred' });
        });
      
    }

const productSales_grpah = async(req,res)=>{     
        let data = await Sales.aggregate([
            {
                $addFields: {
                    quantityPriceNumeric: { $toDouble: "$quantityPrice" }
                }
            },
            {
                $group: {
                    _id: "$productDetail",
                    totalQuantityPrice: { $sum: "$quantityPriceNumeric" }
                }
            },
            {
                $project: {
                    _id: 0,
                    productDetail: "$_id",
                    totalQuantityPrice: 1
                }
            }
        ])
        res.status(200).send({ productSales:data });
}

const customerSales_grpah = async(req,res)=>{     
    let data = await Sales.aggregate([
        {
            $addFields: {
                quantityPriceNumeric: { $toDouble: "$quantityPrice" }
            }
        },
        {
            $group: {
                _id: "$customerDetail",
                totalQuantityPrice: { $sum: "$quantityPriceNumeric" }
            }
        },
        {
            $project: {
                _id: 0,
                customerDetail: "$_id",
                totalQuantityPrice: 1
            }
        }
    ])
    res.status(200).send({ customerSales:data });
}


const inventories_grpah = async(req,res)=>{  
   
     const aggregationPipeline1 = [
        {
          $addFields: {
            year: { $toInt: { $substr: ['$createdAt', 0, 4] } },
            month: { $toInt: { $substr: ['$createdAt', 5, 2] } },
            day: { $toInt: { $substr: ['$createdAt', 8, 2] } },
            quantityPrice: {
              $cond: {
                if: { $regexMatch: { input: '$quantity', regex: /^[0-9]+$/ } },
                then: '$quantity',
                else: '0' // or an appropriate default value
              }
            }
          }
        },
        {
          $addFields: {
            totalAsInt: { $toInt: '$quantity' }
          }
        },
        {
          $addFields: {
            parsedCreatedAt: {
              $dateFromParts: {
                year: '$year',
                month: '$month',
                day: '$day',
              }
            }
          }
        },
        {
          $group: {
            _id: { year: '$year', month: '$month', day: '$day' },
            dailyData: { $push: '$$ROOT' },
            totalSum: { $sum: '$totalAsInt' },
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1,
          },
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            day: '$_id.day',
            totalSum: 1,
            count: 1,
          },
        },
      ];
      
      Inventory.aggregate(aggregationPipeline1)
        .exec()
        .then(result => {
          console.log(result);
          res.status(200).send({ inventory: result });
        })
        .catch(err => {
          console.error(err);
          res.status(500).send({ error: 'An error occurred' });
        });
}

const production_grpah = async(req,res)=>{  
 
    const aggregationPipeline1 = [
        {
            $addFields: {
                dateParts: {
                    $dateFromParts: {
                        year: { $toInt: { $substr: ['$productionDate', 0, 4] } },
                        month: { $toInt: { $substr: ['$productionDate', 5, 2] } },
                        day: { $toInt: { $substr: ['$productionDate', 8, 2] } }
                    }
                },
                productionUsageTimeNumeric: {  
                    $cond: {
                    if: { $regexMatch: { input: '$productionUsageTime', regex: /^[0-9.]+$/ } },
                    then: { $toDouble: '$productionUsageTime' },
                    else: 0 // or an appropriate default value
                } 
              }
            }
        },
            {
                $group: {
                    _id: '$dateParts',
                    dailyData: { $push: '$$ROOT' },
                    totalSum: { $sum: '$productionUsageTimeNumeric' },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: { $year: '$_id' },
                    month: { $month: '$_id' },
                    day: { $dayOfMonth: '$_id' },
                    totalSum: 1,
                    count: 1
                }
            },
            {
                $sort: {
                    year: 1,
                    month: 1,
                    day: 1
                }
            }
     ];
     
     Production.aggregate(aggregationPipeline1)
       .exec()
       .then(result => {
         console.log(result);
         res.status(200).send({ production: result });
       })
       .catch(err => {
         console.error(err);
         res.status(500).send({ error: 'An error occurred' });
       });
}

module.exports = {
    expense_grpah,
    sales_grpah,
    productSales_grpah,
    customerSales_grpah,
    inventories_grpah,
    production_grpah
}