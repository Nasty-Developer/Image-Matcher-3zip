import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, BarChart2 } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const data7D = [
  { date: "10 May", price: 93800 },
  { date: "17 May", price: 92400 },
  { date: "24 May", price: 93200 },
  { date: "31 May", price: 91500 },
  { date: "7 Jun", price: 89990 },
];
const data30D = [
  { date: "May 1", price: 94200 },
  { date: "May 10", price: 92600 },
  { date: "May 17", price: 91200 },
  { date: "May 24", price: 92800 },
  { date: "May 31", price: 90800 },
  { date: "Jun 7", price: 89990 },
];
const data3M = [
  { date: "Apr", price: 95500 },
  { date: "May", price: 92000 },
  { date: "Jun", price: 89990 },
];

const tabs = ["7D", "30D", "3M", "6M", "1Y"];
const dataMap: Record<string, typeof data7D> = {
  "7D": data7D,
  "30D": data30D,
  "3M": data3M,
  "6M": data30D,
  "1Y": data3M,
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: "rgba(8,11,26,0.97)",
          border: "1px solid rgba(124,77,255,0.4)",
          borderRadius: 9,
          padding: "7px 11px",
          fontSize: 10.5,
          color: "white",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ color: "#7B7E9A", marginBottom: 2 }}>{label}</div>
        <div style={{ fontWeight: 700 }}>₹{payload[0].value.toLocaleString()}</div>
      </div>
    );
  }
  return null;
};

export default function PriceHistoryCard() {
  const [activeTab, setActiveTab] = useState("7D");
  const chartData = dataMap[activeTab];
  const prices = chartData.map((d) => d.price);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const pad = Math.round((maxP - minP) * 0.4);

  return (
    <motion.div
      whileHover={{
        y: -2,
        borderColor: "rgba(124,77,255,0.25)",
        boxShadow: "0 10px 28px rgba(0,0,0,0.25), 0 0 0 1px rgba(124,77,255,0.08)",
      }}
      style={{
        borderRadius: 14,
        background: "rgba(11,15,30,0.92)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "16px",
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
          gap: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 7,
              background: "rgba(124,77,255,0.18)",
              border: "1px solid rgba(124,77,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BarChart2 size={12} style={{ color: "#9D6CFF" }} />
          </div>
          <span style={{ fontWeight: 650, color: "white", fontSize: 12.5, whiteSpace: "nowrap" }}>
            Price History
          </span>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 1 }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "3px 7px",
                borderRadius: 6,
                fontSize: 9.5,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                border: activeTab === tab
                  ? "1px solid rgba(124,77,255,0.4)"
                  : "1px solid transparent",
                background: activeTab === tab ? "rgba(124,77,255,0.22)" : "transparent",
                color: activeTab === tab ? "#9D6CFF" : "#5A5D75",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Price + change */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div>
          <div style={{ fontSize: 21, fontWeight: 900, color: "white", lineHeight: 1 }}>
            ₹89,990
          </div>
          <div style={{ fontSize: 10, color: "#4A4D65", marginTop: 3 }}>Current Price</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 3, color: "#37D67A" }}>
          <TrendingDown size={11} />
          <span style={{ fontSize: 10.5, fontWeight: 600 }}>₹2,300 (2.5%)</span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 108 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 2, bottom: 0, left: -26 }}>
            <defs>
              <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C4DFF" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#7C4DFF" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 8, fill: "#4A4D65" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[minP - pad, maxP + pad]}
              tick={{ fontSize: 8, fill: "#4A4D65" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
              tickCount={4}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#7C4DFF"
              strokeWidth={2}
              fill="url(#purpleGrad)"
              dot={false}
              activeDot={{ r: 3.5, fill: "#9D6CFF", stroke: "white", strokeWidth: 1.5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
