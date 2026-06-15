const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../controllers/authController");

const protect = require("../middleware/protect");

const router = express.Router();


// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);


// Protected Routes
router.post("/logout", protect, logoutUser);
router.get("/me", protect, getCurrentUser);


module.exports = router;