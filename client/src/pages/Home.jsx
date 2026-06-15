// import { useEffect, useState } from "react";

// import { getPosts } from "../api/postApi";

// import PostCard from "../components/PostCard";

// const Home = () => {
//   const [posts, setPosts] = useState([]);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const data = await getPosts();

//         setPosts(data.posts);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <h2>Loading posts...</h2>;
//   }

//   return (
//     <div>
//       <h1 className="text-4xl font-bold mb-6">
//         Latest Posts
//       </h1>

//       <div className="grid gap-6">
//         {posts.length > 0 ? (
//           posts.map((post) => (
//             <PostCard
//               key={post._id}
//               post={post}
//             />
//           ))
//         ) : (
//           <p>No posts found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

// Inline PostCard styled for the new design
const BlogCard = ({ post }) => {
//   const wordCount = post.content?.split(" ").length || 0;
//   const readTime = Math.max(1, Math.ceil(wordCount / 200));

//   return (
//     <article
//       style={{
//         background: "#fff",
//         borderRadius: "12px",
//         padding: "28px 32px",
//         borderLeft: "3px solid #e2e8f0",
//         boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
//         transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
//         cursor: "pointer",
//       }}
//       onMouseEnter={e => {
//         e.currentTarget.style.borderLeftColor = "#6366f1";
//         e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.1), 0 2px 8px rgba(0,0,0,0.06)";
//         e.currentTarget.style.transform = "translateY(-2px)";
//       }}
//       onMouseLeave={e => {
//         e.currentTarget.style.borderLeftColor = "#e2e8f0";
//         e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
//         e.currentTarget.style.transform = "translateY(0)";
//       }}
//     >
//       {/* Tags */}
//       {post.tags?.length > 0 && (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
//           {post.tags.slice(0, 3).map((tag, i) => (
//             <span
//               key={i}
//               style={{
//                 background: "#eef2ff",
//                 color: "#4f46e5",
//                 fontSize: "11px",
//                 fontWeight: "600",
//                 letterSpacing: "0.06em",
//                 textTransform: "uppercase",
//                 padding: "3px 10px",
//                 borderRadius: "20px",
//               }}
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       )}

//       {/* Title */}
//       <h2
//         style={{
//           fontFamily: "Georgia, 'Times New Roman', serif",
//           fontSize: "22px",
//           fontWeight: "700",
//           color: "#0f172a",
//           lineHeight: "1.35",
//           marginBottom: "10px",
//         }}
//       >
//         {post.title}
//       </h2>

//       {/* Excerpt */}
//       <p
//         style={{
//           color: "#64748b",
//           fontSize: "15px",
//           lineHeight: "1.65",
//           marginBottom: "20px",
//         }}
//       >
//         {post.content?.slice(0, 160)}…
//       </p>

//       {/* Footer */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: "10px",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           {post.author?.avatar ? (
//             <img
//               src={post.author.avatar}
//               alt={post.author.name}
//               style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }}
//             />
//           ) : (
//             <div
//               style={{
//                 width: "30px",
//                 height: "30px",
//                 borderRadius: "50%",
//                 background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "#fff",
//                 fontWeight: "700",
//                 fontSize: "12px",
//               }}
//             >
//               {post.author?.name?.[0]?.toUpperCase() || "?"}
//             </div>
//           )}
//           <span style={{ color: "#475569", fontSize: "13px", fontWeight: "500" }}>
//             {post.author?.name}
//           </span>
//           <span style={{ color: "#cbd5e1", fontSize: "13px" }}>·</span>
//           <span style={{ color: "#94a3b8", fontSize: "13px" }}>{readTime} min read</span>
//         </div>

