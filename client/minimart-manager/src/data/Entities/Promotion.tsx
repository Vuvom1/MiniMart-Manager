export interface Promotion {
    _id: string;
    name: string;
    code: string;
    type: 'Order-Based' | 'Product-Based';
    discountType: 'Percentage' | 'Fixed';
    discountValue: number;
    startTime: string;
    endTime: string;
    description?: string;
    applicableProducts?: string[];
    applicableOrderAmount?: number;
    buySomeDetails?: {
        quantityToBuy: number;
        quantityToGet: number;
    };
    giftItem?: string;
    maxUsage?: number;
    createdAt?: string;
    updatedAt?: string;
}
