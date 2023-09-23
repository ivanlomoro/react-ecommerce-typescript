import { Col, Row } from "react-bootstrap"
import { StoreProduct } from "../components/StoreProduct"
import storeProducts from "../data/products.json"

export function Store () {
    return (
        <><h1>Store</h1>
        <Row md={2} xs={1} lg={3} className="g-3">
            {storeProducts.map(item =>(
                <Col key={item.id}>
                <StoreProduct {...item} />
                </Col>
            ))}
        </Row>
        </>
    )
}