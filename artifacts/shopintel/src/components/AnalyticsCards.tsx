import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Bell, Package, Truck } from "lucide-react";

const cards = [
  {
    icon: TrendingDown,
    iconColor: "#9D6CFF",
    iconBg: "rgba(124,77,255,0.15)",
    title: "Average Price",
    value: "₹90,474",
    desc: "▼ ₹1,750 (1.9%)",
    descColor: "#37D67A",
    sub: "vs last 30 days",
  },
  {
    icon: TrendingDown,
    iconColor: "#F5A623",
    iconBg: "rgba(245,166,35,0.15)",
    title: "Lowest Price",
    value: "₹87,990",
    desc: "Flipkart",
    descColor: "#B7B9C9",
    sub: "",
    badge: "🏆",
  },
  {
    icon: Bell,
    iconColor: "#37D67A",
    iconBg: "rgba(55,214,122,0.15)",
    title: "Price Drop Alert",
    value: "",
    desc: "Get notified when price drops",
    descColor: "#B7B9C9",
    toggle: true,
  },
  {
    icon: Package,
    iconColor: "#4EB5FF",
    iconBg: "rgba(78,181,255,0.15)",
    title: "Stock Status",
    value: "",
    desc: "All Stores",
    descColor: "#B7B9C9",
    sub: "In Stock",
    subColor: "#37D67A",
  },
  {
    icon: Truck,
    iconColor: "#FF6B9D",
    iconBg: "rgba(255,107,157,0.15)",
    title: "Delivery Comparison",
    value: "",
    desc: "Fastest Delivery",
    descColor: "#B7B9C9",
    sub: "Tomorrow",
    subColor: "white",
    lightning: true,
  },
];

export default function AnalyticsCards() {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="analytics-card"
        >
          {/* Icon + title row */}
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: card.iconBg }}
            >
              <card.icon size={16} style={{ color: card.iconColor }} />
            </div>
            {card.badge && (
              <span style={{ fontSize: 16 }}>{card.badge}</span>
            )}
          </div>

          <div className="text-[11px] font-medium mb-1" style={{ color: "#B7B9C9" }}>
            {card.title}
          </div>

          {card.value && (
            <div className="font-black text-white text-[18px] leading-tight mb-1">
              {card.value}
            </div>
          )}

          {card.toggle ? (
            <div>
              <div className="text-[11px] mb-2" style={{ color: "#B7B9C9" }}>{card.desc}</div>
              <div
                className="w-10 h-5 rounded-full flex items-center px-1 cursor-pointer"
                style={{
                  background: "linear-gradient(90deg, #7C4DFF 0%, #9D6CFF 100%)",
                }}
              >
                <div
                  className="w-3.5 h-3.5 rounded-full bg-white ml-auto"
                  style={{ boxShadow: "0 0 4px rgba(0,0,0,0.3)" }}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[11px]" style={{ color: card.descColor }}>{card.desc}</div>
              {card.sub && (
                <div
                  className="font-semibold text-[12px] mt-0.5 flex items-center gap-1"
                  style={{ color: card.subColor || "white" }}
                >
                  {card.sub}
                  {card.lightning && (
                    <span style={{ color: "#F5A623", fontSize: 12 }}>⚡</span>
                  )}
                </div>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
