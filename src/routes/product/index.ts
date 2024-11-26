import express from "express";
import productController from "../../controllers/product.controller";

const router = express.Router();

// apiKey middleware

router.post("/product", productController.createProduct);

export default router;
