import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal, ChevronDown, ArrowUpDown,
  Star, TrendingDown, ExternalLink, Filter, BarChart2
} from "lucide-react";
import { useLocation } from "wouter";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";
import { SkeletonCard, SkeletonRow } from "../components/SkeletonLoader";

const products = [

  {
    id: 1,
    name: "Apple MacBook Air M2",
    category: "Laptops",
    image: "💻",
    stores: [
      { name: "amazon", color: "#FF9900", price: 89990, original: 114900, delivery: "Tomorrow", rating: 4.6, reviews: "12.4K" },
      { name: "Flipkart", color: "#2874F0", price: 87990, original: 114900, delivery: "2 Days", rating: 4.5, reviews: "8.7K" },
      { name: "Reliance Digital", color: "#E31E24", price: 90900, original: 118900, delivery: "Tomorrow", rating: 4.4, reviews: "2.1K" },
      { name: "croma", color: "#00A63E", price: 91900, original: 119000, delivery: "2 Days", rating: 4.6, reviews: "1.3K" },
    ],
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    category: "Headphones",
    image: "🎧",
    stores: [
      { name: "amazon", color: "#FF9900", price: 26990, original: 34990, delivery: "Tomorrow", rating: 4.7, reviews: "24K" },
      { name: "Flipkart", color: "#2874F0", price: 25990, original: 34990, delivery: "2 Days", rating: 4.6, reviews: "18K" },
      { name: "Reliance Digital", color: "#E31E24", price: 27490, original: 34990, delivery: "3 Days", rating: 4.5, reviews: "3.2K" },
    ],
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    category: "Smartphones",
    image: "📱",
    stores: [
      { name: "amazon", color: "#FF9900", price: 109999, original: 134999, delivery: "Tomorrow", rating: 4.5, reviews: "8.2K" },
      { name: "Flipkart", color: "#2874F0", price: 107999, original: 134999, delivery: "2 Days", rating: 4.4, reviews: "6.5K" },
      { name: "vijay sales", color: "#F5A623", price: 111999, original: 134999, delivery: "3 Days", rating: 4.3, reviews: "1.1K" },
    ],
  },
  {
    id: 4,
    name: "Apple AirPods Pro 2nd Gen",
    category: "Earbuds",
    image: "🎵",
    stores: [
      { name: "amazon", color: "#FF9900", price: 19900, original: 26900, delivery: "Tomorrow", rating: 4.8, reviews: "31K" },
      { name: "Flipkart", color: "#2874F0", price: 18990, original: 26900, delivery: "2 Days", rating: 4.7, reviews: "22K" },
      { name: "croma", color: "#00A63E", price: 19490, original: 26900, delivery: "Tomorrow", rating: 4.7, reviews: "4.5K" },
    ],
  },
];

const categories = ["All", "Laptops", "Smartphones", "Headphones", "Earbuds"];
const sortOptions = ["Best Price", "Biggest Discount", "Best Rating", "Fastest Delivery"];

