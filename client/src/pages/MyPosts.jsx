// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// import { getMyPosts } from "../api/userApi";
// import {
//   deletePost,
// } from "../api/postApi";


// const MyPosts = () => {
//   const { user } = useSelector(
//     (state) => state.auth
//   );

//   const [posts, setPosts] = useState([]);
// const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this post?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await deletePost(id);

//       setPosts(
//         posts.filter(
//           (post) => post._id !== id
//         )
//       );

//     //   alert("Post deleted successfully");
//         toast.success("Post deleted successfully");
//     } catch (error) {
//     //   alert(
//     //     error.response?.data?.message ||
//     //     "Failed to delete post"
//     //   );
//         toast.error("Failed to delete post");
//     }
//   };
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const data = await getMyPosts(
//           user._id
//         );

//         setPosts(data.posts);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     if (user) {
//       fetchPosts();
//     }
//   }, [user]);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">
//         My Posts
//       </h1>

//       {posts.length === 0 ? (
//         <p>No posts yet.</p>
//       ) : (
//         posts.map((post) => (
//           <div
//             key={post._id}
//             className="bg-white p-4 rounded shadow mb-4"
//           >
//             <h2 className="text-xl font-bold">
//               {post.title}
//             </h2>

//             <p className="mb-4">
//               {post.content.slice(0, 100)}
//               ...
//             </p>

//             <div className="flex gap-3">
//   <Link
//     to={`/edit-post/${post._id}`}
//     className="bg-yellow-500 text-white px-3 py-1 rounded"
//   >
//     Edit
//   </Link>

//   <button
//     onClick={() =>
//       handleDelete(post._id)
//     }
//     className="bg-red-500 text-white px-3 py-1 rounded"
//   >
//     Delete
//   </button>
// </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MyPosts;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getMyPosts } from "../api/userApi";
import { deletePost } from "../api/postApi";

const MyPosts = () => {
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getMyPosts(user._id);
        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchPosts();
  }, [user]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete post");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  const wordCount = (content) => content?.split(" ").length || 0;
  const readTime = (content) => Math.max(1, Math.ceil(wordCount(content) / 200));

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .edit-btn:hover { background: #fef08a !important; border-color: #eab308 !important; }
        .delete-btn:hover { background: #fee2e2 !important; border-color: #ef4444 !important; color: #ef4444 !important; }
        .confirm-delete:hover { background: #dc2626 !important; }
        .cancel-btn:hover { background: #f1f5f9 !important; }
        .post-card:hover { box-shadow: 0 8px 24px rgba(99,102,241,0.1), 0 2px 8px rgba(0,0,0,0.06) !important; border-left-color: #6366f1 !important; transform: translateY(-2px); }
        .write-new:hover { background: #4f46e5 !important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

        {/* Hero banner */}
        <div style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          padding: "48px 24px 72px",
        }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
            }}>
              <div>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(99,102,241,0.2)",
                  border: "1px solid rgba(99,102,241,0.35)",
                  borderRadius: "20px",
                  padding: "4px 12px",
                  marginBottom: "16px",
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
                  <span style={{ color: "#a5b4fc", fontSize: "12px", fontWeight: "600", letterSpacing: "0.05em" }}>
                    Your writing
                  </span>
                </div>

                <h1 style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(28px, 5vw, 40px)",
                  fontWeight: "700",
                  color: "#f8fafc",
                  lineHeight: "1.2",
                  margin: 0,
                }}>
                  My Posts
                </h1>
                {!loading && (
                  <p style={{ color: "#64748b", fontSize: "14px", marginTop: "8px" }}>
                    {posts.length === 0
                      ? "You haven't written anything yet"
                      : `${posts.length} ${posts.length === 1 ? "article" : "articles"} published`}
                  </p>
                )}
              </div>

              <Link
                to="/create-post"
                className="write-new"
                style={{
                  background: "#6366f1",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "10px 20px",
                  borderRadius: "9px",
                  fontWeight: "600",
                  fontSize: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  transition: "background 0.15s",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                Write new post
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 80px" }}>

          {/* Loading skeletons */}
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "-28px" }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "24px 28px",
                    borderLeft: "3px solid #e2e8f0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ background: "#f1f5f9", height: "18px", borderRadius: "6px", width: "60%", marginBottom: "12px" }} />
                  <div style={{ background: "#f1f5f9", height: "13px", borderRadius: "6px", width: "100%", marginBottom: "8px" }} />
                  <div style={{ background: "#f1f5f9", height: "13px", borderRadius: "6px", width: "80%" }} />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (

            /* Empty state */
            <div style={{
              marginTop: "-28px",
              background: "#fff",
              borderRadius: "16px",
              padding: "64px 24px",
              textAlign: "center",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              border: "1px dashed #cbd5e1",
            }}>
              <div style={{ fontSize: "44px", marginBottom: "16px" }}>✍️</div>
              <h2 style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "22px",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "8px",
              }}>
                No posts yet
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "15px", marginBottom: "28px" }}>
                Share your knowledge with the developer community.
              </p>
              <Link
                to="/create-post"
                style={{
                  background: "#6366f1",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "11px 24px",
                  borderRadius: "9px",
                  fontWeight: "600",
                  fontSize: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                Write your first post
              </Link>
            </div>

          ) : (

            /* Posts list */
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "-28px" }}>
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="post-card"
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "24px 28px",
                    borderLeft: "3px solid #e2e8f0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
                  }}
                >
                  {/* Top row: title + actions */}
                  <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Tags */}
                      {post.tags?.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px" }}>
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              style={{
                                background: "#eef2ff",
                                color: "#4f46e5",
                                fontSize: "10px",
                                fontWeight: "600",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                padding: "2px 8px",
                                borderRadius: "20px",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        to={`/posts/${post._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <h2
                          style={{
                            fontFamily: "Georgia, 'Times New Roman', serif",
                            fontSize: "19px",
                            fontWeight: "700",
                            color: "#0f172a",
                            lineHeight: "1.35",
                            marginBottom: "8px",
                            margin: "0 0 8px",
                          }}
                        >
                          {post.title}
                        </h2>
                      </Link>

                      <p style={{
                        color: "#64748b",
                        fontSize: "14px",
                        lineHeight: "1.6",
                        margin: "0 0 14px",
                      }}>
                        {post.content?.slice(0, 120)}…
                      </p>

                      {/* Meta row */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}>
                        <span style={{ color: "#94a3b8", fontSize: "12px" }}>
                          {readTime(post.content)} min read
                        </span>
                        <span style={{ color: "#e2e8f0" }}>·</span>
                        <span style={{ color: "#94a3b8", fontSize: "12px" }}>
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </span>
                        {post.likes?.length > 0 && (
                          <>
                            <span style={{ color: "#e2e8f0" }}>·</span>
                            <span style={{
                              color: "#94a3b8",
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="#f87171" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                              </svg>
                              {post.likes.length}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexShrink: 0,
                    }}>
                      <Link
                        to={`/edit-post/${post._id}`}
                        className="edit-btn"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "7px 14px",
                          borderRadius: "8px",
                          border: "1.5px solid #fde68a",
                          background: "#fefce8",
                          color: "#92400e",
                          fontWeight: "600",
                          fontSize: "13px",
                          textDecoration: "none",
                          transition: "background 0.15s, border-color 0.15s",
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit
                      </Link>

                      {confirmId === post._id ? (
                        /* Inline confirm */
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          background: "#fff5f5",
                          border: "1.5px solid #fecaca",
                          borderRadius: "8px",
                          padding: "5px 10px",
                        }}>
                          <span style={{ color: "#ef4444", fontSize: "12px", fontWeight: "600", whiteSpace: "nowrap" }}>
                            Delete?
                          </span>
                          <button
                            onClick={() => handleDelete(post._id)}
                            disabled={deletingId === post._id}
                            className="confirm-delete"
                            style={{
                              background: "#ef4444",
                              color: "#fff",
                              border: "none",
                              borderRadius: "6px",
                              padding: "4px 10px",
                              fontWeight: "600",
                              fontSize: "12px",
                              cursor: deletingId === post._id ? "not-allowed" : "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              transition: "background 0.15s",
                            }}
                          >
                            {deletingId === post._id ? (
                              <div style={{
                                width: "12px", height: "12px",
                                borderRadius: "50%",
                                border: "2px solid rgba(255,255,255,0.3)",
                                borderTopColor: "#fff",
                                animation: "spin 0.7s linear infinite",
                              }} />
                            ) : "Yes"}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="cancel-btn"
                            style={{
                              background: "none",
                              border: "none",
                              color: "#64748b",
                              fontWeight: "600",
                              fontSize: "12px",
                              cursor: "pointer",
                              padding: "4px 6px",
                              borderRadius: "6px",
                              transition: "background 0.15s",
                            }}
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(post._id)}
                          className="delete-btn"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            padding: "7px 14px",
                            borderRadius: "8px",
                            border: "1.5px solid #fecaca",
                            background: "#fff5f5",
                            color: "#b91c1c",
                            fontWeight: "600",
                            fontSize: "13px",
                            cursor: "pointer",
                            transition: "background 0.15s, border-color 0.15s, color 0.15s",
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                          </svg>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyPosts;
