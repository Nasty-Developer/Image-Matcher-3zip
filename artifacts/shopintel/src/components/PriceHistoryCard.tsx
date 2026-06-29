import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, BarChart2 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data7D = [
  { date: "10 May", price: 93000 },
  { date: "17 May", price: 91500 },
  { date: "24 May", price: 92000 },
  { date: "31 May", price: 90500 },
  { date: "7 Jun", price: 89990 },
];

const data30D = [
  { date: "May 1", price: 94000 },
  { date: "May 7", price: 92500 },
  { date: "May 14", price: 91000 },
  { date: "May 21", price: 92200 },
  { date: "May 28", price: 90300 },
  { date: "Jun 7", price: 89990 },
];

const data3M = [
  { date: "Apr", price: 95000 },
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
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(13,18,34,0.95)",
          border: "1px solid rgba(124,77,255,0.3)",
          borderRadius: 8,
          padding: "6px 10px",
          fontSize: 11,
          color: "white",
        }}
      >
        <div style={{ color: "#B7B9C9" }}>{label}</div>
        <div style={{ fontWeight: 700 }}>₹{payload[0].value.toLocaleString()}</div>
      </div>
    );
  }
  return null;
};

export default function PriceHistoryCard() {
  const [activeTab, setActiveTab] = useState("7D");
  const chartData = dataMap[activeTab];

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "rgba(13,18,34,0.9)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "rgba(124,77,255,0.2)" }}
          >
            <BarChart2 size={13} style={{ color: "#9D6CFF" }} />
          </div>
          <span className="font-semibold text-white text-[13px]">Price History</span>
        </div>
        {/* Tabs */}
        <div className="flex gap-0.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-2 py-1 rounded text-[10px] font-medium transition-all"
              style={
                activeTab === tab
                  ? {
                      background: "rgba(124,77,255,0.25)",
                      color: "#9D6CFF",
                      border: "1px solid rgba(124,77,255,0.3)",
                    }
                  : {
                      color: "#7B7E9A",
                      background: "transparent",
                      border: "1px solid transparent",
                    }
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Price display */}
      <div className="flex items-end justify-between mb-1">
        <div>
          <div className="font-black text-white text-[24px] leading-tight">₹89,990</div>
          <div className="text-[10px]" style={{ color: "#7B7E9A" }}>Current Price</div>
        </div>
        <div className="flex items-center gap-1" style={{ color: "#37D67A" }}>
          <TrendingDown size={13} />
          <span className="text-[12px] font-semibold">₹2,300 (2.5%)</span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 120, marginTop: 8 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -30 }}>
            <defs>
              <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C4DFF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7C4DFF" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fill: "#7B7E9A" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "#7B7E9A" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#7C4DFF"
              strokeWidth={2}
              fill="url(#purpleGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#9D6CFF", stroke: "white", strokeWidth: 1 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
