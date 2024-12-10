import { Product } from "./Product";

export interface CartItem {
    filter(arg0: (item: CartItem) => boolean): unknown;
    product: Product;
    quantity: number;
    netPrice: number;
}