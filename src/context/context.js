import { createContext } from "react";

export const TokenContext = createContext({token: null, setToken: null})
export const ShoppingCartContext = createContext({ShoppingCartCount: null, setShoppingCartCount: null})