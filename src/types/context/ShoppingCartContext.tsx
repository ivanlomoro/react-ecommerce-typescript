import { createContext, useContext, useReducer } from "react";
import { ShoppingCart } from "../../components/ShoppingCart";
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

type Action =
    | { type: "ADD_TO_CART"; id: number }
    | { type: "REMOVE_FROM_CART"; id: number };

const initialState: CartProduct[] = [];

const shoppingCartReducer = (
    state: CartProduct[],
    action: Action
): CartProduct[] => {
    let existingProduct;

    switch (action.type) {
        case "ADD_TO_CART":
            existingProduct = state.find((item) => item.id === action.id);
            if (existingProduct) {
                return state.map((item) =>
                    item.id === action.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...state, { id: action.id, quantity: 1 }];
            }
        case "REMOVE_FROM_CART":
            return state.filter((item) => item.id !== action.id);
        default:
            return state;
    }
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useLocalStorage<boolean>("cartIsOpen", false);
    const [cartProducts, dispatch] = useReducer(
        shoppingCartReducer,
        initialState
    );

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
        dispatch({ type: "ADD_TO_CART", id });
    }

    function decreaseCartQuantity(id: number) {
        const existingProduct = cartProducts.find((item) => item.id === id);
        if (existingProduct && existingProduct.quantity === 1) {
            removeFromCart(id);
        } else {
            dispatch({ type: "ADD_TO_CART", id });
        }
    }

    function removeFromCart(id: number) {
        dispatch({ type: "REMOVE_FROM_CART", id });
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
