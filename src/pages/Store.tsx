import { useEffect, useState } from "react";
import { StoreProductsProps } from "../types/product";
import { Header } from "../components/Header/Header";
import { Col, Container, Row } from "react-bootstrap";
import { StoreProduct } from "../components/StoreProduct/StoreProduct";

export function Store() {
    const [products, setProducts] = useState<StoreProductsProps[]>([]);
    const [productDetails, setProductDetails] = useState<StoreProductsProps[]>([]);


    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then((response) => response.json())
            .then((data: StoreProductsProps[]) => {
                setProducts(data);
                setProductDetails(data);
                console.log("Product details:", data);
            })
            .catch((error) => {
                console.error("Error al obtener productos:", error);
            });
    }, []);


    return (
        <>
        <Header/>
        <Container className="mb-4 mt-4">
                <h2 className="color-light">Top Sales</h2>
                <Row md={2} xs={1} lg={3} className="g-3">
                {products.filter((product) => product.topSale === true).map((product) => (
                        <Col key={product.id}>
                            <StoreProduct {...product}/>
                        </Col>
                    ))}
                </Row>

                <h2>More Products</h2>
                <Row md={2} xs={1} lg={3} className="g-3">
                {products.filter((product) => product.topSale !== true).map((product) => (
                        <Col key={product.id}>
                            <StoreProduct {...product}/>
                        </Col>
                    ))}
                </Row>
        </Container>
        </>
    );
}
