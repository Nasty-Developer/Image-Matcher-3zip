import { motion } from "framer-motion";
import { Ticket } from "lucide-react";

const coupons = [
  {
    code: "HDFC10",
    tagClass: "coupon-tag-hdfc",
    description: "10% Instant Discount up to ₹1,500 on HDFC Cards",
  },
  {
    code: "SUPER2000",
    tagClass: "coupon-tag-super",
    description: "Flat ₹2,000 Off on orders above ₹50,000",
  },
  {
    code: "SBI1500",
    tagClass: "coupon-tag-sbi",
    description: "₹1,500 Off on SBI Credit Card Transactions",
  },
];

export default function CouponCard() {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "rgba(13,18,34,0.9)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "rgba(124,77,255,0.2)" }}
          >
            <Ticket size={13} style={{ color: "#9D6CFF" }} />
          </div>
          <span className="font-semibold text-white text-[13px]">Coupon Finder</span>
        </div>
        <span className="text-[11px] cursor-pointer" style={{ color: "#9D6CFF" }}>
          View All
        </span>
      </div>

      {/* Coupon list */}
      <div className="flex flex-col gap-2">
        {coupons.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 p-2.5 rounded-xl"
            style={{
              background: "rgba(20,28,50,0.5)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className={`px-2 py-1 rounded-lg border text-[10px] font-bold flex-shrink-0 ${c.tagClass}`}
              style={{ minWidth: 64, textAlign: "center" }}
            >
              {c.code}
            </div>
            <div className="flex-1 text-[11px]" style={{ color: "#B7B9C9" }}>
              {c.description}
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex-shrink-0 px-3 py-1.5 rounded-lg text-white text-[11px] font-semibold"
              style={{
                background: "linear-gradient(135deg, #7C4DFF 0%, #9D6CFF 100%)",
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
