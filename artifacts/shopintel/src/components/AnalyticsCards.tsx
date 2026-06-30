import { motion } from "framer-motion";
import { TrendingDown, Bell, Package, Truck } from "lucide-react";
import { useAnimatedCounter } from "../hooks/useAnimatedCounter";

export default function AnalyticsCards() {
  const avgPrice = useAnimatedCounter(90474, 1500);
  const lowestPrice = useAnimatedCounter(87990, 1500);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
      {/* Average Price */}
      <CardWrap delay={0}>
        <div style={iconBox("rgba(124,77,255,0.15)")}>
          <TrendingDown size={16} style={{ color: "#9D6CFF" }} />
        </div>
        <CardLabel>Average Price</CardLabel>
        <CardValue>₹{avgPrice.toLocaleString()}</CardValue>
        <div style={{ fontSize: 11, color: "#37D67A", fontWeight: 500 }}>▼ ₹1,750 (1.9%)</div>
        <div style={{ fontSize: 10.5, color: "#4A4D65", marginTop: 2 }}>vs last 30 days</div>
      </CardWrap>

      {/* Lowest Price */}
      <CardWrap delay={0.05}>
        <div style={iconBox("rgba(245,166,35,0.15)")}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>🏆</span>
        </div>
        <CardLabel>Lowest Price</CardLabel>
        <CardValue>₹{lowestPrice.toLocaleString()}</CardValue>
        <div style={{ fontSize: 11, color: "#B7B9C9", marginTop: 2 }}>Flipkart</div>
      </CardWrap>

      {/* Price Drop Alert */}
      <CardWrap delay={0.10}>
        <div style={iconBox("rgba(55,214,122,0.15)")}>
          <Bell size={15} style={{ color: "#37D67A" }} />
        </div>
        <CardLabel>Price Drop Alert</CardLabel>
        <div style={{ fontSize: 10.5, color: "#8385A0", marginBottom: 10, lineHeight: 1.5 }}>
          Get notified when<br />price drops
        </div>
        <div
          style={{
            width: 38,
            height: 20,
            borderRadius: 99,
            background: "linear-gradient(90deg, #7C4DFF, #9D6CFF)",
            display: "flex",
            alignItems: "center",
            padding: "0 3px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(124,77,255,0.35)",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "white",
              marginLeft: "auto",
              boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </CardWrap>

      {/* Stock Status */}
      <CardWrap delay={0.15}>
        <div style={iconBox("rgba(78,181,255,0.15)")}>
          <Package size={15} style={{ color: "#4EB5FF" }} />
        </div>
        <CardLabel>Stock Status</CardLabel>
        <div style={{ fontSize: 11, color: "#8385A0", marginTop: 2, marginBottom: 3 }}>All Stores</div>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: "#37D67A" }}>In Stock</div>
      </CardWrap>

      {/* Delivery Comparison */}
      <CardWrap delay={0.20}>
        <div style={iconBox("rgba(255,107,157,0.15)")}>
          <Truck size={15} style={{ color: "#FF6B9D" }} />
        </div>
        <CardLabel>Fastest Delivery</CardLabel>
        <div style={{ fontSize: 11, color: "#8385A0", marginTop: 2, marginBottom: 3 }}>Best Option</div>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: "white" }}>Tomorrow ⚡</div>
      </CardWrap>
    </div>
  );
}

function iconBox(bg: string): React.CSSProperties {
  return {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 11,
    flexShrink: 0,
  };
}

function CardWrap({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      whileHover={{
        y: -2,
        borderColor: "rgba(124,77,255,0.25)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(124,77,255,0.1)",
      }}
      style={{
        borderRadius: 14,
        background: "rgba(11,15,30,0.92)",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: "16px 14px",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
      }}
    >
      {children}
    </motion.div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10.5, color: "#7B7E9A", marginBottom: 5, fontWeight: 500, letterSpacing: "0.01em" }}>
      {children}
    </div>
  );
}

function CardValue({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 19, fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 4 }}>
      {children}
    </div>
  );
}
