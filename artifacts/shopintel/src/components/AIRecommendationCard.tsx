import { motion } from "framer-motion";
import { Sparkles, Brain } from "lucide-react";

export default function AIRecommendationCard() {
  return (
    <div
      style={{
        borderRadius: 14,
        background: "rgba(11,15,30,0.92)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "14px 14px 14px 14px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top glow */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -10,
          width: 120,
          height: 80,
          background: "radial-gradient(ellipse, rgba(124,77,255,0.15) 0%, transparent 70%)",
          filter: "blur(16px)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-1.5 mb-2.5">
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            background: "rgba(124,77,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Sparkles size={13} style={{ color: "#9D6CFF" }} />
        </div>
        <span style={{ fontWeight: 600, color: "white", fontSize: 12.5 }}>AI Recommendation</span>
      </div>

      {/* Content row */}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        {/* Left info */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, color: "#7B7E9A", marginBottom: 2 }}>Best Time to Buy</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 10 }}>
            Wait 3 Days
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10.5, color: "#7B7E9A", marginBottom: 2 }}>Confidence</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "white", marginBottom: 5 }}>91%</div>
            <div
              style={{
                height: 5,
                borderRadius: 99,
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "91%" }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{
                  height: "100%",
                  borderRadius: 99,
                  background: "linear-gradient(90deg, #7C4DFF 0%, #9D6CFF 100%)",
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: "#7B7E9A", marginBottom: 5 }}>Why?</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {[
                "Price may drop by ₹2,300",
                "Big Billion Days in 3 days",
                "Seller usually lowers price",
                "Stock is stable",
              ].map((r) => (
                <li key={r} style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#7C4DFF",
                      flexShrink: 0,
                      marginTop: 3,
                    }}
                  />
                  <span style={{ fontSize: 10.5, color: "#B7B9C9" }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brain illustration */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "relative" }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(124,77,255,0.1)",
                border: "1px solid rgba(124,77,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(124,77,255,0.25)",
              }}
            >
              <Brain size={38} style={{ color: "#9D6CFF" }} />
            </div>
            {/* Glow below */}
            <div
              style={{
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 50,
                height: 12,
                background: "rgba(124,77,255,0.5)",
                filter: "blur(8px)",
                borderRadius: "50%",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
