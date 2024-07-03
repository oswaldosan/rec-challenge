// src/routes/booksRoutes.ts
import express from "express";
import { getMatch } from "../../controllers/restaurantController";

const router = express.Router();

// Define rest routes
router.post("/", getMatch);

export default router;
