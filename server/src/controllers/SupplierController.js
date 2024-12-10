const User = require('../models/User')
const errors = require('../constant/errors');
const Supplier = require('../models/Supplier');
const DateUtil = require('../util/DateUtil');

class SupplierController {

    all_get = async (req, res) => {
        try {
            const suppliers = await Supplier.find();

            res.status(200).json(suppliers);
        } catch (error) {
            throw error
        }
    };

    add_post = async (req, res) => {
        try {
            const { name, email, status, phone, address, description } = req.body;

            const existingName = await Supplier.findOne({ name });
            const existingEmail = await Supplier.findOne({ email });

            if (existingEmail) {
                const error = new Error(errors.alreadyExistEmail.message);
                error.code = 'alreadyExistEmail';
                throw error;
            }

            if (existingName) {
                const error = new Error(errors.alreadyExistName.message);
                error.code = 'alreadyExistName';
                throw error;
            }

            const supplier = await Supplier.create({ name, email, status, phone, address, description });
            res.status(201).json('New supplier added');
        } catch (error) {
            throw error;
        }
    };

    edit_put = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, status, phone, address, description } = req.body.supplierData;

            const supplier = await Supplier.findById(id);
            if (!supplier) {
                return res.status(404).json({ message: 'Supplier not found' });
            }

            const existingName = await Supplier.findOne({ name, _id: { $ne: id } });
            const existingEmail = await Supplier.findOne({ email, _id: { $ne: id } });

            if (existingEmail) {
                const error = new Error(errors.alreadyExistEmail.message);
                error.code = 'alreadyExistEmail';
                throw error;
            }

            if (existingName) {
                const error = new Error(errors.alreadyExistName.message);
                error.code = 'alreadyExistName';
                throw error;
            }

            supplier.name = name;
            supplier.email = email;
            supplier.status = status;
            supplier.phone = phone;
            supplier.address = address;
            supplier.description = description;

            await supplier.save();
            res.status(200).json('Supplier updated successfully');
        } catch (error) {
            res.status(400).json({ message: error.message, code: error.code });
        }
    };

    statistic_get = async (req, res) => {
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
    };

    statisticByDate = async () => {
        try {
            const todaySuppliers = await Supplier.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfToday(), $lt: DateUtil.getEndOfToday()}
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