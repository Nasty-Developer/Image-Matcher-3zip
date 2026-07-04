import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "wouter";
import { ChevronDown, Zap, Sparkles, Plus, X } from "lucide-react";
import {
  sidebarSections,
  quickActions,
  type SidebarSection,
  type SidebarItem,
} from "../config/sidebarConfig";
import { useBreakpoint } from "../hooks/useBreakpoint";

/* ─── Single nav item ────────────────────────────────────────── */
function NavItem({ item, active }: { item: SidebarItem; active: boolean }) {
  const { icon: Icon, label, href, badge, comingSoon } = item;
  const isDisabled = comingSoon || href === "#";

  const inner = (
    <motion.div
      initial={false}
      whileHover={isDisabled ? {} : "hovered"}
      whileTap={isDisabled ? {} : { scale: 0.978 }}
      style={{ position: "relative", borderRadius: 10, cursor: isDisabled ? "default" : "pointer", marginBottom: 2 }}
    >
      {/* Background layer */}
      <motion.div
        style={{
          position: "absolute", inset: 0, borderRadius: 10,
          background: active
            ? "linear-gradient(135deg, rgba(124,77,255,0.22) 0%, rgba(99,51,255,0.12) 100%)"
            : "rgba(255,255,255,0)",
          border: active
            ? "1px solid rgba(139,92,246,0.32)"
            : "1px solid transparent",
          boxShadow: active
            ? "0 0 0 1px rgba(124,77,255,0.08) inset, 0 4px 16px rgba(124,77,255,0.14), 0 1px 0 rgba(255,255,255,0.06) inset"
            : "none",
          transition: "all 0.18s cubic-bezier(0.4,0,0.2,1)",
        }}
        variants={isDisabled ? {} : {
          hovered: {
            background: active
              ? "linear-gradient(135deg, rgba(124,77,255,0.26) 0%, rgba(99,51,255,0.15) 100%)"
              : "rgba(255,255,255,0.06)",
            border: active
              ? "1px solid rgba(139,92,246,0.4)"
              : "1px solid rgba(255,255,255,0.08)",
          },
        }}
        transition={{ duration: 0.14 }}
      />

      {/* Left accent bar */}
      {active && (
        <div style={{
          position: "absolute", left: -1, top: "50%", transform: "translateY(-50%)",
          width: 3, height: 20, borderRadius: "0 3px 3px 0",
          background: "linear-gradient(180deg, #A78BFA, #7C4DFF)",
          boxShadow: "0 0 8px rgba(167,139,250,0.7)",
        }} />
      )}

      {/* Content */}
      <div style={{
        position: "relative", display: "flex", alignItems: "center",
        gap: 10, padding: "0 12px", height: 38,
      }}>
        <motion.div
          style={{ flexShrink: 0, display: "flex" }}
          variants={isDisabled ? {} : { hovered: { scale: active ? 1 : 1.1 } }}
          transition={{ type: "spring", stiffness: 480, damping: 28 }}
        >
          <Icon
            size={15}
            strokeWidth={active ? 2.2 : 1.75}
            style={{
              color: active ? "#A78BFA" : isDisabled ? "#3A3C50" : "#606380",
              transition: "color 0.16s ease",
            }}
          />
        </motion.div>

        <motion.span
          style={{
            fontSize: 12.5, fontWeight: active ? 600 : 450,
            color: active ? "#F0EEFF" : isDisabled ? "#42445A" : "#979BB4",
            letterSpacing: active ? "-0.012em" : "0",
            transition: "color 0.16s ease",
            userSelect: "none", flex: 1,
            overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
          }}
          variants={isDisabled ? {} : { hovered: { color: active ? "#F0EEFF" : "#D4D7EC" } }}
          transition={{ duration: 0.14 }}
        >
          {label}
        </motion.span>

        {/* Badges */}
        {active && !badge && (
          <div style={{
            width: 5, height: 5, borderRadius: "50%",
            background: "radial-gradient(circle, #C4B5FD, #7C4DFF)",
            boxShadow: "0 0 6px rgba(167,139,250,0.8)", flexShrink: 0,
          }} />
        )}
        {badge && (
          <span style={{
            fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 5,
            background: "rgba(124,77,255,0.18)", border: "1px solid rgba(124,77,255,0.3)",
            color: "#A78BFA", letterSpacing: "0.04em", flexShrink: 0,
          }}>
            {badge}
          </span>
        )}
      </div>
    </motion.div>
  );

  if (isDisabled) return inner;

  return (
    <Link href={href} style={{ display: "block", textDecoration: "none" }}>
      {inner}
    </Link>
  );
}

