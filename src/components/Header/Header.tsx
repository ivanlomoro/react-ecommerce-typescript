import { Link, useNavigate } from "react-router-dom"
import "./Header.styles.css"
import { FiLogOut, FiShoppingCart } from 'react-icons/fi';
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../auth/context/authContext";
import { useShoppingCart } from "../../types/context/useShoopingCart";
import { BiHomeAlt2 } from "react-icons/bi";
import { LuStore } from 'react-icons/lu'
import { BsSearch } from "react-icons/bs";

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
                    <img src="/icono_page.png" className="img-icon" alt="Icono" />
                </Link>
                <nav>
                    <Link to="/">
                        <div className="nav-icon">
                            <BiHomeAlt2 />
                        </div>
                        <span className="nav-text">Home</span>
                    </Link>
                    <Link to="/store">
                        <div className="nav-icon">
                            <LuStore />
                        </div>
                        <span className="nav-text">Store</span>
                    </Link>
                    <Link to="/search">
                        <div className="nav-icon">
                            <BsSearch />
                        </div>
                        <span className="nav-text">Search</span>
                    </Link>
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
                        <FiLogOut className="logout-icon" />
                    </button>
                    {cartQuantity >= 0 && (
                        <button
                            onClick={openCart}
                            className="cart-button"
                        >
                            <FiShoppingCart className="cart-icon" />
                            <div className="cart-counter">
                                {cartQuantity}
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}