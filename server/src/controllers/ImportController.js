const User = require('../models/User')
const errors = require('../constant/errors');
const Import = require('../models/Import');


class ImportController {

    all_get = async (req, res) => {
        try {
            const imports = await Import.find()
            .populate('staff') 
            .populate('supplier') 
            .populate('importDetails.product') 
            .exec();
            

            res.status(200).json(imports);
        } catch (error) {
            throw error;
        }
    }

    add_post = async (req, res) => {
        try {
            const { importData } = req.body;
            
            const newImport = new Import({
                supplier: importData.supplier,
                invoiceNumber: importData.invoiceNumber,
                deliveryMan: importData.deliveryMan,
                description: importData.description || '',
                date: new Date(), 
                staff: importData.staff,
                totalQuantity: importData.totalQuantity,
                totalImportPrice: importData.totalImportPrice,
                status: importData.status,
                importDetails: importData.importDetails, 
            });
    
            await newImport.save();
    
            res.status(201).json({ message: 'New import added', import: newImport });
        } catch (error) {
            console.error('Error adding import:', error);
            res.status(500).json({ error: 'Internal server error' });
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
       
    };



}

module.exports = new ImportController;   