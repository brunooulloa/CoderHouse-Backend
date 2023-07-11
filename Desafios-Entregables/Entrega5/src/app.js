import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
