import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2">
        {post.title}
      </h2>

      <p className="text-gray-600 mb-3">
        By {post.author?.name}
      </p>

      <p className="mb-4">
        {post.content.slice(0, 150)}...
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-600 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      <Link
        to={`/posts/${post._id}`}
        className="text-blue-600 font-medium"
      >
        Read More →
      </Link>
    </div>
  );
};

export default PostCard;