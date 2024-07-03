// src/routes/booksRoutes.ts
import express from "express";
import {
  createReservation,
  getAll,
} from "../../controllers/reservationController";

const router = express.Router();

// Define rest routes
router.get("/", getAll);
router.post("/create", createReservation);

export default router;
