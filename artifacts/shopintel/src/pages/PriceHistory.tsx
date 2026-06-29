import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Clock, BarChart2 } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";

const allData: Record<string, { date: string; amazon: number; flipkart: number; reliance: number }[]> = {
  "7D": [
    { date: "10 May", amazon: 93800, flipkart: 92400, reliance: 95000 },
    { date: "13 May", amazon: 93200, flipkart: 91800, reliance: 94600 },
    { date: "16 May", amazon: 93500, flipkart: 92200, reliance: 94200 },
    { date: "19 May", amazon: 92800, flipkart: 91400, reliance: 93800 },
    { date: "22 May", amazon: 91500, flipkart: 90900, reliance: 93200 },
    { date: "25 May", amazon: 90800, flipkart: 89900, reliance: 92600 },
    { date: "28 May", amazon: 89990, flipkart: 87990, reliance: 90900 },
  ],
  "30D": [
    { date: "1 May", amazon: 94200, flipkart: 93000, reliance: 96000 },
    { date: "8 May", amazon: 93600, flipkart: 92400, reliance: 95400 },
    { date: "15 May", amazon: 93000, flipkart: 91800, reliance: 94800 },
    { date: "22 May", amazon: 91500, flipkart: 90600, reliance: 93200 },
    { date: "29 May", amazon: 90200, flipkart: 88900, reliance: 91800 },
    { date: "5 Jun", amazon: 89990, flipkart: 87990, reliance: 90900 },
  ],
  "3M": [
    { date: "Mar", amazon: 96000, flipkart: 95000, reliance: 98000 },
    { date: "Apr", amazon: 94500, flipkart: 93000, reliance: 96500 },
    { date: "May", amazon: 92000, flipkart: 90500, reliance: 94000 },
    { date: "Jun", amazon: 89990, flipkart: 87990, reliance: 90900 },
  ],
};

const tabs = ["7D", "30D", "3M", "6M", "1Y"];

