const express = require("express");
const authRoutes = require("./AuthRoutes");
const userRoutes = require("./UserRoutes");
const customerRoutes = require("./CustomerRoutes");
const supplierRoutes = require("./SupplierRoutes");
const productRoutes = require("./ProductRoutes");
const importRoutes = require("./ImportRoutes");
const employeeRoutes = require("./EmployeeRoutes");
const scheduleRoutes = require("./ScheduleRoutes");
const shiftRoutes = require("./ShiftRoutes");
const positionRoutes = require("./PositionRoutes");
const promotionRoutes = require("./PromotionRoutes");
const categoryRoutes = require("./CategoryRoutes");
const subCategoryRoutes = require("./SubCategoryRoutes");
const receiptRoutes = require("./ReceiptRoutes");
const orderRoutes = require("./OrderRoutes");
const reportRoutes = require("./ReportRoutes");

function route(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/customers", customerRoutes);
  app.use("/api/suppliers", supplierRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/imports", importRoutes);
  app.use("/api/employees", employeeRoutes);
  app.use("/api/subcategories", subCategoryRoutes);
  app.use("/api/schedules", scheduleRoutes);
  app.use("/api/shifts", shiftRoutes);
  app.use("/api/positions", positionRoutes);
  app.use("/api/promotions", promotionRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/receipts", receiptRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/reports", reportRoutes);
}

module.exports = route;
