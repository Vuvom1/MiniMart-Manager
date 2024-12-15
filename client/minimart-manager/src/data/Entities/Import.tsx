import { ImportStatus } from "../../constant/enum";
import { ImportDetail } from "./ImportDetail";
import { Supplier } from "./Supplier";

export interface Import {
    _id?: string;
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

export const entityImport = {
    supplier: {} as Supplier,
    invoiceNumber: '',
    deliveryMan: '',
    description: '',
    staff: '',
    totalQuantity: 0,
    totalImportPrice: 0,
    status: ImportStatus.PENDING,
    importDetails: [] as ImportDetail[],
};