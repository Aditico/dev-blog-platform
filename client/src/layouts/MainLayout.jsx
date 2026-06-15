// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";

// const MainLayout = () => {
//   return (
//     <>
//       <Navbar />

//       <main className="max-w-6xl mx-auto px-4 py-6">
//         <Outlet />
//       </main>
//     </>
//   );
// };

// export default MainLayout;
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "#0f172a",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "40px 24px",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            >
              ✦
            </span>
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "18px",
                fontWeight: "700",
                color: "#f8fafc",
                letterSpacing: "-0.02em",
              }}
            >
              DevBlog
            </span>
          </div>

          {/* Center text */}
          <p
            style={{
              color: "#475569",
              fontSize: "13px",
              margin: 0,
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} DevBlog · Built for developers, by developers
          </p>

          {/* Right side links */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {["Home", "Write", "Profile"].map((label, i) => {
              const paths = ["/", "/create-post", "/profile"];
              return (
                <a
                  key={label}
                  href={paths[i]}
                  style={{
                    color: "#475569",
                    fontSize: "13px",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => { e.target.style.color = "#a5b4fc"; }}
                  onMouseLeave={(e) => { e.target.style.color = "#475569"; }}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
