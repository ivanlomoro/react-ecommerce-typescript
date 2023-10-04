import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Store } from "../pages/Store"
import { StoreProductsProps } from "../types/product"
import { Login } from "../pages/Login"
import { ProductDetails } from "../pages/ProductDetails"

export const RouterPaths: FC<StoreProductsProps> = (props) => {
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store {...props}/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
            </Routes>
        </BrowserRouter>
        </>    
    )
}