const User = require("../models/User");
const Post = require("../models/Post");

// // GET /api/users/profile
// // const getProfile = async (req, res) => {
// // try {
// // const user = await User.findById(req.user._id);

// ```
// res.status(200).json({
//   success: true,
//   user,
// });
// ```

// } catch (error) {
// res.status(500).json({
// success: false,
// message: error.message,
// });
// }
// };
const getProfile = async (req, res) => {
  try {
    console.log("req.user =", req.user);

    const user = await User.findById(req.user._id);

    console.log("user =", user);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

// PUT /api/users/profile
// const updateProfile = async (req, res) => {
// try {
// const { name, bio, avatar } = req.body;

// ```
// const user = await User.findById(req.user._id);

// if (!user) {
//   return res.status(404).json({
//     success: false,
//     message: "User not found",
//   });
// }

// user.name = name || user.name;
// user.bio = bio || user.bio;
// user.avatar = avatar || user.avatar;

// await user.save();

// res.status(200).json({
//   success: true,
//   user,
// });
// ```

// } catch (error) {
// res.status(500).json({
// success: false,
// message: error.message,
// });
// }
// };
const updateProfile = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.avatar = avatar || user.avatar;

    await user.save();

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/users/:id/posts
// const getUserPosts = async (req, res) => {
// try {
// const posts = await Post.find({
// author: req.params.id,
// }).sort({ createdAt: -1 });

// ```
// res.status(200).json({
//   success: true,
//   count: posts.length,
//   posts,
// });
// ```

// } catch (error) {
// res.status(500).json({
// success: false,
// message: error.message,
// });
// }
// };
const getUserPosts = async (req, res) => {
  try {
    console.log("PARAM ID:", req.params.id);

    const posts = await Post.find({
      author: req.params.id,
    }).sort({ createdAt: -1 });

    console.log("POSTS FOUND:", posts.length);

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("GET USER POSTS ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

module.exports = {
getProfile,
updateProfile,
getUserPosts,
};
