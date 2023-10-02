import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../../types/context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { CardProductProps, StoreProductsProps } from "../../types/product";

export function CardProduct({ id, quantity }: CardProductProps) {
    const { removeFromCart, decreaseCartQuantity, increaseCartQuantity } = useShoppingCart();
    const [productDetails, setProductDetails] = useState<StoreProductsProps | null>(null);

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await fetch(`http://localhost:3001/products/${id}`);
                if (!response.ok) {
                    throw new Error("Error al obtener detalles del producto");
                }
                const data = await response.json();
                setProductDetails(data);
            } catch (error) {
                console.error("Error al obtener detalles del producto:", error);
            }
        }

        fetchProductDetails();
    }, [id]);

    if (!productDetails) {
        return <div>Cargando...</div>;
    }

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
                        {productDetails.name}{" "}
                        {quantity > 1 && (
                            <span className="text-muted" style={{ fontSize: ".75rem" }}>
                                x{quantity}
                            </span>
                        )}
                    </div>
                    <div className="text-muted" style={{ fontSize: ".75rem" }}>
                        {formatCurrency(productDetails.price)}
                    </div>
                    <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => decreaseCartQuantity(id)}
                    >
                        -
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => increaseCartQuantity(id)}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="text-end">
                {formatCurrency(productDetails.price * quantity)}
            </div>
            <button
                className="btn btn-outline-danger"
                onClick={() => removeFromCart(id)}
            >
                &times;
            </button>
        </div>
    );
}
