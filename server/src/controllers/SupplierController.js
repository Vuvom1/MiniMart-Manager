const User = require('../models/User')
const errors = require('../constant/errors');
const Supplier = require('../models/Supplier');


class SupplierController {

    all_get = async (req, res) => {
        try {
            const suppliers = await Supplier.find();

            res.status(200).json(suppliers);
        } catch (error) {
            throw error
        }
    }

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
    }

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

        all_get = async (req, res) => {
            try {
                const suppliers = await Supplier.find();

                res.status(200).json(suppliers);
            } catch (error) {
                throw error
            }
        }
    };

    statistic_get = async (req, res) => {
        try {
            
            const totalSuppliers = await Supplier.countDocuments();

            const startOfLastMonth = new Date();
            startOfLastMonth.setDate(1);
            startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);

            const endOfLastMonth = new Date();
            endOfLastMonth.setDate(0);

            
            const lastMonthSuppliers = await Supplier.countDocuments({
                createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth }
            });

        
            let comparison = lastMonthSuppliers == 0 ? totalSuppliers : (totalSuppliers / lastMonthSuppliers);
            let percentageCompareLastMonnth = comparison * 100;

            res.status(200).json({
                totalSuppliers,
                lastMonthSuppliers,
                comparison,
                percentageCompareLastMonnth
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while counting suppliers.", error: error.message });
        }
    };



}

module.exports = new SupplierController;   