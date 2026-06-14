const User = require("./models/User");
const Post = require("./models/Post");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully",
  });
});


// Test User Route
app.get("/test-user", async (req, res) => {
  try {
    const user = await User.create({
      name: "Aditya",
      email: "aditya@gmail.com",
      password: "123456",
      bio: "MERN Developer",
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// PORT
const PORT = process.env.PORT || 5000;


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});