import { formatCurrency } from "../utils/formatCurrency"
import { useShoppingCart } from "../types/context/ShoppingCartContext"
import { StoreProductsProps } from "../types/product";


export function StoreProduct ({id,name,price,imgUrl}:StoreProductsProps){
    const { getProductQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart}= useShoppingCart()
    const quantity = getProductQuantity(id);
    return(
        <div className="card h-100">
            <img 
                className="card-img-top"
                src={imgUrl}
                height="250px"
                style={ {objectFit: "contain"}}
                />
            <div className="card-body d-flex flex-column">
                <div className="card-title d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2 align-items">{name}</span>
                    <span className="ms-2 text-bold">{formatCurrency(price)}</span>
                </div>
                <div className="mt-auto">
                   {quantity === 0 ? ( <button onClick={() => increaseCartQuantity(id)}>+ Add To Cart</button>
                   ) : <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem"}}>
                            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem"}}>
                                <button onClick={() => decreaseCartQuantity(id)}>-</button>
                                <div>
                                    <span className="fs-3">{quantity}</span> in cart
                                </div>
                                <button onClick={() => increaseCartQuantity(id)}>+</button>
                            </div>
                            <button className="bg-danger sm" onClick={() => removeFromCart(id)}>Remove</button>
                       </div>
                       } 
                </div>
            </div>
        </div>
    )
}