// src/routes/index.ts
import express from "express";
import booksRoutes from "./bookroutes";

const router = express.Router();

// Add additional routes as needed
router.use("/books", booksRoutes);

export default router;
