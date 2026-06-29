import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, RefreshCw, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import PageTransition from "../components/PageTransition";

const products = [
  {
    name: "Apple MacBook Air M2",
    sku: "AAPL-MBA-M2-256",
    category: "Laptops",
    image: "💻",
    stores: [
      { name: "Amazon", color: "#FF9900", status: "In Stock", qty: "10+", updated: "2 min ago" },
      { name: "Flipkart", color: "#2874F0", status: "In Stock", qty: "5", updated: "5 min ago" },
      { name: "Reliance Digital", color: "#E31E24", status: "Low Stock", qty: "2", updated: "12 min ago" },
      { name: "Croma", color: "#00A63E", status: "Out of Stock", qty: "0", updated: "1 hr ago" },
    ],
  },
  {
    name: "Sony WH-1000XM5",
    sku: "SONY-WH1000XM5-BK",
    category: "Headphones",
    image: "🎧",
    stores: [
      { name: "Amazon", color: "#FF9900", status: "In Stock", qty: "10+", updated: "1 min ago" },
      { name: "Flipkart", color: "#2874F0", status: "Low Stock", qty: "3", updated: "8 min ago" },
      { name: "Reliance Digital", color: "#E31E24", status: "In Stock", qty: "7", updated: "15 min ago" },
    ],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    sku: "SAM-S24U-256-BK",
    category: "Smartphones",
    image: "📱",
    stores: [
      { name: "Amazon", color: "#FF9900", status: "In Stock", qty: "10+", updated: "3 min ago" },
      { name: "Flipkart", color: "#2874F0", status: "In Stock", qty: "10+", updated: "6 min ago" },
      { name: "Vijay Sales", color: "#F5A623", status: "Low Stock", qty: "1", updated: "30 min ago" },
    ],
  },
  {
    name: "Apple AirPods Pro 2nd Gen",
    sku: "AAPL-APP2-WHT",
    category: "Earbuds",
    image: "🎵",
    stores: [
      { name: "Amazon", color: "#FF9900", status: "In Stock", qty: "10+", updated: "4 min ago" },
      { name: "Flipkart", color: "#2874F0", status: "In Stock", qty: "10+", updated: "7 min ago" },
      { name: "Croma", color: "#00A63E", status: "Out of Stock", qty: "0", updated: "2 hr ago" },
    ],
  },
];

const statusConfig = {
  "In Stock": { color: "#37D67A", bg: "rgba(55,214,122,0.12)", icon: CheckCircle },
  "Low Stock": { color: "#F5A623", bg: "rgba(245,166,35,0.12)", icon: AlertTriangle },
  "Out of Stock": { color: "#FF6B6B", bg: "rgba(255,107,107,0.12)", icon: XCircle },
};

export default function StockTracker() {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalIn = products.flatMap((p) => p.stores).filter((s) => s.status === "In Stock").length;
  const totalLow = products.flatMap((p) => p.stores).filter((s) => s.status === "Low Stock").length;
  const totalOut = products.flatMap((p) => p.stores).filter((s) => s.status === "Out of Stock").length;

  return (
    <PageTransition>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "white" }}>Stock Tracker</h1>
          <p style={{ fontSize: 12.5, color: "#7B7E9A", marginTop: 2 }}>
            Real-time stock availability across all major stores
          </p>
        </div>
        <motion.button
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
          style={{
            width: 36, height: 36, borderRadius: 10,
            background: "rgba(124,77,255,0.14)", border: "1px solid rgba(124,77,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <RefreshCw size={14} style={{ color: "#9D6CFF" }} />
        </motion.button>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 14 }}>
        {[
          { label: "In Stock", count: totalIn, color: "#37D67A", bg: "rgba(55,214,122,0.12)", icon: CheckCircle },
          { label: "Low Stock", count: totalLow, color: "#F5A623", bg: "rgba(245,166,35,0.12)", icon: AlertTriangle },
          { label: "Out of Stock", count: totalOut, color: "#FF6B6B", bg: "rgba(255,107,107,0.12)", icon: XCircle },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{
              borderRadius: 13, background: "rgba(11,15,30,0.92)",
              border: "1px solid rgba(255,255,255,0.07)", padding: "14px",
              display: "flex", alignItems: "center", gap: 12,
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "white" }}>{s.count}</div>
              <div style={{ fontSize: 11, color: "#7B7E9A" }}>{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(11,15,30,0.92)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 12, padding: "0 14px", height: 40, marginBottom: 12,
        }}
      >
        <Search size={14} style={{ color: "#4A4D65" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{ background: "transparent", outline: "none", fontSize: 13, color: "#B7B9C9", flex: 1 }}
        />
      </div>

      {/* Product stock cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((product, pi) => (
          <motion.div
            key={product.sku}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: pi * 0.07 }}
            style={{
              borderRadius: 14, background: "rgba(11,15,30,0.92)",
              border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, fontSize: 20, background: "rgba(124,77,255,0.08)", border: "1px solid rgba(124,77,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {product.image}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "white", fontSize: 14 }}>{product.name}</div>
                <div style={{ fontSize: 10.5, color: "#5A5D75", marginTop: 1 }}>SKU: {product.sku}</div>
              </div>
              <div
                style={{
                  fontSize: 10.5, fontWeight: 600, padding: "3px 10px", borderRadius: 6,
                  background: "rgba(124,77,255,0.14)", border: "1px solid rgba(124,77,255,0.25)", color: "#9D6CFF",
                }}
              >
                {product.category}
              </div>
            </div>

            {/* Store statuses */}
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${product.stores.length}, 1fr)` }}>
              {product.stores.map((store, si) => {
                const cfg = statusConfig[store.status as keyof typeof statusConfig];
                return (
                  <div
                    key={store.name}
                    style={{
                      padding: "12px 14px",
                      borderRight: si < product.stores.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: store.color, fontSize: 12, marginBottom: 6 }}>{store.name}</div>
                    <div
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        padding: "3px 8px", borderRadius: 6, marginBottom: 5,
                        background: cfg.bg, border: `1px solid ${cfg.color}30`,
                      }}
                    >
                      <cfg.icon size={10} style={{ color: cfg.color }} />
                      <span style={{ fontSize: 10.5, fontWeight: 600, color: cfg.color }}>{store.status}</span>
                    </div>
                    <div style={{ fontSize: 10.5, color: "#7B7E9A" }}>
                      Qty: <span style={{ color: "white", fontWeight: 600 }}>{store.qty}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#4A4D65", marginTop: 2 }}>Updated {store.updated}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
}
