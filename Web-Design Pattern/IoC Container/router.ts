import {Response, Request, Router} from "express";
import {ProductController} from "./ProductController";



export function createRoute(productController: ProductController) :Router {
    const router = require("express").Router();


router.get("/", async (req: Request, res: Response) => {
    const products = await productController.getProducts();
    res.json(products);
});

router.post("/", async (req: Request, res: Response) => {
    const productData = req.body;
    await productController.saveProduct(productData);
    res.status(201).send("Product created");
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await productController.findProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send("Product not found");
    }
});

return router;
}

