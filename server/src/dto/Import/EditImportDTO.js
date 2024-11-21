const Import = require("../../models/Import");

class EditImportDTO {
    constructor({
        supplier,
        invoiceNumber,
        deliveryMan,
        description,
        date,
        staff,
        status,
        importDetails = []
    } = {}) {
        if (supplier) this.supplier = supplier;
        if (invoiceNumber) this.invoiceNumber = invoiceNumber;
        if (deliveryMan) this.deliveryMan = deliveryMan;
        if (description) this.description = description;
        if (date) this.date = date;
        if (staff) this.staff = staff;
        if (status) this.status = status;
        this.importDetails = importDetails;
    }

    calculateTotals() {
        const totalQuantity = this.importDetails.reduce((sum, item) => sum + item.quantity, 0);
        const totalImportPrice = this.importDetails.reduce((sum, item) => sum + item.importPrice * item.quantity, 0);

        return { totalQuantity, totalImportPrice };
    }

    toEntity() {
        const {totalQuantity, totalImportPrice} = this.calculateTotals();

        return Import({
            supplier: this.supplier,
            invoiceNumber: this.invoiceNumber,
            deliveryMan: this.deliveryMan,
            description: this.description || '',
            date: this.date || new Date(),
            staff: this.staff,
            totalQuantity: totalQuantity,
            totalImportPrice: totalImportPrice,
            status: this.status,
            importDetails: this.importDetails,
        });
    }

    static fromRequestBody(requestBody) {
        return new EditImportDTO({
            supplier: requestBody.supplier,
            invoiceNumber: requestBody.invoiceNumber,
            deliveryMan: requestBody.deliveryMan,
            description: requestBody.description,
            date: requestBody.date,
            staff: requestBody.staff,
            status: requestBody.status,
            importDetails: requestBody.importDetails || []
        });
    }


}

module.exports = EditImportDTO;
