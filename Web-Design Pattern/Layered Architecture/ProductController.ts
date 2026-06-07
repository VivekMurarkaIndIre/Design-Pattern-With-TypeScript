import { CreateProductDTO, Product } from "./Product";
import { ProductService } from "./ProductService";

export class ProductController {

    constructor(private service: ProductService){}

    async getProduct(): Promise<Product> {
        return await this.service.getProduct();
    }

    async saveProduct(product:Product):Promise<void>{
        const dto:CreateProductDTO = {
            name: product.name,
            price: product.price,
            stock: product.stock
        }
        await this.service.saveProduct(dto);

    }

    async findProductById(id:string): Promise<Product | null> {
        return await this.service.findProductById(id);
    }

}