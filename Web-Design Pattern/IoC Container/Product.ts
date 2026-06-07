export type Product = {
    id: string, name: string, price: number, stock: number
}

export type CreateProductDTO = {
    name :string,
    price: number,
    stock:number 
}