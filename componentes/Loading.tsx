// componentes/loading.jsx
const SIZES = { sm: 16, md: 32, lg: 48 };

export function Spinner({ size = "md", color = "#2563eb", track = "#d1d5db" }) {
  const px = typeof size === "number" ? size : SIZES[size];
  const border = Math.max(2, Math.round(px / 10));

  return (
    <span
      role="status"
      aria-label="Loading"
      style={{
        display: "inline-block",
        width: px,
        height: px,
        border: `${border}px solid ${track}`,
        borderTopColor: color,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
  );
}

export default function Loading({ variant = "page", size }) {
  if (variant === "inline") {
    return (
      <Spinner
        size={size || "sm"}
        color="currentColor"
        track="rgba(255,255,255,0.4)"
      />
    );
  }

  const isPage = variant === "page";

  return (
    <div
      style={{
        position: isPage ? "fixed" : "absolute",
        inset: 0,
        zIndex: isPage ? 50 : 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isPage ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.6)",
      }}
    >
      <Spinner size={size || (isPage ? "lg" : "md")} />
    </div>
  );
}
