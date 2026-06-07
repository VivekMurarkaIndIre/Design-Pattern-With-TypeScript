import { Product, CreateProductDTO } from "./Product";



export interface IProductRepository {
    getProducts(): Promise<Product[]>;
    saveProduct(product: CreateProductDTO): Promise<void>;
    findProductById(id: string): Promise<Product | null>;
}