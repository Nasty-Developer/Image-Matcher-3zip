import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Search, Zap, ArrowLeft, Star, TrendingDown, ArrowRight } from "lucide-react";

interface ResultItem {
  id: number;
  name: string;
  category: string;
  emoji: string;
  bestPrice: number;
  original: number;
  bestStore: string;
  storeColor: string;
  rating: number;
  stores: number;
}

const allResults: ResultItem[] = [
  { id: 1, name: "MacBook Air M2", category: "Laptops", emoji: "💻", bestPrice: 87990, original: 114900, bestStore: "Flipkart", storeColor: "#2874F0", rating: 4.6, stores: 5 },
  { id: 2, name: "iPhone 15 Pro", category: "Smartphones", emoji: "📱", bestPrice: 128900, original: 139900, bestStore: "Amazon", storeColor: "#FF9900", rating: 4.7, stores: 6 },
  { id: 3, name: "Sony WH-1000XM5", category: "Headphones", emoji: "🎧", bestPrice: 25990, original: 34990, bestStore: "Amazon", storeColor: "#FF9900", rating: 4.5, stores: 4 },
  { id: 4, name: "Samsung Galaxy S24 Ultra", category: "Smartphones", emoji: "📱", bestPrice: 107999, original: 129999, bestStore: "Flipkart", storeColor: "#2874F0", rating: 4.6, stores: 5 },
  { id: 5, name: "PlayStation 5", category: "Gaming", emoji: "🎮", bestPrice: 46990, original: 54990, bestStore: "Croma", storeColor: "#00A63E", rating: 4.8, stores: 3 },
  { id: 6, name: "Dell XPS 13", category: "Laptops", emoji: "💻", bestPrice: 92900, original: 119900, bestStore: "Reliance Digital", storeColor: "#E31E24", rating: 4.4, stores: 4 },
];

function getQueryParam(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get("q") || "";
}

export default function SearchResults() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState(getQueryParam());

  const results = useMemo(() => {
    if (!query.trim()) return allResults;
    const q = query.toLowerCase();
    return allResults.filter(
      (r) => r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(124,77,255,0.08) 0%, transparent 60%), #060913",
        color: "white",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "18px 20px 60px" }}>
        {/* Top bar */}
        <div className="flex items-center gap-3" style={{ marginBottom: 24 }}>
          <button
            onClick={() => navigate("/")}
            aria-label="Back"
            style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: "rgba(15,20,40,0.85)", border: "1px solid rgba(255,255,255,0.09)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#B7B9C9", cursor: "pointer",
            }}
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex items-center flex-1 min-w-0" style={{
            background: "rgba(15,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12, padding: "0 14px", height: 44,
          }}>
            <Search size={15} style={{ color: "#7B7E9A", flexShrink: 0 }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for any product..."
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: "white", fontSize: 13.5, padding: "0 10px",
              }}
              autoFocus
            />
          </div>
        </div>

        <div style={{ fontSize: 12.5, color: "#7B7E9A", marginBottom: 16 }}>
          {results.length} result{results.length !== 1 ? "s" : ""} {query ? <>for "<span style={{ color: "#D6D8E5" }}>{query}</span>"</> : "— trending products"}
        </div>

        <div className="flex flex-col gap-3">
          {results.map((r, i) => (
            <motion.button
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ borderColor: "rgba(139,92,246,0.4)", scale: 1.005 }}
              onClick={() => navigate(`/product/${r.id}`)}
              className="flex items-center gap-4 text-left"
              style={{
                background: "rgba(11,15,30,0.9)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14, padding: "16px 18px", cursor: "pointer",
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                background: "rgba(124,77,255,0.12)", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 24,
              }}>
                {r.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 650, color: "white", marginBottom: 3 }}>{r.name}</div>
                <div className="flex items-center gap-3" style={{ fontSize: 11.5, color: "#7B7E9A" }}>
                  <span>{r.category}</span>
                  <span className="flex items-center gap-1"><Star size={11} style={{ color: "#F5A623" }} /> {r.rating}</span>
                  <span>{r.stores} stores compared</span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div className="flex items-center gap-1.5 justify-end" style={{ fontSize: 11, color: r.storeColor, fontWeight: 650, marginBottom: 2 }}>
                  <TrendingDown size={11} /> Best on {r.bestStore}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>₹{r.bestPrice.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: "#5A5D75", textDecoration: "line-through" }}>₹{r.original.toLocaleString()}</div>
              </div>
              <ArrowRight size={16} style={{ color: "#4A4D65", flexShrink: 0 }} />
            </motion.button>
          ))}
          {results.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#5A5D75", fontSize: 13 }}>
              No products found. Try a different search term.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
