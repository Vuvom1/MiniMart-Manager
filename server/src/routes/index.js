const express = require('express')
const authRoutes = require('./authRoutes')
const customerRoutes = require('./customerRoutes')

function  route(app)  {
    app.use('/api/auth', authRoutes);
    app.use('/api/customers', customerRoutes);  
}

module.exports = route;