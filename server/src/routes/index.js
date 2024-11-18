const express = require('express')
const authRoutes = require('./authRoutes')
const customerRoutes = require('./customerRoutes')
const supplierRoutes = require('./SupplierRoutes')
const productRoutes = require('./ProductRoutes')
const importRoutes = require('./ImportRoutes')
const employeeRoutes = require('./EmployeeRoutes')
const scheduleRoutes = require('./ScheduleRoutes')
const shiftRoutes = require('./ShiftRoutes')

function route(app)  {
    app.use('/api/auth', authRoutes);
    app.use('/api/customers', customerRoutes);  
    app.use('/api/suppliers', supplierRoutes);  
    app.use('/api/products', productRoutes);
    app.use('/api/imports', importRoutes);
    app.use('/api/employees', employeeRoutes);
    app.use('/api/schedules', scheduleRoutes);
    app.use('/api/shifts', shiftRoutes);
}

module.exports = route;