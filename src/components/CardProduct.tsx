import { useShoppingCart } from "../types/context/ShoppingCartContext"
import storeProducts from "../data/products.json"
import { CardProductProps } from "../types/product"
import { formatCurrency } from "../utils/formatCurrency"


export function CardProduct ({ id, quantity }: CardProductProps){
    const { removeFromCart } = useShoppingCart()
    const product = storeProducts.find(i => i.id === id)
    if (product ==null) return null

    return (
        <div className="hstack gap-2 d-flex align-items-center">
            <img src={product.imgUrl} style={{width: "125px", height: "75px", objectFit:"contain"}}/>   
        <div className="me-auto">
            <div>
                {product.name}{" "}
                {quantity > 1 && ( <span className="text-muted" style={{fontSize: ".65rem"}}>x{quantity}</span>)}
            </div>
            <div className="text-muted" style={{fontSize: ".75rem"}}>
                {formatCurrency(product.price)}
            </div>
        </div>
            <div>
                {formatCurrency(product.price * quantity)}
            </div>
            <button className="sm outline-danger"onClick={() => removeFromCart(product.id)}>
                &times;
            </button>
        </div>
    )
}