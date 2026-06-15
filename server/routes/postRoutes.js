const express = require("express");

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
    toggleLikePost,

} = require("../controllers/postController");

const protect = require("../middleware/protect");

const router = express.Router();


// Public Routes
router.get("/", getPosts);
router.get("/:id", getPostById);


// Protected Routes
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.put("/:id/like", protect, toggleLikePost);

module.exports = router;