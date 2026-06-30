import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Settings, Star, Bell, ChevronDown, User, LogOut, HelpCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAuth: () => void;
}

export default function Navbar({ onOpenSearch, onOpenAuth }: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [, navigate] = useLocation();
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, isGuest, signOut } = useAuth();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className="flex items-center gap-3 flex-shrink-0"
      style={{
        height: 60,
        padding: "0 20px",
        background: "rgba(6, 9, 19, 0.94)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.065)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 0 0 rgba(255,255,255,0.03), 0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      {/* Search */}
      <div className="flex items-center gap-2.5 flex-1" style={{ maxWidth: 480 }}>
        <motion.button
          onClick={() => onOpenSearch()}
          whileHover={{ borderColor: "rgba(124,77,255,0.35)" }}
          className="flex items-center justify-between flex-1 px-4 outline-none cursor-text"
          style={{
            background: "rgba(15,20,40,0.85)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 11,
            height: 40,
            transition: "border-color 0.18s ease",
          }}
        >
          <div className="flex items-center gap-2.5">
            <Search size={14} style={{ color: "#52556F", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#B7B9C9" }}>Search for any product...</span>
          </div>
          <div
            className="text-[10px] font-bold text-[#4A4D65]"
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: "2px 6px",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center", gap: 1, flexShrink: 0,
            }}
          >
            <span>⌘</span>K
          </div>
        </motion.button>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />

      {/* Add to Watchlist */}
      <motion.button
        whileHover={{
          scale: 1.02,
          background: "rgba(20,26,48,0.95)",
          borderColor: "rgba(255,255,255,0.14)",
        }}
        whileTap={{ scale: 0.97 }}
        onClick={() => isGuest ? onOpenAuth() : navigate("/watchlist")}
        className="flex items-center gap-1.5 px-3.5 flex-shrink-0 rounded-xl"
        style={{
          background: "rgba(15,20,40,0.85)",
          border: "1px solid rgba(255,255,255,0.09)",
          height: 40,
          fontSize: 12.5,
          fontWeight: 500,
          color: "white",
          cursor: "pointer",
          transition: "all 0.18s ease",
        }}
      >
        <Star size={13} style={{ color: "#9D6CFF" }} />
        Add to Watchlist
      </motion.button>

      {/* Divider */}
      <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />

      {/* Notifications bell */}
      <motion.button
        whileHover={{ scale: 1.08, color: "#B7B9C9" }}
        whileTap={{ scale: 0.93 }}
        onClick={() => navigate("/notifications")}
        style={{
          position: "relative", background: "none", border: "none",
          cursor: "pointer", padding: "6px", borderRadius: 9,
          color: "#8385A0", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "color 0.15s",
        }}
      >
        <Bell size={18} />
        <span
          style={{
            position: "absolute", top: 4, right: 4,
            width: 8, height: 8, borderRadius: "50%",
            background: "#7C4DFF", border: "2px solid #060913",
          }}
        />
      </motion.button>

      {/* Settings */}
      <motion.button
        whileHover={{ rotate: 90, color: "#B7B9C9" }}
        transition={{ duration: 0.22 }}
        onClick={() => navigate("/settings")}
        style={{
          color: "#52556F", background: "none", border: "none",
          cursor: "pointer", padding: "6px", borderRadius: 9,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "color 0.15s",
        }}
      >
        <Settings size={17} />
      </motion.button>

      {/* Profile dropdown / Sign In */}
      <div style={{ position: "relative" }} ref={profileRef}>
        {isGuest ? (
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(124,77,255,0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/signin")}
            className="flex items-center gap-1.5 px-4 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
              border: "none",
              height: 40,
              fontSize: 13,
              fontWeight: 600,
              color: "white",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(124,77,255,0.35)",
              transition: "box-shadow 0.2s ease",
            }}
          >
            Sign In
          </motion.button>
        ) : (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 cursor-pointer"
            style={{ padding: "4px 6px", borderRadius: 11 }}
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div
              className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
              style={{
                width: 34, height: 34,
                background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
                border: "2px solid rgba(124,77,255,0.55)",
                fontSize: 13,
                boxShadow: "0 0 12px rgba(124,77,255,0.3)",
              }}
            >
              {user?.avatar || "A"}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold" style={{ fontSize: 13 }}>
                Hi, {user?.name.split(' ')[0] || "User"}
              </span>
              <span
                className="text-white font-bold"
                style={{
                  background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
                  padding: "2px 7px", borderRadius: 6, fontSize: 10,
                  boxShadow: "0 1px 6px rgba(124,77,255,0.3)",
                }}
              >
                Pro
              </span>
            </div>
            <ChevronDown
              size={14}
              style={{
                color: "#52556F",
                transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </motion.div>
        )}

        <AnimatePresence>
          {profileOpen && !isGuest && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "absolute", right: 0, top: "calc(100% + 10px)",
                width: 210,
                background: "rgba(10,14,28,0.98)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
                overflow: "hidden",
                zIndex: 200,
              }}
            >
              <div style={{
                padding: "14px 15px 12px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(124,77,255,0.04)",
              }}>
                <div style={{ fontWeight: 650, color: "white", fontSize: 13.5 }}>{user?.name}</div>
                <div style={{ fontSize: 11.5, color: "#4A4D65", marginTop: 2 }}>{user?.email}</div>
              </div>
              
              {[
                { icon: User, label: "My Profile", action: () => { navigate("/settings"); setProfileOpen(false); } },
                { icon: Bell, label: "Notifications", action: () => { navigate("/notifications"); setProfileOpen(false); } },
                { icon: Settings, label: "Settings", action: () => { navigate("/settings"); setProfileOpen(false); } },
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="w-full flex items-center gap-2.5"
                  style={{
                    padding: "10px 15px", color: "#B7B9C9", fontSize: 13,
                    cursor: "pointer", background: "none", border: "none",
                    width: "100%", textAlign: "left", transition: "background 0.14s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,77,255,0.1)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                  <Icon size={14} style={{ color: "#6B6E8A" }} />
                  {label}
                </button>
              ))}

              <button
                className="w-full flex items-center gap-2.5 group relative"
                style={{
                  padding: "10px 15px", color: "#606380", fontSize: 13,
                  cursor: "not-allowed", background: "none", border: "none",
                  width: "100%", textAlign: "left", opacity: 0.55,
                }}
              >
                <HelpCircle size={14} style={{ color: "#6B6E8A" }} />
                Help & Support
                <div className="absolute right-4 bg-[#7C4DFF] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  Soon
                </div>
              </button>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <button
                  onClick={() => {
                    signOut();
                    setProfileOpen(false);
                    navigate("/signin");
                  }}
                  className="w-full flex items-center gap-2.5"
                  style={{
                    padding: "10px 15px",
                    color: "#FF6B6B",
                    fontSize: 13,
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    transition: "background 0.14s",
                    width: "100%",
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
    </header>
  );
}
