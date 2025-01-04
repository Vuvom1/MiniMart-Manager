const errors = require('../constant/errors');
const Import = require('../models/Import');
const DateUtil = require('../util/DateUtil');
const Supplier = require('../models/Supplier')
const asynceErrorHandler = require('../util/asyncErrorHandler');
const Employee = require('../models/Employee');
const User = require('../models/User');

class ImportController {

    all_get = asynceErrorHandler(async (req, res, next) => {
        const imports = await Import.find()
            .populate('staff')
            .populate('supplier')
            .populate('importDetails.product')
            .populate({
                path: 'importDetails.product',
                populate: { path: 'subCategory' }
            })
            .populate({
                path: 'importDetails.product',
                populate: [
                    { path: 'subCategory', populate: { path: 'category' } }
                ]
            })
            .exec();

        res.status(200).json(imports);

    });

    getById_get = asynceErrorHandler(async (req, res, next) => {
        const { id } = req.params;

        if (!id) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        const importData = await Import.findById(id)
            .populate('staff')
            .populate('supplier')
            .populate('importDetails.product')
            .populate({
                path: 'importDetails.product',
                populate: { path: 'subCategory' }
            })
            .populate({
                path: 'importDetails.product',
                populate: [
                    { path: 'subCategory', populate: { path: 'category' } }
                ]
            })
            .exec();

        if (!importData) {
            const error = new Error(errors.importNotFound.code);
            return next(error);
        }

        res.status(200).json(importData);

    });




    add_post = asynceErrorHandler(async (req, res, next) => {
        const { importData } = req.body;


        if (!importData.supplier || !importData.invoiceNumber || !importData.deliveryMan || !importData.status || !importData.importDetails) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        const supplier = Supplier.findById(importData.supplier);
        if (!supplier) {
            const error = new Error(errors.supplierNotFound.code);
            return next(error);
        }

        const user = User.findById(importData.staff);
        if (!user) {
            const error = new Error(errors.userNotFound.code);
            return next(error);
        }

        const employee = Employee.findOne({ user: user._id });
        if (!employee) {
            const error = new Error(errors.employeeNotFound.code);
            return next(error);
        }

        const createdImport = await Import.create(importData);


        return res.status(201).json('New import added');
    });

    edit_put = asynceErrorHandler(async (req, res, next) => {

        const { id } = req.params;
        const { importData } = req.body;

        if (!id || !importData) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        const importToUpdate = await Import.findById(id);

        if (!importToUpdate) {
            const error = new Error(errors.importNotFound.code);
            return next(error);
        }

        const updatedImport = await Import.findByIdAndUpdate(id, importData, { new: true });

        return res.status(200).json('Import updated successfully');

    });


    statistic_get = asynceErrorHandler(async (req, res, next) => {

        const totalImports = await Import.countDocuments();

        const statisticByDate = await this.statisticByDate(req, res, next);
        const statisticByMonth = await this.statisticByMonth(req, res, next);
        const statisticByYear = await this.statisticByYear(req, res, next);

        const statisticByCategory = await this.getStatisticByCategory();

        res.status(200).json({
            totalImports,
            statisticByDate,
            statisticByMonth,
            statisticByYear,
            statisticByCategory,
        });

    });

    statisticByDate = async (req, res, next) => {

        const todayImports = await Import.countDocuments({
            createdAt: { $gte: DateUtil.getStartOfToday(), $lt: DateUtil.getCurrentDate() }
        });

        const yesterdayImports = await Import.countDocuments({
            createdAt: { $gte: DateUtil.getStartOfYesterday(), $lt: DateUtil.getEndOfYesterday() }
        });

        let todayImportedProducts = await Import.aggregate([
            { $match: { createdAt: { $gte: DateUtil.getStartOfToday(), $lt: DateUtil.getCurrentDate() } } },
            { $unwind: "$importDetails" },
            { $group: { _id: null, totalQuantity: { $sum: "$importDetails.quantity" } } }
        ]);

        todayImportedProducts = todayImportedProducts[0]?.totalQuantity || 0;

        let yesterdayImportedProducts = await Import.aggregate([
            { $match: { createdAt: { $gte: DateUtil.getStartOfYesterday(), $lt: DateUtil.getEndOfYesterday() } } },
            { $unwind: "$importDetails" },
            { $group: { _id: null, totalQuantity: { $sum: "$importDetails.quantity" } } }
        ]);

        yesterdayImportedProducts = yesterdayImportedProducts[0]?.totalQuantity || 0;

        const comparison = yesterdayImports === 0 ? todayImports : ((todayImports - yesterdayImports) / yesterdayImports);
        const percentageCompareYesterday = comparison * 100;

        return {
            todayImports,
            yesterdayImports,
            todayImportedProducts,
            yesterdayImportedProducts,
            comparison,
            percentageCompareYesterday,
        };

    };


