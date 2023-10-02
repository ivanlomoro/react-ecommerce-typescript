import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../types/context/ShoppingCartContext";
import { CardProduct } from "../CardProduct/CardProduct";
import { formatCurrency } from "../../utils/formatCurrency";
import storeProducts from "../../data/products.json"
import { ShoppingCartProps } from "../../types/product";



export function ShoppingCart({isOpen}: ShoppingCartProps) {
    const { closeCart, cartProducts } = useShoppingCart();

    return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>   
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartProducts.map(item => (
                    <CardProduct key= {item.id} {...item}/>
                ))}
                <div className="ms-auto fw-bold fs-5">
                    Total {formatCurrency(cartProducts.reduce((total,cartProduct) =>{
                            const product = storeProducts.find(i => i.id === cartProduct.id)
                            return total + (product?.price || 0) * cartProduct.quantity
                    },0)
                    )}
                </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
    )
}