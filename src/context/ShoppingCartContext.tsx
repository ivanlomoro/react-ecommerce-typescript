import React, { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartProviderProps={
    children: ReactNode
}

type CartProduct={
    id:number,
    quantity:number
}

type ShoppingCartContext={
    openCart: () => void
    closeCart: () => void
    getProductQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity:number
    cartProducts: CartProduct[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children } : ShoppingCartProviderProps){
    const [isOpen, setIsOpen] = useState(false)
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([])
    
    const cartQuantity = cartProducts.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getProductQuantity(id:number){
        return cartProducts.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number){
        setCartProducts(currItems =>{
            if(currItems.find(item => item.id === id) == null){
                return [...currItems, {id, quantity: 1}]
            }else {
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity+1}
                    }else{
                        return item
                    }
                })

            }
        })
    }

    function decreaseCartQuantity(id: number){
        setCartProducts(currItems =>{
            if(currItems.find(item => item.id === id)?.quantity === 1 ){
                return currItems.filter(item => item.id !== id)
            }else {
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity-1}
                    }else{
                        return item
                    }
                })

            }
        })
    }

    function removeFromCart(id:number){
        setCartProducts(currItems =>{
            return currItems.filter(item => item.id !== id)
        } )
    }

    return (
        <ShoppingCartContext.Provider value={{
            getProductQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            openCart,
            closeCart,
            cartProducts,
            cartQuantity}}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}