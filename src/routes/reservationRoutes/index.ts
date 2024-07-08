// src/routes/booksRoutes.ts
import express from "express";
import {
  createReservation,
  deleteReservation,
  getAll,
  getOne,
} from "../../controllers/reservationController";

const router = express.Router();

// Define rest routes
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", createReservation);
router.delete("/:id", deleteReservation);

export default router;
