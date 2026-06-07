
export interface IProductService {
    getProducts(): Promise<Product[]>;
    saveProduct(product: CreateProductDTO): Promise<void>;
    findProductById(id: string): Promise<Product | null>;
}