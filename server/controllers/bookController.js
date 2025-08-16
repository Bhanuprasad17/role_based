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
    // console.log(id,'param')

    const book = await Book.findById({ _id: id });

    if (!book) {
      res.json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book",
      book,
    });
    // res.json('book')
  } catch (error) {
    res.json({
      message: "Failed to get the book",
      error: error,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const bookData = req.body;
    const updatedBook = await Book.findByIdAndUpdate({ _id: id }, bookData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    console.log(updatedBook);

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });

  } catch (error) {
     res.status(500).json({ message: "Error updating book", error });
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


