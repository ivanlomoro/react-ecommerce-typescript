import { Col, Container, Row } from "react-bootstrap"
import { StoreProduct } from "../components/StoreProduct"
import storeProducts from "../data/products.json"
import { FC } from "react"
import { Header } from "../components/Header/Header"
import { StoreProductsProps } from "../types/product"

export const  Store:FC<StoreProductsProps> = () => {
    return (
        <>
        <Header />
        <Container className="mb-4 mt-4">
        <Row md={2} xs={1} lg={3} className="g-3">
            {storeProducts.map(item =>(
                <Col key={item.id}>
                <StoreProduct {...item} />
                </Col>
            ))}
        </Row>
        </Container>
        </>
    )
}