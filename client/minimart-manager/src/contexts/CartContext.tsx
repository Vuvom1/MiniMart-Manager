import { createContext } from "react";
import { CartItem } from "../data/Entities/CartItem";
import { Product } from "../data/Entities/Product";

interface CartContextProps {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  
  addToCart: (product: Product) => void;

  removeFromCart: (id: string) => void;

  clearCart: () => void;

  changeQuantity: (id: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);