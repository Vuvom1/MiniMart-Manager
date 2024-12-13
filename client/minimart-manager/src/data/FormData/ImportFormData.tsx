import { ImportStatus } from "../../constant/enum";
import { ImportDetailFormData } from "./ImportDetailFormData";

export interface ImportFormData {
    supplier: string;
    invoiceNumber: string;
    deliveryMan: string;
    description?: string; 
    staff: string; 
    totalQuantity?: number;
    totalImportPrice?: number;
    status: ImportStatus;
    importDetails: ImportDetailFormData[];
}