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
}

export type ShoppingCartProviderProps={
    children: ReactNode
}

export type CartProduct={
    id:number,
    quantity:number
}

