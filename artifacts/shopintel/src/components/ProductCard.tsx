import { motion } from "framer-motion";
import { TrendingUp, Heart, Star } from "lucide-react";

const stores = [
  {
    logo: "amazon",
    displayName: "amazon",
    price: "₹89,990",
    original: "₹1,14,900",
    discount: "21% OFF",
    delivery: "Tomorrow",
    rating: 4.6,
    reviews: "12.4K",
    offer: "₹2,000 Off on HDFC Cards",
    color: "#FF9900",
    fontStyle: { fontWeight: 800, fontSize: 14, fontFamily: "Georgia, serif" },
  },
  {
    logo: "flipkart",
    displayName: "Flipkart",
    price: "₹87,990",
    original: "₹1,14,900",
    discount: "23% OFF",
    delivery: "2 Days",
    rating: 4.5,
    reviews: "8.7K",
    offer: "₹3,000 Off with Flipkart Axis Card",
    color: "#2874F0",
    fontStyle: { fontWeight: 800, fontSize: 13.5 },
  },
  {
    logo: "reliance",
    displayName: "Reliance Digital",
    price: "₹90,900",
    original: "₹1,18,900",
    discount: "20% OFF",
    delivery: "Tomorrow",
    rating: 4.4,
    reviews: "2.1K",
    offer: "₹2,500 Off on ICICI Cards",
    color: "#E31E24",
    fontStyle: { fontWeight: 700, fontSize: 11 },
  },
  {
    logo: "croma",
    displayName: "croma",
    price: "₹91,900",
    original: "₹1,19,000",
    discount: "19% OFF",
    delivery: "2 Days",
    rating: 4.6,
    reviews: "1.3K",
    offer: "₹2,000 Cashback on Amazon Pay",
    color: "#00A63E",
    fontStyle: { fontWeight: 800, fontSize: 13.5 },
  },
  {
    logo: "vijay",
    displayName: "vijay sales",
    price: "₹92,500",
    original: "₹1,20,000",
    discount: "18% OFF",
    delivery: "3 Days",
    rating: 4.4,
    reviews: "980",
    offer: "₹1,500 Off on Yes Bank Cards",
    color: "#F5A623",
    fontStyle: {
      fontWeight: 700,
      fontSize: 11,
      textTransform: "uppercase" as const,
      letterSpacing: "0.5px",
    },
  },
];

export default function ProductCard() {
  return (
    <div
      style={{
        borderRadius: 14,
        background: "rgba(11,15,30,0.92)",
        border: "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
      }}
    >
      {/* Product header row */}
      <div
        style={{
          padding: "14px 16px 10px 14px",
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
        }}
      >
        {/* MacBook silhouette image */}
        <div
          style={{
            width: 90,
            height: 78,
            borderRadius: 12,
            background: "linear-gradient(135deg, rgba(18,24,48,0.95) 0%, rgba(12,16,36,0.95) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* MacBook body */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 58,
                height: 38,
                borderRadius: "5px 5px 0 0",
                background: "linear-gradient(145deg, #2c2c3e 0%, #1a1a2a 100%)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 28,
                  borderRadius: 3,
                  background: "rgba(124,77,255,0.08)",
                  border: "1px solid rgba(124,77,255,0.15)",
                }}
              />
            </div>
            <div
              style={{
                width: 64,
                height: 4,
                background: "linear-gradient(135deg, #3a3a4e, #252535)",
                borderRadius: "0 0 4px 4px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTop: "none",
              }}
            />
          </div>
        </div>

        {/* Product info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <div>
              <h2
                style={{
                  fontWeight: 700,
                  color: "white",
                  fontSize: 16,
                  marginBottom: 4,
                  whiteSpace: "nowrap",
                }}
              >
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
            <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 11px",
                  borderRadius: 8,
                  background: "rgba(124,77,255,0.13)",
                  border: "1px solid rgba(124,77,255,0.28)",
                  color: "white",
                  fontSize: 11.5,
                  fontWeight: 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                <TrendingUp size={12} style={{ color: "#9D6CFF" }} />
                Track Price
              </motion.button>
              <button
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <Heart size={13} style={{ color: "#B7B9C9" }} />
              </button>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
            {["M2 Chip", "8GB RAM", "256GB SSD", "13.6-inch"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "3px 9px",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 11,
                  color: "#B7B9C9",
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr 90px 95px 78px 1fr 80px",
            padding: "7px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {["Store", "Price", "Delivery", "Rating", "Stock", "Best Offer", ""].map((h) => (
            <span key={h + Math.random()} style={{ fontSize: 10.5, color: "#4A4D65", fontWeight: 600 }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {stores.map((store, i) => (
          <motion.div
            key={store.logo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr 90px 95px 78px 1fr 80px",
              padding: "9px 16px",
              borderBottom:
                i < stores.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              alignItems: "center",
            }}
            className="hover:bg-white/[0.015] transition-colors"
          >
            {/* Store name */}
            <div style={{ ...store.fontStyle, color: store.color }}>{store.displayName}</div>

            {/* Price — all on one line */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, flexWrap: "nowrap" }}>
              <span style={{ fontWeight: 700, color: "white", fontSize: 13, whiteSpace: "nowrap" }}>
                {store.price}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "#4A4D65",
                  textDecoration: "line-through",
                  whiteSpace: "nowrap",
                }}
              >
                {store.original}
              </span>
              <span
                style={{ fontSize: 10, color: "#37D67A", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {store.discount}
              </span>
            </div>

            {/* Delivery */}
            <div>
              <div style={{ fontSize: 11.5, color: "white", whiteSpace: "nowrap" }}>{store.delivery}</div>
              <div style={{ fontSize: 10, color: "#37D67A", fontWeight: 600 }}>FREE</div>
            </div>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Star size={10} fill="#F5A623" style={{ color: "#F5A623" }} />
              <span style={{ fontSize: 11.5, color: "white", fontWeight: 600 }}>{store.rating}</span>
              <span style={{ fontSize: 10, color: "#4A4D65" }}>({store.reviews})</span>
            </div>

            {/* Stock */}
            <div style={{ fontSize: 11, color: "#37D67A", fontWeight: 600 }}>In Stock</div>

            {/* Offer */}
            <div style={{ fontSize: 10.5, color: "#8385A0", paddingRight: 8 }}>{store.offer}</div>

            {/* View Deal */}
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 14px rgba(124,77,255,0.5)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "linear-gradient(135deg, #7C4DFF 0%, #9D6CFF 100%)",
                padding: "6px 0",
                borderRadius: 8,
                color: "white",
                fontSize: 11,
                fontWeight: 600,
                width: "100%",
                cursor: "pointer",
                border: "none",
                transition: "box-shadow 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              View Deal
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
