import { DiscountType, PromotionStatus, PromotionType } from "../../constant/enum";
import { Product } from "./Product";

export interface Promotion {
    _id?: string;
    name: string;
    code: string;
    type: PromotionType;
    discountType: DiscountType;
    discountPercentage?: number;
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
    description?: string;
    applicableProducts?: Product[];
    requireOrderAmount?: number;
    requiredQuantity?: number;
    rewardQuantity?: number;
    applicableCustomerPoint?: number;
    giftItems?: Product[];
    maxDiscountAmount?: number;
    status: PromotionStatus;
    maxUsage: number;
}