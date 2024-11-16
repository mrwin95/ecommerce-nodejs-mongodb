import express from "express";
import accessController from "../../controllers/access.controller";
import { asyncHandler } from "../../middlewares/error.handler";

const router = express.Router();

// create a route signup
router.post("/shop/signup", asyncHandler(accessController.signUp));

// create a route signup
router.post("/shop/login", asyncHandler(accessController.login));

export default router;
