import { createContext, useContext, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [itemsInCart, setItemsInCart] = useState([]);
  return (
    <CartContext.Provider value={{ itemsInCart, setItemsInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
