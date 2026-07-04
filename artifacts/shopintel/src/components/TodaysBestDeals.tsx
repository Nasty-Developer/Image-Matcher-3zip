import { motion } from "framer-motion";
import { Flame, ArrowUpRight } from "lucide-react";
import { useLocation } from "wouter";

export default function TodaysBestDeals() {
  const [, navigate] = useLocation();

  return (
    <motion.div
      whileHover={{
        y: -2,
        borderColor: "rgba(124,77,255,0.25)",
        boxShadow: "0 10px 28px rgba(0,0,0,0.25), 0 0 0 1px rgba(124,77,255,0.08)",
      }}
      style={{
        borderRadius: 14,
        background: "rgba(11,15,30,0.92)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "16px 15px",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              background: "rgba(124,77,255,0.18)",
              border: "1px solid rgba(124,77,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Flame size={12} style={{ color: "#9D6CFF" }} />
          </div>
          <span style={{ fontWeight: 650, color: "white", fontSize: 13 }}>Today's Best Deals</span>
        </div>
        <span
          onClick={() => navigate("/best-deals")}
          style={{
            fontSize: 11.5, color: "#9D6CFF", cursor: "pointer", fontWeight: 500,
            transition: "color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#C4B5FD")}
          onMouseLeave={e => (e.currentTarget.style.color = "#9D6CFF")}
        >
          View All
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 8,
          padding: "26px 12px",
          borderRadius: 11,
          background: "rgba(15,20,38,0.6)",
          border: "1px dashed rgba(124,77,255,0.25)",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 11,
            background: "linear-gradient(135deg, rgba(124,77,255,0.2), rgba(157,108,255,0.1))",
            border: "1px solid rgba(124,77,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Flame size={17} style={{ color: "#9D6CFF" }} />
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "#B7B9C9" }}>
          Real-time deal aggregation is coming soon
        </div>
        <div style={{ fontSize: 11, color: "#5A5D75", maxWidth: 220, lineHeight: 1.5 }}>
          We're building AI-curated deals across every store — no coupon codes to hunt for, just the best price automatically surfaced.
        </div>
        <button
          onClick={() => navigate("/best-deals")}
          style={{
            marginTop: 4,
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 11.5, fontWeight: 600, color: "#9D6CFF",
            background: "rgba(124,77,255,0.12)",
            border: "1px solid rgba(124,77,255,0.25)",
            borderRadius: 8, padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Preview page
          <ArrowUpRight size={12} />
        </button>
      </div>
    </motion.div>
  );
}
