class ReceiptUtil {
    static generateReceiptNumber() {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month with leading zero
        const day = ('0' + date.getDate()).slice(-2); // Day with leading zero
        const randomNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number

        return `1C${year}MYY`;
    }
    static calculateTotalPrice(details) {
        return details.reduce((totalPrice, detail) => totalPrice + detail.netPrice * detail.quantity, 0);
    }

    static calculateTotalNetPrice(totalPrice, promotionDiscount, deliveryFee) {
        return totalPrice - promotionDiscount + deliveryFee;
    }
    
}

module.exports = ReceiptUtil;