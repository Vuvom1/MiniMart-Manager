const User = require('../models/User')
const errors = require('../constant/errors');
const Import = require('../models/Import');
const ImportDTO = require('../dto/Import/ImportDTO')
const AddImportDTO = require('../dto/Import/AddImprtDTO')
const EditImportDTO = require('../dto/Import/EditImportDTO')
const SubCategory = require('../models/SubCategory')
const Category = require('../models/Category')
const DateUtil = require('../util/DateUtil');

class ImportController {

    all_get = async (req, res) => {
        try {
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


            const importDTOs = imports.map(importData => new ImportDTO(importData));

            res.status(200).json(importDTOs);
        } catch (error) {
            throw error;
        }
    }

    add_post = async (req, res) => {
        try {
            const { importData } = req.body;

            const addImportDTO = AddImportDTO.toDTO(importData);

            const newImport = addImportDTO.toEntity();

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
            const { importData } = req.body;
            const editImportDTO = EditImportDTO.fromRequestBody(importData);

            let updatedImport = await Import.findByIdAndUpdate(id, editImportDTO);

            if (!updatedImport) {
                return res.status(404).json({ error: 'Import not found' });
            }

            res.status(200).json('Import updated successfully');
        } catch (error) {
            console.error('Error updating import:', error);
            res.status(400).json({ message: error.message, code: error.code });
        }
    };


    statistic_get = async (req, res) => {
        try {
            const totalImports = await Import.countDocuments();

            const statisticByDate = await this.statisticByDate();
            const statisticByMonth = await this.statisticByMonth();
            const statisticByYear = await this.statisticByYear();

            const statisticByCategory = await this.getStatisticByCategory();

            res.status(200).json({
                totalImports,
                statisticByDate,
                statisticByMonth,
                statisticByYear,
                statisticByCategory,
            });
        } catch (error) {
            console.error('Error updating import:', error);
            res.status(400).json({ message: error.message, code: error.code });
        }
    };

    statisticByDate = async () => {
        try {
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

            todayImportedProducts =  todayImportedProducts[0]?.totalQuantity || 0;
        
            let yesterdayImportedProducts = await Import.aggregate([
                { $match: { createdAt: { $gte: DateUtil.getStartOfYesterday(), $lt: DateUtil.getEndOfYesterday() } } },
                { $unwind: "$importDetails" },
                { $group: { _id: null, totalQuantity: { $sum: "$importDetails.quantity" } } }
            ]);

            yesterdayImportedProducts = yesterdayImportedProducts[0]?.totalQuantity || 0;
    
            const comparison = yesterdayImports === 0 ? todayImports : (todayImports / yesterdayImports);
            const percentageCompareYesterday = comparison * 100;
    
            return {
                todayImports,
                yesterdayImports,
                todayImportedProducts,
                yesterdayImportedProducts,
                comparison,
                percentageCompareYesterday,
            };
        } catch (error) {
            console.error('Error fetching daily statistics:', error);
        }
    };
    

    statisticByMonth = async () => {
        try {
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

            thisMonthImportedProducts =  thisMonthImportedProducts[0]?.totalQuantity || 0;
    
            let lastMonthImportedProducts = await Import.aggregate([
                { $match: { createdAt: { $gte: DateUtil.getStartOfLastMonth(), $lt: DateUtil.getEndOfLastMonth() } } },
                { $unwind: "$importDetails" },
                { $group: { _id: null, totalQuantity: { $sum: "$importDetails.quantity" } } }
            ]);

            lastMonthImportedProducts = lastMonthImportedProducts[0]?.totalQuantity || 0;
    
            const comparison = lastMonthImports === 0 ? thisMonthImports : (thisMonthImports / lastMonthImports);
            const percentageCompareLastMonth = comparison * 100;
    
           return {
                thisMonthImports,
                lastMonthImports,
                thisMonthImportedProducts,
                lastMonthImportedProducts,
                comparison,
                percentageCompareLastMonth,
           };
        } catch (error) {
            console.error('Error fetching monthly statistics:', error);
        }
    };

    statisticByYear = async () => {
        try {
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
    
            const comparison = lastYearImports === 0 ? thisYearImports : (thisYearImports / lastYearImports);
            const percentageCompareLastYear = comparison * 100;
    
            return{
                thisYearImports,
                lastYearImports,
                thisYearImportedProducts,
                lastYearImportedProducts,
                comparison,
                percentageCompareLastYear,
            };
        } catch (error) {
            console.error('Error fetching yearly statistics:', error);
        }
    };    
    
    getStatisticByCategory = async () => {
        try {
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
        } catch (error) {
            console.error('Error fetching import statistics:', error);
        }
    };



}

module.exports = new ImportController;   