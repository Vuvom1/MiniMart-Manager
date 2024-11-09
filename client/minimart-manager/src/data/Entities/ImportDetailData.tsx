import { Product } from "./ProductData";

export interface ImportDetail {
    id?: string;
    product: Product;
    quantity: number;
    importPrice: number;
}