import express, { Express } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import productRoutes from "./api/routes/productRoutes";
import orderRoutes from "./api/routes/orderRoutes";
import { setupContainer } from "./container";
import { closeMongoClient } from "./infrastructure/mongo/mongoClient";

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3000;

setupContainer()
  .then((container) => {
    app.use("/api", productRoutes(container));
    app.use("/api", orderRoutes(container));

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to setup container", err);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  await closeMongoClient();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeMongoClient();
  process.exit(0);
});
