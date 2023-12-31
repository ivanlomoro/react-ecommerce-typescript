import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { ShoppingCartProps, StoreProductsProps } from "../../types/product";
import { Offcanvas, Stack } from "react-bootstrap";
import { CardProduct } from "../CardProduct/CardProduct";
import { Link } from "react-router-dom";
import './ShoppingCart.styles.css'
import { useShoppingCart } from "../../types/context/useShoopingCart";

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartProducts, getProductDetails } = useShoppingCart();
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [productDetails, setProductDetails] = useState<StoreProductsProps[] | undefined>(undefined);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const productDetailsPromises = cartProducts.map((item) => getProductDetails(item.id));
            const resolvedProductDetails = await Promise.all(productDetailsPromises);
            const productDetailsArray = resolvedProductDetails.filter((item) => item !== undefined) as StoreProductsProps[];

            setProductDetails(productDetailsArray);
        };

        fetchProductDetails();
    }, [cartProducts, getProductDetails]);


    useEffect(() => {
        if (productDetails) {
            let total = 0;
            for (let i = 0; i < cartProducts.length; i++) {
                if (productDetails[i]) {
                    total += (productDetails[i].price || 0) * cartProducts[i].quantity;
                }
            }
            setTotalPrice(total);
        }
    }, [cartProducts, productDetails]);

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title style={{ fontSize: "2rem" }}>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartProducts.length === 0 ? (
                    <div className="text-center" style={{ fontSize: "1.5rem" }}>The cart is empty.</div>
                ) : (
                    <Stack gap={3}>
                        {productDetails && productDetails.length > 0 ? (
                            cartProducts.map((item) => {
                                const productDetail = productDetails.find((detail) => detail?.id === item.id);
                                if (productDetail && typeof item.id === 'number' && typeof item.quantity === 'number') {
                                    return (
                                        <CardProduct
                                            key={item.id}
                                            id={item.id}
                                            quantity={item.quantity}
                                            productDetails={productDetail as StoreProductsProps}
                                        />
                                    );
                                }
                                return null;
                            })
                        ) : (
                            <div className="text-center">Loading...</div>
                        )}

                        <div className="ms-auto fw-bold fs-5">
                            Total {formatCurrency(totalPrice || 0)}
                        </div>
                        <Link to="/checkout" key="checkout">
                            <div className="checkout-btn-container">
                                <button className="checkout-btn" onClick={closeCart}>Checkout</button>
                            </div>
                        </Link>
                    </Stack>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}
