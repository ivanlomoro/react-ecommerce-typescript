import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Store } from "../pages/Store"
import { StoreProductsProps } from "../types/product"
import { ProductDetails } from "../pages/ProductDetails"
import { Search } from "../pages/Search"
import { Checkout } from "../pages/Checkout"

export interface RouterPathsProps {
    products: StoreProductsProps[];
  }

export const RouterPaths: FC<RouterPathsProps> = (props) => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/store" element={<Store products={props.products} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>

        </>
    )
}