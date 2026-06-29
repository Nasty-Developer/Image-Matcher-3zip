import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Ticket, Copy, CheckCheck, Tag } from "lucide-react";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";

const categories = ["All", "Credit Card", "UPI", "No Cost EMI", "Cashback", "Seasonal"];

const coupons = [
  { code: "HDFC10", category: "Credit Card", store: "All Stores", discount: "10% off up to ₹1,500", desc: "Use your HDFC Credit/Debit card to get 10% instant discount", minOrder: "₹10,000", validity: "30 Jun 2026", color: "#4EB5FF", bg: "rgba(78,181,255,0.1)", border: "rgba(78,181,255,0.25)" },
  { code: "SUPER2000", category: "Cashback", store: "All Stores", discount: "Flat ₹2,000 off", desc: "Flat ₹2,000 off on orders above ₹50,000", minOrder: "₹50,000", validity: "15 Jul 2026", color: "#F79420", bg: "rgba(247,148,32,0.1)", border: "rgba(247,148,32,0.25)" },
  { code: "SBI1500", category: "Credit Card", store: "All Stores", discount: "₹1,500 off", desc: "₹1,500 off on SBI Credit Card Transactions", minOrder: "₹15,000", validity: "31 Jul 2026", color: "#37D67A", bg: "rgba(55,214,122,0.1)", border: "rgba(55,214,122,0.25)" },
  { code: "BBDEAL", category: "Seasonal", store: "Flipkart", discount: "Up to 30% off", desc: "Big Billion Day early access — massive discounts sitewide", minOrder: "₹5,000", validity: "5 Jul 2026", color: "#FF6B9D", bg: "rgba(255,107,157,0.1)", border: "rgba(255,107,157,0.25)" },
  { code: "UPIBACK5", category: "UPI", store: "Amazon", discount: "5% cashback", desc: "5% cashback on payments via UPI apps (max ₹500)", minOrder: "₹1,000", validity: "31 Aug 2026", color: "#9D6CFF", bg: "rgba(157,108,255,0.1)", border: "rgba(157,108,255,0.25)" },
  { code: "EMINOCT", category: "No Cost EMI", store: "Croma", discount: "No Cost EMI", desc: "No cost EMI for 6 months on all electronics above ₹25,000", minOrder: "₹25,000", validity: "30 Jun 2026", color: "#4EB5FF", bg: "rgba(78,181,255,0.1)", border: "rgba(78,181,255,0.25)" },
];

export default function Coupons() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = coupons.filter((c) => {
    const matchSearch = c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    return matchSearch && matchCat;
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <PageTransition>
      <PageHeader
        title="Coupons & Deals"
        subtitle="Discover verified coupons and exclusive deals"
        icon={Tag}
        actions={
          <div style={{ fontSize: 12, color: "#9D6CFF", fontWeight: 600 }}>
            {filtered.length} coupons available
          </div>
        }
      />

      {/* Search + filters */}
      <div
        style={{
          borderRadius: 14, background: "rgba(11,15,30,0.92)",
          border: "1px solid rgba(255,255,255,0.07)", padding: "14px",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "rgba(15,20,40,0.8)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10, padding: "0 14px", height: 38, marginBottom: 12,
          }}
        >
          <Search size={14} style={{ color: "#4A4D65" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search coupons..."
            style={{ background: "transparent", outline: "none", fontSize: 13, color: "#B7B9C9", flex: 1 }}
          />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: "5px 12px", borderRadius: 8, fontSize: 11.5, fontWeight: 500,
                cursor: "pointer", transition: "all 0.15s",
                background: category === c ? "rgba(124,77,255,0.22)" : "rgba(255,255,255,0.04)",
                border: category === c ? "1px solid rgba(124,77,255,0.4)" : "1px solid rgba(255,255,255,0.07)",
                color: category === c ? "#9D6CFF" : "#8385A0",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Coupon grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {filtered.map((coupon, i) => (
          <motion.div
            key={coupon.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
            style={{
              borderRadius: 14, background: "rgba(11,15,30,0.92)",
              border: "1px solid rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}
          >
            {/* Color top stripe */}
            <div
              style={{ height: 4, background: `linear-gradient(90deg, ${coupon.color}, transparent)` }}
            />
            <div style={{ padding: "14px" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      padding: "4px 10px", borderRadius: 8,
                      background: coupon.bg, border: `1px solid ${coupon.border}`,
                      marginBottom: 6,
                    }}
                  >
                    <Ticket size={11} style={{ color: coupon.color }} />
                    <span style={{ fontSize: 13, fontWeight: 800, color: coupon.color, letterSpacing: "0.5px" }}>
                      {coupon.code}
                    </span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{coupon.discount}</div>
                </div>
                <div
                  style={{
                    fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6,
                    background: "rgba(124,77,255,0.14)", border: "1px solid rgba(124,77,255,0.25)", color: "#9D6CFF",
                  }}
                >
                  {coupon.category}
                </div>
              </div>

              <p style={{ fontSize: 12, color: "#8385A0", lineHeight: 1.6, marginBottom: 12 }}>
                {coupon.desc}
              </p>

              <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 10, color: "#4A4D65" }}>Min. Order</div>
                  <div style={{ fontSize: 12, color: "white", fontWeight: 600 }}>{coupon.minOrder}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "#4A4D65" }}>Valid Until</div>
                  <div style={{ fontSize: 12, color: "white", fontWeight: 600 }}>{coupon.validity}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "#4A4D65" }}>Store</div>
                  <div style={{ fontSize: 12, color: "white", fontWeight: 600 }}>{coupon.store}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCopy(coupon.code)}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    padding: "8px 0", borderRadius: 9,
                    background: copied === coupon.code ? "rgba(55,214,122,0.2)" : "rgba(255,255,255,0.05)",
                    border: copied === coupon.code ? "1px solid rgba(55,214,122,0.4)" : "1px solid rgba(255,255,255,0.08)",
                    color: copied === coupon.code ? "#37D67A" : "#B7B9C9",
                    fontSize: 12, fontWeight: 500, cursor: "pointer",
                  }}
                >
                  {copied === coupon.code ? <CheckCheck size={13} /> : <Copy size={13} />}
                  {copied === coupon.code ? "Copied!" : "Copy Code"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 14px rgba(124,77,255,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1, padding: "8px 0", borderRadius: 9,
                    background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
                    color: "white", fontSize: 12, fontWeight: 600,
                    border: "none", cursor: "pointer",
                  }}
                >
                  Apply Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
}
