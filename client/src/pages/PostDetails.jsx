// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// import { getPostById, toggleLike } from "../api/postApi";
// import {
//   getComments,
//   createComment,
//   deleteComment,
// } from "../api/commentApi";
// const PostDetails = () => {
//   const { id } = useParams();

//   const { user } = useSelector((state) => state.auth);

//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [comments, setComments] = useState([]);
// const [commentText, setCommentText] =
//   useState("");

//   const fetchComments = async () => {
//   try {
//     const data = await getComments(id);

//     setComments(data.comments);
//   } catch (error) {
//     console.error(error);
//   }
// };
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const data = await getPostById(id);
//         setPost(data.post);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//     fetchComments();
//   }, [id]);
  
//   const handleCommentSubmit = async (
//   e
// ) => {
//   e.preventDefault();

//   if (!commentText.trim()) return;

//   try {
//     await createComment(
//       id,
//       commentText
//     );

//     setCommentText("");

//     fetchComments();
//   } catch (error) {
//     console.error(error);
//   }
// };

// const handleDeleteComment = async (
//   commentId
// ) => {
//   try {
//     await deleteComment(commentId);

//     fetchComments();
//   } catch (error) {
//     console.error(error);
//   }
// };
//   const handleLike = async () => {
//     try {
//       await toggleLike(post._id);

//       const updatedPost = await getPostById(post._id);

//       setPost(updatedPost.post);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

//   if (!post) {
//     return <h2>Post not found</h2>;
//   }

//   return (
//     <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
//       <h1 className="text-4xl font-bold mb-4">
//         {post.title}
//       </h1>

//       <p className="text-gray-600 mb-4">
//         By {post.author?.name}
//       </p>

//       {/* Like Button */}
//       {user && (
//         <div className="mb-6">
//           <button
//             onClick={handleLike}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//           >
//             ❤️ {post.likes?.length || 0} Likes
//           </button>
//         </div>
//       )}

//       <div className="flex flex-wrap gap-2 mb-6">
//         {post.tags?.map((tag, index) => (
//           <span
//             key={index}
//             className="bg-blue-100 text-blue-600 px-2 py-1 rounded"
//           >
//             #{tag}
//           </span>
//         ))}
//       </div>

//       <p className="leading-8 whitespace-pre-wrap">
//         {post.content}
//         <div className="mt-10">
//   <h2 className="text-2xl font-bold mb-4">
//     Comments
//   </h2>

//   {user && (
//     <form
//       onSubmit={handleCommentSubmit}
//       className="mb-6"
//     >
//       <textarea
//         value={commentText}
//         onChange={(e) =>
//           setCommentText(e.target.value)
//         }
//         placeholder="Write a comment..."
//         className="w-full border p-3 rounded"
//       />

//       <button
//         type="submit"
//         className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Add Comment
//       </button>
//     </form>
//   )}

//   <div className="space-y-4">
//     {comments.map((comment) => (
//       <div
//         key={comment._id}
//         className="border rounded p-3"
//       >
//         <div className="flex justify-between">
//           <strong>
//             {comment.author?.name}
//           </strong>

//           {user &&
//             user._id ===
//               comment.author?._id && (
//               <button
//                 onClick={() =>
//                   handleDeleteComment(
//                     comment._id
//                   )
//                 }
//                 className="text-red-500"
//               >
//                 Delete
//               </button>
//             )}
//         </div>

//         <p className="mt-2">
//           {comment.content}
//         </p>
//       </div>
//     ))}
//   </div>
// </div>
//       </p>
//     </div>
//   );
// };

