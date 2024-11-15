import express from "express";
import accessRoutes from "./access/index";

const router = express.Router();

router.use("/api/v1", accessRoutes);
// router.get("/", (req, res) => {
//   res.send("Hello World!");
// });

export default router;
