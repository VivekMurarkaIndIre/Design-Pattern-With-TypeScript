import { IProductRepository } from "./IProductRepository";
import { Product, CreateProductDTO } from "./Product";
export class ProductRepository implements IProductRepository {
    private db = new Map<string, Product>();

   async  saveProduct(dto:CreateProductDTO) : Promise<void>{
        const id = crypto.randomUUID();
        const product:Product = {
            id,
            name: dto.name,
            price: dto.price,
            stock: dto.stock
        }
        this.db.set(id, product);
    }

    async getProducts(): Promise<Product[]> {
        return Array.from(this.db.values());
    }

    async findProductById(id: string): Promise<Product | null> {
        return this.db.get(id) || null;
    }
}