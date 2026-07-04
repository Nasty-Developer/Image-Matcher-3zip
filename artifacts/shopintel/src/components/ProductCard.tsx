import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Heart, Star, ChevronDown, CreditCard, Smartphone, Clock } from "lucide-react";
import { useBreakpoint } from "../hooks/useBreakpoint";

const stores = [
  {
    logo: "amazon", displayName: "amazon",
    price: 89990, original: 114900, discount: "21% OFF",
    delivery: "Tomorrow", rating: 4.6, reviews: "12.4K",
    offer: "₹2,000 Off on HDFC Cards", color: "#FF9900",
    fontStyle: { fontWeight: 800, fontSize: 14, fontFamily: "Georgia, serif" } as React.CSSProperties,
    savings: 24910, emi: { months: 12, amount: 7914 },
    cashback: "₹2,000 via HDFC Card",
    extraOffer: "No Cost EMI on SBI Credit Card",
  },
  {
    logo: "flipkart", displayName: "Flipkart",
    price: 87990, original: 114900, discount: "23% OFF",
    delivery: "2 Days", rating: 4.5, reviews: "8.7K",
    offer: "₹3,000 Off with Flipkart Axis Card", color: "#2874F0",
    fontStyle: { fontWeight: 800, fontSize: 13.5 } as React.CSSProperties,
    savings: 26910, emi: { months: 12, amount: 7732 },
    cashback: "₹3,000 via Axis Card",
    extraOffer: "10% Off on Flipkart SuperCoins",
  },
  {
    logo: "reliance", displayName: "Reliance Digital",
    price: 90900, original: 118900, discount: "20% OFF",
    delivery: "Tomorrow", rating: 4.4, reviews: "2.1K",
    offer: "₹2,500 Off on ICICI Cards", color: "#E31E24",
    fontStyle: { fontWeight: 700, fontSize: 11 } as React.CSSProperties,
    savings: 28000, emi: { months: 12, amount: 7990 },
    cashback: "₹2,500 via ICICI Card",
    extraOffer: "Free Reliance Digital protection plan",
  },
  {
    logo: "croma", displayName: "croma",
    price: 91900, original: 119000, discount: "19% OFF",
    delivery: "2 Days", rating: 4.6, reviews: "1.3K",
    offer: "₹2,000 Cashback on Amazon Pay", color: "#00A63E",
    fontStyle: { fontWeight: 800, fontSize: 13.5 } as React.CSSProperties,
    savings: 27100, emi: { months: 12, amount: 8074 },
    cashback: "₹2,000 via Amazon Pay",
    extraOffer: "Extended warranty available",
  },
  {
    logo: "vijay", displayName: "vijay sales",
    price: 92500, original: 120000, discount: "18% OFF",
    delivery: "3 Days", rating: 4.4, reviews: "980",
    offer: "₹1,500 Off on Yes Bank Cards", color: "#F5A623",
    fontStyle: { fontWeight: 700, fontSize: 11, textTransform: "uppercase" as const, letterSpacing: "0.5px" } as React.CSSProperties,
    savings: 27500, emi: { months: 12, amount: 8117 },
    cashback: "₹1,500 via Yes Bank",
    extraOffer: "Buy-back guarantee available",
  },
];

