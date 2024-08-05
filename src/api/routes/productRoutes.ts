import express from "express";
import { AwilixContainer } from "awilix";
import { ProductController } from "../controllers/ProductController";

const router = express.Router();

export default (container: AwilixContainer) => {
  const productController =
    container.resolve<ProductController>("productController");

  router.get("/products", (req, res) =>
    productController.getProducts(req, res),
  );
  router.post("/products", (req, res) =>
    productController.createProduct(req, res),
  );
  router.post("/products/:id/restock", (req, res) =>
    productController.restockProduct(req, res),
  );
  router.post("/products/:id/sell", (req, res) =>
    productController.sellProduct(req, res),
  );

  return router;
};
