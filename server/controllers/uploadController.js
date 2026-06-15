const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    // Convert buffer to base64
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "dev-blog/avatars",
    });

    // Save URL to user
    const user = await User.findById(req.user._id);

    user.avatar = uploadedResponse.secure_url;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      avatar: uploadedResponse.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadAvatar,
};