// export default PostDetails;

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getPostById, toggleLike } from "../api/postApi";
import { getComments, createComment, deleteComment } from "../api/commentApi";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [liking, setLiking] = useState(false);

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

  const handleLike = async () => {
    if (liking) return;
    setLiking(true);
    try {
      await toggleLike(post._id);
      const updatedPost = await getPostById(post._id);
      setPost(updatedPost.post);
    } catch (error) {
      console.error(error);
    } finally {
      setLiking(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      await createComment(id, commentText);
      setCommentText("");
      fetchComments();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const hasLiked = user && post?.likes?.some(
    (likeId) => likeId === user._id || likeId?._id === user._id
  );

  const wordCount = post?.content?.split(" ").length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "48px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          {/* Skeleton */}
          <div style={{ background: "#fff", borderRadius: "16px", padding: "48px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div style={{ background: "#f1f5f9", height: "14px", borderRadius: "6px", width: "100px", marginBottom: "24px" }} />
            <div style={{ background: "#f1f5f9", height: "36px", borderRadius: "8px", width: "80%", marginBottom: "12px" }} />
            <div style={{ background: "#f1f5f9", height: "36px", borderRadius: "8px", width: "55%", marginBottom: "32px" }} />
            <div style={{ background: "#f1f5f9", height: "14px", borderRadius: "6px", width: "100%", marginBottom: "10px" }} />
            <div style={{ background: "#f1f5f9", height: "14px", borderRadius: "6px", width: "95%", marginBottom: "10px" }} />
            <div style={{ background: "#f1f5f9", height: "14px", borderRadius: "6px", width: "88%" }} />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "24px", color: "#0f172a", marginBottom: "8px" }}>Post not found</h2>
          <p style={{ color: "#94a3b8", marginBottom: "24px" }}>This post may have been removed or doesn't exist.</p>
          <Link
            to="/"
            style={{
              background: "#6366f1", color: "#fff", textDecoration: "none",
              padding: "10px 20px", borderRadius: "8px", fontWeight: "600", fontSize: "14px",
            }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .like-btn:hover { transform: scale(1.04); }
        .like-btn:active { transform: scale(0.97); }
        .comment-submit:hover { background: #4f46e5 !important; }
        .delete-comment:hover { color: #ef4444 !important; }
        .back-link:hover { color: #6366f1 !important; }
        .tag-pill:hover { background: #e0e7ff !important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

        {/* Article hero banner */}
        <div style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          padding: "48px 24px 56px",
        }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>

            {/* Back link */}
            <Link
              to="/"
              className="back-link"
              style={{
                color: "#94a3b8", fontSize: "13px", fontWeight: "500",
                textDecoration: "none", display: "inline-flex", alignItems: "center",
                gap: "5px", marginBottom: "28px", transition: "color 0.15s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back to posts
            </Link>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="tag-pill"
                    style={{
                      background: "rgba(99,102,241,0.2)",
                      color: "#a5b4fc",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      border: "1px solid rgba(99,102,241,0.3)",
                      transition: "background 0.15s",
                      cursor: "default",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: "700",
              color: "#f8fafc",
              lineHeight: "1.25",
              marginBottom: "24px",
              margin: "0 0 24px 0",
            }}>
              {post.title}
            </h1>

            {/* Author row */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              {post.author?.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%",
                    objectFit: "cover", border: "2px solid rgba(99,102,241,0.5)",
                  }}
                />
              ) : (
                <div style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: "700", fontSize: "15px", flexShrink: 0,
                }}>
                  {post.author?.name?.[0]?.toUpperCase() || "?"}
                </div>
              )}
              <div>
                <div style={{ color: "#e2e8f0", fontWeight: "600", fontSize: "14px" }}>
                  {post.author?.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                  <span style={{ color: "#64748b", fontSize: "12px" }}>{readTime} min read</span>
                  <span style={{ color: "#334155", fontSize: "12px" }}>·</span>
                  <span style={{ color: "#64748b", fontSize: "12px" }}>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Like count badge in hero */}
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#f87171" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span style={{ color: "#94a3b8", fontSize: "13px", fontWeight: "500" }}>
                  {post.likes?.length || 0} likes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px 80px" }}>

          {/* Main article card */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "clamp(28px, 5vw, 52px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
            marginTop: "-28px",
            position: "relative",
          }}>
            {/* Article body */}
            <div style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "17px",
              lineHeight: "1.85",
              color: "#1e293b",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}>
              {post.content}
            </div>

            {/* Like button */}
            {user && (
              <div style={{
                marginTop: "40px",
                paddingTop: "32px",
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}>
                <button
                  onClick={handleLike}
                  disabled={liking}
                  className="like-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: hasLiked ? "1.5px solid #fca5a5" : "1.5px solid #e2e8f0",
                    background: hasLiked ? "#fff5f5" : "#fff",
                    color: hasLiked ? "#ef4444" : "#64748b",
                    fontWeight: "600",
                    fontSize: "14px",
                    cursor: liking ? "not-allowed" : "pointer",
                    transition: "all 0.15s ease",
                    opacity: liking ? 0.7 : 1,
                  }}
                >
                  <svg
                    width="16" height="16" viewBox="0 0 24 24"
                    fill={hasLiked ? "#ef4444" : "none"}
                    stroke={hasLiked ? "#ef4444" : "currentColor"}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  {hasLiked ? "Liked" : "Like"} · {post.likes?.length || 0}
                </button>
                <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                  {post.likes?.length === 1 ? "1 person liked this" : `${post.likes?.length || 0} people liked this`}
                </span>
              </div>
            )}

            {!user && (
              <div style={{
                marginTop: "40px",
                paddingTop: "28px",
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#94a3b8",
                fontSize: "14px",
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#cbd5e1" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {post.likes?.length || 0} likes ·{" "}
                <Link to="/login" style={{ color: "#6366f1", fontWeight: "600", textDecoration: "none" }}>
                  Sign in
                </Link>{" "}
                to like this post
              </div>
            )}
          </div>

          {/* Comments section */}
          <div style={{ marginTop: "32px" }}>
            <h2 style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "22px",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "20px",
            }}>
              Comments
              {comments.length > 0 && (
                <span style={{
                  marginLeft: "10px",
                  background: "#eef2ff",
                  color: "#6366f1",
                  fontSize: "13px",
                  fontWeight: "700",
                  padding: "2px 10px",
                  borderRadius: "20px",
                  verticalAlign: "middle",
                }}>
                  {comments.length}
                </span>
              )}
            </h2>

            {/* Comment form */}
            {user ? (
              <div style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px 24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                marginBottom: "20px",
              }}>
                <div style={{ display: "flex", gap: "12px" }}>
                  {/* User avatar */}
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{
                        width: "34px", height: "34px", borderRadius: "50%",
                        objectFit: "cover", flexShrink: 0, marginTop: "2px",
                      }}
                    />
                  ) : (
                    <div style={{
                      width: "34px", height: "34px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: "700", fontSize: "13px",
                      flexShrink: 0, marginTop: "2px",
                    }}>
                      {user.name?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}

                  <div style={{ flex: 1 }}>
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Share your thoughts…"
                      rows="3"
                      style={{
                        width: "100%",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "10px 14px",
                        fontSize: "14px",
                        lineHeight: "1.6",
                        color: "#0f172a",
                        resize: "vertical",
                        outline: "none",
                        fontFamily: "system-ui, sans-serif",
                        boxSizing: "border-box",
                        transition: "border-color 0.15s",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "#6366f1"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                      <button
                        onClick={handleCommentSubmit}
                        disabled={submitting || !commentText.trim()}
                        className="comment-submit"
                        style={{
                          background: "#6366f1",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          padding: "8px 18px",
                          fontWeight: "600",
                          fontSize: "13px",
                          cursor: submitting || !commentText.trim() ? "not-allowed" : "pointer",
                          opacity: submitting || !commentText.trim() ? 0.6 : 1,
                          transition: "background 0.15s",
                        }}
                      >
                        {submitting ? "Posting…" : "Post comment"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px 24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                marginBottom: "20px",
                textAlign: "center",
                color: "#64748b",
                fontSize: "14px",
              }}>
                <Link to="/login" style={{ color: "#6366f1", fontWeight: "600", textDecoration: "none" }}>
                  Sign in
                </Link>{" "}
                to join the conversation
              </div>
            )}

            {/* Comments list */}
            {comments.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "40px 24px",
                background: "#fff",
                borderRadius: "12px",
                border: "1px dashed #cbd5e1",
                color: "#94a3b8",
                fontSize: "14px",
              }}>
                No comments yet — be the first to share your thoughts!
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    style={{
                      background: "#fff",
                      borderRadius: "12px",
                      padding: "16px 20px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      borderLeft: "3px solid #f1f5f9",
                    }}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "10px",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {comment.author?.avatar ? (
                          <img
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            style={{
                              width: "30px", height: "30px", borderRadius: "50%",
                              objectFit: "cover", flexShrink: 0,
                            }}
                          />
                        ) : (
                          <div style={{
                            width: "30px", height: "30px", borderRadius: "50%",
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontWeight: "700", fontSize: "12px", flexShrink: 0,
                          }}>
                            {comment.author?.name?.[0]?.toUpperCase() || "?"}
                          </div>
                        )}
                        <div>
                          <span style={{ color: "#0f172a", fontWeight: "600", fontSize: "13px" }}>
                            {comment.author?.name}
                          </span>
                          <div style={{ color: "#94a3b8", fontSize: "11px", marginTop: "1px" }}>
                            {new Date(comment.createdAt).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "numeric",
                            })}
                          </div>
                        </div>
                      </div>

                      {user && user._id === comment.author?._id && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="delete-comment"
                          style={{
                            background: "none",
                            border: "none",
                            color: "#cbd5e1",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "2px 0",
                            transition: "color 0.15s",
                            flexShrink: 0,
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                          </svg>
                          Delete
                        </button>
                      )}
                    </div>

                    <p style={{
                      color: "#374151",
                      fontSize: "14px",
                      lineHeight: "1.65",
                      margin: 0,
                    }}>
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
