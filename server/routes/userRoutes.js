const express = require("express");

const {
getProfile,
updateProfile,
getUserPosts,
} = require("../controllers/userController");

const protect = require("../middleware/protect");

const router = express.Router();

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.get("/:id/posts", getUserPosts);

module.exports = router;
