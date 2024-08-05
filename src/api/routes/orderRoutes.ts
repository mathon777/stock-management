import express from "express";
import { OrderController } from "../controllers/OrderController";
import { AwilixContainer } from "awilix";

const router = express.Router();

export default (container: AwilixContainer) => {
  const orderController = container.resolve<OrderController>("orderController");

  router.post("/orders", (req, res) => orderController.createOrder(req, res));

  return router;
};
