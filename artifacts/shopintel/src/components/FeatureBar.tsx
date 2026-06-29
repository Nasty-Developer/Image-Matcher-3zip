import { motion } from "framer-motion";
import { Brain, Radio, Layers, Tag, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Price Prediction",
    desc: "99% Accuracy",
  },
  {
    icon: Radio,
    title: "Real-time Price Tracking",
    desc: "24/7 Monitoring",
  },
  {
    icon: Layers,
    title: "All-in-One Comparison",
    desc: "5+ Stores",
  },
  {
    icon: Tag,
    title: "Smart Coupons",
    desc: "Auto Applied",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your Data, Your Control",
  },
];

export default function FeatureBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-4 rounded-2xl px-6 py-3.5 flex items-center justify-between"
      style={{
        background: "rgba(13,18,34,0.9)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {features.map((f, i) => (
        <div key={f.title} className="flex items-center gap-3">
          {i > 0 && (
            <div
              style={{
                width: 1,
                height: 30,
                background: "rgba(255,255,255,0.07)",
                marginRight: 8,
              }}
            />
          )}
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(124,77,255,0.15)",
              border: "1px solid rgba(124,77,255,0.2)",
            }}
          >
            <f.icon size={16} style={{ color: "#9D6CFF" }} />
          </div>
          <div>
            <div className="text-white font-semibold text-[12px]">{f.title}</div>
            <div className="text-[11px]" style={{ color: "#B7B9C9" }}>{f.desc}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
