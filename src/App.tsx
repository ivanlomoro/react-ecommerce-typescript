import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap" 
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { Banner } from "./components/Banner/Banner"
import { Header } from "./components/Header/Header"

function App(){
  return (
    <ShoppingCartProvider>
      <Header />
     {/*  <Navbar /> */}
      <Banner />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
    
  )
}


export default App
