import { ShoppingCartProvider } from "./types/context/ShoppingCartContext"
import { RouterPaths } from "./routes/RouterPaths.routes"

function App(props:any){
  return (
    <ShoppingCartProvider {...props}>
          <RouterPaths {...props}/>
    </ShoppingCartProvider>
    
  )
}


export default App
