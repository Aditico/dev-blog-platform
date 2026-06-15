const Loader = ({
  fullPage = false,
  size = "md",
  text = "Loading…",
  variant = "spinner",
}) => {
  const sizes = {
    sm: { ring: 20, border: 2, font: "12px" },
    md: { ring: 36, border: 3, font: "14px" },
    lg: { ring: 52, border: 4, font: "15px" },
  };

  const s = sizes[size] || sizes.md;

  const spinner = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
      <div style={{ position: "relative", width: s.ring, height: s.ring }}>
        {/* Track */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          border: `${s.border}px solid #e2e8f0`,
        }} />
        {/* Spinning arc */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          border: `${s.border}px solid transparent`,
          borderTopColor: "#6366f1",
          animation: "devblog-spin 0.75s linear infinite",
        }} />
      </div>
      {text && (
        <span style={{ color: "#94a3b8", fontSize: s.font, fontWeight: "500" }}>
          {text}
        </span>
      )}
    </div>
  );

  const dots = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: size === "sm" ? "6px" : size === "lg" ? "10px" : "8px",
              height: size === "sm" ? "6px" : size === "lg" ? "10px" : "8px",
              borderRadius: "50%",
              background: "#6366f1",
              animation: `devblog-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      {text && (
        <span style={{ color: "#94a3b8", fontSize: s.font, fontWeight: "500" }}>
          {text}
        </span>
      )}
    </div>
  );

  const pulse = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
      <div style={{ position: "relative", width: s.ring, height: s.ring }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          animation: "devblog-pulse 1.4s ease-in-out infinite",
        }} />
      </div>
      {text && (
        <span style={{ color: "#94a3b8", fontSize: s.font, fontWeight: "500" }}>
          {text}
        </span>
      )}
    </div>
  );

  const content = variant === "dots" ? dots : variant === "pulse" ? pulse : spinner;

  if (fullPage) {
    return (
      <>
        <style>{`
          @keyframes devblog-spin { to { transform: rotate(360deg); } }
          @keyframes devblog-bounce {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
            40% { transform: scale(1); opacity: 1; }
          }
          @keyframes devblog-pulse {
            0%, 100% { transform: scale(0.85); opacity: 0.6; }
            50% { transform: scale(1); opacity: 1; }
          }
        `}</style>
        <div style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
        }}>
          {content}
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes devblog-spin { to { transform: rotate(360deg); } }
        @keyframes devblog-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes devblog-pulse {
          0%, 100% { transform: scale(0.85); opacity: 0.6; }
          50% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      {content}
    </>
  );
};

export default Loader;
