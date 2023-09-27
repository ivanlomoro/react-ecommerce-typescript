import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Store } from "../pages/Store"
import { StoreProductsProps } from "../types/product"
import { Login } from "../pages/Login"

export const RouterPaths: FC<StoreProductsProps> = (props) => {
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store {...props}/>} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>    
    )
}