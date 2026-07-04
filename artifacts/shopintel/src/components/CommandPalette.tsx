import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Monitor, BarChart2, Flame, Bookmark, Bot, Bell, Clock, PackageSearch, X } from "lucide-react";
import { useLocation } from "wouter";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const navigateTo = (path: string) => {
    setLocation(path);
    onOpenChange(false);
    setQuery("");
  };

  const pages = [
    { name: "Dashboard", icon: Monitor, path: "/dashboard" },
    { name: "Price Compare", icon: BarChart2, path: "/price-compare" },
    { name: "Price History", icon: Clock, path: "/price-history" },
    { name: "Stock Tracker", icon: PackageSearch, path: "/stock-tracker" },
    { name: "Today's Best Deals", icon: Flame, path: "/best-deals" },
    { name: "Watchlist", icon: Bookmark, path: "/watchlist" },
    { name: "AI Assistant", icon: Bot, path: "/ai-assistant" },
    { name: "Notifications", icon: Bell, path: "/notifications" },
  ];

  const recentSearches = ["MacBook Pro M3", "iPhone 15 Pro Max", "Sony WH-1000XM5", "Samsung S24 Ultra"];
  const trending = [
    { name: "Apple AirPods Pro", price: "₹19,900" },
    { name: "PS5 Console", price: "₹44,990" },
    { name: "LG 65\" OLED TV", price: "₹1,24,990" },
  ];

  const filteredPages = pages.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex justify-center items-start pt-[15vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[600px] mx-4"
            style={{
              background: "rgba(13, 18, 34, 0.95)",
              border: "1px solid rgba(124, 77, 255, 0.2)",
              borderRadius: 16,
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(124, 77, 255, 0.1)",
              overflow: "hidden"
            }}
          >
            {/* Search Input */}

            <div className="flex items-center px-4 py-3 border-b border-white/10">
              <Search size={18} style={{ color: "#9D6CFF" }} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, pages, or ask AI..."
                className="flex-1 bg-transparent border-none outline-none text-white text-[15px] ml-3 placeholder:text-[#5A5D75]"
              />
              <div className="text-[10px] font-bold text-[#5A5D75] bg-white/5 px-2 py-1 rounded border border-white/10">
                ESC
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto py-2">
              {query.length > 0 && (
                <div className="px-2 mb-4">
                  <div className="text-[10.5px] font-bold text-[#5A5D75] uppercase tracking-wider px-3 mb-1">
                    Pages
                  </div>
                  {filteredPages.map(page => (
                    <button
                      key={page.path}
                      onClick={() => navigateTo(page.path)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-white/80 hover:text-white hover:bg-[#7C4DFF]/15 hover:border hover:border-[#7C4DFF]/30 transition-all border border-transparent outline-none focus-visible:bg-[#7C4DFF]/15 focus-visible:border-[#7C4DFF]/30"
                    >
                      <page.icon size={15} style={{ color: "#7B7E9A" }} />
                      <span className="text-[13px] font-medium">{page.name}</span>
                    </button>
                  ))}
                  {filteredPages.length === 0 && (
                    <div className="px-3 py-2 text-[13px] text-[#5A5D75]">No pages found.</div>
                  )}
                </div>
              )}

              {query.length === 0 && (
                <>
                  {/* Quick Actions */}
                  <div className="px-2 mb-4">
                    <div className="text-[10.5px] font-bold text-[#5A5D75] uppercase tracking-wider px-3 mb-1">
                      Quick Actions
                    </div>
                    {[
                      { label: "Compare a product", icon: BarChart2, path: "/price-compare" },
                      { label: "Track a price", icon: Clock, path: "/price-history" },
                      { label: "Ask AI Assistant", icon: Bot, path: "/ai-assistant" },
                    ].map(action => (
                      <button
                        key={action.path}
                        onClick={() => navigateTo(action.path)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-white/80 hover:text-white hover:bg-white/5 transition-all outline-none focus-visible:bg-white/5"
                      >
                        <action.icon size={15} style={{ color: "#9D6CFF" }} />
                        <span className="text-[13px] font-medium">{action.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4 px-2">
                    {/* Recent Searches */}
                    <div className="flex-1">
                      <div className="text-[10.5px] font-bold text-[#5A5D75] uppercase tracking-wider px-3 mb-1">
                        Recent Searches
                      </div>
                      {recentSearches.map(s => (
                        <button
                          key={s}
                          onClick={() => { setQuery(s); navigateTo("/price-compare"); }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-white/70 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <Search size={13} style={{ color: "#5A5D75" }} />
                          <span className="text-[12.5px]">{s}</span>
                        </button>
                      ))}
                    </div>

                    {/* Trending */}
                    <div className="flex-1">
                      <div className="text-[10.5px] font-bold text-[#5A5D75] uppercase tracking-wider px-3 mb-1">
                        Trending
                      </div>
                      {trending.map(t => (
                        <button
                          key={t.name}
                          onClick={() => navigateTo("/price-compare")}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-white/70 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <span className="text-[12.5px]">{t.name}</span>
                          <span className="text-[10px] font-semibold text-[#37D67A] bg-[#37D67A]/10 px-1.5 py-0.5 rounded border border-[#37D67A]/20">
                            {t.price}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-[#0b0f1e] px-4 py-2.5 border-t border-white/5 flex items-center gap-4 text-[#5A5D75] text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="bg-white/10 px-1.5 py-0.5 rounded font-medium text-white/60">↑</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded font-medium text-white/60">↓</span>
                <span>to navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="bg-white/10 px-1.5 py-0.5 rounded font-medium text-white/60">↵</span>
                <span>to select</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
