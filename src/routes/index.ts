import express from "express";
import restaurantRoutes from "./restaurantRoutes";

const router = express.Router();

// Add additional routes as needed
router.use("/restaurants/", restaurantRoutes);

export default router;
