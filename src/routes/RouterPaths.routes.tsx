import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Store } from "../pages/Store"
import { StoreProductsProps } from "../types/product"
import { ProductDetails } from "../pages/ProductDetails"
import { Search } from "../pages/Search"

export const RouterPaths: FC<StoreProductsProps> = (props) => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/store" element={<Store {...props} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>

        </>
    )
}