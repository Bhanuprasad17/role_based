import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        message: "authorization token is missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // console.log(token);

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // console.log(decodedToken);
    // console.log(decodedToken.name);

    const user = await User.findById(decodedToken.id).select("-password");

    if (!user) {
      res.json({
        message: "user not found",
      });
    }

    // console.log('userjai',user)
    req.user = user;
    next();
  } catch (error) {
    res.json({
        error
    })
  }
};
