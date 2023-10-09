import { formatCurrency } from "../../utils/formatCurrency";
import { useShoppingCart } from "../../types/context/ShoppingCartContext";
import { StoreProductsProps } from "../../types/product";
import { useState } from "react";
import { Link } from "react-router-dom";
import './StoreProduct.styles.css'

export function StoreProduct({ id, name, price, imgUrl, imgUrlAlt, }: StoreProductsProps) {
  const { getProductQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  const quantity = getProductQuantity(id);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="card h-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`}>
        <img
          className="card-img-top"
          src={isHovered ? imgUrlAlt : imgUrl}
          height="250px"
          style={{ objectFit: "contain" }}
          alt={name}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <div className="card-title d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2 align-items">{name}</span>
          <span className="ms-2 text-bold price-product">{formatCurrency(price)}</span>
        </div>
        <div className="mt-auto d-flex align-items-center justify-content-center">
            <button className="store-btn" onClick={() => increaseCartQuantity(id)}>+ Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
