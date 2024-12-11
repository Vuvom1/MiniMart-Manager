import { ReactNode, useEffect, useState } from "react";
import { CartItem } from "../data/Entities/CartItem"
import { Product } from "../data/Entities/Product"
import { CalculateUtil } from "../utils/CalculateUtil";
import { CartContext } from "../contexts/CartContext";

interface CartProviderProps {
    children: ReactNode;
  }

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const storedCartItems = localStorage.getItem('cartItems');
    const [cartItems, setCartItems] = useState<CartItem[]>(storedCartItems ? JSON.parse(storedCartItems) : []);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);  
   
    const saveCartItems = (items: CartItem[]) => {
      localStorage.setItem('cartItems', JSON.stringify(items));
      setTotalItems(items.reduce((total, item) => total + item.quantity, 0));
      setTotalPrice(items.reduce((total, item) => total + item.netPrice * item.quantity, 0));
    }
  
    const addToCart = (product: Product) => {
      setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.product._id === product._id);
      if (existingItem) {
        return prevItems.map((i) =>
        i.product._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      const netPrice = CalculateUtil.calculateDiscountPrice(product.price || 0 , product.promotion?.discountPercentage ?? 0);
      return [...prevItems, { product, quantity: 1, netPrice, filter: (arg0: (item: CartItem) => boolean) => true }];
      });
    };

    const removeFromCart = (id: string) => {
      setCartItems((prevItems: CartItem[]) => prevItems.filter((item: CartItem) => item.product._id !== id));
    };
  
    const clearCart = () => {
      setCartItems([]);
    };

    const changeQuantity = (id: string, quantity: number) => {
      setCartItems((prevItems: CartItem[]) => prevItems.map((item: CartItem) => item.product._id === id ? { ...item, quantity } : item));
    }
  
    useEffect(() => {
      saveCartItems(cartItems);
    }, [cartItems]);

    return (
      <CartContext.Provider value={{ cartItems, totalItems, totalPrice, addToCart, changeQuantity, removeFromCart, clearCart }}>
        {children}
      </CartContext.Provider>
    );
  };