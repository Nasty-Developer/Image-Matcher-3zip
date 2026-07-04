import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useBreakpoint } from "../hooks/useBreakpoint";

/* Floating store badge */
function Badge({
  name,
  color,
  style,
  delay,
  bold,
  upper,
}: {
  name: string;
  color: string;
  style: React.CSSProperties;
  delay: number;
  bold?: boolean;
  upper?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      style={{
        position: "absolute",
        ...style,
        background: "rgba(11,15,34,0.88)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 10,
        padding: "5px 11px",
        fontSize: 11,
        fontWeight: bold ? 800 : 700,
        color,
        boxShadow: "0 4px 18px rgba(0,0,0,0.35)",
        whiteSpace: "pre-line",
        zIndex: 6,
        animation: `floatBadge ${3.2 + delay * 0.6}s ease-in-out infinite ${delay * 0.3}s`,
      }}
    >
      {upper ? name.toUpperCase() : name}
    </motion.div>
  );
}

export default function HeroSection() {
  const { isDesktop } = useBreakpoint();
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.07)",
        background:
          "linear-gradient(135deg, rgba(16,8,52,0.98) 0%, rgba(7,10,30,0.98) 100%)",
        minHeight: isDesktop ? 204 : 260,
        display: "flex",
        flexDirection: isDesktop ? "row" : "column",
        alignItems: "stretch",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          bottom: -18,
          right: "30%",
          width: 200,
          height: 50,
          background:
            "radial-gradient(ellipse, rgba(124,77,255,0.7) 0%, transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: "15%",
          width: 200,
          height: 160,
          background:
            "radial-gradient(ellipse, rgba(20,50,200,0.08) 0%, transparent 70%)",
          filter: "blur(25px)",
          pointerEvents: "none",
        }}
      />

      {/* LEFT: Text content */}
      <div
        style={{
          width: isDesktop ? "50%" : "100%",
          padding: isDesktop ? "30px 28px" : "24px 20px 8px",
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: isDesktop ? 38 : 28, fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.5px" }}
        >
          <span style={{ color: "#FFFFFF" }}>AI Shopping,</span>
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #A57EFF 0%, #7C4DFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Smarter Savings.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ marginTop: 14, fontSize: 12.5, lineHeight: 1.75, color: "#7B7E9A" }}
        >
          Compare prices, predict drops,
          <br />
          track stock &amp; get the best deals
          <br />
          across all your favorite stores.
        </motion.p>
      </div>

      {/* RIGHT: Cart + floating store badges */}
      <div
        style={{
          flex: 1,
          position: "relative",
          zIndex: 3,
          minHeight: isDesktop ? 200 : 140,
        }}
      >
        {/* Shopping cart — center of right half */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -52%)",
            width: 74,
            height: 74,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(124,77,255,0.22) 0%, rgba(111,60,255,0.14) 100%)",
            border: "2px solid rgba(124,77,255,0.42)",
            boxShadow:
              "0 0 30px rgba(124,77,255,0.42), 0 0 70px rgba(124,77,255,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
        >
          <ShoppingCart size={34} style={{ color: "#9D6CFF" }} />
        </motion.div>

        {/* Neon platform glow under cart */}
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: "50%",
            transform: "translateX(-50%)",
            width: 130,
            height: 14,
            background: "rgba(124,77,255,0.48)",
            filter: "blur(10px)",
            borderRadius: "50%",
            zIndex: 2,
          }}
        />

        {/* Store badges */}
        {/* amazon — left center */}
        <Badge name="amazon" color="#FF9900" delay={0.1} bold
          style={{ top: "38%", left: "-2%" }} />
        {/* Flipkart — top right */}
        <Badge name="Flipkart" color="#2874F0" delay={0.2}
          style={{ top: "8%", right: "4%" }} />
        {/* VIJAY SALES — top center */}
        <Badge name="vijay sales" color="#F5A623" delay={0.35} upper
          style={{ top: "14%", left: "28%" }} />
        {/* croma — bottom left */}
        <Badge name="croma" color="#00A63E" delay={0.45}
          style={{ bottom: "20%", left: "4%" }} />
        {/* Reliance digital — bottom right */}
        <Badge name={"Reliance\ndigital"} color="#E31E24" delay={0.55}
          style={{ bottom: "14%", right: "2%" }} />
      </div>

      <style>{`
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
