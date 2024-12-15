import { DiscountType, PromotionStatus, PromotionType } from "../../constant/enum";
import { Product } from "./Product";

export interface Promotion {
    _id?: string;
    name: string;
    code: string;
    type: PromotionType;
    discountType: DiscountType;
    discountPercentage: number;
    startTime: Date;
    endTime: Date;
    description?: string;
    applicableProducts?: Product[];
    applicableOrderAmount?: number;
    buySomeDetails?: {
        quantityToBuy: number;
        quantityToGet: number;
    };
    giftItem?: Product[];
    maxDiscountAmount?: number;
    status: PromotionStatus;
    maxUsage?: number;
    createdAt?: string;
    updatedAt?: string;
}
