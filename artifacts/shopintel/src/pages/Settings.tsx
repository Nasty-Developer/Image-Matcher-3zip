import { useState } from "react";
import { motion } from "framer-motion";
import {
  Moon, Bell, Globe, Shield, User, CreditCard, Trash2, ChevronRight,
} from "lucide-react";
import PageTransition from "../components/PageTransition";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <motion.div
      onClick={onToggle}
      animate={{ background: on ? "linear-gradient(90deg, #7C4DFF, #9D6CFF)" : "rgba(255,255,255,0.08)" }}
      style={{
        width: 42, height: 22, borderRadius: 99, display: "flex",
        alignItems: "center", padding: "0 3px", cursor: "pointer", flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ x: on ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        style={{ width: 16, height: 16, borderRadius: "50%", background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
      />
    </motion.div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#4A4D65", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>
        {title}
      </div>
      <div
        style={{
          borderRadius: 14, background: "rgba(11,15,30,0.92)",
          border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function SettingRow({
  icon: Icon, color, label, desc, right,
  last = false,
}: {
  icon: any; color: string; label: string; desc?: string;
  right: React.ReactNode; last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "13px 16px",
        borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          width: 34, height: 34, borderRadius: 10, flexShrink: 0,
          background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500, color: "white", fontSize: 13.5 }}>{label}</div>
        {desc && <div style={{ fontSize: 11.5, color: "#5A5D75", marginTop: 1 }}>{desc}</div>}
      </div>
      {right}
    </div>
  );
}

const languages = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Kannada"];

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [dealAlerts, setDealAlerts] = useState(false);
  const [aiInsights, setAiInsights] = useState(true);
  const [lang, setLang] = useState("English");

  return (
    <PageTransition>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "white" }}>Settings</h1>
          <p style={{ fontSize: 12.5, color: "#7B7E9A", marginTop: 2 }}>
            Manage your account preferences and notification settings
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          {/* Account */}
          <Section title="Account">
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div
                style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, color: "white", fontSize: 20,
                  border: "2px solid rgba(124,77,255,0.5)",
                }}
              >
                A
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "white", fontSize: 15 }}>Aryan Sharma</div>
                <div style={{ fontSize: 12, color: "#5A5D75" }}>aryan@shopintel.ai</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                style={{
                  padding: "6px 14px", borderRadius: 8,
                  background: "rgba(124,77,255,0.14)", border: "1px solid rgba(124,77,255,0.3)",
                  color: "#9D6CFF", fontSize: 12, fontWeight: 600, cursor: "pointer",
                }}
              >
                Edit Profile
              </motion.button>
            </div>
            <SettingRow icon={CreditCard} color="#9D6CFF" label="Subscription" desc="Pro plan · Renews 1 Aug 2026"
              right={
                <span style={{ fontSize: 11.5, color: "#37D67A", fontWeight: 600 }}>Active</span>
              }
            />
            <SettingRow icon={Shield} color="#4EB5FF" label="Privacy & Security" desc="Manage data and permissions"
              last
              right={<ChevronRight size={14} style={{ color: "#4A4D65" }} />}
            />
          </Section>

          {/* Appearance */}
          <Section title="Appearance">
            <SettingRow icon={Moon} color="#9D6CFF" label="Dark Mode" desc="Use dark theme across the app"
              last
              right={<Toggle on={darkMode} onToggle={() => setDarkMode(!darkMode)} />}
            />
          </Section>

          {/* Notifications */}
          <Section title="Notifications">
            <SettingRow icon={Bell} color="#F5A623" label="Price Drop Alerts" desc="Get notified when tracked prices drop"
              right={<Toggle on={priceAlerts} onToggle={() => setPriceAlerts(!priceAlerts)} />}
            />
            <SettingRow icon={Bell} color="#37D67A" label="Stock Alerts" desc="Notify when out-of-stock items return"
              right={<Toggle on={stockAlerts} onToggle={() => setStockAlerts(!stockAlerts)} />}
            />
            <SettingRow icon={Bell} color="#4EB5FF" label="Deal Alerts" desc="Coupons and limited-time offers"
              right={<Toggle on={dealAlerts} onToggle={() => setDealAlerts(!dealAlerts)} />}
            />
            <SettingRow icon={Bell} color="#FF6B9D" label="AI Insights" desc="Weekly AI shopping recommendations"
              last
              right={<Toggle on={aiInsights} onToggle={() => setAiInsights(!aiInsights)} />}
            />
          </Section>
        </div>

        <div style={{ width: 280, flexShrink: 0 }}>
          {/* Language */}
          <Section title="Language">
            <div style={{ padding: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6 }}>
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      padding: "8px 10px", borderRadius: 9, fontSize: 12.5, fontWeight: 500,
                      cursor: "pointer", transition: "all 0.15s",
                      background: lang === l ? "rgba(124,77,255,0.22)" : "rgba(255,255,255,0.04)",
                      border: lang === l ? "1px solid rgba(124,77,255,0.4)" : "1px solid rgba(255,255,255,0.07)",
                      color: lang === l ? "#9D6CFF" : "#8385A0",
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </Section>

          {/* Danger zone */}
          <div
            style={{
              borderRadius: 14,
              background: "rgba(255,107,107,0.05)",
              border: "1px solid rgba(255,107,107,0.15)",
              padding: "14px",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: "#FF6B6B", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>
              Danger Zone
            </div>
            <motion.button
              whileHover={{ scale: 1.01, background: "rgba(255,107,107,0.15)" }}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 8,
                padding: "9px 12px", borderRadius: 9,
                background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.2)",
                color: "#FF6B6B", fontSize: 12.5, fontWeight: 500, cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <Trash2 size={13} /> Delete Account
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
