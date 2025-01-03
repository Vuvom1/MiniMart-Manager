const errors = require('../constant/errors');
const asyncErrorHandler = require('../util/asyncErrorHandler');
const Receipt = require('../models/Receipt');
const Import = require('../models/Import');
const Salary = require('../models/Salary');
const Shift = require('../models/Shift');
const Product = require('../models/Product');

class ReportController {
    overallReport_get = asyncErrorHandler(async (req, res, next) => {

        const totalSalaryByPeriods = await this.totalSalaryByMonths();
        const totalReceiptByPeriods = await this.totalReceiptByMonths();
        const totalImportByMonths = await this.totalImportByMonths();
        const totalEarningsByMonths = await this.totalEarningsByMonths();
        const totalExpensesByMonths = await this.totalExpensesByMonths();
        const totalSalesByMonths = await this.totalSalesByMonths();

        return res.json({
            totalReceiptByPeriods,
            totalSalaryByPeriods,
            totalImportByMonths,
            totalEarningsByMonths,
            totalExpensesByMonths,
            totalSalesByMonths,
        });
    });

    shiftTimeDistributionByMonths_get = asyncErrorHandler(async (req, res, next) => {
        const shiftTimeDistributionByMonths = await Shift.aggregate([
            
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        year: { $year: "$date" }
                    },
                    _6amTo12am: {
                        $sum: {
                            $cond: {
                                if: {
                                    $gte: ["$startTime", "06:00"]
                                },
                                then: {
                                    $cond: {
                                        if: {
                                            $lt: ["$endTime", "12:00"]
                                        },
                                        then: {
                                            $add: [
                                                {
                                                    $divide: [
                                                        {
                                                            $subtract: [
                                                                { $toDate: { $concat: ["2024-12-16T", "$endTime", ":00.000Z"] } },
                                                                { $toDate: { $concat: ["2024-12-16T", "$startTime", ":00.000Z"] } }
                                                            ]
                                                        },
                                                        1000 * 60 * 60
                                                    ]
                                                },
                                                24
                                            ]
                                        },
                                        else: {
                                            $divide: [
                                                {
                                                    $subtract: [
                                                        { $toDate: { $concat: ["2024-12-16T", "12:00", ":00.000Z"] } },
                                                        { $toDate: { $concat: ["2024-12-16T", "$startTime", ":00.000Z"] } }
                                                    ]
                                                },
                                                1000 * 60 * 60
                                            ]
                                        }
                                    }
                                },
                                else: 0
                            }
                        }
                    },
                    _12amTo6pm: {
                        $sum: {
                            $cond: {
                                if: {
                                    $gte: ["$startTime", "12:00"]
                                },
                                then: {
                                    $cond: {
                                        if: {
                                            $lt: ["$endTime", "18:00"]
                                        },
                                        then: {
                                            $add: [
                                                {
                                                    $divide: [
                                                        {
                                                            $subtract: [
                                                                { $toDate: { $concat: ["2024-12-16T", "$endTime", ":00.000Z"] } },
                                                                { $toDate: { $concat: ["2024-12-16T", "$startTime", ":00.000Z"] } }
                                                            ]
                                                        },
                                                        1000 * 60 * 60
                                                    ]
                                                },
                                                24
                                            ]
                                        },
                                        else: {
                                            $divide: [
                                                {
                                                    $subtract: [
                                                        { $toDate: { $concat: ["2024-12-16T", "18:00", ":00.000Z"] } },
                                                        { $toDate: { $concat: ["2024-12-16T", "$startTime", ":00.000Z"] } }
                                                    ]
                                                },
                                                1000 * 60 * 60
                                            ]
                                        }
                                    }
                                },
                                else: 0
                            }
                        }
                    },
                    _6pmTo12pm: {
                        $sum: {
                            $cond: {
                                if: {
                                    $gte: ["$startTime", "18:00"]
                                },
                                then: {
                                    $cond: {
                                        if: {
                                            $lt: ["$endTime", "00:00"]
                                        },
                                        then: {
                                            $add: [
                                                {
                                                    $divide: [
                                                        {
                                                            $subtract: [
                                                                { $toDate: { $concat: ["2024-12-16T", "$endTime", ":00.000Z"] } },
                                                                { $toDate: { $concat: ["2024-12-16T", "$startTime", ":00.000Z"] } }
                                                            ]
                                                        },
                                                        1000 * 60 * 60
                                                    ]
                                                },
                                                24
                                            ]
                                        },
                                        else: {
                                            $divide: [
                                                {
                                                    $subtract: [
                                                        { $toDate: { $concat: ["2024-12-16T", "23:59", ":00.000Z"] } },
                                                        { $toDate: { $concat: ["2024-12-16T", "$startTime", ":00.000Z"] } }
                                                    ]
                                                },
                                                1000 * 60 * 60
                                            ]
                                        }
                                    }
                                },
                                else: 0
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    period: {
                        $concat: [
                            { $toString: "$_id.month" },
                            "-",
                            { $toString: "$_id.year" }
                        ]
                    },
                    _6amTo12am: 1,
                    _12amTo6pm: 1,
                    _6pmTo12pm: 1,
                }
            }
        ]);



        return res.json(
            shiftTimeDistributionByMonths,
        );
    })

