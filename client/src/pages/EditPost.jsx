import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getPostById,
  updatePost,
} from "../api/postApi";

const EditPost = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data =
          await getPostById(id);

        const post = data.post;

        setFormData({
          title: post.title,
          content: post.content,
          tags:
            post.tags?.join(", ") || "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePost(id, {
        title: formData.title,
        content: formData.content,
        tags: formData.tags
          .split(",")
          .map((tag) =>
            tag.trim()
          ),
      });

      toast.success("Post Updated Successfully");

      navigate("/my-posts");
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to update post"
      );
    }
  };

  if (loading) {
    return (
      <h2>Loading post...</h2>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">
        Edit Post
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="10"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;