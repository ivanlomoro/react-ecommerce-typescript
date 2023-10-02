import { createContext, useContext, useState } from "react";
import { ShoppingCart } from "../../components/ShoppingCart/ShoppingCart";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { CartProduct, ShoppingCartProviderProps } from "../product";

type ShoppingCartContextType = {
    openCart: () => void;
    closeCart: () => void;
    getProductQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number;
    cartProducts: CartProduct[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartProducts, setCartProducts] = useLocalStorage<CartProduct[]>("shopping-cart",[])
    
    const cartQuantity = cartProducts.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getProductQuantity(id: number) {
        return cartProducts.find((item) => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: number) {
        const updatedCartProducts = [...cartProducts];
        const existingProduct = updatedCartProducts.find((item) => item.id === id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            updatedCartProducts.push({ id, quantity: 1 });
        }

        setCartProducts(updatedCartProducts);
    }

    function decreaseCartQuantity(id: number) {
        const updatedCartProducts = [...cartProducts];
        const existingProduct = updatedCartProducts.find((item) => item.id === id);

        if (existingProduct) {
            if (existingProduct.quantity === 1) {
                removeFromCart(id);
            } else {
                existingProduct.quantity -= 1;
                setCartProducts(updatedCartProducts);
            }
        }
    }

    function removeFromCart(id: number) {
        const updatedCartProducts = cartProducts.filter((item) => item.id !== id);
        setCartProducts(updatedCartProducts);
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getProductQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartProducts,
                cartQuantity,
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
}
