import { motion } from "framer-motion";
import { Sparkles, Brain } from "lucide-react";

export default function AIRecommendationCard() {
  return (
    <div
      className="rounded-2xl p-4 relative overflow-hidden"
      style={{
        background: "rgba(13,18,34,0.9)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(124,77,255,0.2)" }}
        >
          <Sparkles size={14} style={{ color: "#9D6CFF" }} />
        </div>
        <span className="font-semibold text-white text-[13px]">AI Recommendation</span>
      </div>

      {/* Main content row */}
      <div className="flex gap-3">
        {/* Left info */}
        <div className="flex-1">
          <div className="text-[11px] mb-1" style={{ color: "#B7B9C9" }}>Best Time to Buy</div>
          <div className="font-black text-white text-[22px] leading-tight mb-3">Wait 3 Days</div>

          <div className="mb-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px]" style={{ color: "#B7B9C9" }}>Confidence</span>
            </div>
            <div className="font-bold text-white text-[18px] mb-1.5">91%</div>
            <div
              className="w-full rounded-full"
              style={{ height: 5, background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "91%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="progress-bar h-full rounded-full"
              />
            </div>
          </div>

          <div className="mt-3">
            <div className="text-[11px] font-medium mb-1.5" style={{ color: "#B7B9C9" }}>Why?</div>
            <ul className="flex flex-col gap-1">
              {[
                "Price may drop by ₹2,300",
                "Big Billion Days in 3 days",
                "Seller usually lowers price",
                "Stock is stable",
              ].map((r) => (
                <li key={r} className="flex items-start gap-1.5">
                  <span
                    className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#9D6CFF" }}
                  />
                  <span className="text-[11px]" style={{ color: "#B7B9C9" }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brain illustration */}
        <div className="flex flex-col items-center justify-center" style={{ width: 90 }}>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "relative" }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(124,77,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(124,77,255,0.3)",
                boxShadow: "0 0 30px rgba(124,77,255,0.3)",
              }}
            >
              <Brain size={44} style={{ color: "#9D6CFF" }} />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 60,
                height: 14,
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
