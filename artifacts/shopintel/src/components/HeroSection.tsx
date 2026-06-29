import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

function StoreBadge({
  name,
  color,
  delay,
  style,
}: {
  name: string;
  color: string;
  delay: number;
  style: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{
        position: "absolute",
        ...style,
        background: "rgba(13,18,34,0.85)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 12,
        padding: "6px 12px",
        backdropFilter: "blur(12px)",
        fontSize: 12,
        fontWeight: 700,
        color,
        animation: `float ${3 + delay}s ease-in-out infinite`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
      }}
    >
      {name}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <div
      className="rounded-2xl relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(20,10,60,0.95) 0%, rgba(8,12,35,0.98) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        minHeight: 190,
        padding: "32px 36px",
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          bottom: -20,
          right: 150,
          width: 260,
          height: 60,
          background: "radial-gradient(ellipse, rgba(124,77,255,0.6) 0%, transparent 70%)",
          filter: "blur(25px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          width: 180,
          height: 180,
          background: "radial-gradient(ellipse, rgba(30,60,200,0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {/* Left content */}
      <div style={{ maxWidth: 420, position: "relative", zIndex: 2 }}>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-black leading-tight"
          style={{ fontSize: 42, letterSpacing: -1 }}
        >
          <span className="text-white">AI Shopping,</span>
          <br />
          <span style={{ color: "#9D6CFF" }}>Smarter Savings.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-3 text-[13px] leading-relaxed"
          style={{ color: "#B7B9C9" }}
        >
          Compare prices, predict drops,<br />
          track stock &amp; get the best deals<br />
          across all your favorite stores.
        </motion.p>
      </div>

      {/* Right: floating cart + store logos */}
      <div style={{ position: "absolute", right: 30, top: 10, width: 350, height: 170, zIndex: 2 }}>
        {/* Cart icon */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            right: 120,
            top: 30,
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, rgba(124,77,255,0.3) 0%, rgba(111,60,255,0.2) 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid rgba(124,77,255,0.4)",
            boxShadow: "0 0 30px rgba(124,77,255,0.4), 0 0 60px rgba(124,77,255,0.2)",
          }}
        >
          <ShoppingCart size={40} style={{ color: "#9D6CFF" }} />
        </motion.div>

        {/* Amazon */}
        <StoreBadge
          name="amazon"
          color="#FF9900"
          delay={0.1}
          style={{ left: 10, top: 20 }}
        />
        {/* Flipkart */}
        <StoreBadge
          name="Flipkart"
          color="#2874F0"
          delay={0.2}
          style={{ right: 0, top: 15 }}
        />
        {/* Reliance Digital */}
        <StoreBadge
          name="Reliance\ndigital"
          color="#E31E24"
          delay={0.3}
          style={{ right: 10, bottom: 30 }}
        />
        {/* Croma */}
        <StoreBadge
          name="croma"
          color="#00A63E"
          delay={0.4}
          style={{ left: 60, bottom: 20 }}
        />
        {/* Vijay Sales */}
        <StoreBadge
          name="VIJAY SALES"
          color="#F5A623"
          delay={0.5}
          style={{ right: 130, top: 10 }}
        />
      </div>
    </div>
  );
}
