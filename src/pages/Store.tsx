import { StoreComponent } from "../components/StoreComponent/StoreComponent";
import { Header } from "../components/Header/Header";
import { StoreProductsProps } from "../types/product";
import { FC } from "react";

export interface StoreProps {
    products: StoreProductsProps[];
  }

export const Store: FC<StoreProps> = () => {

    return (
        <>
            <Header />
            <StoreComponent  />
        </>
    );
}
