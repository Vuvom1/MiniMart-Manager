import { Product } from './Product';
import { PaymentMethod, ReceiptStatus, TransactionType } from '../../constant/enum';
import { Employee } from './Employee';
import { Promotion } from './Promotion';
import { Customer } from './Customer';

export interface Receipt {
    receiptNumbe?: string;
    employee?: Employee | String;
    promotion?: Promotion | String;
    customer?: Customer | String;
    paymentMethod: PaymentMethod;
    time: Date;
    transactionType: TransactionType;
    details: {
        product: Product;
        quantity: number;
        netPrice: number;
    }[];
    totalPrice?: number;
    totalNetPrice?: number;
    status: ReceiptStatus;
}

