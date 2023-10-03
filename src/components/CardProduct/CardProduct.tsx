import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../../types/context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { CardProductProps, StoreProductsProps } from "../../types/product";

export function CardProduct({ id, quantity }: CardProductProps) {
    const { removeFromCart, decreaseCartQuantity, increaseCartQuantity, getProductDetails  } = useShoppingCart();
    const [productDetails, setProductDetails] = useState<StoreProductsProps | undefined>(undefined);

    useEffect(() => {
        async function fetchProductDetails() {
            const details = await getProductDetails(id);
            setProductDetails(details);
        }

        fetchProductDetails();
    }, [id, getProductDetails]);

    if (!productDetails) {
        return <div>Loading...</div>;
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
