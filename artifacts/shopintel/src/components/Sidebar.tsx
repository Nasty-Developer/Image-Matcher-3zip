import { motion } from "framer-motion";
import {
  LayoutDashboard, BarChart2, Clock, PackageSearch,
  Tag, Eye, Bot, Bell, Settings, Zap, Star
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BarChart2, label: "Price Compare" },
  { icon: Clock, label: "Price History" },
  { icon: PackageSearch, label: "Stock Tracker" },
  { icon: Tag, label: "Coupons" },
  { icon: Eye, label: "Watchlist" },
  { icon: Bot, label: "AI Assistant" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col"
      style={{
        width: 165,
        padding: "14px 10px",
        background: "rgba(9,13,26,0.97)",
        backdropFilter: "blur(24px)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-5">
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{
            width: 32,
            height: 32,
            background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
            boxShadow: "0 0 14px rgba(124,77,255,0.5)",
          }}
        >
          <Zap size={16} className="text-white" fill="white" />
        </div>
        <div>
          <div className="font-bold text-white leading-tight" style={{ fontSize: 12.5 }}>ShopIntel AI</div>
          <div style={{ fontSize: 10, color: "#7B7E9A" }}>AI Shopping Assistant</div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {navItems.map(({ icon: Icon, label, active }) => (
          <motion.div
            key={label}
            whileHover={{ x: 1 }}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl cursor-pointer transition-all"
            style={
              active
                ? {
                    background: "linear-gradient(135deg, rgba(124,77,255,0.3) 0%, rgba(111,60,255,0.15) 100%)",
                    border: "1px solid rgba(124,77,255,0.35)",
                    color: "white",
                  }
                : {
                    border: "1px solid transparent",
                    color: "#B7B9C9",
                  }
            }
          >
            <Icon
              size={16}
              style={{ color: active ? "#9D6CFF" : "#5A5D75", flexShrink: 0 }}
            />
            <span style={{ fontSize: 12.5, fontWeight: active ? 600 : 400 }}>{label}</span>
            {active && (
              <div
                className="ml-auto rounded-full flex-shrink-0"
                style={{ width: 5, height: 5, background: "#9D6CFF" }}
              />
            )}
          </motion.div>
        ))}
      </nav>

      {/* Upgrade card */}
      <div
        className="rounded-2xl p-3 mt-3"
        style={{
          background: "linear-gradient(135deg, rgba(124,77,255,0.14) 0%, rgba(111,60,255,0.07) 100%)",
          border: "1px solid rgba(124,77,255,0.25)",
        }}
      >
        <div className="font-semibold text-white mb-1" style={{ fontSize: 12 }}>Upgrade to Pro</div>
        <div className="mb-2.5" style={{ fontSize: 10.5, color: "#B7B9C9", lineHeight: "1.4" }}>
          Unlock advanced AI insights, price prediction &amp; more.
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-xl text-white font-semibold flex items-center justify-center gap-1.5"
          style={{
            background: "linear-gradient(135deg, #7C4DFF 0%, #9D6CFF 100%)",
            boxShadow: "0 0 14px rgba(124,77,255,0.4)",
            fontSize: 11,
            padding: "7px 0",
          }}
        >
          <Star size={11} fill="white" />
          Upgrade Now
        </motion.button>
      </div>

      <div className="text-center mt-2.5" style={{ fontSize: 10.5, color: "#7B7E9A" }}>
        Why ShopIntel AI?
      </div>
    </aside>
  );
}
