import {container} from "./Container";
import {IProductRepository} from "./IProductRepository";
import {IProductService} from "./IProductService";
import {ProductRepository} from "./ProductRepository";
import {ProductService} from "./ProductService";
import { ProductController } from "./ProductController";

container.register<IProductRepository>("IProductRepository", () => new ProductRepository());
container.register<IProductService>("IProductService", () => new ProductService(container.resolve("IProductRepository")));
container.register("ProductController", () => {
    const productService = container.resolve<IProductService>("IProductService");
    return new ProductController(productService);
});