/* ─── Section header ─────────────────────────────────────────── */
function SectionHeader({
  title, collapsible, open, onToggle,
}: {
  title: string; collapsible?: boolean; open: boolean; onToggle: () => void;
}) {
  return (
    <button
      onClick={collapsible ? onToggle : undefined}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", padding: "8px 12px 5px",
        cursor: collapsible ? "pointer" : "default",
        background: "none", border: "none",
      }}
    >
      <span style={{
        fontSize: 10, fontWeight: 600, color: collapsible ? "#4A4D65" : "#3A3D52",
        letterSpacing: "0.07em", textTransform: "uppercase",
        transition: "color 0.15s",
      }}>
        {title}
      </span>
      {collapsible && (
        <motion.div
          animate={{ rotate: open ? 0 : -90 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <ChevronDown size={11} style={{ color: "#4A4D65" }} />
        </motion.div>
      )}
    </button>
  );
}

/* ─── Collapsible section ────────────────────────────────────── */
function Section({
  section, location,
}: {
  section: SidebarSection; location: string;
}) {
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem("shopintel_sidebar_sections");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed[section.id] === 'boolean') {
          return parsed[section.id];
        }
      } catch (e) {}
    }
    return section.defaultOpen ?? true;
  });
  const isCollapsible = section.collapsible ?? false;

  const toggleOpen = () => {
    setOpen((p: boolean) => {
      const next = !p;
      try {
        const saved = localStorage.getItem("shopintel_sidebar_sections");
        const parsed = saved ? JSON.parse(saved) : {};
        parsed[section.id] = next;
        localStorage.setItem("shopintel_sidebar_sections", JSON.stringify(parsed));
      } catch (_) { /* ignore storage errors */ }
      return next;
    });
  };

  return (
    <div style={{ marginBottom: 6 }}>
      <SectionHeader
        title={section.title}
        collapsible={isCollapsible}
        open={open}
        onToggle={toggleOpen}
      />
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            {section.items.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                active={location === item.href && item.href !== "#"}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Quick Actions ──────────────────────────────────────────── */
function QuickActions() {
  const [, navigate] = useLocation();
  return (
    <div style={{ padding: "0 10px 6px" }}>
      <div style={{
        fontSize: 10, fontWeight: 600, color: "#3A3D52",
        letterSpacing: "0.07em", textTransform: "uppercase",
        padding: "4px 2px 8px",
      }}>
        Quick Actions
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {quickActions.map((qa) => (
          <motion.button
            key={qa.id}
            whileHover={{
              scale: 1.03,
              background: "rgba(124,77,255,0.13)",
              borderColor: "rgba(124,77,255,0.30)",
              boxShadow: "0 2px 10px rgba(124,77,255,0.12)",
            }}
            whileTap={{ scale: 0.96 }}
            onClick={() => qa.href && navigate(qa.href)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 9px", borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer", transition: "all 0.18s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <qa.icon size={12} style={{ color: "#7C4DFF", flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "#7B7E9A", fontWeight: 500, textAlign: "left", lineHeight: 1.3 }}>
              {qa.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ─── Root Sidebar ───────────────────────────────────────────── */
interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const [location] = useLocation();
  const { isDesktop } = useBreakpoint();

  return (
    <>
      {!isDesktop && (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              style={{
                position: "fixed", inset: 0, zIndex: 199,
                background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)",
              }}
            />
          )}
        </AnimatePresence>
      )}
      <aside style={{
        position: "fixed", left: 0, top: 0, bottom: 0, width: 208, zIndex: 200,
        display: "flex", flexDirection: "column",
        background: [
          "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(124,77,255,0.07) 0%, transparent 70%)",
          "radial-gradient(ellipse 80% 40% at 0% 100%, rgba(30,40,180,0.05) 0%, transparent 60%)",
          "rgba(7,9,20,0.98)",
        ].join(", "),
        backdropFilter: "blur(28px) saturate(160%)",
        WebkitBackdropFilter: "blur(28px) saturate(160%)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "1px 0 0 0 rgba(124,77,255,0.06), 6px 0 28px rgba(0,0,0,0.3)",
        transform: !isDesktop && !mobileOpen ? "translateX(-100%)" : "translateX(0)",
        transition: "transform 0.24s cubic-bezier(0.4,0,0.2,1)",
      }}>

      {/* ── Logo ── */}
      <div style={{
        padding: "20px 16px 16px", flexShrink: 0,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(145deg, #8B5CF6 0%, #6D28D9 100%)",
            boxShadow: "0 0 0 1px rgba(167,139,250,0.3) inset, 0 4px 16px rgba(109,40,217,0.5), 0 1px 0 rgba(255,255,255,0.18) inset",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Zap size={16} color="white" fill="white" strokeWidth={2} />
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#F0EEFF", letterSpacing: "-0.025em", lineHeight: 1.2 }}>
              Prisma
            </div>
            <div style={{ fontSize: 10.5, color: "#505268", fontWeight: 450, letterSpacing: "0.01em", marginTop: 1 }}>
              Compare Smarter. Shop Better.
            </div>
          </div>
        </div>
        {!isDesktop && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", color: "#B7B9C9", flexShrink: 0,
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Nav sections (scrollable) ── */}
      <nav style={{
        flex: 1, overflowY: "auto", overflowX: "hidden",
        padding: "12px 10px 8px",
        scrollbarWidth: "none", msOverflowStyle: "none",
      }}>
        <style>{`nav::-webkit-scrollbar{display:none}`}</style>
        {sidebarSections.map((section) => (
          <Section key={section.id} section={section} location={location} />
        ))}
      </nav>

      {/* ── Quick Actions ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10, flexShrink: 0 }}>
        <QuickActions />
      </div>

      {/* ── Upgrade card ── */}
      <div style={{ padding: "8px 10px 18px", flexShrink: 0 }}>
        <div style={{
          borderRadius: 14, padding: "16px 14px 14px",
          background: "linear-gradient(145deg, rgba(124,77,255,0.18) 0%, rgba(79,42,196,0.10) 100%)",
          border: "1px solid rgba(139,92,246,0.26)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.05) inset, 0 8px 24px rgba(109,40,217,0.15)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 9,
              background: "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(124,77,255,0.18))",
              border: "1px solid rgba(167,139,250,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Sparkles size={13} color="#C4B5FD" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 650, color: "#EDE9FF", letterSpacing: "-0.015em" }}>
              Upgrade to Pro
            </span>
          </div>
          <p style={{ fontSize: 11.5, color: "#6E7191", lineHeight: 1.6, marginBottom: 12, letterSpacing: "0.005em" }}>
            Unlock AI price prediction, advanced alerts &amp; unlimited tracking.
          </p>
          <motion.button
            whileHover={{
              scale: 1.025,
              boxShadow: "0 0 0 1px rgba(167,139,250,0.4) inset, 0 8px 24px rgba(109,40,217,0.6)",
            }}
            whileTap={{ scale: 0.975 }}
            style={{
              width: "100%", height: 36, borderRadius: 10,
              background: "linear-gradient(145deg, #7C4DFF 0%, #5B21B6 100%)",
              boxShadow: "0 0 0 1px rgba(167,139,250,0.22) inset, 0 4px 14px rgba(109,40,217,0.5), 0 1px 0 rgba(255,255,255,0.12) inset",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              fontSize: 12, fontWeight: 650, color: "white", letterSpacing: "-0.01em",
              transition: "box-shadow 0.2s ease",
            }}
          >
            <Sparkles size={12} color="rgba(255,255,255,0.9)" />
            Upgrade Now
          </motion.button>
        </div>
        <div style={{ textAlign: "center", marginTop: 12, fontSize: 11, color: "#2E3148", letterSpacing: "0.01em" }}>
          Why Prisma?
        </div>
      </div>
      </aside>
    </>
  );
}
