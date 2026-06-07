import express from "express";
import { ProductController } from "./ProductController";
import { ProductRepository } from "./ProductRepository";
import { createProductRoute } from "./ProductRouter";
import { ProductService } from "./ProductService";

const app = express();
const repo = new ProductRepository();
const service = new ProductService(repo);
const controller = new ProductController(service);

app.use("/product", createProductRoute(controller));

app.listen(3000, () => console.log("Server is running on port 3000"));  