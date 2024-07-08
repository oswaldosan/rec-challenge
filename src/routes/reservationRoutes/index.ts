// src/routes/booksRoutes.ts
import express from "express";
import {
  createReservation,
  getAll,
  getOne,
} from "../../controllers/reservationController";

const router = express.Router();

// Define rest routes
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/create", createReservation);

export default router;
