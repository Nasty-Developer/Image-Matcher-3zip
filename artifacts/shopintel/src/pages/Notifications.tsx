import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, TrendingDown, Tag, Package, Sparkles, CheckCheck, Trash2 } from "lucide-react";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";

const allNotifications = [
  {
    id: 1, type: "price_drop", read: false,
    title: "Price Drop Alert!",
    body: "Sony WH-1000XM5 dropped by ₹3,000 on Flipkart. Now at ₹25,990.",
    time: "5 min ago", icon: TrendingDown, color: "#37D67A", bg: "rgba(55,214,122,0.12)",
  },
  {
    id: 2, type: "coupon", read: false,
    title: "New Coupon Available",
    body: "BBDEAL coupon is now live — up to 30% off on Flipkart. Valid until 5 Jul.",
    time: "30 min ago", icon: Tag, color: "#9D6CFF", bg: "rgba(124,77,255,0.12)",
  },
  {
    id: 3, type: "price_drop", read: false,
    title: "MacBook Air Price Update",
    body: "MacBook Air M2 is now ₹89,990 on Amazon — lowest in 30 days!",
    time: "2 hr ago", icon: TrendingDown, color: "#37D67A", bg: "rgba(55,214,122,0.12)",
  },
  {
    id: 4, type: "stock", read: true,
    title: "Back in Stock",
    body: "Apple AirPods Pro 2nd Gen is back in stock on Amazon.",
    time: "Yesterday", icon: Package, color: "#4EB5FF", bg: "rgba(78,181,255,0.12)",
  },
  {
    id: 5, type: "ai", read: true,
    title: "AI Insight",
    body: "Based on trends, this is a great week to buy electronics. Prices are at a 3-month low.",
    time: "Yesterday", icon: Sparkles, color: "#F5A623", bg: "rgba(245,166,35,0.12)",
  },
  {
    id: 6, type: "price_drop", read: true,
    title: "Price Drop Alert!",
    body: "Samsung Galaxy S24 Ultra dropped to ₹1,07,999 on Flipkart.",
    time: "2 days ago", icon: TrendingDown, color: "#37D67A", bg: "rgba(55,214,122,0.12)",
  },
];

const filters = ["All", "Price Drops", "Coupons", "Stock", "AI Insights"];
const filterMap: Record<string, string[]> = {
  "All": [],
  "Price Drops": ["price_drop"],
  "Coupons": ["coupon"],
  "Stock": ["stock"],
  "AI Insights": ["ai"],
};

export default function Notifications() {
  const [items, setItems] = useState(allNotifications);
  const [filter, setFilter] = useState("All");

  const unreadCount = items.filter((n) => !n.read).length;
  const types = filterMap[filter];
  const filtered = items.filter((n) => types.length === 0 || types.includes(n.type));

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismiss = (id: number) => setItems((prev) => prev.filter((n) => n.id !== id));
  const markRead = (id: number) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <PageTransition>
      {/* Header */}
      <PageHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "Stay updated on price drops and stock alerts"}
        icon={Bell}
        actions={
          unreadCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={markAllRead}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "6px 12px", borderRadius: 9,
                background: "rgba(124,77,255,0.14)", border: "1px solid rgba(124,77,255,0.28)",
                color: "#9D6CFF", fontSize: 12, fontWeight: 500, cursor: "pointer",
              }}
            >
              <CheckCheck size={13} /> Mark all read
            </motion.button>
          )
        }
      />

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "5px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500,
              cursor: "pointer", transition: "all 0.15s",
              background: filter === f ? "rgba(124,77,255,0.22)" : "rgba(255,255,255,0.04)",
              border: filter === f ? "1px solid rgba(124,77,255,0.4)" : "1px solid rgba(255,255,255,0.07)",
              color: filter === f ? "#9D6CFF" : "#8385A0",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <AnimatePresence>
          {filtered.map((notif, i) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => markRead(notif.id)}
              style={{
                borderRadius: 14,
                background: notif.read ? "rgba(11,15,30,0.92)" : "rgba(124,77,255,0.06)",
                border: notif.read ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(124,77,255,0.22)",
                padding: "15px 16px",
                display: "flex", alignItems: "flex-start", gap: 14,
                cursor: "pointer",
                transition: "background 0.18s, border-color 0.18s",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 38, height: 38, borderRadius: 11, flexShrink: 0,
                  background: notif.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <notif.icon size={17} style={{ color: notif.color }} />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, color: "white", fontSize: 13.5 }}>{notif.title}</span>
                  {!notif.read && (
                    <span
                      style={{
                        width: 7, height: 7, borderRadius: "50%",
                        background: "#7C4DFF", flexShrink: 0,
                      }}
                    />
                  )}
                </div>
                <p style={{ fontSize: 12.5, color: "#8385A0", lineHeight: 1.6 }}>{notif.body}</p>
                <div style={{ fontSize: 10.5, color: "#4A4D65", marginTop: 5 }}>{notif.time}</div>
              </div>

              {/* Dismiss */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); dismiss(notif.id); }}
                style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                }}
              >
                <Trash2 size={12} style={{ color: "#5A5D75" }} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Bell size={32} style={{ color: "#4A4D65", margin: "0 auto 12px" }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: "#7B7E9A" }}>No notifications</div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
