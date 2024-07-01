// src/controllers/booksController.ts
import { Request, Response } from "express";
import Book from "../../models/Restaurants";

// Get all books
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get a book by ID
export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json(book);
  } catch (error) {
    console.error("Error getting book by ID:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Create a new book
export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update a book by ID
export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete a book by ID
export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
    if (!deletedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json(deletedBook);
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Internal Server Error");
  }
};
