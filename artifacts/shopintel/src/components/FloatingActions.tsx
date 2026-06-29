import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, BarChart2, TrendingDown, Search, Bot, Bookmark } from "lucide-react";
import { useLocation } from "wouter";

interface FloatingActionsProps {
  onOpenSearch: () => void;
}

export default function FloatingActions({ onOpenSearch }: FloatingActionsProps) {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();

  const actions = [
    { icon: BarChart2, label: "Compare", onClick: () => setLocation("/price-compare") },
    { icon: TrendingDown, label: "Track Price", onClick: () => setLocation("/price-history") },
    { icon: Search, label: "Search", onClick: () => onOpenSearch() },
    { icon: Bot, label: "Ask AI", onClick: () => setLocation("/ai-assistant") },
    { icon: Bookmark, label: "Watchlist", onClick: () => setLocation("/watchlist") },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[150] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <div className="flex flex-col-reverse items-end gap-3 mb-2">
            {actions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ 
                  duration: 0.2, 
                  delay: i * 0.04, 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25 
                }}
                onClick={() => {
                  action.onClick();
                  setOpen(false);
                }}
                aria-label={action.label}
                className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-[#0d1222] border border-white/10 text-white hover:bg-white/5 hover:border-[#7C4DFF]/40 shadow-lg outline-none focus-visible:border-[#7C4DFF] focus-visible:bg-white/5"
              >
                <action.icon size={18} style={{ color: "#B7B9C9" }} className="group-hover:text-[#9D6CFF] transition-colors" />
                
                {/* Tooltip */}
                <div className="absolute right-14 px-2.5 py-1.5 rounded-lg bg-[#0d1222] border border-white/10 text-[11px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                  {action.label}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-none cursor-pointer outline-none ${!open ? 'floating-btn-pulse' : ''}`}
        style={{
          background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
          boxShadow: "0 4px 20px rgba(124, 77, 255, 0.4)",
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Plus size={24} color="white" />
        </motion.div>
      </motion.button>
    </div>
  );
}
