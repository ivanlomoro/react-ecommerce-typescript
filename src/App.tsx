import { ShoppingCartProvider } from "./types/context/ShoppingCartContext"
import { RouterPaths } from "./routes/RouterPaths.routes"
/* import { FC } from "react" */
import { StoreProductsProps } from "./types/product"

function App(props:StoreProductsProps){
  return (
    <ShoppingCartProvider {...props}>
          <RouterPaths {...props}/>
    </ShoppingCartProvider>
    
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
