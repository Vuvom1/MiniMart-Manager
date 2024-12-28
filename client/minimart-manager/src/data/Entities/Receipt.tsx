import { Product } from "./Product";
import {
  PaymentMethod,
  ReceiptStatus,
  TransactionType,
} from "../../constant/enum";
import { Employee } from "./Employee";
import { Promotion } from "./Promotion";
import { Customer } from "./Customer";
import { GiftItem } from "./GiftItem";

export interface Receipt {
  receiptNumber?: string;
  employee?: Employee;
  promotion?: Promotion;
  customer?: Customer;
  paymentMethod: PaymentMethod;
  time: Date;
  transactionType: TransactionType;
  details: {
    product: Product;
    quantity: number;
    netPrice: number;
  }[];
  giftItems?: GiftItem[];
  totalPrice?: number;
  totalNetPrice?: number;
  status: ReceiptStatus;
}
