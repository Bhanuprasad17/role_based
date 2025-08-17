// const bcrypt = require('bcrypt')
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // If email/password not provided → Bad Request
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    // User not found → 404 Not Found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // Password mismatch → 401 Unauthorized
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Create token if valid
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Success → 200 OK
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    // Server error → 500 Internal Server Error
    return res.status(500).json({
      message: "Internal server error",
      error: error.message, // you can remove in prod to avoid leaking info
    });
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