    orderSourceDistributionByMonths_get = asyncErrorHandler(async (req, res, next) => {
        const orderSourceDistributionByMonths = await Receipt.aggregate([
            {
            $group: {
                _id: {
                month: { $month: "$time" },
                year: { $year: "$time" },
                source: "$source",
                transactionType: "$transactionType"
                },
                total: { $sum: "$totalNetPrice" }
            }
            },
            {
            $group: {
                _id: {
                month: "$_id.month",
                year: "$_id.year"
                },
                sources: {
                $push: {
                    source: "$_id.source",
                    transactionType: "$_id.transactionType",
                    total: "$total"
                }
                }
            }
            },
            {
            $project: {
                _id: 0,
                period: {
                $concat: [
                    { $toString: "$_id.month" },
                    "-",
                    { $toString: "$_id.year" }
                ]
                },
                sources: 1
            }
            }
        ]);

        return res.json(orderSourceDistributionByMonths);
    });

    saleDistributionByCategory_get = asyncErrorHandler(async (req, res, next) => {
        const saleDistributionByCategory = await Receipt.aggregate([
            {
            $unwind: "$details"
            },
            {
            $lookup: {
                from: "products",
                localField: "details.product",
                foreignField: "_id",
                as: "product"
            }
            },
            {
            $unwind: "$product"
            },
            {
            $lookup: {
                from: "subcategories",
                localField: "product.subCategory",
                foreignField: "_id",
                as: "subCategory"
            }
            },
            {
            $unwind: "$subCategory"
            },
            {
            $lookup: {
                from: "categories",
                localField: "subCategory.category",
                foreignField: "_id",
                as: "category"
            }
            },
            {
            $unwind: "$category"
            },
            {
            $group: {
                _id: {
                category: "$category.name",
                month: { $month: "$time" },
                year: { $year: "$time" }
                },
                total: { $sum: "$details.netPrice" }
            }
            },
            {
            $group: {
                _id: {
                month: "$_id.month",
                year: "$_id.year"
                },
                categories: {
                $push: {
                    name: "$_id.category",
                    total: "$total"
                }
                }
            }
            },
            {
            $project: {
                _id: 0,
                period: {
                $concat: [
                    { $toString: "$_id.month" },
                    "-",
                    { $toString: "$_id.year" }
                ]
                },
                categories: 1
            }
            }
        ]);

        return res.json(saleDistributionByCategory);
    });

