import { motion } from "framer-motion";
import { Sparkles, Brain } from "lucide-react";

export default function AIRecommendationCard() {
  return (
    <motion.div
      whileHover={{
        y: -2,
        borderColor: "rgba(124,77,255,0.28)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(124,77,255,0.1)",
      }}
      style={{
        borderRadius: 14,
        background: "rgba(11,15,30,0.92)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "18px 16px",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
      }}
    >
      {/* Subtle top glow */}
      <div
        style={{
          position: "absolute",
          top: -24,
          right: -12,
          width: 140,
          height: 90,
          background: "radial-gradient(ellipse, rgba(124,77,255,0.14) 0%, transparent 70%)",
          filter: "blur(18px)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-2 mb-3.5">
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 9,
            background: "rgba(124,77,255,0.18)",
            border: "1px solid rgba(124,77,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Sparkles size={13} style={{ color: "#9D6CFF" }} />
        </div>
        <span style={{ fontWeight: 650, color: "white", fontSize: 13 }}>AI Recommendation</span>
      </div>

      {/* Content row */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        {/* Left info */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, color: "#7B7E9A", marginBottom: 3, letterSpacing: "0.02em" }}>Best Time to Buy</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 12 }}>
            Wait 3 Days
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10.5, color: "#7B7E9A", marginBottom: 3 }}>Confidence</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "white", marginBottom: 6 }}>91%</div>
            <div
              style={{
                height: 5,
                borderRadius: 99,
                background: "rgba(255,255,255,0.07)",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "91%" }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                style={{
                  height: "100%",
                  borderRadius: 99,
                  background: "linear-gradient(90deg, #7C4DFF 0%, #9D6CFF 100%)",
                  boxShadow: "0 0 8px rgba(124,77,255,0.5)",
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: "#7B7E9A", marginBottom: 6 }}>Why?</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[
                "Price may drop by ₹2,300",
                "Big Billion Days in 3 days",
                "Seller usually lowers price",
                "Stock is stable",
              ].map((r) => (
                <li key={r} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#7C4DFF",
                      flexShrink: 0,
                      marginTop: 4,
                    }}
                  />
                  <span style={{ fontSize: 10.5, color: "#B7B9C9", lineHeight: 1.5 }}>{r}</span>
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
                boxShadow: "0 0 28px rgba(124,77,255,0.22)",
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
    </motion.div>
  );
}
