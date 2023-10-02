import { Link } from "react-router-dom"
import "./Banner.styles.css"

export function Banner() {
    return (
        <section id="banner">
            <h1>Home of the <br />World's Best Funkos!</h1>
            <div className="btn-banner">
                <Link to="/store" key="store">
                    <button className="btn-big">Buy Now !</button>
                </Link>
                <Link to="/login" key="login">
                    <button className="btn-big">Log In !</button>
                </Link>
            </div>
        </section>
    )
}