import { createContext, useContext } from "react";
import { ShoppingCartContextType } from "./ShoppingCartContext";

export const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

