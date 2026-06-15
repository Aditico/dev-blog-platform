const express = require("express");

const protect = require("../middleware/protect");

const {
  createComment,
  getPostComments,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

// Create Comment
router.post("/:postId", protect, createComment);

// Get Comments of a Post
router.get("/:postId", getPostComments);

// Delete Comment
router.delete("/:commentId", protect, deleteComment);

module.exports = router;