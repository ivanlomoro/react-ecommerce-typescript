import "./Banner.styles.css"

export function Banner(){
    return(
        <section id="banner">
            <h1>Home of the <br />World's Best Funkos!</h1>
            <div className="btn-banner">
                <a href="/store" className="btn-big">Buy Now !</a>
                <a href="/login" className="btn-big">Log In !</a>
            </div>
        </section>
    )
}