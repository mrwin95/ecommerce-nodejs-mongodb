import express from "express";

const router = express.Router();

// create a route signup
router.post("/shop/signup", (req, res) => {
  res.send("Signup route");
});

export default router;
