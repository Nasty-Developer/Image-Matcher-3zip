import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Search, Zap, TrendingDown, Bell, BarChart2, Sparkles, ArrowRight } from "lucide-react";

const trending = ["iPhone 15 Pro", "Sony WH-1000XM5", "MacBook Air M2", "Samsung S24 Ultra", "PS5"];

const features = [
  { icon: BarChart2, title: "Compare Prices", desc: "See prices across Amazon, Flipkart, Croma & more, side by side.", color: "#9D6CFF" },
  { icon: TrendingDown, title: "Predict Price Drops", desc: "AI forecasts the best time to buy, before prices fall.", color: "#37D67A" },
  { icon: Bell, title: "Track & Get Alerted", desc: "Watch any product and get notified the moment it drops.", color: "#4EB5FF" },
  { icon: Sparkles, title: "Today's Best Deals", desc: "AI-curated picks refreshed daily across every store.", color: "#F5A623" },
];

export default function Home() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");

  const goSearch = (q?: string) => {
    const term = q ?? query;
    navigate(term.trim() ? `/search?q=${encodeURIComponent(term.trim())}` : "/search");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(124,77,255,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 20%, rgba(30,60,200,0.07) 0%, transparent 60%), #060913",
        color: "white",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between" style={{ padding: "18px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <div className="flex items-center gap-2.5">
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: "linear-gradient(145deg, #8B5CF6 0%, #6D28D9 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 0 1px rgba(167,139,250,0.3) inset, 0 4px 14px rgba(109,40,217,0.5)",
          }}>
            <Zap size={15} color="white" fill="white" />
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>Prisma</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/signin")}
            style={{
              fontSize: 13, fontWeight: 500, color: "#B7B9C9", background: "none",
              border: "none", cursor: "pointer", padding: "8px 10px",
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            style={{
              fontSize: 13, fontWeight: 650, color: "white",
              background: "linear-gradient(145deg, #7C4DFF 0%, #5B21B6 100%)",
              border: "none", borderRadius: 9, cursor: "pointer", padding: "9px 16px",
              boxShadow: "0 4px 14px rgba(109,40,217,0.4)",
            }}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", padding: "56px 20px 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5"
          style={{
            fontSize: 11.5, fontWeight: 600, color: "#C4B5FD",
            background: "rgba(124,77,255,0.14)", border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: 99, padding: "6px 14px", marginBottom: 22,
          }}
        >
          <Sparkles size={12} /> AI-powered shopping intelligence
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.02em" }}
        >
          Shop smarter with <span style={{
            background: "linear-gradient(90deg, #A57EFF 0%, #7C4DFF 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>AI on your side</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          style={{ fontSize: 15, color: "#7B7E9A", marginTop: 16, lineHeight: 1.6 }}
        >
          Compare prices, predict drops, track stock and uncover today's best deals — all in one place.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="flex items-center"
          style={{
            marginTop: 30, background: "rgba(15,20,40,0.9)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14,
            padding: "6px 6px 6px 18px", boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
            maxWidth: 560, margin: "30px auto 0",
          }}
        >
          <Search size={17} style={{ color: "#7B7E9A", flexShrink: 0 }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goSearch()}
            placeholder="Search for any product to compare prices..."
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "white", fontSize: 13.5, padding: "10px 12px",
            }}
          />
          <button
            onClick={() => goSearch()}
            style={{
              flexShrink: 0, height: 40, padding: "0 18px", borderRadius: 10,
              background: "linear-gradient(145deg, #7C4DFF 0%, #5B21B6 100%)",
              border: "none", color: "white", fontSize: 13, fontWeight: 650, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            Search <ArrowRight size={14} />
          </button>
        </motion.div>

        {/* Trending pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.34 }}
          className="flex items-center justify-center flex-wrap gap-2"
          style={{ marginTop: 18 }}
        >
          <span style={{ fontSize: 11.5, color: "#5A5D75", marginRight: 4 }}>Trending:</span>
          {trending.map((t) => (
            <button
              key={t}
              onClick={() => goSearch(t)}
              style={{
                fontSize: 11.5, color: "#B7B9C9", background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 99,
                padding: "5px 12px", cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 20px 64px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              style={{
                background: "rgba(11,15,30,0.85)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, padding: "20px 18px",
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 11, marginBottom: 14,
                background: `${f.color}1A`, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <f.icon size={18} style={{ color: f.color }} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 650, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: "#7B7E9A", lineHeight: 1.6 }}>{f.desc}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center"
          style={{ marginTop: 40 }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              fontSize: 13.5, fontWeight: 650, color: "white",
              background: "linear-gradient(145deg, #7C4DFF 0%, #5B21B6 100%)",
              border: "none", borderRadius: 12, cursor: "pointer", padding: "13px 26px",
              boxShadow: "0 8px 26px rgba(109,40,217,0.45)",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            Go to Dashboard <ArrowRight size={15} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
