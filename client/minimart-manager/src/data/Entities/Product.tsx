import { Category } from "./Category";
import { Promotion } from "./Promotion";

export interface Product {
    _id?: string;
    name?: string;
    price?: number;
    barcode?: string;
    stock?: number;
    detail?: string;
    image?: string;
    dateOfManufacture?: string;
    expiryDate?: string;
    status?: string;
    description?: string;
    subCategory: Category;
    promotion?: Promotion;
}