//         <Link
//           to={`/posts/${post._id}`}
//           style={{
//             color: "#6366f1",
//             fontWeight: "600",
//             fontSize: "14px",
//             textDecoration: "none",
//             display: "flex",
//             alignItems: "center",
//             gap: "4px",
//           }}
//         >
//           Read article
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M5 12h14M12 5l7 7-7 7"/>
//           </svg>
//         </Link>
//       </div>
//     </article>
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

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 5,
        ...(debouncedSearch && { search: debouncedSearch }),
      });
      const response = await api.get(`/posts?${params}`);
      const data = response.data;
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setTotalPosts(data.totalPosts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          padding: "64px 24px 72px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(99,102,241,0.2)",
              border: "1px solid rgba(99,102,241,0.35)",
              borderRadius: "20px",
              padding: "5px 14px",
              marginBottom: "24px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
            <span style={{ color: "#a5b4fc", fontSize: "13px", fontWeight: "600", letterSpacing: "0.05em" }}>
              Developer Blog
            </span>
          </div>

          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: "700",
              color: "#f8fafc",
              lineHeight: "1.2",
              marginBottom: "16px",
            }}
          >
            Ideas worth reading
          </h1>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "17px",
              lineHeight: "1.7",
              marginBottom: "36px",
            }}
          >
            Tutorials, deep dives, and dev stories from the community.
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "480px", margin: "0 auto" }}>
            <svg
              style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search posts by title, content, or tag…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px 14px 46px",
                borderRadius: "10px",
                border: "1px solid rgba(99,102,241,0.3)",
                background: "rgba(255,255,255,0.06)",
                color: "#f1f5f9",
                fontSize: "15px",
                outline: "none",
                backdropFilter: "blur(8px)",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.background = "rgba(255,255,255,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(99,102,241,0.3)"; e.target.style.background = "rgba(255,255,255,0.06)"; }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Results header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "22px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              {debouncedSearch ? `Results for "${debouncedSearch}"` : "Latest Posts"}
            </h2>
            {!loading && (
              <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "4px" }}>
                {totalPosts} {totalPosts === 1 ? "article" : "articles"} found
              </p>
            )}
          </div>
          {debouncedSearch && (
            <button
              onClick={() => setSearch("")}
              style={{
                background: "none",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "6px 14px",
                color: "#64748b",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Clear search
            </button>
          )}
        </div>

        {/* Posts */}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[1, 2, 3].map(i => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "28px 32px",
                  borderLeft: "3px solid #e2e8f0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ background: "#f1f5f9", height: "12px", borderRadius: "6px", width: "80px", marginBottom: "16px" }} />
                <div style={{ background: "#f1f5f9", height: "20px", borderRadius: "6px", width: "70%", marginBottom: "10px" }} />
                <div style={{ background: "#f1f5f9", height: "14px", borderRadius: "6px", width: "100%", marginBottom: "8px" }} />
                <div style={{ background: "#f1f5f9", height: "14px", borderRadius: "6px", width: "90%" }} />
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {posts.map(post => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              background: "#fff",
              borderRadius: "12px",
              border: "1px dashed #cbd5e1",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>✍️</div>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "20px", color: "#0f172a", marginBottom: "8px" }}>
              No posts found
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "15px" }}>
              {debouncedSearch ? "Try a different search term." : "Be the first to write something."}
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "48px",
            }}
          >
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                background: currentPage === 1 ? "#f8fafc" : "#fff",
                color: currentPage === 1 ? "#cbd5e1" : "#374151",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.15s",
              }}
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((item, idx) =>
                item === "..." ? (
                  <span key={`ellipsis-${idx}`} style={{ color: "#94a3b8", padding: "0 4px" }}>…</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setCurrentPage(item)}
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "8px",
                      border: currentPage === item ? "none" : "1px solid #e2e8f0",
                      background: currentPage === item ? "#6366f1" : "#fff",
                      color: currentPage === item ? "#fff" : "#374151",
                      fontWeight: currentPage === item ? "700" : "500",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "all 0.15s",
                    }}
                  >
                    {item}
                  </button>
                )
              )}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                background: currentPage === totalPages ? "#f8fafc" : "#fff",
                color: currentPage === totalPages ? "#cbd5e1" : "#374151",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.15s",
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
