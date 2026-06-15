import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getPostById, toggleLike } from "../api/postApi";
import {
  getComments,
  createComment,
  deleteComment,
} from "../api/commentApi";
const PostDetails = () => {
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
const [commentText, setCommentText] =
  useState("");

  const fetchComments = async () => {
  try {
    const data = await getComments(id);

    setComments(data.comments);
  } catch (error) {
    console.error(error);
  }
};
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data.post);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);
  
  const handleCommentSubmit = async (
  e
) => {
  e.preventDefault();

  if (!commentText.trim()) return;

  try {
    await createComment(
      id,
      commentText
    );

    setCommentText("");

    fetchComments();
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteComment = async (
  commentId
) => {
  try {
    await deleteComment(commentId);

    fetchComments();
  } catch (error) {
    console.error(error);
  }
};
  const handleLike = async () => {
    try {
      await toggleLike(post._id);

      const updatedPost = await getPostById(post._id);

      setPost(updatedPost.post);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!post) {
    return <h2>Post not found</h2>;
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        {post.title}
      </h1>

      <p className="text-gray-600 mb-4">
        By {post.author?.name}
      </p>

      {/* Like Button */}
      {user && (
        <div className="mb-6">
          <button
            onClick={handleLike}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            ❤️ {post.likes?.length || 0} Likes
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-600 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      <p className="leading-8 whitespace-pre-wrap">
        {post.content}
        <div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    Comments
  </h2>

  {user && (
    <form
      onSubmit={handleCommentSubmit}
      className="mb-6"
    >
      <textarea
        value={commentText}
        onChange={(e) =>
          setCommentText(e.target.value)
        }
        placeholder="Write a comment..."
        className="w-full border p-3 rounded"
      />

      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Comment
      </button>
    </form>
  )}

  <div className="space-y-4">
    {comments.map((comment) => (
      <div
        key={comment._id}
        className="border rounded p-3"
      >
        <div className="flex justify-between">
          <strong>
            {comment.author?.name}
          </strong>

          {user &&
            user._id ===
              comment.author?._id && (
              <button
                onClick={() =>
                  handleDeleteComment(
                    comment._id
                  )
                }
                className="text-red-500"
              >
                Delete
              </button>
            )}
        </div>

        <p className="mt-2">
          {comment.content}
        </p>
      </div>
    ))}
  </div>
</div>
      </p>
    </div>
  );
};

export default PostDetails;