export default function PriceCompare() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Best Price");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <PageTransition>
      <PageHeader 
        title="Price Compare" 
        subtitle="Compare prices across 50+ stores in real-time" 
        icon={BarChart2} 
        actions={
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7C4DFF]/15 border border-[#7C4DFF]/30 text-[#9D6CFF] text-[12px] font-medium hover:bg-[#7C4DFF]/25 transition-colors">
              <Filter size={13} /> Filters
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#B7B9C9] text-[12px] font-medium hover:bg-white/10 transition-colors">
              <ArrowUpDown size={13} /> {sort} <ChevronDown size={12} />
            </button>
          </div>
        }
      />

      {/* Search + category filters */}

      <div
        style={{
          borderRadius: 14, background: "rgba(11,15,30,0.92)",
          border: "1px solid rgba(255,255,255,0.07)", padding: "16px 18px",
          marginBottom: 14, display: "flex", alignItems: "center", gap: 16,
        }}
      >
        <div
          style={{
            flex: 1, display: "flex", alignItems: "center", gap: 10,
            background: "rgba(15,20,40,0.85)", border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 11, padding: "0 14px", height: 40,
          }}
        >
          <Search size={14} style={{ color: "#4A4D65", flexShrink: 0 }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products to compare..."
            style={{ background: "transparent", outline: "none", fontSize: 13, color: "#B7B9C9", flex: 1 }}
          />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
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

      {/* Product cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {isLoading ? (
          <SkeletonRow count={4} height={78} />
        ) : (
          filtered.map((product, pi) => {
            const bestPrice = Math.min(...product.stores.map((s) => s.price));
            const isExpanded = expanded === product.id;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: pi * 0.06 }}
                whileHover={{ borderColor: "rgba(124,77,255,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.22)" }}
                style={{
                  borderRadius: 14, background: "rgba(11,15,30,0.92)",
                  border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "16px 18px", cursor: "pointer",
                    borderBottom: isExpanded ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                  onClick={() => setLocation(`/product/${product.id}`)}
                >
                  <div
                    style={{
                      width: 48, height: 48, borderRadius: 12, fontSize: 22,
                      background: "rgba(124,77,255,0.08)", border: "1px solid rgba(124,77,255,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}
                  >
                    {product.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="font-bold text-white text-[14.5px] hover:text-[#9D6CFF] transition-colors">{product.name}</div>
                    <div style={{ fontSize: 11.5, color: "#7B7E9A", marginTop: 2 }}>
                      {product.category} · {product.stores.length} stores compared
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 11, color: "#7B7E9A" }}>Best Price</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#37D67A" }}>
                      ₹{bestPrice.toLocaleString()}
                    </div>
                  </div>
                  <motion.button 
                    animate={{ rotate: isExpanded ? 180 : 0 }} 
                    transition={{ duration: 0.2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpanded(isExpanded ? null : product.id);
                    }}
                    className="ml-2 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <ChevronDown size={16} style={{ color: "#5A5D75" }} />
                  </motion.button>
                </div>

                {/* Expandable comparison table */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ overflow: "hidden" }}
                  >
                    {/* Table header */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "140px 1fr 100px 90px 80px",
                        padding: "10px 18px",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        background: "rgba(255,255,255,0.01)",
                      }}
                    >
                      {["Store", "Price", "Delivery", "Rating", ""].map((h) => (
                        <span key={h} style={{ fontSize: 10.5, color: "#4A4D65", fontWeight: 600, letterSpacing: "0.03em" }}>{h}</span>
                      ))}
                    </div>
                    {product.stores.map((store, si) => {
                      const discount = Math.round(((store.original - store.price) / store.original) * 100);
                      const isBest = store.price === bestPrice;
                      return (
                        <div
                          key={store.name}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "140px 1fr 100px 90px 80px",
                            padding: "13px 18px",
                            borderBottom: si < product.stores.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                            alignItems: "center",
                            background: isBest ? "rgba(55,214,122,0.04)" : "transparent",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontWeight: 700, color: store.color, fontSize: 13 }}>{store.name}</span>
                            {isBest && (
                              <span
                                style={{
                                  fontSize: 9, fontWeight: 700, color: "#37D67A",
                                  background: "rgba(55,214,122,0.15)", padding: "1px 5px",
                                  borderRadius: 4, border: "1px solid rgba(55,214,122,0.25)",
                                }}
                              >
                                BEST
                              </span>
                            )}
                          </div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                            <span style={{ fontWeight: 700, color: "white", fontSize: 13 }}>₹{store.price.toLocaleString()}</span>
                            <span style={{ fontSize: 10, color: "#4A4D65", textDecoration: "line-through" }}>₹{store.original.toLocaleString()}</span>
                            <span style={{ fontSize: 10, color: "#37D67A", fontWeight: 600 }}>{discount}% OFF</span>
                          </div>
                          <div style={{ fontSize: 11.5, color: "#B7B9C9" }}>{store.delivery}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <Star size={10} fill="#F5A623" style={{ color: "#F5A623" }} />
                            <span style={{ fontSize: 11.5, color: "white", fontWeight: 600 }}>{store.rating}</span>
                            <span style={{ fontSize: 10, color: "#4A4D65" }}>({store.reviews})</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.04, boxShadow: "0 0 14px rgba(124,77,255,0.45)" }}
                            whileTap={{ scale: 0.96 }}
                            style={{
                              background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
                              padding: "7px 0", borderRadius: 8,
                              color: "white", fontSize: 11.5, fontWeight: 600,
                              width: "100%", cursor: "pointer", border: "none",
                              transition: "box-shadow 0.18s",
                            }}
                          >
                            Buy Now
                          </motion.button>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        }))}
      </div>
    </PageTransition>
  );
}
