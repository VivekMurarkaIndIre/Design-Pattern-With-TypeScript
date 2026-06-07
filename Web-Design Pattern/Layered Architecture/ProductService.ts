import { CreateProductDTO, Product } from "./Product";
import { IProductRespository } from "./ProductRepository";

export class ProductService {

    constructor(private repo: IPRoductRespository){}

    async saveProduct(dto:CreateProductDTO):Promise<Product>{
        return this.repo.saveProduct(dto);
    }   

}