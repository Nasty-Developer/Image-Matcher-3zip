import { motion } from "framer-motion";
import { Search, Plus, Settings, Star } from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="flex items-center gap-4 px-5 py-3 sticky top-0 z-50"
      style={{
        background: "rgba(6, 9, 19, 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Search bar */}
      <div className="flex-1 flex items-center gap-2 max-w-xl">
        <div
          className="flex-1 flex items-center gap-3 px-4 rounded-xl"
          style={{
            background: "rgba(20,28,50,0.8)",
            border: "1px solid rgba(255,255,255,0.1)",
            height: 42,
          }}
        >
          <Search size={16} style={{ color: "#7B7E9A" }} />
          <input
            type="text"
            placeholder="Search for any product..."
            className="bg-transparent flex-1 text-[13.5px] outline-none"
            style={{ color: "#B7B9C9" }}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center rounded-xl px-4 h-[42px]"
          style={{
            background: "linear-gradient(135deg, #7C4DFF 0%, #9D6CFF 100%)",
            boxShadow: "0 0 14px rgba(124,77,255,0.35)",
          }}
        >
          <Search size={17} className="text-white" />
        </motion.button>
      </div>

      {/* Add to Watchlist */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-[13px] font-medium"
        style={{
          background: "rgba(20,28,50,0.8)",
          border: "1px solid rgba(255,255,255,0.1)",
          height: 42,
        }}
      >
        <Star size={14} style={{ color: "#9D6CFF" }} />
        Add to Watchlist
      </motion.button>

      {/* User info */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
            border: "2px solid rgba(124,77,255,0.5)",
          }}
        >
          A
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white text-[13px] font-medium">Hi, Aryan</span>
            <span
              className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
              }}
            >
              Pro
            </span>
          </div>
        </div>
        <motion.button
          whileHover={{ rotate: 45 }}
          transition={{ duration: 0.2 }}
          className="ml-1"
          style={{ color: "#7B7E9A" }}
        >
          <Settings size={18} />
        </motion.button>
      </div>
    </header>
  );
}