const historyEvents = [
  { date: "28 May 2026", price: "₹89,990", change: "-₹800", type: "drop", store: "Amazon" },
  { date: "22 May 2026", price: "₹90,800", change: "-₹700", type: "drop", store: "Amazon" },
  { date: "15 May 2026", price: "₹93,000", change: "+₹200", type: "rise", store: "Amazon" },
  { date: "1 May 2026", price: "₹94,200", change: "-₹1,200", type: "drop", store: "Amazon" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: "rgba(11,15,30,0.97)", border: "1px solid rgba(124,77,255,0.4)",
          borderRadius: 10, padding: "8px 12px", fontSize: 11,
        }}
      >
        <div style={{ color: "#7B7E9A", marginBottom: 5, fontWeight: 600 }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.dataKey} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 2 }}>
            <span style={{ color: p.stroke }}>● {p.name}</span>
            <span style={{ color: "white", fontWeight: 700 }}>₹{p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function PriceHistory() {
  const [tab, setTab] = useState("7D");
  const data = allData[tab] ?? allData["7D"];

  return (
    <PageTransition>
      <PageHeader 
        title="Price History" 
        subtitle="Track price movements and set smart alerts" 
        icon={Clock} 
      />

      <div className="flex gap-3">
        {/* Main chart */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              borderRadius: 14, background: "rgba(11,15,30,0.92)",
              border: "1px solid rgba(255,255,255,0.07)", padding: "18px",
              marginBottom: 12,
            }}
          >
            {/* Chart header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(124,77,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BarChart2 size={14} style={{ color: "#9D6CFF" }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "white", fontSize: 14 }}>Apple MacBook Air M2</div>
                  <div style={{ fontSize: 11, color: "#7B7E9A" }}>Price trend across stores</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      padding: "4px 10px", borderRadius: 7, fontSize: 11, fontWeight: 600,
                      cursor: "pointer", transition: "all 0.15s",
                      background: tab === t ? "rgba(124,77,255,0.22)" : "transparent",
                      border: tab === t ? "1px solid rgba(124,77,255,0.4)" : "1px solid transparent",
                      color: tab === t ? "#9D6CFF" : "#5A5D75",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
              {[
                { name: "Amazon", color: "#7C4DFF" },
                { name: "Flipkart", color: "#37D67A" },
                { name: "Reliance", color: "#4EB5FF" },
              ].map((l) => (
                <div key={l.name} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 20, height: 2, borderRadius: 2, background: l.color }} />
                  <span style={{ fontSize: 11, color: "#8385A0" }}>{l.name}</span>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C4DFF" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#7C4DFF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#37D67A" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#37D67A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4EB5FF" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#4EB5FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#4A4D65" }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#4A4D65" }} axisLine={false} tickLine={false}
                    tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
                    domain={["auto", "auto"]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="amazon" name="Amazon" stroke="#7C4DFF" strokeWidth={2} fill="url(#g1)" dot={false} activeDot={{ r: 4, fill: "#9D6CFF" }} />
                  <Area type="monotone" dataKey="flipkart" name="Flipkart" stroke="#37D67A" strokeWidth={2} fill="url(#g2)" dot={false} activeDot={{ r: 4, fill: "#37D67A" }} />
                  <Area type="monotone" dataKey="reliance" name="Reliance" stroke="#4EB5FF" strokeWidth={2} fill="url(#g3)" dot={false} activeDot={{ r: 4, fill: "#4EB5FF" }} />
                  {/* Pulsing dot for latest data point (Amazon for example) */}
                  <ReferenceLine x={data[data.length - 1].date} stroke="transparent">
                    <circle cx="100%" cy="50%" r={4} fill="#7C4DFF" className="animate-ping" style={{ transformOrigin: "center" }} />
                  </ReferenceLine>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* History events */}
          <div
            style={{
              borderRadius: 14, background: "rgba(11,15,30,0.92)",
              border: "1px solid rgba(255,255,255,0.07)", padding: "14px 16px",
            }}
          >
            <div style={{ fontWeight: 700, color: "white", fontSize: 14, marginBottom: 12 }}>
              Price Change History
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {historyEvents.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 12px", borderRadius: 10,
                    background: "rgba(15,20,40,0.6)", border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    style={{
                      width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                      background: event.type === "drop" ? "rgba(55,214,122,0.15)" : "rgba(255,107,107,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {event.type === "drop"
                      ? <TrendingDown size={15} style={{ color: "#37D67A" }} />
                      : <TrendingUp size={15} style={{ color: "#FF6B6B" }} />
                    }
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Clock size={11} style={{ color: "#4A4D65" }} />
                    <span style={{ fontSize: 11, color: "#4A4D65" }}>{event.date}</span>
                  </div>
                  <div style={{ flex: 1, fontWeight: 600, color: "white", fontSize: 13 }}>{event.price}</div>
                  <div
                    style={{
                      fontSize: 12, fontWeight: 700,
                      color: event.type === "drop" ? "#37D67A" : "#FF6B6B",
                    }}
                  >
                    {event.change}
                  </div>
                  <div style={{ fontSize: 11, color: "#7B7E9A" }}>{event.store}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right stats */}
        <div style={{ width: 240, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "All Time Low", value: "₹87,990", sub: "Flipkart · 28 May", color: "#37D67A", icon: TrendingDown },
            { label: "All Time High", value: "₹1,14,900", sub: "Amazon · Jan 2026", color: "#FF6B6B", icon: TrendingUp },
            { label: "Avg Price", value: "₹92,400", sub: "Last 90 days", color: "#9D6CFF", icon: BarChart2 },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                borderRadius: 13, background: "rgba(11,15,30,0.92)",
                border: "1px solid rgba(255,255,255,0.07)", padding: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                <div
                  style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: `${stat.color}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <stat.icon size={14} style={{ color: stat.color }} />
                </div>
                <span style={{ fontSize: 11, color: "#7B7E9A" }}>{stat.label}</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "white", marginBottom: 3 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "#5A5D75" }}>{stat.sub}</div>
            </div>
          ))}

          {/* Price alert */}
          <div
            style={{
              borderRadius: 13, background: "rgba(124,77,255,0.1)",
              border: "1px solid rgba(124,77,255,0.25)", padding: "14px",
            }}
          >
            <div style={{ fontWeight: 700, color: "white", fontSize: 13, marginBottom: 6 }}>Set Price Alert</div>
            <div style={{ fontSize: 11.5, color: "#8385A0", marginBottom: 10 }}>
              Get notified when price drops below your target
            </div>
            <input
              placeholder="Enter target price..."
              style={{
                width: "100%", padding: "7px 10px", borderRadius: 8, fontSize: 12,
                background: "rgba(15,20,40,0.8)", border: "1px solid rgba(255,255,255,0.1)",
                color: "white", outline: "none", marginBottom: 8,
              }}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: "100%", padding: "7px 0", borderRadius: 8,
                background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
                color: "white", fontSize: 12, fontWeight: 600,
                border: "none", cursor: "pointer",
              }}
            >
              Set Alert
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
