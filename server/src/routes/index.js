const express = require("express");
const authRoutes = require("./authRoutes");
const customerRoutes = require("./CustomerRoutes");
const supplierRoutes = require("./SupplierRoutes");
const productRoutes = require("./ProductRoutes");
const importRoutes = require("./ImportRoutes");
const employeeRoutes = require("./EmployeeRoutes");
const subCategoryRoutes = require("./SubCategoryRoutes");

function route(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/customers", customerRoutes);
  app.use("/api/suppliers", supplierRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/imports", importRoutes);
  app.use("/api/employees", employeeRoutes);
  app.use("/api/subcategories", subCategoryRoutes);
}

module.exports = route;
