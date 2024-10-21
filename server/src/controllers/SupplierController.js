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
        const {name, email, phone, address, description} = req.body;

        const existingName = await Supplier.findOne({ name});
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

        const supplier = await Supplier.create({name, email, phone, address, description});
        res.status(201).json('New supplier added');
    } catch (error) {
        throw error;
    }
   }

}

module.exports = new SupplierController;   