import { motion } from "framer-motion";
import { Ticket } from "lucide-react";

const coupons = [
  {
    code: "HDFC10",
    bg: "rgba(29,135,219,0.12)",
    border: "rgba(29,135,219,0.3)",
    color: "#4EB5FF",
    description: "10% Instant Discount up to ₹1,500 on HDFC Cards",
  },
  {
    code: "SUPER2000",
    bg: "rgba(247,148,29,0.12)",
    border: "rgba(247,148,29,0.3)",
    color: "#F79420",
    description: "Flat ₹2,000 Off on orders above ₹50,000",
  },
  {
    code: "SBI1500",
    bg: "rgba(55,214,122,0.12)",
    border: "rgba(55,214,122,0.3)",
    color: "#37D67A",
    description: "₹1,500 Off on SBI Credit Card Transactions",
  },
];

export default function CouponCard() {
  return (
    <div
      style={{
        borderRadius: 14,
        background: "rgba(11,15,30,0.92)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "13px 13px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 7,
              background: "rgba(124,77,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ticket size={12} style={{ color: "#9D6CFF" }} />
          </div>
          <span style={{ fontWeight: 600, color: "white", fontSize: 12.5 }}>Coupon Finder</span>
        </div>
        <span style={{ fontSize: 11, color: "#9D6CFF", cursor: "pointer" }}>View All</span>
      </div>

      {/* Coupon list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {coupons.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 10px",
              borderRadius: 10,
              background: "rgba(15,20,38,0.6)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Code tag */}
            <div
              style={{
                padding: "3px 8px",
                borderRadius: 7,
                background: c.bg,
                border: `1px solid ${c.border}`,
                color: c.color,
                fontSize: 10,
                fontWeight: 700,
                flexShrink: 0,
                minWidth: 62,
                textAlign: "center",
              }}
            >
              {c.code}
            </div>
            {/* Description */}
            <div style={{ flex: 1, fontSize: 10.5, color: "#B7B9C9", lineHeight: 1.35 }}>
              {c.description}
            </div>
            {/* Apply button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "5px 10px",
                borderRadius: 7,
                background: "linear-gradient(135deg, #7C4DFF 0%, #9D6CFF 100%)",
                color: "white",
                fontSize: 10.5,
                fontWeight: 600,
                flexShrink: 0,
                cursor: "pointer",
                border: "none",
              }}
            >
              Apply
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
