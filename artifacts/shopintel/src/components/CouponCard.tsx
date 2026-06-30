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
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
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
            <Ticket size={12} style={{ color: "#9D6CFF" }} />
          </div>
          <span style={{ fontWeight: 650, color: "white", fontSize: 13 }}>Coupon Finder</span>
        </div>
        <span
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

      {/* Coupon list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {coupons.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, ease: "easeOut" }}
            whileHover={{ background: "rgba(18,24,44,0.8)", borderColor: "rgba(255,255,255,0.1)" }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "10px 11px",
              borderRadius: 11,
              background: "rgba(15,20,38,0.6)",
              border: "1px solid rgba(255,255,255,0.07)",
              transition: "background 0.15s, border-color 0.15s",
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
                minWidth: 64,
                textAlign: "center",
                letterSpacing: "0.02em",
              }}
            >
              {c.code}
            </div>
            {/* Description */}
            <div style={{ flex: 1, fontSize: 10.5, color: "#B7B9C9", lineHeight: 1.4 }}>
              {c.description}
            </div>
            {/* Apply button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(124,77,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "5px 11px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #7C4DFF 0%, #9D6CFF 100%)",
                color: "white",
                fontSize: 11,
                fontWeight: 600,
                flexShrink: 0,
                cursor: "pointer",
                border: "none",
                transition: "box-shadow 0.18s",
              }}
            >
              Apply
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
