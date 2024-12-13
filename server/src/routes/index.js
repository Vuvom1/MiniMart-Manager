const express = require('express')
const authRoutes = require('./authRoutes')
const customerRoutes = require('./CustomerRoutes')
const supplierRoutes = require('./SupplierRoutes')
const productRoutes = require('./ProductRoutes')
const importRoutes = require('./ImportRoutes')
const employeeRoutes = require('./EmployeeRoutes')
const scheduleRoutes = require('./ScheduleRoutes')
const shiftRoutes = require('./ShiftRoutes')
const positionRoutes = require('./PositionRoutes')
const promotionRoutes = require('./PromotionRoutes')
const categoryRoutes = require('./CategoryRoutes')
const receiptRoutes = require('./ReceiptRoutes')
const orderRoutes = require('./OrderRoutes')

function route(app)  {
    app.use('/api/auth', authRoutes);
    app.use('/api/customers', customerRoutes);  
    app.use('/api/suppliers', supplierRoutes);  
    app.use('/api/products', productRoutes);
    app.use('/api/imports', importRoutes);
    app.use('/api/employees', employeeRoutes);
    app.use('/api/schedules', scheduleRoutes);
    app.use('/api/shifts', shiftRoutes);
    app.use('/api/positions', positionRoutes);
    app.use('/api/promotions', promotionRoutes);
    app.use('/api/categories', categoryRoutes);
    app.use('/api/receipts', receiptRoutes);
    app.use('/api/orders', orderRoutes);
}

module.exports = route;