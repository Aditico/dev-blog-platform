// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";

// import {
//   getPostById,
//   updatePost,
// } from "../api/postApi";

// const EditPost = () => {
//   const { id } = useParams();

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     tags: "",
//   });

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const data =
//           await getPostById(id);

//         const post = data.post;

//         setFormData({
//           title: post.title,
//           content: post.content,
//           tags:
//             post.tags?.join(", ") || "",
//         });
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await updatePost(id, {
//         title: formData.title,
//         content: formData.content,
//         tags: formData.tags
//           .split(",")
//           .map((tag) =>
//             tag.trim()
//           ),
//       });

//       toast.success("Post Updated Successfully");

//       navigate("/my-posts");
//     } catch (error) {
//       toast.error(
//         error.response?.data
//           ?.message ||
//           "Failed to update post"
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <h2>Loading post...</h2>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
//       <h1 className="text-3xl font-bold mb-6">
//         Edit Post
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4"
//       >
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//         />

//         <textarea
//           name="content"
//           value={formData.content}
//           onChange={handleChange}
//           rows="10"
//           className="w-full border p-3 rounded"
//         />

//         <input
//           type="text"
//           name="tags"
//           value={formData.tags}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//         />

//         <button
//           className="bg-yellow-500 text-white px-4 py-2 rounded"
//         >
//           Update Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditPost;

import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getPostById, updatePost } from "../api/postApi";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", content: "" });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        const post = data.post;
        const initial = { title: post.title, content: post.content };
        setFormData(initial);
        setOriginalData(initial);
        setTags(post.tags || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase().replace(/,/g, "");
      if (newTag && !tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
    if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) { toast.error("Title is required"); return; }
    if (!formData.content.trim()) { toast.error("Content is required"); return; }

    setSaving(true);
    try {
      await updatePost(id, {
        title: formData.title,
        content: formData.content,
        tags,
      });
      toast.success("Post updated!");
      navigate("/my-posts");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  const wordCount = formData.content.trim()
    ? formData.content.trim().split(/\s+/).length
    : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const hasChanges =
    originalData &&
    (formData.title !== originalData.title ||
      formData.content !== originalData.content);

  // Loading skeleton
  if (loading) {
    return (
      <>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
          <div style={{
            background: "#0f172a",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "0 24px", height: "56px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            position: "sticky", top: "60px", zIndex: 40,
          }}>
            <div style={{ background: "rgba(255,255,255,0.06)", height: "14px", width: "80px", borderRadius: "6px" }} />
            <div style={{ background: "rgba(99,102,241,0.3)", height: "34px", width: "100px", borderRadius: "8px" }} />
          </div>
          <div style={{ maxWidth: "760px", margin: "48px auto", padding: "0 24px" }}>
            <div style={{ background: "#fff", borderRadius: "16px", padding: "36px 40px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div style={{ background: "#f1f5f9", height: "36px", borderRadius: "8px", width: "70%", marginBottom: "24px" }} />
              <div style={{ background: "#f1f5f9", height: "42px", borderRadius: "9px", marginBottom: "16px" }} />
              <div style={{ background: "#f1f5f9", height: "300px", borderRadius: "8px" }} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .save-btn:hover:not(:disabled) { background: #4f46e5 !important; }
        .cancel-link:hover { color: #e2e8f0 !important; }
        .remove-tag:hover { background: rgba(99,102,241,0.4) !important; }
        .tag-input-wrap:focus-within { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.1) !important; }
        .title-input { font-family: Georgia, 'Times New Roman', serif; font-size: clamp(22px, 4vw, 32px); font-weight: 700; color: #0f172a; border: none; outline: none; width: 100%; resize: none; background: transparent; line-height: 1.3; padding: 0; }
        .title-input::placeholder { color: #cbd5e1; }
        .content-area { font-family: Georgia, 'Times New Roman', serif; font-size: 17px; line-height: 1.85; color: #1e293b; border: none; outline: none; width: 100%; resize: none; background: transparent; min-height: 420px; padding: 0; }
        .content-area::placeholder { color: #cbd5e1; }
        .preview-link:hover { color: #818cf8 !important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

        {/* Sticky top bar */}
        <div style={{
          background: "#0f172a",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 24px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: "60px",
          zIndex: 40,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              to="/my-posts"
              className="cancel-link"
              style={{
                color: "#64748b", fontSize: "13px", fontWeight: "500",
                textDecoration: "none", display: "flex", alignItems: "center",
                gap: "5px", transition: "color 0.15s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </Link>

            <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.08)" }} />

            {/* Editing badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)",
              borderRadius: "20px", padding: "3px 10px",
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              <span style={{ color: "#fbbf24", fontSize: "11px", fontWeight: "600", letterSpacing: "0.05em" }}>
                EDITING
              </span>
            </div>

            {/* Live stats */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: "#475569", fontSize: "12px" }}>
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </span>
              {wordCount > 0 && (
                <>
                  <span style={{ color: "#334155", fontSize: "12px" }}>·</span>
                  <span style={{ color: "#475569", fontSize: "12px" }}>~{readTime} min read</span>
                </>
              )}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Preview link */}
            <Link
              to={`/posts/${id}`}
              target="_blank"
              className="preview-link"
              style={{
                color: "#64748b", fontSize: "13px", fontWeight: "500",
                textDecoration: "none", display: "flex", alignItems: "center",
                gap: "5px", transition: "color 0.15s",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              Preview
            </Link>

            {/* Save button */}
            <button
              onClick={handleSubmit}
              disabled={saving || !hasChanges}
              className="save-btn"
              style={{
                background: "#6366f1", color: "#fff", border: "none",
                borderRadius: "8px", padding: "8px 20px",
                fontWeight: "600", fontSize: "14px",
                cursor: saving || !hasChanges ? "not-allowed" : "pointer",
                opacity: saving || !hasChanges ? 0.55 : 1,
                transition: "background 0.15s",
                display: "flex", alignItems: "center", gap: "7px",
              }}
            >
              {saving ? (
                <>
                  <div style={{
                    width: "13px", height: "13px", borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Saving…
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {hasChanges ? "Save changes" : "No changes"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 24px 80px" }}>
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}>

            {/* Title */}
            <div style={{
              padding: "36px 40px 24px",
              borderBottom: "1px solid #f1f5f9",
            }}>
              <textarea
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Post title…"
                rows={2}
                maxLength={150}
                className="title-input"
              />
              <div style={{ marginTop: "10px" }}>
                <span style={{ color: "#94a3b8", fontSize: "12px" }}>
                  {formData.title.length > 0 && `${formData.title.length}/150 characters`}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div style={{ padding: "16px 40px", borderBottom: "1px solid #f1f5f9" }}>
              <div
                className="tag-input-wrap"
                style={{
                  display: "flex", flexWrap: "wrap", alignItems: "center",
                  gap: "6px", border: "1.5px solid #e2e8f0", borderRadius: "9px",
                  padding: "8px 12px", minHeight: "42px",
                  transition: "border-color 0.15s, box-shadow 0.15s", cursor: "text",
                }}
                onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>

                {tags.map((tag) => (
                  <span key={tag} style={{
                    background: "#eef2ff", color: "#4f46e5",
                    fontSize: "12px", fontWeight: "600", letterSpacing: "0.04em",
                    padding: "3px 8px 3px 10px", borderRadius: "20px",
                    display: "inline-flex", alignItems: "center", gap: "4px",
                  }}>
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="remove-tag"
                      style={{
                        background: "rgba(99,102,241,0.2)", border: "none",
                        borderRadius: "50%", width: "14px", height: "14px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", padding: 0, color: "#4f46e5",
                        fontSize: "10px", lineHeight: 1, transition: "background 0.15s",
                      }}
                    >×</button>
                  </span>
                ))}

                {tags.length < 5 && (
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder={tags.length === 0 ? "Add tags (Enter or comma)…" : "Add more…"}
                    style={{
                      border: "none", outline: "none", fontSize: "13px",
                      color: "#0f172a", flex: 1, minWidth: "120px",
                      background: "transparent", padding: "2px 0",
                    }}
                  />
                )}
              </div>
              <p style={{ color: "#94a3b8", fontSize: "11px", marginTop: "5px", marginLeft: "2px" }}>
                Up to 5 tags · Press Enter or comma to add
              </p>
            </div>

            {/* Content */}
            <div style={{ padding: "28px 40px 36px" }}>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your article here…"
                className="content-area"
              />
            </div>
          </div>

          {/* Unsaved changes hint */}
          {hasChanges && (
            <div style={{
              marginTop: "16px",
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: "6px",
              color: "#94a3b8", fontSize: "12px",
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              You have unsaved changes · Click{" "}
              <strong style={{ color: "#6366f1" }}>Save changes</strong>{" "}
              in the top bar
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditPost;
