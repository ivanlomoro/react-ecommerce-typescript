import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useShoppingCart } from "../../types/context/ShoppingCartContext";
import { StoreProductsProps } from "../../types/product";
import { Row, Col } from "react-bootstrap";

export function DetailsProduct() {
    const { productId } = useParams<{ productId: string }>();
    const { getProductDetails } = useShoppingCart();
    const [product, setProduct] = useState<StoreProductsProps | undefined>(undefined);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const parsedProductId = parseInt(productId || "0", 10);
            const details = await getProductDetails(parsedProductId);

            if (details) {
                setProduct(details);
            } else {
                console.error("Detalles del producto no encontrados.");
            }
        };

        fetchProductDetails();
    }, [productId, getProductDetails]);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            {product ? (
                <div className="border p-4" style={{ maxWidth: "400px" }}>
                    <h2 className="text-center">Detalles del Producto</h2>
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
                    <p>Nombre: {product.name}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Categoría: {product.category}</p>
                </div>
            ) : (
                <p>Cargando detalles del producto...</p>
            )}
        </div>
    );
}
