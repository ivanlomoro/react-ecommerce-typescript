import { Col, Container, Row } from "react-bootstrap";
import { StoreProduct } from "../components/StoreProduct/StoreProduct";
import storeProducts from "../data/products.json";
import { FC, useEffect, useState } from "react"; 
import { Header } from "../components/Header/Header";
import { StoreProductsProps } from "../types/product";

export const Store: FC<StoreProductsProps> = () => {
    const topSalesProducts = storeProducts.filter((product) => product.topSale);
    const moreProducts = storeProducts.filter((product) => !product.topSale);

    const [randomMoreProducts, setRandomMoreProducts] = useState<StoreProductsProps[]>([]);

    const shuffleMoreProducts = () => {
        const shuffled = [...moreProducts];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        setRandomMoreProducts(shuffleMoreProducts());
           //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
