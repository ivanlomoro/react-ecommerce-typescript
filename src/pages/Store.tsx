import { Col, Container, Row } from "react-bootstrap";
import { StoreProduct } from "../components/StoreProduct/StoreProduct";
import { FC, useEffect, useState } from "react"; 
import { Header } from "../components/Header/Header";
import { StoreProductsProps } from "../types/product";

export const Store: FC = () => {
    const [topSalesProducts, setTopSalesProducts] = useState<StoreProductsProps[]>([]);
    const [randomMoreProducts, setRandomMoreProducts] = useState<StoreProductsProps[]>([]);

    useEffect(() => {
        fetch("http://localhost:3001/products?topSale=true")
            .then((response) => response.json())
            .then((data: StoreProductsProps[]) => {
                setTopSalesProducts(data);
            })
            .catch((error) => {
                console.error("Error al obtener productos top sales:", error);
            });

        fetch("http://localhost:3001/products")
            .then((response) => response.json())
            .then((data: StoreProductsProps[]) => {
                const moreProducts = data.filter((product) => !product.topSale);
                const shuffledMoreProducts = shuffleArray(moreProducts);
                setRandomMoreProducts(shuffledMoreProducts);
            })
            .catch((error) => {
                console.error("Error al obtener todos los productos:", error);
            });
    }, []);

    const shuffleArray = (array: StoreProductsProps[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    return (
        <>
            <Header />
            <Container className="mb-4 mt-4">
                <h2 className="color-light">Top Sales</h2>
                <Row md={2} xs={1} lg={3} className="g-3">
                    {topSalesProducts.map((item) => (
                        <Col key={item.id}>
                            <StoreProduct {...item} />
                        </Col>
                    ))}
                </Row>

                <h2>More Products</h2>
                <Row md={2} xs={1} lg={3} className="g-3">
                    {randomMoreProducts.map((item) => (
                        <Col key={item.id}>
                            <StoreProduct {...item} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};
