export class CalculateUtil {
    static calculateDiscountPrice(price: number, discount: number) {
        return price - (price * discount / 100);
    }
    static calculateDiscountAmount(price: number, discount: number) {
        return price * discount / 100;
    }
    static calculateDiscountPercentage(price: number, discountPrice: number) {
        return (price - discountPrice) / price * 100;
    }
    static calculateDiscountPercentageByAmount(price: number, discountAmount: number) {
        return discountAmount / price * 100;
    }
    static calculateDiscountPriceByAmount(price: number, discountAmount: number) {
        return price - discountAmount;
    }
}