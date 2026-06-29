import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Settings, Star, Bell, ChevronDown, User, LogOut, HelpCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [, navigate] = useLocation();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate("/price-compare");
  };

  return (
    <header
      className="flex items-center gap-3 px-4 flex-shrink-0"
      style={{
        height: 56,
        background: "rgba(6, 9, 19, 0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Search */}
      <form onSubmit={handleSearch} className="flex items-center gap-2.5 flex-1" style={{ maxWidth: 480 }}>
        <div
          className="flex items-center gap-2.5 flex-1 px-4"
          style={{
            background: "rgba(15,20,40,0.8)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            height: 38,
          }}
        >
          <Search size={14} style={{ color: "#5A5D75", flexShrink: 0 }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for any product..."
            className="bg-transparent flex-1 outline-none"
            style={{ fontSize: 13, color: "#B7B9C9" }}
          />
          {query && (
            <button type="button" onClick={() => setQuery("")}
              style={{ color: "#4A4D65", fontSize: 14, lineHeight: 1, cursor: "pointer", background: "none", border: "none" }}>
              ✕
            </button>
          )}
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{
            width: 38, height: 38,
            background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
            boxShadow: "0 0 14px rgba(124,77,255,0.4)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Search size={16} className="text-white" />
        </motion.button>
      </form>

      {/* Divider */}
      <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />

      {/* Add to Watchlist */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/watchlist")}
        className="flex items-center gap-1.5 px-3 flex-shrink-0 rounded-xl"
        style={{
          background: "rgba(15,20,40,0.8)",
          border: "1px solid rgba(255,255,255,0.08)",
          height: 38,
          fontSize: 12.5,
          fontWeight: 500,
          color: "white",
          cursor: "pointer",
        }}
      >
        <Star size={13} style={{ color: "#9D6CFF" }} />
        Add to Watchlist
      </motion.button>

      {/* Divider */}
      <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />

      {/* Notifications bell */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => navigate("/notifications")}
        style={{ position: "relative", background: "none", border: "none", cursor: "pointer" }}
      >
        <Bell size={18} style={{ color: "#8385A0" }} />
        <span
          style={{
            position: "absolute", top: -3, right: -3,
            width: 8, height: 8, borderRadius: "50%",
            background: "#7C4DFF", border: "1.5px solid #060913",
          }}
        />
      </motion.button>

      {/* Profile dropdown */}
      <div style={{ position: "relative" }} ref={profileRef}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <div
            className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
            style={{
              width: 34, height: 34,
              background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
              border: "2px solid rgba(124,77,255,0.5)",
              fontSize: 13,
            }}
          >
            A
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-white font-medium" style={{ fontSize: 13 }}>Hi, Aryan</span>
            <span
              className="text-white font-bold"
              style={{
                background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
                padding: "2px 7px", borderRadius: 6, fontSize: 10,
              }}
            >
              Pro
            </span>
          </div>
          <ChevronDown
            size={14}
            style={{
              color: "#5A5D75",
              transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </motion.div>

        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "absolute", right: 0, top: "calc(100% + 10px)",
                width: 200,
                background: "rgba(13,18,34,0.97)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                overflow: "hidden",
                zIndex: 200,
              }}
            >
              <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontWeight: 600, color: "white", fontSize: 13 }}>Aryan Sharma</div>
                <div style={{ fontSize: 11, color: "#5A5D75" }}>aryan@shopintel.ai</div>
              </div>
              {[
                { icon: User, label: "My Profile" },
                { icon: Bell, label: "Notifications", action: () => navigate("/notifications") },
                { icon: Settings, label: "Settings", action: () => navigate("/settings") },
                { icon: HelpCircle, label: "Help & Support" },
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  onClick={() => { action?.(); setProfileOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-4 transition-colors"
                  style={{
                    padding: "9px 14px",
                    color: "#B7B9C9",
                    fontSize: 12.5,
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    width: "100%",
                    textAlign: "left",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,77,255,0.1)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                  <Icon size={14} style={{ color: "#7B7E9A" }} />
                  {label}
                </button>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <button
                  className="w-full flex items-center gap-2.5"
                  style={{
                    padding: "9px 14px",
                    color: "#FF6B6B",
                    fontSize: 12.5,
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,107,0.08)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ rotate: 45 }}
        transition={{ duration: 0.2 }}
        onClick={() => navigate("/settings")}
        style={{ color: "#5A5D75", background: "none", border: "none", cursor: "pointer" }}
      >
        <Settings size={16} />
      </motion.button>
    </header>
  );
}
