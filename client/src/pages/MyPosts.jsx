import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getMyPosts } from "../api/userApi";
import {
  deletePost,
} from "../api/postApi";


const MyPosts = () => {
  const { user } = useSelector(
    (state) => state.auth
  );

  const [posts, setPosts] = useState([]);
const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await deletePost(id);

      setPosts(
        posts.filter(
          (post) => post._id !== id
        )
      );

    //   alert("Post deleted successfully");
        toast.success("Post deleted successfully");
    } catch (error) {
    //   alert(
    //     error.response?.data?.message ||
    //     "Failed to delete post"
    //   );
        toast.error("Failed to delete post");
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getMyPosts(
          user._id
        );

        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        My Posts
      </h1>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-4 rounded shadow mb-4"
          >
            <h2 className="text-xl font-bold">
              {post.title}
            </h2>

            <p className="mb-4">
              {post.content.slice(0, 100)}
              ...
            </p>

            <div className="flex gap-3">
  <Link
    to={`/edit-post/${post._id}`}
    className="bg-yellow-500 text-white px-3 py-1 rounded"
  >
    Edit
  </Link>

  <button
    onClick={() =>
      handleDelete(post._id)
    }
    className="bg-red-500 text-white px-3 py-1 rounded"
  >
    Delete
  </button>
</div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyPosts;