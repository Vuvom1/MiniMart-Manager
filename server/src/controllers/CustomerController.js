const User = require('../models/User')
const UserRole = require('../constant/UserRole')
const Customer = require('../models/Customer')
const CustomerDTO = require('../dto/Cutomer/CustomerDTO')
const DateUtil = require('../util/DateUtil')

class CustomerController {
    all_get = async (req, res) => {
        try {
            const users = await User.find({ role: 'CUSTOMER' });

            const usersWithCustomer = await Promise.all(users.map(async (user) => {

                const customer = await Customer.findOne({ user: user._id });

                return new CustomerDTO(user, customer);
            }));

            res.status(200).json(usersWithCustomer);
        } catch (error) {
            throw error;
        }

    }

    statistic_get = async (req, res) => {
        try {
            const statisticByDate = await this.statisticByDate();
            const statisticByMonth = await this.statisticByMonth();
            const statisticByYear = await this.statisticByYear();

            res.status(200).json({
                statisticByDate,
                statisticByMonth,
                statisticByYear,
            });
        } catch (error) {
            res.status(400).json({ message: error.message, code: error.code });
        }
    }

    statisticByDate = async () => {
        try {
            const totalCustomersByDate = await this.getTotalCustomersByDate();

            const todayTotalCustomers = await Customer.countDocuments();

            const yesterdayTotalCustomers = await Customer.countDocuments({
                createdAt: { $lte: DateUtil.getEndOfYesterday() }
            });

            const todayNewCustomers = await Customer.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfToday(), $lt: DateUtil.getCurrentDate() }
            });

            const yesterdayNewCustomers = await Customer.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfYesterday(), $lt: DateUtil.getEndOfYesterday() }
            });

            const totalCustomerComparison = yesterdayTotalCustomers === 0 ? todayTotalCustomers : (todayTotalCustomers / yesterdayTotalCustomers);
            const totalCustomerPercentage = totalCustomerComparison * 100;

            const newCustomerComparison = yesterdayNewCustomers === 0 ? todayNewCustomers : (todayNewCustomers / yesterdayNewCustomers);
            const newCustomerPercentage = newCustomerComparison * 100;

            return {
                totalCustomersByDate,
                todayTotalCustomers,
                yesterdayTotalCustomers,
                todayNewCustomers,
                yesterdayNewCustomers,
                totalCustomerComparison,
                totalCustomerPercentage,
                newCustomerComparison,
                newCustomerPercentage,
            };
        } catch (error) {
            console.error('Error fetching daily statistics:', error);
        }
    }

    getTotalCustomersByDate = async () => {
        try {
            const result = await Customer.aggregate([
                {
                    $project: {
                        createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    }
                },
                {
                    $group: {
                        _id: "$createdAt", 
                        totalCustomers: { $sum: 1 },
                    }
                },
                {
                    $sort: { "_id": 1 } 
                }
            ]);
    
          return result;
        } catch (error) {
            console.error("Error fetching customers by date:", error);
        }
    };


    statisticByMonth = async () => {
        try {
            const totalCustomersByMonth = await this.getTotalCustomersByMonth();

            const previousMonthEnd = DateUtil.getEndOfLastMonth();

            const currentMonthTotalCustomers = await Customer.countDocuments({
                createdAt: { $lte: DateUtil.getCurrentDate() }
            });
            const previousMonthTotalCustomers = await Customer.countDocuments({
                createdAt: { $lte: previousMonthEnd }
            });

            const currentMonthNewCustomers = await Customer.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfCurrentMonth(), $lt: DateUtil.getCurrentDate() }
            });
            const previousMonthNewCustomers = await Customer.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfLastMonth(), $lt: previousMonthEnd }
            });

            const totalCustomerComparison = previousMonthTotalCustomers === 0 ? currentMonthTotalCustomers : (currentMonthTotalCustomers / previousMonthTotalCustomers);
            const totalCustomerPercentage = totalCustomerComparison * 100;

            const newCustomerComparison = previousMonthNewCustomers === 0 ? currentMonthNewCustomers : (currentMonthNewCustomers / previousMonthNewCustomers);
            const newCustomerPercentage = newCustomerComparison * 100;

            return {
                totalCustomersByMonth,
                currentMonthTotalCustomers,
                previousMonthTotalCustomers,
                currentMonthNewCustomers,
                previousMonthNewCustomers,
                totalCustomerComparison,
                totalCustomerPercentage,
                newCustomerComparison,
                newCustomerPercentage,
            };
        } catch (error) {
            console.error('Error fetching monthly statistics:', error);
        }
    };

    getTotalCustomersByMonth = async () => {
        try {
            const result = await Customer.aggregate([
                {
                    $group: {
                        _id: {
                            $dateToString: { format: "%Y-%m", date: "$createdAt" }
                        },
                        totalCustomers: { $sum: 1 },
                    }
                },
                {
                    $sort: { "_id": 1 }
                }
            ]);
    
            return result;
        } catch (error) {
            console.error("Error fetching customers by month:", error);
        }
    };

    statisticByYear = async () => {
        try {
            const totalCustomersByYear = await this.getTotalCustomersByYear();

            const currentYearTotalCustomers = await Customer.countDocuments({
                createdAt: { $lte: DateUtil.getCurrentDate() }
            });
            const previousYearTotalCustomers = await Customer.countDocuments({
                createdAt: { $lte: DateUtil.getEndOfLastYear() }
            });

            const currentYearNewCustomers = await Customer.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfCurrentYear(), $lt: DateUtil.getCurrentDate() }
            });
            const previousYearNewCustomers = await Customer.countDocuments({
                createdAt: { $gte: DateUtil.getStartOfLastYear(), $lt: DateUtil.getEndOfLastYear() }
            });

            const totalCustomerComparison = previousYearTotalCustomers === 0 ? currentYearTotalCustomers : (currentYearTotalCustomers / previousYearTotalCustomers);
            const totalCustomerPercentage = totalCustomerComparison * 100;

            const newCustomerComparison = previousYearNewCustomers === 0 ? currentYearNewCustomers : (currentYearNewCustomers / previousYearNewCustomers);
            const newCustomerPercentage = newCustomerComparison * 100;

            return {
                totalCustomersByYear,
                currentYearTotalCustomers,
                previousYearTotalCustomers,
                currentYearNewCustomers,
                previousYearNewCustomers,
                totalCustomerComparison,
                totalCustomerPercentage,
                newCustomerComparison,
                newCustomerPercentage,
            };
        } catch (error) {
            console.error('Error fetching yearly statistics:', error);
        }
    };

    getTotalCustomersByYear = async () => {
        try {
            const result = await Customer.aggregate([
                {
                    $group: {
                        _id: {
                            $dateToString: { format: "%Y", date: "$createdAt" }
                        },
                        totalCustomers: { $sum: 1 },
                    }
                },
                {
                    $sort: { "_id": 1 }
                }
            ]);
    
            return result;
        } catch (error) {
            console.error("Error fetching customers by month:", error);
        }
    };

    


}

module.exports = new CustomerController;