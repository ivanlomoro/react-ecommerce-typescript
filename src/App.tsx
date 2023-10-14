import { ShoppingCartProvider } from "./types/context/ShoppingCartContext"
import { ToastContainer } from 'react-toastify';
import { AppRouter } from "./router/AppRouter";
import AuthProvider from "./auth/context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { RouterPathsProps } from "./routes/RouterPaths.routes";

function App(props: RouterPathsProps) {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ShoppingCartProvider>
            <AppRouter {...props}/>
          </ShoppingCartProvider>
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}


export default App
