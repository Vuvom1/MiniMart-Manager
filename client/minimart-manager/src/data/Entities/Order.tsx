import { OrderStatus } from "../../constant/enum";
import { Receipt } from "./Receipt";

export interface Order {
    _id?: string;
    orderCode: number;
    receipt: Receipt;
    deliveryFee: number;
    receipientName: string;
    phone: string;
    address: string
    status: OrderStatus;
    notes?: string;
}