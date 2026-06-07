import { IProductService } from "./IProductService";
import { CreateProductDTO } from "./Product";

export class ProductController {
    constructor(private productService: IProductService) {}

    async getProducts() {
        return await this.productService.getProducts();
    }

    async saveProduct(product: CreateProductDTO) {
        await this.productService.saveProduct(product);
    }

    async findProductById(id: string) {
        return await this.productService.findProductById(id);
    }
}