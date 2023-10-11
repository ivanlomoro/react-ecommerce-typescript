import { Link, useNavigate } from "react-router-dom"
import "./Header.styles.css"
import "../ModalLogin/ModalLogin.styles.css"
import { useShoppingCart } from "../../types/context/ShoppingCartContext"
import { FiShoppingCart } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { ModalLogin } from "../ModalLogin/ModalLogin";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/authContext";


export function Header() {
    const { openCart, cartQuantity } = useShoppingCart()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };

    const { user, logout } = useContext(AuthContext);

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
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                        <ul className="navbar-nav ml-auto">
                            <span className="nav-item nav-link text-primary">
                                Welcome back, {user && user?.name || 'Guest'}
                            </span>

                            <button className="nav-item nav-link btn" onClick={onLogout}>
                                Logout
                            </button>
                        </ul>
                    </div>
                </nav>
                <div className="cart">
                    <button style={{ width: "3rem", height: "3rem", position: "relative", border: "none", backgroundColor: "transparent" }}>
                        <AiOutlineHeart size={35} />
                    </button>
                    <button style={{ width: "3rem", height: "3rem", position: "relative", border: "none", backgroundColor: "transparent" }} onClick={toggleModal} >
                        <BiUser size={35} />
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
            {modalIsOpen && <ModalLogin isOpen={modalIsOpen} onClose={toggleModal} />}        </header>
    )
}