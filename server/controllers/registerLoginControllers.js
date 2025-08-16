// const bcrypt = require('bcrypt')
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({ email });

    if (!user) {
      res.json({
        message: "User not found",
      });
    }

    console.log(user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role : user.role
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      message: "Login successful",
      user : {
        id : user._id,
        name : user.name,
        email : user.email,
        role : user.role
      },
      token,
    });
  } catch (error) {
    res.end(error);
  }
};
export const registerController = async (req, res) => {
  try {
    const { username, email, password,role } = req.body;

    // Check if email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role : savedUser.role
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
};


export const getUsers = async(req,res) =>{
    try {
        const user = req.user 
        // res.end('getUser')
        res.json({
            message : 'user Data fetched successfully',
            user
        })
    } catch (error) {
        res.json({
            message : error
        })
    }
}
