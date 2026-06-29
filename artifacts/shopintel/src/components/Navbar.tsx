import { motion } from "framer-motion";
import { Search, Settings, Star } from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="flex items-center gap-3 px-4"
      style={{
        height: 56,
        background: "rgba(6, 9, 19, 0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0,
      }}
    >
      {/* Search bar */}
      <div
        className="flex items-center gap-2.5 flex-1 px-4"
        style={{
          background: "rgba(15,20,40,0.8)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
          height: 38,
          maxWidth: 480,
        }}
      >
        <Search size={14} style={{ color: "#5A5D75", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search for any product..."
          className="bg-transparent flex-1 outline-none"
          style={{ fontSize: 13, color: "#B7B9C9" }}
        />
      </div>

      {/* Purple search button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center justify-center rounded-xl flex-shrink-0"
        style={{
          width: 38,
          height: 38,
          background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
          boxShadow: "0 0 14px rgba(124,77,255,0.4)",
        }}
      >
        <Search size={16} className="text-white" />
      </motion.button>

      {/* Divider */}
      <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />

      {/* Add to Watchlist */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-1.5 px-3 flex-shrink-0 rounded-xl text-white"
        style={{
          background: "rgba(15,20,40,0.8)",
          border: "1px solid rgba(255,255,255,0.08)",
          height: 38,
          fontSize: 12.5,
          fontWeight: 500,
        }}
      >
        <Star size={13} style={{ color: "#9D6CFF" }} />
        Add to Watchlist
      </motion.button>

      {/* Divider */}
      <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />

      {/* User section */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div
          className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
          style={{
            width: 34,
            height: 34,
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
              padding: "2px 7px",
              borderRadius: 6,
              fontSize: 10,
            }}
          >
            Pro
          </span>
        </div>
        <motion.button
          whileHover={{ rotate: 45 }}
          transition={{ duration: 0.2 }}
          style={{ color: "#5A5D75" }}
        >
          <Settings size={16} />
        </motion.button>
      </div>
    </header>
  );
}
