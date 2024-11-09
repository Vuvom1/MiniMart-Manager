import { ImportStatus } from "../../constant/enum";
import { ImportDetail } from "./ImportDetailData";

export interface Import {
    id?: string;
    supplier: string;
    invoiceNumber: string;
    deliveryMan: string;
    description?: string; 
    staff: string; 
    totalQuantity?: number;
    totalImportPrice?: number;
    status: ImportStatus;
    importDetails: ImportDetail[];
}