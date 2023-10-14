import { useState } from "react";
import { ShoppingCart } from "../../components/ShoppingCart/ShoppingCart";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { CartProduct, ShoppingCartProviderProps, StoreProductsProps } from "../product";
import { ShoppingCartContext } from "./useShoopingCart";

export type ShoppingCartContextType = {
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    getProductDetails: (id: number) => Promise<StoreProductsProps | undefined>;
    getProductQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number;
    cartProducts: CartProduct[];
};


export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartProducts, setCartProducts] = useLocalStorage<CartProduct[]>("shopping-cart",[])
    const [productDetails, setProductDetails] = useState<StoreProductsProps[]>([]);

    const cartQuantity = cartProducts.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getProductQuantity(id: number) {
        return cartProducts.find((item) => item.id === id)?.quantity || 0;
    }

    async function getProductDetails(id: number): Promise<StoreProductsProps | undefined> {
        const existingProduct = productDetails.find((item) => item?.id === id);

        if (existingProduct) {
            return existingProduct;
        } else {
            try {
                const response = await fetch(`http://localhost:3001/products/${id}`);
                if (!response.ok) {
                    throw new Error("Error getting product details.");
                }
                const data = await response.json();
                setProductDetails([...productDetails, data]);
                return data;
            } catch (error) {
                console.error("Error getting product details:", error);
                return undefined;
            }
        }
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
                getProductDetails,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartProducts,
                cartQuantity,
                isOpen
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} cartProducts={[]} />
        </ShoppingCartContext.Provider>
    );
}
