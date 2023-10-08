import React from "react";
import { useShoppingCart } from "../../types/context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { CardProductProps } from "../../types/product";
import './CardProduct.styles.css'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";


export function CardProduct({ id, quantity, productDetails }: CardProductProps) {
    const { removeFromCart, decreaseCartQuantity, increaseCartQuantity } = useShoppingCart();

    return (
        <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
            <div className="d-flex align-items-center">
                <img
                    src={productDetails.imgUrl}
                    alt={productDetails.name}
                    style={{ width: "75px", height: "75px", objectFit: "contain" }}
                />
                <div className="ms-3">
                    <div>
                        <span className="product-name">
                            {productDetails.name}{" "}
                        </span>
                        {quantity > 1 && (
                            <span className="text-muted" style={{ fontSize: ".75rem" }}>
                                x{quantity}
                            </span>
                        )}
                    </div>
                    <div className="text-muted" style={{ fontSize: "1rem", marginLeft:"1rem" }}>
                        {formatCurrency(productDetails.price)}
                    </div>
                    <button
                        className="btn-style"
                        onClick={() => decreaseCartQuantity(id)}
                    >
                        <AiOutlineMinus />
                    </button>
                    <button
                        className="btn-style"
                        onClick={() => increaseCartQuantity(id)}
                    >
                        <AiOutlinePlus />
                    </button>
                </div>
            </div>
            <div className="text-end" style={{ fontSize: "1.5rem" }}>
                {formatCurrency(productDetails.price * quantity)}
            </div>
            <button
                className="btn-style"
                onClick={() => removeFromCart(id)}
            >
                <BiTrashAlt />
            </button>
        </div>
    );
}
