import { IProductRepository } from "./IProductRepository";
import { IProductService } from "./IProductService";
import { Product, CreateProductDTO } from "./Product";

export class ProductService implements IProductService {
    constructor(private productRepository: IProductRepository) { }

    async getProducts(): Promise<Product[]> {
        return this.productRepository.getProducts();
    }

    async saveProduct(product: CreateProductDTO): Promise<void> {
        await this.productRepository.saveProduct(product);
    }

    async findProductById(id: string): Promise<Product | null> {
        return this.productRepository.findProductById(id);
    }
}