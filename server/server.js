require("dotenv").config();
// console.log("TOP ENV:", process.env.CLOUDINARY_CLOUD_NAME);

const commentRoutes = require("./routes/commentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
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
app.set("trust proxy", 1);

// Middleware
// app.use(cors());
// app.use(
//   cors({
//     // origin: "http://localhost:5173",
//     // origin: [
//     //   "http://localhost:5173",
//     //   process.env.CLIENT_URL,
//     // ],
//         origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );
const allowedOrigins = [
  "https://dev-blog-platform.vercel.app",
  /https:\/\/dev-blog-platform-.*\.vercel\.app$/,  // allows all preview URLs
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server
      const allowed = allowedOrigins.some((o) =>
        typeof o === "string" ? o === origin : o.test(origin)
      );
      if (allowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/comments", commentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
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