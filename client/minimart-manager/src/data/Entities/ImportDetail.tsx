import { Product } from "./Product";

export interface ImportDetail {
    id?: string;
    product: Product;
    quantity: number;
    importPrice: number;
}