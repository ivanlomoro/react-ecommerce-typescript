import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useShoppingCart } from "../../types/context/ShoppingCartContext";
import { StoreProductsProps } from "../../types/product";
import { Row, Col } from "react-bootstrap";
import { PiKeyReturnBold } from 'react-icons/pi'
import "./DetailsProduct.styles.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function DetailsProduct() {
    const { productId } = useParams<{ productId: string }>();
    const { getProductDetails, increaseCartQuantity } = useShoppingCart();
    const [product, setProduct] = useState<StoreProductsProps | undefined>(undefined);


    useEffect(() => {
        const fetchProductDetails = async () => {
            const parsedProductId = parseInt(productId || "0", 10);
            const details = await getProductDetails(parsedProductId);

            if (details) {
                setProduct(details);
            } else {
                console.error("Product details not found.");
            }
        };

        fetchProductDetails();
    }, [productId, getProductDetails]);

    return (
        <div className="d-flex justify-content-center align-items-center">
            {product ? (
                <div className="details-product-container">
                    <div>
                        <button className="store-btn back-button" onClick={() => window.history.back()}>
                            <PiKeyReturnBold size={20} /> Back
                        </button>
                        <h2 className="text-center">Details Product</h2>
                        <Row>
                            <Col>
                                <img
                                    src={product.imgUrl}
                                    alt={product.name}
                                    className="mx-auto d-block"
                                    style={{ maxWidth: "100%", height: "auto" }}
                                />
                            </Col>
                            <Col>
                                <img
                                    src={product.imgUrlAlt}
                                    alt={product.name}
                                    className="mx-auto d-block"
                                    style={{ maxWidth: "100%", height: "auto" }}
                                />
                            </Col>
                        </Row>

                        <p className="product-name">Name: {product.name}</p>
                        <p className="product-price">Price: ${product.price}</p>
                        <p className="product-description">Description: {product.description}</p>
                        <button
                            className="store-btn add-to-cart-button"
                            onClick={() => {
                                increaseCartQuantity(product.id);
                                toast.success('Product added to cart !', {
                                    position: 'top-right',
                                    autoClose: 2000,
                                });
                            }}
                        >
                            + Add To Cart
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading product´s details...</p>
            )}
        </div>
    );
}
