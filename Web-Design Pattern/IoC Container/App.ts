import express from "express";
import "./registrations";
import { container } from "./Container";

import { ProductController } from "./ProductController";
import { createRoute } from "./router";

const app = express();
app.use(express.json());


const productController = container.resolve<ProductController>("ProductController");
app.use("/products", createRoute(productController));

app.listen(3000, () => console.log("Running on http://localhost:3000"));