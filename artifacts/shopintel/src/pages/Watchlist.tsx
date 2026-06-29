import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, TrendingDown, Eye, Star, Bookmark } from "lucide-react";
import { useLocation } from "wouter";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";
import { SkeletonCard } from "../components/SkeletonLoader";

const initialItems = [
  {
    id: 1, name: "Apple MacBook Air M2", category: "Laptops", image: "💻",
    currentPrice: 89990, targetPrice: 85000, originalPrice: 114900,
    bestStore: "Flipkart", rating: 4.8, priceChange: -4200, priceChangePct: -4.5,
    addedDate: "15 May 2026",
  },
  {
    id: 2, name: "Sony WH-1000XM5", category: "Headphones", image: "🎧",
    currentPrice: 26990, targetPrice: 24000, originalPrice: 34990,
    bestStore: "Amazon", rating: 4.7, priceChange: -3000, priceChangePct: -10.0,
    addedDate: "20 May 2026",
  },
  {
    id: 3, name: "Apple AirPods Pro 2nd Gen", category: "Earbuds", image: "🎵",
    currentPrice: 19900, targetPrice: 17000, originalPrice: 26900,
    bestStore: "Amazon", rating: 4.8, priceChange: -2000, priceChangePct: -9.1,
    addedDate: "22 May 2026",
  },
];

export default function Watchlist() {
  const [, navigate] = useLocation();
  const [items, setItems] = useState(initialItems);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const remove = (id: number) => {
    // Add success animation logically if needed, UI will handle exit animation
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <PageTransition>
      <PageHeader
        title="My Watchlist"
        subtitle="Track your saved products and price targets"
        icon={Bookmark}
        actions={
          <div
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: 10,
              background: "rgba(124,77,255,0.14)", border: "1px solid rgba(124,77,255,0.25)",
            }}
          >
            <Heart size={13} style={{ color: "#9D6CFF" }} fill="#9D6CFF" />
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#9D6CFF" }}>
              {items.length} item{items.length !== 1 ? "s" : ""}
            </span>
          </div>
        }
      />

      {isLoading ? (
        <div className="flex flex-col gap-3">
          <SkeletonCard height={120} />
          <SkeletonCard height={120} />
          <SkeletonCard height={120} />
        </div>
      ) : items.length === 0 ? (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            borderRadius: 16, background: "rgba(11,15,30,0.92)", border: "1px solid rgba(255,255,255,0.07)",
            padding: "60px 20px", textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>💝</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 8 }}>
            Your watchlist is empty
          </div>
          <div style={{ fontSize: 13, color: "#7B7E9A" }}>
            Start adding products to track their prices and get alerts
          </div>
        </motion.div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <AnimatePresence>
            {items.map((item, i) => {
              const discount = Math.round(((item.originalPrice - item.currentPrice) / item.originalPrice) * 100);
              const targetReached = item.currentPrice <= item.targetPrice;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    borderRadius: 14, background: "rgba(11,15,30,0.92)",
                    border: targetReached ? "1px solid rgba(55,214,122,0.35)" : "1px solid rgba(255,255,255,0.07)",
                    overflow: "hidden",
                  }}
                >
                  {targetReached && (
                    <div style={{ background: "rgba(55,214,122,0.12)", padding: "6px 16px", borderBottom: "1px solid rgba(55,214,122,0.2)" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#37D67A" }}>
                        🎉 Target price reached! Best time to buy.
                      </span>
                    </div>
                  )}

                  <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                    {/* Image */}
                    <div
                      style={{
                        width: 56, height: 56, borderRadius: 13, fontSize: 24,
                        background: "rgba(124,77,255,0.08)", border: "1px solid rgba(124,77,255,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}
                    >
                      {item.image}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: "white", fontSize: 14.5, marginBottom: 3 }}>
                        {item.name}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <Star size={10} fill="#F5A623" style={{ color: "#F5A623" }} />
                          <span style={{ fontSize: 11.5, color: "#B7B9C9" }}>{item.rating}</span>
                        </div>
                        <span style={{ fontSize: 10, color: "#4A4D65" }}>·</span>
                        <span style={{ fontSize: 11, color: "#7B7E9A" }}>Added {item.addedDate}</span>
                      </div>
                    </div>

                    {/* Prices */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 5, justifyContent: "flex-end" }}>
                        <span style={{ fontSize: 18, fontWeight: 900, color: "white" }}>
                          ₹{item.currentPrice.toLocaleString()}
                        </span>
                        <span style={{ fontSize: 11, color: "#4A4D65", textDecoration: "line-through" }}>
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                        <span style={{ fontSize: 11, color: "#37D67A", fontWeight: 700 }}>{discount}% off</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end", marginTop: 2 }}>
                        <TrendingDown size={11} style={{ color: "#37D67A" }} />
                        <span style={{ fontSize: 11, color: "#37D67A", fontWeight: 600 }}>
                          ₹{Math.abs(item.priceChange).toLocaleString()} ({Math.abs(item.priceChangePct)}%)
                        </span>
                      </div>
                      <div style={{ fontSize: 10.5, color: "#7B7E9A", marginTop: 1 }}>
                        Best: <span style={{ color: "#B7B9C9" }}>{item.bestStore}</span>
                      </div>
                    </div>

                    {/* Target */}
                    <div style={{ width: 110, flexShrink: 0 }}>
                      <div style={{ fontSize: 10, color: "#4A4D65", marginBottom: 3 }}>Target Price</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: targetReached ? "#37D67A" : "#B7B9C9" }}>
                        ₹{item.targetPrice.toLocaleString()}
                      </div>
                      <div
                        style={{
                          height: 4, borderRadius: 99, background: "rgba(255,255,255,0.08)",
                          marginTop: 5, overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%", borderRadius: 99,
                            background: targetReached ? "#37D67A" : "linear-gradient(90deg, #7C4DFF, #9D6CFF)",
                            width: `${Math.min(100, Math.round(((item.originalPrice - item.currentPrice) / (item.originalPrice - item.targetPrice)) * 100))}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => navigate(`/product/${item.id}`)}
                        style={{
                          width: 34, height: 34, borderRadius: 10,
                          background: "rgba(124,77,255,0.14)", border: "1px solid rgba(124,77,255,0.25)",
                          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                        }}
                      >
                        <Eye size={14} style={{ color: "#9D6CFF" }} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.08, background: "rgba(255,107,107,0.2)" }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => remove(item.id)}
                        style={{
                          width: 34, height: 34, borderRadius: 10,
                          background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)",
                          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                          transition: "background 0.2s",
                        }}
                      >
                        <Trash2 size={14} style={{ color: "#FF6B6B" }} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </PageTransition>
  );
}
