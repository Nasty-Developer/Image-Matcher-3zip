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
        width: 260,
        padding: "16px 12px",
        background: "rgba(10, 14, 28, 0.95)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 mb-6 mt-1">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 38,
            height: 38,
            background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
            boxShadow: "0 0 16px rgba(124,77,255,0.5)",
          }}
        >
          <Zap size={20} className="text-white" fill="white" />
        </div>
        <div>
          <div className="font-bold text-white text-[15px] leading-tight">ShopIntel AI</div>
          <div className="text-[11px]" style={{ color: "#B7B9C9" }}>AI Shopping Assistant</div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ icon: Icon, label, active }) => (
          <motion.div
            key={label}
            whileHover={{ x: 2 }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${active ? "sidebar-item-active" : ""}`}
            style={
              !active
                ? { color: "#B7B9C9" }
                : { color: "white" }
            }
          >
            <Icon
              size={18}
              style={active ? { color: "#9D6CFF" } : { color: "#7B7E9A" }}
            />
            <span className={`text-[13.5px] font-${active ? "600" : "400"}`}>{label}</span>
            {active && (
              <div
                className="ml-auto w-1.5 h-1.5 rounded-full"
                style={{ background: "#9D6CFF" }}
              />
            )}
          </motion.div>
        ))}
      </nav>

      {/* Upgrade card */}
      <div
        className="rounded-2xl p-4 mt-4"
        style={{
          background: "linear-gradient(135deg, rgba(124,77,255,0.15) 0%, rgba(111,60,255,0.08) 100%)",
          border: "1px solid rgba(124,77,255,0.3)",
        }}
      >
        <div className="font-semibold text-white text-[13px] mb-1">Upgrade to Pro</div>
        <div className="text-[11.5px] mb-3" style={{ color: "#B7B9C9" }}>
          Unlock advanced AI insights, price prediction & more.
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 rounded-xl text-white font-semibold text-[12px] flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #7C4DFF 0%, #9D6CFF 100%)",
            boxShadow: "0 0 16px rgba(124,77,255,0.4)",
          }}
        >
          <Star size={13} fill="white" />
          Upgrade Now
        </motion.button>
      </div>

      {/* Bottom text */}
      <div className="text-center text-[11px] mt-3 font-medium" style={{ color: "#B7B9C9" }}>
        Why ShopIntel AI?
      </div>
    </aside>
  );
}
