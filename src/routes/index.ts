import express from "express";
import accessRoutes from "./access/index";
import apiKey from "../auth/check-auth";

const router = express.Router();

// apiKey middleware
router.use(apiKey.apiKey);
router.use(apiKey.checkPermission("0000"));
// check Permission middleware

router.use("/api/v1", accessRoutes);

export default router;
