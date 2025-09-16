import { json } from "express";
import Book from "../models/Book.js";

export const postBook = async (req, res) => {
  try {
    const { title, author, publishedYear, price, available } = req.body;
    console.log(title, author, publishedYear, price, available);
    const newBook = new Book({
      title,
      author,
      publishedYear,
      price,
      available,
    });

    const savedBook = await newBook.save();
    res.status(200).json({
      message: "Book Added",
      book: savedBook,
    });

    // res.end('createBook')
  } catch (error) {
    res.status(500).json({
      message: "Failed to get book",
      error: error,
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.status(200).json({
      message: "All Books",
      allBooks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get Books",
      error,
    });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Use findById correctly
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

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookData = req.body;

    // ✅ Correct usage of findByIdAndUpdate
    const updatedBook = await Book.findByIdAndUpdate(id, bookData, {
      new: true, // return updated doc
      runValidators: true, // validate updates against schema
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



export const deleteBook = async(req,res) =>{
    try {
        const id = req.params.id

        const deletedBook = await Book.findByIdAndDelete(id)

        if(!deletedBook){
            res.json({
                message : 'Book Not Found'
            })
        }

        res.json({
            message : 'Book deleted successfully',
            deletedBook
        })
    } catch (error) {
        res.json(error)
    }
}


