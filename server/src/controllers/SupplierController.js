const User = require('../models/User')
const errors = require('../constant/errors');
const Supplier = require('../models/Supplier');
const DateUtil = require('../util/DateUtil');
const asyncErrorHandler = require('../util/asyncErrorHandler');

class SupplierController {

    all_get = asyncErrorHandler( async (req, res) => {
        try {
            const suppliers = await Supplier.find();

            res.status(200).json(suppliers);
        } catch (error) {
            throw error
        }
    });

    add_post = asyncErrorHandler(async (req, res, next) => {

        const { supplier } = req.body;

        if (!supplier.name || !supplier.email || !supplier.phone || !supplier.address) {
            const error = new Error(errors.requiredFieldMissing.code);
            return next(error);
        }

        const existingName = await Supplier.findOne({ name: supplier.name });
        if (existingName) {
            const error = new Error(errors.alreadyExistName.code);
            return next(error);
        }

        const existingEmail = await Supplier.findOne({ email: supplier.email });
        if (existingEmail) {
            const error = new Error(errors.alreadyExistEmail.code);
            return next(error);
        }

        const existingPhone = await Supplier.findOne({ phone: supplier.phone });
        if (existingPhone) {
            const error = new Error(errors.alreadyExistPhone.code);
            return next(error);
        }

        await Supplier.create(supplier);

        res.status(201).json('New supplier added');
    });

    edit_put = asyncErrorHandler(async (req, res, next) => {
            const { id } = req.params;
            const { supplier } = req.body;

            const existingName = await Supplier.findOne({ name: supplier.name, _id: { $ne: id } });
            const existingEmail = await Supplier.findOne({ email: supplier.email, _id: { $ne: id } });
            const existingPhone = await Supplier.findOne({ phone: supplier.phone, _id: { $ne: id } });

            if (existingName) {
                const error = new Error(errors.alreadyExistName.code);
                return next(error);
            }

            if (existingEmail) {
                const error = new Error(errors.alreadyExistEmail.code);
                return next(error);
            }

            if (existingPhone) {
                const error = new Error(errors.alreadyExistEmail.phone);
                return next(error);
            }

            const updatedSupplier = await Supplier.findByIdAndUpdate(id, supplier, { new: true });

            if (!updatedSupplier) {
                const error = new Error(errors.requiredFieldMissing.code);
                return next(error);
            }
           
            return res.status(200).json('Supplier updated successfully');
    });

    statistic_get = asyncErrorHandler(async (req, res, next) => {
        try {

            const totalSuppliers = await Supplier.countDocuments();

            const statisticByDate = await this.statisticByDate();

            const statisticByMonth = await this.statisticByMonth();

            const statisticByYear = await this.statisticByYear();

            res.status(200).json({
                totalSuppliers,
                statisticByDate,
                statisticByMonth,
                statisticByYear,
            });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while counting suppliers.", error: error.message });
        }
    });

    statisticByDate = async () => {
        try {
            const todaySuppliers = await Supplier.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfToday(), $lt: DateUtil.getEndOfToday() }
            });

            const yesterdaySuppliers = await Supplier.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfYesterday(), $lt: DateUtil.getEndOfYesterday() }
            });

            const comparison = yesterdaySuppliers === 0 ? todaySuppliers : (todaySuppliers / yesterdaySuppliers);
            const percentageCompareYesterday = comparison * 100;

            return {
                todaySuppliers,
                yesterdaySuppliers,
                comparison,
                percentageCompareYesterday,
            };
        } catch (error) {
            console.error('Error fetching daily statistics:', error);
        }
    };

    statisticByMonth = async () => {
        try {
            const thisMonthSuppliers = await Supplier.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfCurrentMonth(), $lt: DateUtil.getCurrentDate() }
            });

            const lastMonthSuppliers = await Supplier.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfLastMonth(), $lt: DateUtil.getEndOfLastMonth() }
            });

            const comparison = lastMonthSuppliers === 0 ? thisMonthSuppliers : (thisMonthSuppliers / lastMonthSuppliers);
            const percentageCompareLastMonth = comparison * 100;

            return {
                thisMonthSuppliers,
                lastMonthSuppliers,
                comparison,
                percentageCompareLastMonth,
            };
        } catch (error) {
            console.error('Error fetching monthly statistics:', error);
        }
    };

    statisticByYear = async () => {
        try {
            const thisYearSuppliers = await Supplier.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfCurrentYear(), $lt: DateUtil.getCurrentDate() }
            });

            const lastYearSuppliers = await Supplier.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfLastYear(), $lt: DateUtil.getEndOfLastYear() }
            });

            const comparison = lastYearSuppliers === 0 ? thisYearSuppliers : (thisYearSuppliers / lastYearSuppliers);
            const percentageCompareLastYear = comparison * 100;

            return {
                thisYearSuppliers,
                lastYearSuppliers,
                comparison,
                percentageCompareLastYear,
            };
        } catch (error) {
            console.error('Error fetching yearly statistics:', error);
        }
    };


}

module.exports = new SupplierController;   