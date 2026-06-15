// import { Link } from "react-router-dom";

// const PostCard = ({ post }) => {
//   return (
//     <div className="bg-white p-5 rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-2">
//         {post.title}
//       </h2>

//       <p className="text-gray-600 mb-3">
//         By {post.author?.name}
//       </p>

//       <p className="mb-4">
//         {post.content.slice(0, 150)}...
//       </p>

//       <div className="flex flex-wrap gap-2 mb-4">
//         {post.tags?.map((tag, index) => (
//           <span
//             key={index}
//             className="bg-blue-100 text-blue-600 px-2 py-1 rounded"
//           >
//             #{tag}
//           </span>
//         ))}
//       </div>

//       <Link
//         to={`/posts/${post._id}`}
//         className="text-blue-600 font-medium"
//       >
//         Read More →
//       </Link>
//     </div>
//   );
// };

// export default PostCard;
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const wordCount = post.content?.split(" ").length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "28px 32px",
        borderLeft: "3px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderLeftColor = "#6366f1";
        e.currentTarget.style.boxShadow =
          "0 8px 24px rgba(99,102,241,0.1), 0 2px 8px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderLeftColor = "#e2e8f0";
        e.currentTarget.style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Tags */}
      {post.tags?.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "14px",
          }}
        >
          {post.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              style={{
                background: "#eef2ff",
                color: "#4f46e5",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: "20px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h2
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "22px",
          fontWeight: "700",
          color: "#0f172a",
          lineHeight: "1.35",
          marginBottom: "10px",
          margin: "0 0 10px 0",
        }}
      >
        {post.title}
      </h2>

      {/* Excerpt */}
      <p
        style={{
          color: "#64748b",
          fontSize: "15px",
          lineHeight: "1.65",
          marginBottom: "20px",
          margin: "0 0 20px 0",
        }}
      >
        {post.content?.slice(0, 160)}…
      </p>

      {/* Footer: author info + read link */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {/* Author + read time */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {post.author?.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "700",
                fontSize: "12px",
                flexShrink: 0,
              }}
            >
              {post.author?.name?.[0]?.toUpperCase() || "?"}
            </div>
          )}

          <span
            style={{ color: "#475569", fontSize: "13px", fontWeight: "500" }}
          >
            {post.author?.name}
          </span>

          <span style={{ color: "#cbd5e1", fontSize: "13px" }}>·</span>

          <span style={{ color: "#94a3b8", fontSize: "13px" }}>
            {readTime} min read
          </span>

          {post.likes?.length > 0 && (
            <>
              <span style={{ color: "#cbd5e1", fontSize: "13px" }}>·</span>
              <span
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="#f87171"
                  stroke="#f87171"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {post.likes.length}
              </span>
            </>
          )}
        </div>

        {/* Read more link */}
        <Link
          to={`/posts/${post._id}`}
          style={{
            color: "#6366f1",
            fontWeight: "600",
            fontSize: "14px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            flexShrink: 0,
          }}
        >
          Read article
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
