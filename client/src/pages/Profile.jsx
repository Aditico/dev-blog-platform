// import { uploadAvatarApi } from "../api/uploadApi";

// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

// import { setUser } from "../features/auth/authSlice";
// import { updateProfile } from "../api/userApi";
// import toast from "react-hot-toast";

// const Profile = () => {
//   const { user } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();

//   const [name, setName] = useState(user?.name || "");
//   const [bio, setBio] = useState(user?.bio || "");

//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] =
//   useState(false);

//   const handleAvatarUpload = async (
//   e
// ) => {
//   const file = e.target.files[0];

//   if (!file) return;

//   try {
//     setUploading(true);

//     const data =
//       await uploadAvatarApi(file);

//     dispatch(
//       setUser({
//         ...user,
//         avatar: data.avatar,
//       })
//     );

//     toast.success("Avatar uploaded successfully");
//   } catch (error) {
//     toast.error(
//       error.response?.data?.message ||
//         "Upload failed"
//     );
//   } finally {
//     setUploading(false);
//   }
// };
//   if (!user) {
//     return (
//       <div className="text-center mt-10">
//         Loading profile...
//       </div>
//     );
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const data = await updateProfile({
//         name,
//         bio,
//       });

//       dispatch(setUser(data.user));

//       toast.success("Profile Updated Successfully");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to update profile"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">
//         Profile
//       </h1>

//       {/* {user.avatar && (
//         <img
//           src={user.avatar}
//           alt="avatar"
//           className="w-24 h-24 rounded-full object-cover mb-4"
//         />
//       )} */}
//       <div className="mb-6">
//   {user.avatar ? (
//     <img
//       src={user.avatar}
//       alt="avatar"
//       className="w-24 h-24 rounded-full object-cover mb-4"
//     />
//   ) : (
//     <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
//   )}

//   <input
//     type="file"
//     accept="image/*"
//     onChange={handleAvatarUpload}
//   />

//   {uploading && (
//     <p className="mt-2 text-blue-600">
//       Uploading...
//     </p>
//   )}
// </div>

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4"
//       >
//         <div>
//           <label className="block mb-1 font-medium">
//             Name
//           </label>

//           <input
//             type="text"
//             value={name}
//             onChange={(e) =>
//               setName(e.target.value)
//             }
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">
//             Email
//           </label>

//           <input
//             type="email"
//             value={user.email}
//             disabled
//             className="w-full border p-2 rounded bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">
//             Bio
//           </label>

//           <textarea
//             value={bio}
//             onChange={(e) =>
//               setBio(e.target.value)
//             }
//             rows="4"
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {loading
//             ? "Saving..."
//             : "Save Changes"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { updateProfile } from "../api/userApi";
import { uploadAvatarApi } from "../api/uploadApi";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  if (!user) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "3px solid #e2e8f0",
              borderTopColor: "#6366f1",
              margin: "0 auto 16px",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: "#94a3b8", fontSize: "14px" }}>Loading profile…</p>
        </div>
      </div>
    );
  }

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const data = await uploadAvatarApi(file);
      dispatch(setUser({ ...user, avatar: data.avatar }));
      setAvatarPreview(null);
      toast.success("Avatar updated!");
    } catch (error) {
      setAvatarPreview(null);
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await updateProfile({ name, bio });
      dispatch(setUser(data.user));
      toast.success("Profile updated!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const avatarSrc = avatarPreview || user.avatar;
  const initials = user.name?.[0]?.toUpperCase() || "?";
  const hasChanges = name !== user.name || bio !== user.bio;

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .avatar-overlay { opacity: 0; transition: opacity 0.2s; }
        .avatar-wrap:hover .avatar-overlay { opacity: 1; }
        .save-btn:hover:not(:disabled) { background: #4f46e5 !important; }
        .input-field:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

        {/* Hero banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
            padding: "48px 24px 80px",
          }}
        >
          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            {/* Avatar */}
            <div
              style={{ position: "relative", display: "inline-block", marginBottom: "20px" }}
            >
              <div
                className="avatar-wrap"
                onClick={handleAvatarClick}
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  position: "relative",
                  border: "3px solid rgba(99,102,241,0.5)",
                  overflow: "hidden",
                }}
              >
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt={user.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: "700",
                      fontSize: "36px",
                    }}
                  >
                    {initials}
                  </div>
                )}

                {/* Hover overlay */}
                <div
                  className="avatar-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(15,23,42,0.65)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
                  {uploading ? (
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                      </svg>
                      <span style={{ color: "#fff", fontSize: "10px", fontWeight: "600", letterSpacing: "0.05em" }}>
                        CHANGE
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Upload ring pulse when uploading */}
              {uploading && (
                <div
                  style={{
                    position: "absolute",
                    inset: "-4px",
                    borderRadius: "50%",
                    border: "2px solid #6366f1",
                    opacity: 0.5,
                    animation: "spin 1.5s linear infinite",
                  }}
                />
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              style={{ display: "none" }}
            />

            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "28px",
                fontWeight: "700",
                color: "#f8fafc",
                margin: "0 0 6px",
              }}
            >
              {user.name}
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
              {user.email}
            </p>
            {user.bio && (
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "15px",
                  marginTop: "10px",
                  lineHeight: "1.6",
                  maxWidth: "420px",
                  marginInline: "auto",
                }}
              >
                {user.bio}
              </p>
            )}
          </div>
        </div>

        {/* Form card */}
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 24px 80px" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
              overflow: "hidden",
              marginTop: "-36px",
              position: "relative",
            }}
          >
            {/* Card header */}
            <div
              style={{
                padding: "20px 28px",
                borderBottom: "1px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "17px",
                  fontWeight: "700",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Edit Profile
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#475569",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="input-field"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "9px",
                      fontSize: "15px",
                      color: "#0f172a",
                      outline: "none",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                      boxSizing: "border-box",
                      background: "#fff",
                    }}
                  />
                </div>

                {/* Email (read-only) */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#475569",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Email Address
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      style={{
                        width: "100%",
                        padding: "11px 14px 11px 38px",
                        border: "1.5px solid #f1f5f9",
                        borderRadius: "9px",
                        fontSize: "15px",
                        color: "#94a3b8",
                        background: "#f8fafc",
                        outline: "none",
                        boxSizing: "border-box",
                        cursor: "not-allowed",
                      }}
                    />
                    <svg
                      style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
                      width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: "12px", marginTop: "5px", marginLeft: "2px" }}>
                    Email cannot be changed
                  </p>
                </div>

                {/* Bio */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#475569",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Bio
                    <span style={{ color: "#cbd5e1", fontWeight: "400", textTransform: "none", letterSpacing: 0, marginLeft: "6px", fontSize: "11px" }}>
                      ({bio.length}/200)
                    </span>
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell readers a little about yourself…"
                    maxLength={200}
                    rows={4}
                    className="input-field"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "9px",
                      fontSize: "15px",
                      color: "#0f172a",
                      outline: "none",
                      resize: "vertical",
                      lineHeight: "1.6",
                      fontFamily: "system-ui, sans-serif",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                      boxSizing: "border-box",
                      background: "#fff",
                    }}
                  />
                </div>

                {/* Submit */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "4px" }}>
                  <button
                    type="submit"
                    disabled={loading || !hasChanges}
                    className="save-btn"
                    style={{
                      background: "#6366f1",
                      color: "#fff",
                      border: "none",
                      borderRadius: "9px",
                      padding: "11px 24px",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: loading || !hasChanges ? "not-allowed" : "pointer",
                      opacity: loading || !hasChanges ? 0.55 : 1,
                      transition: "background 0.15s",
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                    }}
                  >
                    {loading ? (
                      <>
                        <div
                          style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "50%",
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderTopColor: "#fff",
                            animation: "spin 0.7s linear infinite",
                          }}
                        />
                        Saving…
                      </>
                    ) : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Save changes
                      </>
                    )}
                  </button>

                  {!hasChanges && !loading && (
                    <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                      No changes to save
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {[
              { label: "Member since", value: new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", { month: "long", year: "numeric" }) },
              { label: "Account status", value: "Active ✦" },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ color: "#94a3b8", fontSize: "11px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px" }}>
                  {label}
                </div>
                <div style={{ color: "#0f172a", fontSize: "14px", fontWeight: "600" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
