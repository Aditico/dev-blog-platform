// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

// import { logoutUser } from "../features/auth/authSlice";
// import { logoutUserApi } from "../api/authApi";

// const Navbar = () => {
//   const { user } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logoutUserApi();

//       dispatch(logoutUser());

//       navigate("/login");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     // <nav className="bg-white shadow">
//     <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
//     <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">        
//         {/* Logo */}
//         <Link
//           to="/"
//         //   className="text-2xl font-bold text-blue-600"
//         className="text-3xl font-extrabold text-blue-600"
//         >
//           DevBlog
//         </Link>

//         {/* Navigation */}
//         <div className="flex items-center gap-5">
//           <Link
//             to="/"
//             className="hover:text-blue-600 transition"
//           >
//             Home
//           </Link>

//           {user ? (
//   <>
//     <Link
//       to="/profile"
//       className="hover:text-blue-600 transition"
//     >
//       Profile
//     </Link>

//     <Link
//       to="/my-posts"
//       className="hover:text-blue-600 transition"
//     >
//       My Posts
//     </Link>

//     <Link
//       to="/create-post"
//       className="hover:text-blue-600 transition"
//     >
//       Write
//     </Link>

//     <div className="flex items-center gap-2">
//       {user.avatar && (
//         <img
//           src={user.avatar}
//           alt="avatar"
//           className="w-8 h-8 rounded-full object-cover"
//         />
//       )}

//       <span className="font-medium">
//         Hi, {user.name}
//       </span>
//     </div>

//     <button
//       onClick={handleLogout}
//       className="text-red-500 hover:text-red-700 font-medium"
//     >
//       Logout
//     </button>
//   </>
// ) : (
//   <>
//     <Link
//       to="/login"
//       className="hover:text-blue-600 transition"
//     >
//       Login
//     </Link>

//     <Link
//       to="/register"
//       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
//     >
//       Register
//     </Link>
//   </>
// )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../features/auth/authSlice";
import { logoutUserApi } from "../api/authApi";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUserApi();
      dispatch(logoutUser());
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    color: isActive(path) ? "#6366f1" : "#94a3b8",
    fontWeight: isActive(path) ? "600" : "500",
    fontSize: "14px",
    textDecoration: "none",
    padding: "6px 2px",
    borderBottom: isActive(path) ? "2px solid #6366f1" : "2px solid transparent",
    transition: "color 0.15s, border-color 0.15s",
    letterSpacing: "0.01em",
  });

  const mobileNavLinkStyle = (path) => ({
    display: "block",
    color: isActive(path) ? "#6366f1" : "#cbd5e1",
    fontWeight: isActive(path) ? "600" : "500",
    fontSize: "15px",
    textDecoration: "none",
    padding: "12px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    transition: "color 0.15s",
  });

  return (
    <>
      <style>{`
        .nav-link:hover { color: #e2e8f0 !important; }
        .nav-link-active:hover { color: #818cf8 !important; }
        .write-btn:hover { background: #4f46e5 !important; }
        .logout-btn:hover { color: #fca5a5 !important; }
        .hamburger:hover { background: rgba(255,255,255,0.08) !important; }
        .mobile-link:hover { color: #a5b4fc !important; }
      `}</style>

      <nav
        style={{
          background: "#0f172a",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "22px",
              fontWeight: "700",
              color: "#f8fafc",
              textDecoration: "none",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                borderRadius: "7px",
                fontSize: "14px",
              }}
            >
              ✦
            </span>
            DevBlog
          </Link>

          {/* Desktop nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
            className="desktop-nav"
          >
            <style>{`
              @media (max-width: 700px) {
                .desktop-nav { display: none !important; }
                .hamburger-wrap { display: flex !important; }
              }
            `}</style>

            <Link
              to="/"
              style={navLinkStyle("/")}
              className={`nav-link${isActive("/") ? " nav-link-active" : ""}`}
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-posts"
                  style={navLinkStyle("/my-posts")}
                  className={`nav-link${isActive("/my-posts") ? " nav-link-active" : ""}`}
                >
                  My Posts
                </Link>

                <Link
                  to="/profile"
                  style={navLinkStyle("/profile")}
                  className={`nav-link${isActive("/profile") ? " nav-link-active" : ""}`}
                >
                  Profile
                </Link>

                {/* Write CTA */}
                <Link
                  to="/create-post"
                  className="write-btn"
                  style={{
                    background: "#6366f1",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "14px",
                    textDecoration: "none",
                    padding: "7px 16px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "background 0.15s",
                    letterSpacing: "0.01em",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                  Write
                </Link>

                {/* Divider */}
                <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)" }} />

                {/* User chip */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid rgba(99,102,241,0.5)",
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
                      {user.name?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                  <span style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: "500" }}>
                    {user.name?.split(" ")[0]}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#94a3b8",
                    fontWeight: "500",
                    fontSize: "14px",
                    cursor: "pointer",
                    padding: "6px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    transition: "color 0.15s",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={navLinkStyle("/login")}
                  className={`nav-link${isActive("/login") ? " nav-link-active" : ""}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="write-btn"
                  style={{
                    background: "#6366f1",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "14px",
                    textDecoration: "none",
                    padding: "7px 16px",
                    borderRadius: "8px",
                    transition: "background 0.15s",
                  }}
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <div
            className="hamburger-wrap"
            style={{ display: "none", alignItems: "center" }}
          >
            <button
              className="hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "none",
                borderRadius: "8px",
                padding: "6px",
                cursor: "pointer",
                color: "#e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.15s",
              }}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {menuOpen && (
          <div
            style={{
              background: "#0f172a",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "8px 24px 20px",
            }}
          >
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              style={mobileNavLinkStyle("/")}
              className="mobile-link"
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-posts"
                  onClick={() => setMenuOpen(false)}
                  style={mobileNavLinkStyle("/my-posts")}
                  className="mobile-link"
                >
                  My Posts
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  style={mobileNavLinkStyle("/profile")}
                  className="mobile-link"
                >
                  Profile
                </Link>
                <Link
                  to="/create-post"
                  onClick={() => setMenuOpen(false)}
                  style={mobileNavLinkStyle("/create-post")}
                  className="mobile-link"
                >
                  ✦ Write a post
                </Link>

                {/* Mobile user row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 0 6px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    marginTop: "4px",
                  }}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid rgba(99,102,241,0.5)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "13px",
                      }}
                    >
                      {user.name?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                  <div>
                    <div style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: "600" }}>
                      {user.name}
                    </div>
                    <div style={{ color: "#64748b", fontSize: "12px" }}>{user.email}</div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#f87171",
                    fontWeight: "500",
                    fontSize: "14px",
                    cursor: "pointer",
                    padding: "10px 0 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  style={mobileNavLinkStyle("/login")}
                  className="mobile-link"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    ...mobileNavLinkStyle("/register"),
                    color: "#a5b4fc",
                    fontWeight: "600",
                  }}
                  className="mobile-link"
                >
                  Get started →
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
