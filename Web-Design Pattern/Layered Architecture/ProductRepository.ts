import { CreateProductDTO, Product } from "./Product";


export interface IProductRespository{
    saveProduct(productDTO:CreateProductDTO):Promise<Product>;

}
export class ProductRepository implements IProductRespository {
    private db = new Map<string, Product>();

   async  saveProduct(dto:CreateProductDTO) : Promise<Product>{
        const id = crypto.randomUUID();
        const product:Product = {
            id,
            name: dto.name,
            price: dto.price,
            stock: dto.stock
        }
        this.db.set(id, product);
        return product;
    }
}