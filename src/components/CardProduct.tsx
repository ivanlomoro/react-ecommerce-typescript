import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeProducts from "../data/products.json"
import { formatCurrency } from "../utils/formatCurrency"

type CardProductProps={
    id:number,
    quantity:number
}

export function CardProduct ({ id, quantity }: CardProductProps){
    const { removeFromCart } = useShoppingCart()
    const product = storeProducts.find(i => i.id === id)
    if (product ==null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={product.imgUrl} style={{width: "125px", height: "75px", objectFit:"cover"}}/>   
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
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(product.id)}>
                &times;
            </Button>
        </Stack>
    )
}