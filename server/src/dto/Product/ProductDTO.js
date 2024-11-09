class ProductDTO {
    constructor(product) {
        this.id = product._id;
        this.name = product.name;
        this.price = product.price;
        this.barcode = product.barcode;
        this.subCategoryId = product.subCategoryId;
        this.detail = product.detail;
        this.image = product.image;
        this.stock = product.stock;
        this.dateOfManufacture = product.dateOfManufacture;
        this.expiryDate = product.expiryDate;
    }
}

module.exports = ProductDTO;
