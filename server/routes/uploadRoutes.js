const express = require("express");

const upload = require("../middleware/upload");
const protect = require("../middleware/protect");

const { uploadAvatar } = require("../controllers/uploadController");

const router = express.Router();

router.post(
  "/avatar",
  protect,
  upload.single("image"),
  uploadAvatar
);

module.exports = router;