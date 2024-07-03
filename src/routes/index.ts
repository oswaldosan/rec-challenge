import express from "express";
import restaurantRoutes from "./restaurantRoutes";
import reservationRoutes from "./reservationRoutes";

const router = express.Router();

// Add additional routes as needed
router.use("/restaurants/", restaurantRoutes);
router.use("/reservation/", reservationRoutes);

export default router;