    totalSalaryByMonths = async (req, res, next) => {
        const totalSalaryByMonths = await Salary.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$endDate" },
                        year: { $year: "$endDate" }
                    },
                    total: { $sum: "$totalSalary" }
                }
            },
            {
                $project: {
                    _id: 0,
                    period: {
                        $concat: [
                            { $toString: "$_id.month" },
                            "-",
                            { $toString: "$_id.year" }
                        ]
                    },
                    total: 1
                }
            }
        ]);

        return totalSalaryByMonths;
    }

    totalReceiptByMonths = async (req, res, next) => {
        const totalReceiptByMonths = await Receipt.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$time" },
                        year: { $year: "$time" }
                    },
                    total: { $sum: "$totalNetPrice" }
                }
            },
            {
                $project: {
                    _id: 0,
                    period: {
                        $concat: [
                            { $toString: "$_id.month" },
                            "-",
                            { $toString: "$_id.year" }
                        ]
                    },
                    total: 1
                }
            }
        ]);

        return totalReceiptByMonths;
    }

    currrentStockLevel_get = asyncErrorHandler(async (req, res, next) => {
    
        const stockByCategory = await Product.aggregate([
            {
                $lookup: {
                    from: "subcategories",
                    localField: "subCategory",
                    foreignField: "_id",
                    as: "subCategory"
                }
            },
            {
                $unwind: "$subCategory"
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "subCategory.category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $group: {
                    _id: "$category.name",
                    total: { $sum: "$stock" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    total: 1
                }
            }
        ])


        return res.json(stockByCategory);
    });

    totalImportByMonths = async (req, res, next) => {
        const totalImportByMonths = await Import.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        year: { $year: "$date" }
                    },
                    total: { $sum: "$totalImportPrice" }
                }
            },
            {
                $project: {
                    _id: 0,
                    period: {
                        $concat: [
                            { $toString: "$_id.month" },
                            "-",
                            { $toString: "$_id.year" }
                        ]
                    },
                    total: 1
                }
            }
        ]);

        return totalImportByMonths;
    }

    totalEarningsByMonths = async (req, res, next) => {
        const totalReceiptByMonths = await this.totalReceiptByMonths();
        const totalImportByMonths = await this.totalImportByMonths();

        const totalEarningsByMonths = totalReceiptByMonths.map(receiptMonth => {
            return {
                period: receiptMonth.period,
                total: receiptMonth.total,
            };
        });

        return totalEarningsByMonths
    }

    totalExpensesByMonths = async (req, res, next) => {
        const totalImportByMonths = await this.totalImportByMonths();
        const totalSalaryByMonths = await this.totalSalaryByMonths();

        const totalExpensesByMonths = totalImportByMonths.map(importMonth => {
            const salaryMonth = totalSalaryByMonths.find(salary => salary.period === importMonth.period) || { total: 0 };
            return {
                period: importMonth.period,
                total: importMonth.total + salaryMonth.total
            };
        });

        return totalExpensesByMonths;
    }

    totalSalesByMonths = async (req, res, next) => {
        const totalReceiptByMonths = await this.totalReceiptByMonths();
        const totalImportByMonths = await this.totalImportByMonths();
        const totalSalaryByMonths = await this.totalSalaryByMonths();

        const periods = new Set([
            ...totalReceiptByMonths.map(item => item.period),
            ...totalImportByMonths.map(item => item.period),
            ...totalSalaryByMonths.map(item => item.period)
        ]);

        const totalSalesByMonths = Array.from(periods).map(period => {
            const receiptMonth = totalReceiptByMonths.find(item => item.period === period) || { total: 0 };
            const importMonth = totalImportByMonths.find(item => item.period === period) || { total: 0 };
            const salaryMonth = totalSalaryByMonths.find(item => item.period === period) || { total: 0 };
            return {
            period,
            total: receiptMonth.total - importMonth.total - salaryMonth.total
            };
        });

        return totalSalesByMonths;
    }

    shiftTimeByMonths = async (req, res, next) => {
        const shiftTimeDistributionByMonth = await Shift.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        year: { $year: "$date" }
                    },
                    total: {
                        $sum: {
                            $divide: [
                                {
                                    $subtract: [
                                        { $toDate: { $concat: ["2024-12-16T", "$endTime", ":00.000Z"] } },
                                        { $toDate: { $concat: ["2024-12-16T", "$startTime", ":00.000Z"] } }
                                    ]
                                },
                                1000 * 60 * 60
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    period: {
                        $concat: [
                            { $toString: "$_id.month" },
                            "-",
                            { $toString: "$_id.year" }
                        ]
                    },
                    total: 1
                }
            }
        ]);

        return shiftTimeDistributionByMonth;
    }


}

module.exports = new ReportController;