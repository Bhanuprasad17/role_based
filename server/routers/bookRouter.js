
import express from 'express'
import { deleteBook, getAllBooks, getBook, postBook, updateBook } from '../controllers/bookController.js'
import { verifyUser } from '../middlewares/authMiddleware.js'
import { isAdmin } from '../middlewares/roleMiddleware.js'

const Router = express.Router()

Router.get('/getBook/:id',verifyUser,getBook)
Router.get('/getAllBooks',verifyUser,getAllBooks)
Router.post('/createBook',verifyUser,isAdmin,postBook)
Router.put('/updateBook/:id',verifyUser,isAdmin,updateBook)
Router.delete('/delete/:id',verifyUser,isAdmin,deleteBook)


export default Router