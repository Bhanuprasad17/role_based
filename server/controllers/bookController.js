import Book from "../models/Book.js";

// 📌 Create Book
export const postBook = async (req, res) => {
  try {
    const { title, author, publishedYear, price, available } = req.body;

    if (!title || !author || !publishedYear || !price) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const newBook = new Book({
      title,
      author,
      publishedYear,
      price,
      available,
    });

    const savedBook = await newBook.save();

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: savedBook,
    });
  } catch (error) {
    console.error("Error adding book:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add book",
      error: error.message,
    });
  }
};

// 📌 Get All Books
export const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();

    return res.status(200).json({
      success: true,
      message: "All books retrieved successfully",
      data: allBooks,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get books",
      error: error.message,
    });
  }
};

// 📌 Get Single Book
export const getBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error fetching book:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get the book",
      error: error.message,
    });
  }
};

// 📌 Update Book
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true, // return updated doc
      runValidators: true, // validate updates
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating book",
      error: error.message,
    });
  }
};

// 📌 Delete Book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting book",
      error: error.message,
    });
  }
};
