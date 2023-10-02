import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../../types/context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { ShoppingCartProps, StoreProductsProps } from "../../types/product";
import { Offcanvas, Stack } from "react-bootstrap";
import { CardProduct } from "../CardProduct/CardProduct";

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartProducts } = useShoppingCart();
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [productDetails, setProductDetails] = useState<StoreProductsProps[] | null>(null);

    const getProductDetails = async (productId: number): Promise<StoreProductsProps | undefined> => {
        try {
            const productsApiUrl = "http://localhost:3001/products";
            const response = await fetch(`${productsApiUrl}/${productId}`);
            if (response.ok) {
                const data = await response.json();
                return data as StoreProductsProps;
            } else {
                console.error(`Error al obtener detalles del producto (código de respuesta ${response.status})`);
                return undefined;
            }
        } catch (error) {
            console.error("Error al obtener detalles del producto:", error);
            return undefined;
        }
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            const productDetailsPromises = cartProducts.map((item) => getProductDetails(item.id));
            const resolvedProductDetails = await Promise.all(productDetailsPromises);
            const productDetailsArray = resolvedProductDetails.filter((item) => item !== undefined) as StoreProductsProps[];
    
            setProductDetails(productDetailsArray);
        };
    
        fetchProductDetails();
    }, [cartProducts]);
    

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
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartProducts.length === 0 ? (
                    <div className="text-center">The cart is empty.</div>
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
                    </Stack>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}