export type CardProductProps={
    id:number,
    quantity:number
}

export type ShoppingCartProps={
    isOpen: boolean
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

