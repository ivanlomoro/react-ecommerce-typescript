import { ShoppingCartProvider } from "./types/context/ShoppingCartContext"
import { RouterPaths } from "./routes/RouterPaths.routes"
/* import { FC } from "react" */
import { StoreProductsProps } from "./types/product"
import { ToastContainer } from 'react-toastify';

function App(props:StoreProductsProps){
  return (
    <div>
      <ShoppingCartProvider {...props}>
        <RouterPaths {...props} />
      </ShoppingCartProvider>
      <ToastContainer />
    </div>
  )
}

/* const App: FC<StoreProductsProps> = (props) => {
  return (
    <ShoppingCartProvider {...props}>
      <RouterPaths {...props} />
    </ShoppingCartProvider>
  );
} */



export default App
