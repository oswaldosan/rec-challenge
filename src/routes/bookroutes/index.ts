// src/routes/booksRoutes.ts
import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/booksController";

const router = express.Router();

// Define book routes
router.get("/", getBooks);
router.get("/:bookId", getBookById);
router.post("/", createBook);
router.put("/:bookId", updateBook);
router.delete("/:bookId", deleteBook);

export default router;
