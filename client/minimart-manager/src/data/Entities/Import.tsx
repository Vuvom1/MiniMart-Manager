import { ImportStatus } from "../../constant/enum";
import { ImportDetail } from "./ImportDetail";
import { Supplier } from "./Supplier";

export interface Import {
    id?: string;
    supplier: Supplier;
    invoiceNumber: string;
    deliveryMan: string;
    description?: string; 
    staff: string; 
    totalQuantity?: number;
    totalImportPrice?: number;
    status: ImportStatus;
    importDetails: ImportDetail[];
}