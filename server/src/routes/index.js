const express = require('express')
const authRoutes = require('./authRoutes')
const customerRoutes = require('./customerRoutes')
const supplierRoutes = require('./SupplierRoutes')

function route(app)  {
    app.use('/api/auth', authRoutes);
    app.use('/api/customers', customerRoutes);  
    app.use('/api/suppliers', supplierRoutes);  
}

module.exports = route;