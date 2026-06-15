const Post = require("../models/Post");


// Create Post
const createPost = async (req, res) => {
  try {
    const { title, content, tags, coverImage } = req.body;

    const post = await Post.create({
      title,
      content,
      tags,
      coverImage,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Posts
// const getPosts = async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate("author", "name email avatar")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: posts.length,
//       posts,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// const getPosts = async (req, res) => {
//   try {
//     const search = req.query.search || "";

//     const query = {
//       $or: [
//         {
//           title: {
//             $regex: search,
//             $options: "i",
//           },
//         },
//         {
//           content: {
//             $regex: search,
//             $options: "i",
//           },
//         },
//         {
//           tags: {
//             $regex: search,
//             $options: "i",
//           },
//         },
//       ],
//     };

//     const posts = await Post.find(query)
//       .populate("author", "name email avatar")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: posts.length,
//       posts,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// Get Single Post
// const getPostById = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id)
//       .populate("author", "name email avatar");

//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: "Post not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       post,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const getPosts = async (req, res) => {
  try {
    const search = req.query.search || "";

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const query = {
      $or: [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          content: {
            $regex: search,
            $options: "i",
          },
        },
        {
          tags: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

    const totalPosts = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .populate("author", "name email avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Single Post
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email avatar");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Owner check
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Owner check
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userId = req.user._id;

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post unliked",
        likesCount: post.likes.length,
      });
    }

    post.likes.push(userId);

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post liked",
      likesCount: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// console.log("getPostById type:", typeof getPostById);
module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLikePost,
};