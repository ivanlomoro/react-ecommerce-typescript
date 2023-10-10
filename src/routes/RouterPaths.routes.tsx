import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Store } from "../pages/Store"
import { StoreProductsProps } from "../types/product"
import { ProductDetails } from "../pages/ProductDetails"
import { Search } from "../pages/Search"

export const RouterPaths: FC<StoreProductsProps> = (props) => {
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store {...props}/>} />
                <Route path="/search" element={<Search />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
            </Routes>
        </BrowserRouter>
        </>    
    )
}