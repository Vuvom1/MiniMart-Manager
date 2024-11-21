const Import = require("../../models/Import");

class AddImportDTO {
    constructor({ supplier, invoiceNumber, deliveryMan, description, staff, status, importDetails }) {
        this.supplier = supplier;
        this.invoiceNumber = invoiceNumber;
        this.deliveryMan = deliveryMan;
        this.description = description || '';
        this.date = new Date();
        this.staff = staff;
        this.status = status;
        this.importDetails = importDetails;
        
        this.validate();
    }

    validate() {
        if (!this.supplier || !this.invoiceNumber || !this.deliveryMan || !this.staff || !this.status || !this.importDetails) {
            throw new Error("Missing required fields");
        }
    }

    calculateTotals() {
        const totalQuantity = this.importDetails.reduce((sum, item) => sum + item.quantity, 0);
        const totalImportPrice = this.importDetails.reduce((sum, item) => sum + item.importPrice * item.quantity, 0);

        return { totalQuantity, totalImportPrice };
    }

    toEntity() {
        const { totalQuantity, totalImportPrice } = this.calculateTotals();

        return new Import({supplier: this.supplier,
            invoiceNumber: this.invoiceNumber,
            deliveryMan: this.deliveryMan,
            description: this.description,
            staff: this.staff,
            date: this.date,
            totalQuantity: totalQuantity,
            totalImportPrice: totalImportPrice,
            status: this.status,
            importDetails: this.importDetails,}
        );
    }

    static toDTO(importData) {
        return new AddImportDTO({
            supplier: importData.supplier,
            invoiceNumber: importData.invoiceNumber,
            deliveryMan: importData.deliveryMan,
            description: importData.description || '',
            staff: importData.staff,
            status: importData.status,
            importDetails: importData.importDetails,
        });
    }

    
}

module.exports = AddImportDTO;
