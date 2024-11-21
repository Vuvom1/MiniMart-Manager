import { Category } from "./Category";

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
    subCategory: Category;
}