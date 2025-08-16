// require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config()


import express from 'express'
import cors from 'cors'
import {connectToMongoDB} from './db/dbConfig.js'
import RegisterLoginRouter from './routers/registerLogin.js'
import BookRouter from './routers/bookRouter.js'

connectToMongoDB()
const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());

app.use(express.json());

app.use('/api',RegisterLoginRouter)
app.use('/api/books',BookRouter)

app.use("/", (req, res) => {
  res.end("server");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
