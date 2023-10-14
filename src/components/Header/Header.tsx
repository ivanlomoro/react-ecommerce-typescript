import { Link, useNavigate } from "react-router-dom"
import "./Header.styles.css"
import { FiLogOut, FiShoppingCart } from 'react-icons/fi';
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../auth/context/authContext";
import { useShoppingCart } from "../../types/context/useShoopingCart";


export function Header() {
    const { openCart, cartQuantity } = useShoppingCart()
    const { user, logout }: AuthContextType = useContext(AuthContext);

    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/login", {
            replace: true,
        });
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <img src="/icono_page.png" alt="Icono" width="80" height="70" style={{ borderRadius: '50%' }} />
                </Link>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/store">Store</Link>
                    <Link to="/search">Search</Link>
                </nav>
                <div className="cart">
                    <span className="user-info">
                        Welcome back, {user && user?.name + " !" || 'Guest'}
                    </span>
                    <div className="user-icon">
                        <img src="/src/assets/imgs/animation/anime4.jpg" alt="Icon" />
                    </div>

                    <button style={{ width: "3rem", height: "3rem", position: "relative", border: "none", backgroundColor: "transparent" }} onClick={() => {
                        localStorage.clear();
                        onLogout();
                        window.location.reload();
                    }} >
                        <FiLogOut size={35} />
                    </button>
                    {cartQuantity >= 0 && (
                        <button
                            onClick={openCart}
                            style={{ width: "3rem", height: "3rem", position: "relative", border: "none", backgroundColor: "transparent" }}
                        >
                            <FiShoppingCart size={35} />
                            <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center" style={{ color: "white", width: "1.8rem", height: "1.8rem", position: "absolute", bottom: 30, right: 0, transform: "translate(30%,25%)", fontSize: "1.2rem" }}>
                                {cartQuantity}
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}