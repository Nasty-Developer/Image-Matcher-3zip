import { motion, useAnimation } from "framer-motion";
import { useLocation, Link } from "wouter";
import {
  LayoutDashboard, BarChart2, Clock, PackageSearch,
  Tag, Bookmark, Bot, Bell, Settings, Zap, Sparkles,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",    href: "/"               },
  { icon: BarChart2,       label: "Price Compare", href: "/price-compare"  },
  { icon: Clock,           label: "Price History", href: "/price-history"  },
  { icon: PackageSearch,   label: "Stock Tracker", href: "/stock-tracker"  },
  { icon: Tag,             label: "Coupons",       href: "/coupons"        },
  { icon: Bookmark,        label: "Watchlist",     href: "/watchlist"      },
  { icon: Bot,             label: "AI Assistant",  href: "/ai-assistant"   },
  { icon: Bell,            label: "Notifications", href: "/notifications"  },
  { icon: Settings,        label: "Settings",      href: "/settings"       },
];

function NavItem({ icon: Icon, label, href, active }: {
  icon: typeof LayoutDashboard;
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link href={href} style={{ display: "block", textDecoration: "none" }}>
      <motion.div
        initial={false}
        whileHover="hovered"
        whileTap={{ scale: 0.975 }}
        style={{ position: "relative", borderRadius: 10, cursor: "pointer", marginBottom: 1 }}
      >
        {/* Active / hover background */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 10,
            background: active
              ? "linear-gradient(135deg, rgba(124,77,255,0.22) 0%, rgba(99,51,255,0.12) 100%)"
              : "rgba(255,255,255,0)",
            border: active
              ? "1px solid rgba(139,92,246,0.32)"
              : "1px solid transparent",
            boxShadow: active
              ? "0 0 0 1px rgba(124,77,255,0.08) inset, 0 4px 16px rgba(124,77,255,0.14), 0 1px 0 rgba(255,255,255,0.06) inset"
              : "none",
            transition: "all 0.18s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          variants={{
            hovered: {
              background: active
                ? "linear-gradient(135deg, rgba(124,77,255,0.26) 0%, rgba(99,51,255,0.15) 100%)"
                : "rgba(255,255,255,0.055)",
              border: active
                ? "1px solid rgba(139,92,246,0.4)"
                : "1px solid rgba(255,255,255,0.07)",
            },
          }}
          transition={{ duration: 0.14 }}
        />

        {/* Active left accent bar */}
        {active && (
          <div
            style={{
              position: "absolute",
              left: -1,
              top: "50%",
              transform: "translateY(-50%)",
              width: 3,
              height: 18,
              borderRadius: "0 3px 3px 0",
              background: "linear-gradient(180deg, #A78BFA, #7C4DFF)",
              boxShadow: "0 0 8px rgba(167,139,250,0.7)",
            }}
          />
        )}

        {/* Item content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 11px",
            height: 36,
          }}
        >
          <motion.div
            style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
            variants={{
              hovered: { scale: active ? 1 : 1.12 },
            }}
            transition={{ type: "spring", stiffness: 480, damping: 28 }}
          >
            <Icon
              size={15}
              strokeWidth={active ? 2.2 : 1.75}
              style={{
                color: active ? "#A78BFA" : "#626580",
                transition: "color 0.16s ease",
              }}
            />
          </motion.div>

          <motion.span
            style={{
              fontSize: 13,
              fontWeight: active ? 600 : 450,
              color: active ? "#F0EEFF" : "#979BB4",
              letterSpacing: active ? "-0.012em" : "0",
              transition: "color 0.16s ease",
              userSelect: "none",
              flex: 1,
            }}
            variants={{ hovered: { color: active ? "#F0EEFF" : "#D4D7EC" } }}
            transition={{ duration: 0.14 }}
          >
            {label}
          </motion.span>

          {/* Active dot */}
          {active && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "radial-gradient(circle, #C4B5FD, #7C4DFF)",
                boxShadow: "0 0 6px rgba(167,139,250,0.8)",
                flexShrink: 0,
              }}
            />
          )}
        </div>
      </motion.div>
    </Link>
  );
}

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: 200,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",

        /* Layered glass background */
        background: [
          "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(124,77,255,0.07) 0%, transparent 70%)",
          "radial-gradient(ellipse 80% 40% at 0% 100%, rgba(30,40,180,0.05) 0%, transparent 60%)",
          "rgba(7,9,20,0.97)",
        ].join(", "),
        backdropFilter: "blur(28px) saturate(160%)",
        WebkitBackdropFilter: "blur(28px) saturate(160%)",

        /* Right border with subtle sheen */
        borderRight: "1px solid rgba(255,255,255,0.065)",
        boxShadow: "1px 0 0 0 rgba(124,77,255,0.06), 4px 0 24px rgba(0,0,0,0.28)",
      }}
    >
      {/* ── Logo ─────────────────────────────────────── */}
      <div
        style={{
          padding: "18px 16px 14px",
          flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.046)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Logo mark */}
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "linear-gradient(145deg, #8B5CF6 0%, #6D28D9 100%)",
              boxShadow: "0 0 0 1px rgba(167,139,250,0.3) inset, 0 4px 16px rgba(109,40,217,0.5), 0 1px 0 rgba(255,255,255,0.18) inset",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Zap size={16} color="white" fill="white" strokeWidth={2} />
          </div>

          {/* Wordmark */}
          <div>
            <div
              style={{
                fontSize: 13.5,
                fontWeight: 700,
                color: "#F0EEFF",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              ShopIntel
            </div>
            <div
              style={{
                fontSize: 10.5,
                color: "#565870",
                fontWeight: 450,
                letterSpacing: "0.01em",
                marginTop: 1,
              }}
            >
              AI Shopping Assistant
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────── */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "10px 10px 0",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`nav::-webkit-scrollbar { display: none; }`}</style>

        {/* Label */}
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "#3A3D52",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "4px 11px 6px",
          }}
        >
          Menu
        </div>

        {navItems.map(({ icon, label, href }) => (
          <NavItem
            key={href}
            icon={icon}
            label={label}
            href={href}
            active={location === href}
          />
        ))}
      </nav>

      {/* ── Upgrade card ─────────────────────────────── */}
      <div
        style={{
          padding: "12px 10px 16px",
          flexShrink: 0,
          borderTop: "1px solid rgba(255,255,255,0.046)",
        }}
      >
        <div
          style={{
            borderRadius: 13,
            padding: "13px 13px 11px",
            background: [
              "linear-gradient(145deg, rgba(124,77,255,0.16) 0%, rgba(79,42,196,0.09) 100%)",
            ].join(", "),
            border: "1px solid rgba(139,92,246,0.22)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset",
          }}
        >
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 7,
                background: "linear-gradient(135deg, rgba(167,139,250,0.25), rgba(124,77,255,0.15))",
                border: "1px solid rgba(167,139,250,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles size={11} color="#C4B5FD" />
            </div>
            <span
              style={{
                fontSize: 12.5,
                fontWeight: 650,
                color: "#F0EEFF",
                letterSpacing: "-0.01em",
              }}
            >
              Upgrade to Pro
            </span>
          </div>

          {/* Body text */}
          <p
            style={{
              fontSize: 11.5,
              color: "#6E7191",
              lineHeight: 1.55,
              marginBottom: 10,
              letterSpacing: "0.005em",
            }}
          >
            Unlock AI price prediction, advanced alerts &amp; unlimited tracking.
          </p>

          {/* Button */}
          <motion.button
            whileHover={{
              scale: 1.025,
              boxShadow: "0 0 0 1px rgba(167,139,250,0.4) inset, 0 6px 20px rgba(109,40,217,0.55)",
            }}
            whileTap={{ scale: 0.975 }}
            style={{
              width: "100%",
              height: 32,
              borderRadius: 9,
              background: "linear-gradient(145deg, #7C4DFF 0%, #5B21B6 100%)",
              boxShadow: "0 0 0 1px rgba(167,139,250,0.2) inset, 0 3px 12px rgba(109,40,217,0.45), 0 1px 0 rgba(255,255,255,0.12) inset",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              fontSize: 11.5,
              fontWeight: 650,
              color: "white",
              letterSpacing: "-0.01em",
              transition: "box-shadow 0.18s ease",
            }}
          >
            <Sparkles size={11} color="rgba(255,255,255,0.85)" />
            Upgrade Now
          </motion.button>
        </div>

        {/* Footer hint */}
        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 11,
            color: "#33364A",
            letterSpacing: "0.01em",
          }}
        >
          Why ShopIntel AI?
        </div>
      </div>
    </aside>
  );
}
