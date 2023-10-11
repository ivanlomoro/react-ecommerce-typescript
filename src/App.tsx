import { ShoppingCartProvider } from "./types/context/ShoppingCartContext"
import { StoreProductsProps } from "./types/product"
import { ToastContainer } from 'react-toastify';
import { AppRouter } from "./router/AppRouter";
import AuthProvider from "./auth/context/AuthProvider";
import { BrowserRouter } from "react-router-dom";

function App(props: StoreProductsProps) {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ShoppingCartProvider {...props}>
            <AppRouter />
          </ShoppingCartProvider>
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}


export default App
