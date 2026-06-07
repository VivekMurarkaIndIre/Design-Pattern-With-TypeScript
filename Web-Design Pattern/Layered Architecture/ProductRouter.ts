import {Router} from "express";
import {ProductController} from "./ProductController";
import { Product } from "./Product";

export function createProductRoute(controller: ProductController): Router {

    const route= Router();
    Router.post("/save",(req,res) =>{
        const{name, price, stock}= req.body()
        const product:Product = {
            id: uuid(),
            name, price, stock
        }
        controller.saveProduct(product)
    })
    route.get("/",(req,res) => controller.getProduct())
    route.get("/{id}",(req,res) =>controller.findProductById(id))
}