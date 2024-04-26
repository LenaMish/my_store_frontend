import { createContext } from "react";

export const TokenContext = createContext({token: null, setToken: null, refreshToken: null, setRefreshToken: null})
export const ShoppingCartContext = createContext({ShoppingCartCount: null, setShoppingCartCount: null})