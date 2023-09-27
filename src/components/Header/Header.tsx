import { Link } from "react-router-dom"
import "./Header.styles.css"
import { useShoppingCart } from "../../types/context/ShoppingCartContext"

export function Header(){
    const { openCart, cartQuantity } = useShoppingCart()
    return(
        <header>
        <div className="contenedor">
            <img src="src/components/Header/imgs/icono_page.png" alt="Icono" width="80" height="70" style={{ borderRadius: '50%' }}/>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/store">Store</Link>
                <Link to="/login">Login</Link>
            </nav>
            <div className="carrito">
                {cartQuantity > 0 && (
                        <button
                            onClick={openCart}
                            style={{ width: "3rem", height: "3rem", position: "relative" }}
                            className="rounded-circle"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{ color: "white", width: "1.5rem", height: "1.5rem", position: "absolute", bottom: 0, right: 0, transform: "translate(25%,25%)" }}>
                                {cartQuantity}
                            </div>
                        </button>
                    )}
            </div>
        </div>
    </header>
    )
}