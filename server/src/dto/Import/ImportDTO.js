class ImportDTO {
    constructor(importData) {
        this.id = importData._id;
        this.supplier = importData.supplier; 
        this.invoiceNumber = importData.invoiceNumber;
        this.deliveryMan = importData.deliveryMan;
        this.description = importData.description;
        this.date = importData.date;
        this.staff = importData.staff; 
        this.totalQuantity = importData.totalQuantity;
        this.totalImportPrice = importData.totalImportPrice;
        this.status = importData.status;
        this.importDetails = importData.importDetails.map(detail => ({
            product: detail.product, 
            quantity: detail.quantity,
            importPrice: detail.importPrice,
            totalImportPrice: detail.totalImportPrice,
        }));
    }
}

module.exports = ImportDTO;