export default function ProductCard() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggle = (logo: string) => setExpandedRow(expandedRow === logo ? null : logo);
  const { isDesktop } = useBreakpoint();

  return (
    <div
      style={{
        borderRadius: 14,
        background: "rgba(11,15,30,0.92)",
        border: "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
      }}
    >
      {/* Product header */}
      <div style={{ padding: "18px 18px 14px 16px", display: "flex", alignItems: "flex-start", gap: 16 }}>
        {/* MacBook image */}
        <div
          style={{
            width: 90, height: 78, borderRadius: 12, flexShrink: 0,
            background: "linear-gradient(135deg, rgba(18,24,48,0.95) 0%, rgba(12,16,36,0.95) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 58, height: 38, borderRadius: "5px 5px 0 0", background: "linear-gradient(145deg, #2c2c3e 0%, #1a1a2a 100%)", border: "1.5px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 46, height: 28, borderRadius: 3, background: "rgba(124,77,255,0.08)", border: "1px solid rgba(124,77,255,0.15)" }} />
            </div>
            <div style={{ width: 64, height: 4, background: "linear-gradient(135deg, #3a3a4e, #252535)", borderRadius: "0 0 4px 4px", border: "1px solid rgba(255,255,255,0.08)", borderTop: "none" }} />
          </div>
        </div>

        {/* Product info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
            <div>
              <h2 style={{ fontWeight: 700, color: "white", fontSize: 16, marginBottom: 5, whiteSpace: "nowrap" }}>
                Apple MacBook Air M2
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ display: "flex", gap: 1 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} fill="#F5A623" style={{ color: "#F5A623" }} />
                  ))}
                </div>
                <span style={{ fontSize: 12, color: "#B7B9C9", fontWeight: 600 }}>4.8</span>
                <span style={{ fontSize: 11, color: "#5A5D75" }}>(2,453)</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 14px rgba(124,77,255,0.25)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center", gap: 5, padding: "6px 12px",
                  borderRadius: 9, background: "rgba(124,77,255,0.13)", border: "1px solid rgba(124,77,255,0.28)",
                  color: "white", fontSize: 11.5, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
                  transition: "box-shadow 0.18s",
                }}
              >
                <TrendingUp size={12} style={{ color: "#9D6CFF" }} />
                Track Price
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08, borderColor: "rgba(255,107,107,0.35)" }}
                whileTap={{ scale: 0.93 }}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", flexShrink: 0, transition: "border-color 0.18s",
                }}
              >
                <Heart size={13} style={{ color: "#B7B9C9" }} />
              </motion.button>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
            {["M2 Chip", "8GB RAM", "256GB SSD", "13.6-inch"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "3px 9px", borderRadius: 7,
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 11, color: "#B7B9C9", whiteSpace: "nowrap",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", overflowX: isDesktop ? "visible" : "auto" }}>
        <div style={{ minWidth: isDesktop ? "auto" : 720 }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr 90px 95px 78px 1fr 90px 28px",
            padding: "9px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(255,255,255,0.01)",
          }}
        >
          {["Store", "Price", "Delivery", "Rating", "Stock", "Best Offer", "", ""].map((h, idx) => (
            <span key={idx} style={{ fontSize: 10.5, color: "#4A4D65", fontWeight: 600, letterSpacing: "0.03em" }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {stores.map((store, i) => {
          const isExpanded = expandedRow === store.logo;
          return (
            <div key={store.logo}>
              <motion.div
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr 90px 95px 78px 1fr 90px 28px",
                  padding: "12px 18px",
                  borderBottom: isExpanded ? "none" : (i < stores.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none"),
                  alignItems: "center",
                  cursor: "pointer",
                  background: isExpanded ? "rgba(124,77,255,0.05)" : "transparent",
                  transition: "background 0.15s",
                }}
                onClick={() => toggle(store.logo)}
                whileHover={{ background: isExpanded ? "rgba(124,77,255,0.07)" : "rgba(255,255,255,0.018)" }}
              >
                <div style={{ ...store.fontStyle, color: store.color }}>{store.displayName}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, flexWrap: "nowrap" }}>
                  <span style={{ fontWeight: 700, color: "white", fontSize: 13.5, whiteSpace: "nowrap" }}>₹{store.price.toLocaleString()}</span>
                  <span style={{ fontSize: 10, color: "#4A4D65", textDecoration: "line-through", whiteSpace: "nowrap" }}>₹{store.original.toLocaleString()}</span>
                  <span style={{ fontSize: 10.5, color: "#37D67A", fontWeight: 600, whiteSpace: "nowrap" }}>{store.discount}</span>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "white", whiteSpace: "nowrap" }}>{store.delivery}</div>
                  <div style={{ fontSize: 10.5, color: "#37D67A", fontWeight: 600 }}>FREE</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Star size={10} fill="#F5A623" style={{ color: "#F5A623" }} />
                  <span style={{ fontSize: 12, color: "white", fontWeight: 600 }}>{store.rating}</span>
                  <span style={{ fontSize: 10, color: "#4A4D65" }}>({store.reviews})</span>
                </div>
                <div style={{ fontSize: 11.5, color: "#37D67A", fontWeight: 600 }}>In Stock</div>
                <div style={{ fontSize: 10.5, color: "#8385A0", paddingRight: 8 }}>{store.offer}</div>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 14px rgba(124,77,255,0.5)" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => { e.stopPropagation(); }}
                  className="ripple"
                  style={{
                    background: "linear-gradient(135deg, #7C4DFF 0%, #9D6CFF 100%)",
                    padding: "7px 0", borderRadius: 8, color: "white", fontSize: 11.5, fontWeight: 600,
                    width: "100%", cursor: "pointer", border: "none", whiteSpace: "nowrap",
                    transition: "box-shadow 0.18s",
                  }}
                >
                  View Deal
                </motion.button>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <ChevronDown size={13} style={{ color: "#5A5D75" }} />
                </motion.div>
              </motion.div>

              {/* Expandable deal breakdown */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ overflow: "hidden", borderBottom: i < stores.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                  >
                    <div
                      style={{
                        margin: "0 16px 14px 16px",
                        borderRadius: 12,
                        background: "rgba(124,77,255,0.06)",
                        border: "1px solid rgba(124,77,255,0.15)",
                        padding: "14px 16px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 14,
                      }}
                    >
                      {/* Total Savings */}
                      <div>
                        <div style={{ fontSize: 10, color: "#5A5D75", marginBottom: 5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          Total Savings
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: "#37D67A" }}>
                          ₹{store.savings.toLocaleString()}
                        </div>
                        <div style={{ fontSize: 10.5, color: "#37D67A", marginTop: 2 }}>
                          {Math.round(((store.original - store.price) / store.original) * 100)}% off MRP
                        </div>
                      </div>

                      {/* EMI */}
                      <div>
                        <div style={{ fontSize: 10, color: "#5A5D75", marginBottom: 5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          No Cost EMI
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <Smartphone size={13} style={{ color: "#9D6CFF" }} />
                          <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>
                            ₹{store.emi.amount.toLocaleString()}/mo
                          </span>
                        </div>
                        <div style={{ fontSize: 10.5, color: "#7B7E9A", marginTop: 2 }}>
                          for {store.emi.months} months · 0% interest
                        </div>
                      </div>

                      {/* Cashback + extra */}
                      <div>
                        <div style={{ fontSize: 10, color: "#5A5D75", marginBottom: 5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          Best Cashback
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <CreditCard size={13} style={{ color: "#4EB5FF" }} />
                          <span style={{ fontSize: 12.5, fontWeight: 700, color: "white" }}>{store.cashback}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
                          <Clock size={10} style={{ color: "#5A5D75" }} />
                          <span style={{ fontSize: 10.5, color: "#7B7E9A" }}>{store.extraOffer}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
