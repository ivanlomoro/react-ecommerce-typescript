export type CardProductProps={
    id:number
    quantity:number
    productDetails: StoreProductsProps;
}

export type ShoppingCartProps={
    isOpen: boolean
    cartProducts: CartProduct[];
}

export type StoreProductsProps ={
    id:number
    name:string
    price:number
    imgUrl:string
    imgUrlAlt:string
    category:number
    topSale:boolean
}

export type ShoppingCartProviderProps={
    children: ReactNode
}

export type CartProduct={
    id:number,
    quantity:number
}

