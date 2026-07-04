import { motion } from "framer-motion";
import { Brain, Radio, Layers, Flame, Shield } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Price Prediction", desc: "99% Accuracy" },
  { icon: Radio, title: "Real-time Price Tracking", desc: "24/7 Monitoring" },
  { icon: Layers, title: "All-in-One Comparison", desc: "5+ Stores" },
  { icon: Flame, title: "Today's Best Deals", desc: "Coming Soon" },
  { icon: Shield, title: "Secure & Private", desc: "Your Data, Your Control" },
];

export default function FeatureBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      style={{
        borderRadius: 13,
        background: "rgba(11,15,30,0.92)",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {features.map((f, i) => (
        <div key={f.title} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {i > 0 && (
            <div
              style={{
                width: 1,
                height: 28,
                background: "rgba(255,255,255,0.06)",
                marginRight: 6,
                flexShrink: 0,
              }}
            />
          )}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "rgba(124,77,255,0.14)",
              border: "1px solid rgba(124,77,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <f.icon size={15} style={{ color: "#9D6CFF" }} />
          </div>
          <div>
            <div style={{ fontWeight: 600, color: "white", fontSize: 11.5 }}>{f.title}</div>
            <div style={{ fontSize: 10.5, color: "#7B7E9A" }}>{f.desc}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