    statisticByMonth = async () => {

        const thisMonthImports = await Import.countDocuments({
            createdAt: { $gte: DateUtil.getStartOfCurrentMonth(), $lt: DateUtil.getCurrentDate() }
        });

        const lastMonthImports = await Import.countDocuments({
            createdAt: { $gte: DateUtil.getStartOfLastMonth(), $lt: DateUtil.getEndOfLastMonth() }
        });

        let thisMonthImportedProducts = await Import.aggregate([
            { $match: { createdAt: { $gte: DateUtil.getStartOfCurrentMonth(), $lt: DateUtil.getCurrentDate() } } },
            { $unwind: "$importDetails" },
            { $group: { _id: null, totalQuantity: { $sum: "$importDetails.quantity" } } }
        ]);

        thisMonthImportedProducts = thisMonthImportedProducts[0]?.totalQuantity || 0;

        let lastMonthImportedProducts = await Import.aggregate([
            { $match: { createdAt: { $gte: DateUtil.getStartOfLastMonth(), $lt: DateUtil.getEndOfLastMonth() } } },
            { $unwind: "$importDetails" },
            { $group: { _id: null, totalQuantity: { $sum: "$importDetails.quantity" } } }
        ]);

        lastMonthImportedProducts = lastMonthImportedProducts[0]?.totalQuantity || 0;

        const comparison = lastMonthImports === 0 ? thisMonthImports : ((thisMonthImports - lastMonthImports) / lastMonthImports);
        const percentageCompareLastMonth = comparison * 100;

        return {
            thisMonthImports,
            lastMonthImports,
            thisMonthImportedProducts,
            lastMonthImportedProducts,
            comparison,
            percentageCompareLastMonth,
        };

    };

    statisticByYear = async () => {

        const thisYearImports = await Import.countDocuments({
            createdAt: { $gte: DateUtil.getStartOfCurrentYear(), $lt: DateUtil.getCurrentDate() }
        });

        const lastYearImports = await Import.countDocuments({
            createdAt: { $gte: DateUtil.getStartOfLastYear(), $lt: DateUtil.getEndOfLastYear() }
        });

        let thisYearImportedProducts = await Import.aggregate([
            { $match: { createdAt: { $gte: DateUtil.getStartOfCurrentYear(), $lt: DateUtil.getCurrentDate() } } },
            { $unwind: "$importDetails" },
            { $group: { _id: null, totalQuantity: { $sum: "$importDetails.quantity" } } }
        ]);

        thisYearImportedProducts = thisYearImportedProducts[0]?.totalQuantity || 0;

        let lastYearImportedProducts = await Import.aggregate([
            { $match: { createdAt: { $gte: DateUtil.getStartOfLastYear(), $lt: DateUtil.getEndOfLastYear() } } },
            { $unwind: "$importDetails" },
            { $group: { _id: null, totalQuantity: { $sum: "$importDetails.quantity" } } }
        ]);

        lastYearImportedProducts = lastYearImportedProducts[0]?.totalQuantity || 0;

        const comparison = lastYearImports === 0 ? thisYearImports : ((thisYearImports - lastYearImports) / lastYearImports);
        const percentageCompareLastYear = comparison * 100;

        return {
            thisYearImports,
            lastYearImports,
            thisYearImportedProducts,
            lastYearImportedProducts,
            comparison,
            percentageCompareLastYear,
        };

    };

    getStatisticByCategory = async () => {

        const statistics = await Import.aggregate([
            { $unwind: "$importDetails" },

            {
                $lookup: {
                    from: "products",
                    localField: "importDetails.product",
                    foreignField: "_id",
                    as: "product"
                }
            },
            { $unwind: "$product" },

            {
                $lookup: {
                    from: "subcategories",
                    localField: "product.subCategory",
                    foreignField: "_id",
                    as: "subCategory"
                }
            },
            { $unwind: "$subCategory" },

            {
                $lookup: {
                    from: "categories",
                    localField: "subCategory.category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: "$category" },


            {
                $group: {
                    _id: "$category.name",
                    totalImport: { $sum: 1 },
                    totalImportedProduct: { $sum: "$importDetails.quantity" }
                }
            },

            { $sort: { _id: 1 } }
        ]);

        return statistics;

    };
}

module.exports = new ImportController;   