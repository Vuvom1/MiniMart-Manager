import { Product } from "./Product";

export interface ProductByCategory {
    _id: string,
    name: string,
    products: Product[];
}