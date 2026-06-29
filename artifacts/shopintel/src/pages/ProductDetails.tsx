import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, TrendingDown, Star, ChevronRight, CheckCircle, Tag, ShoppingCart, Truck, Shield } from "lucide-react";
import { Link, useParams, useLocation } from "wouter";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import PageTransition from "../components/PageTransition";
import AIRecommendationCard from "../components/AIRecommendationCard";
import CouponCard from "../components/CouponCard";

const historyData = [
  { date: "May 1", price: 94200 },
  { date: "May 10", price: 92600 },
  { date: "May 17", price: 91200 },
  { date: "May 24", price: 92800 },
  { date: "May 31", price: 90800 },
  { date: "Jun 7", price: 89990 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#0b0f1e]/95 border border-[#7C4DFF]/40 rounded-lg px-2.5 py-1.5 text-[10px] text-white backdrop-blur-md">
        <div className="text-[#7B7E9A] mb-0.5">{label}</div>
        <div className="font-bold">₹{payload[0].value.toLocaleString()}</div>
      </div>
    );
  }
  return null;
};

export default function ProductDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [activeImage, setActiveImage] = useState(0);
  const [historyTab, setHistoryTab] = useState("30D");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  return (
    <PageTransition>
      {/* Breadcrumb & Header Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.history.back()}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#B7B9C9] hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex items-center gap-2 text-[11.5px] text-[#7B7E9A]">
            <Link href="/" className="hover:text-white transition-colors cursor-pointer text-inherit no-underline">Home</Link>
            <ChevronRight size={12} />
            <Link href="/price-compare" className="hover:text-white transition-colors cursor-pointer text-inherit no-underline">Laptops</Link>
            <ChevronRight size={12} />
            <span className="text-white">Apple MacBook Air M2</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsTracking(!isTracking)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors border ${
              isTracking 
                ? "bg-[#37D67A]/15 border-[#37D67A]/30 text-[#37D67A]" 
                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            }`}
          >
            <TrendingDown size={14} />
            {isTracking ? "Tracking" : "Track Price"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors border ${
              isFavorite 
                ? "bg-[#FF6B9D]/15 border-[#FF6B9D]/30 text-[#FF6B9D]" 
                : "bg-[#7C4DFF]/15 border-[#7C4DFF]/30 text-[#9D6CFF] hover:bg-[#7C4DFF]/25"
            }`}
          >
            <Heart size={14} className={isFavorite ? "fill-[#FF6B9D]" : ""} />
            {isFavorite ? "Saved" : "Add to Watchlist"}
          </motion.button>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        {/* Main Content Column */}
        <div className="flex-1 flex flex-col gap-4">
          
          {/* Top Section: Images & Basic Info */}
          <div className="glass rounded-[16px] p-4 flex gap-6 items-start">
            {/* Gallery */}
            <div className="w-[300px] flex-shrink-0 flex flex-col gap-3">
              <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-[#121830] to-[#0c1024] border border-white/5 flex items-center justify-center text-6xl shadow-inner relative">
                {/* Simulated product image */}
                <div className="absolute top-3 left-3 bg-[#37D67A]/20 border border-[#37D67A]/30 text-[#37D67A] text-[10px] font-bold px-2 py-0.5 rounded">
                  Best Price Today
                </div>
                💻
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3].map(i => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-1 aspect-square rounded-lg border flex items-center justify-center text-xl transition-all ${
                      activeImage === i 
                        ? "bg-[#1a2240] border-[#7C4DFF]/50" 
                        : "bg-[#0b0f1e] border-white/5 opacity-60 hover:opacity-100"
                    }`}
                  >
                    💻
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex gap-2 mb-2">
                <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10.5px] text-[#B7B9C9]">Apple</span>
                <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10.5px] text-[#B7B9C9]">Laptops</span>
              </div>
              <h1 className="text-2xl font-extrabold text-white mb-2 leading-tight">Apple MacBook Air M2 (8GB RAM, 256GB SSD)</h1>
              
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-[#F5A623] text-[#F5A623]" />)}
                  </div>
                  <span className="text-[12.5px] font-bold text-white ml-1">4.8</span>
                  <span className="text-[11.5px] text-[#7B7E9A]">(2,453 Reviews)</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-[#4A4D65]" />
                <span className="text-[12px] text-[#37D67A] font-medium flex items-center gap-1">
                  <CheckCircle size={13} /> In Stock across 3 stores
                </span>
              </div>

              {/* Best Price Highlight */}
              <div className="bg-[#7C4DFF]/10 border border-[#7C4DFF]/20 rounded-xl p-4 mb-5">
                <div className="text-[11px] text-[#9D6CFF] font-semibold uppercase tracking-wider mb-1">Current Best Price</div>
                <div className="flex items-end gap-3 mb-3">
                  <div className="text-3xl font-black text-white leading-none">₹87,990</div>
                  <div className="text-[13px] text-[#7B7E9A] line-through mb-1">₹1,14,900</div>
                  <div className="text-[13px] font-bold text-[#37D67A] mb-1">23% OFF</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-bold text-[#2874F0]">Flipkart</span>
                  <span className="text-[11.5px] text-[#B7B9C9]">· Free Delivery by Tomorrow</span>
                </div>
                <motion.button className="mt-4 w-full bg-gradient-to-r from-[#7C4DFF] to-[#9D6CFF] text-white font-bold text-[13px] py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(124,77,255,0.4)] transition-all">
                  Buy Now on Flipkart
                </motion.button>
              </div>

              {/* Specs Chips */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { l: "Processor", v: "Apple M2 Chip (8-Core)" },
                  { l: "Display", v: "13.6-inch Liquid Retina" },
                  { l: "Memory", v: "8GB Unified Memory" },
                  { l: "Storage", v: "256GB SSD" },
                  { l: "Battery", v: "Up to 18 hours" },
                  { l: "Weight", v: "1.24 kg" },
                ].map(spec => (
                  <div key={spec.l} className="bg-white/5 border border-white/5 rounded-lg px-3 py-2 flex items-center justify-between">
                    <span className="text-[10.5px] text-[#7B7E9A]">{spec.l}</span>
                    <span className="text-[11.5px] font-medium text-white">{spec.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Store Comparison Table (Full Width) */}
          <div className="glass rounded-[16px] p-4">
            <h3 className="text-[15px] font-bold text-white mb-4">Compare Prices (4 Stores)</h3>
            <div className="border border-white/5 rounded-xl overflow-hidden">
              <div className="grid grid-cols-[140px_1fr_120px_120px_100px_100px] bg-white/5 px-4 py-2 border-b border-white/5">
                {["Store", "Price", "Delivery", "Offers", "Rating", ""].map((h, i) => (
                  <span key={i} className="text-[10.5px] font-bold text-[#7B7E9A] uppercase tracking-wider">{h}</span>
                ))}
              </div>
              {[
                { n: "Flipkart", p: 87990, o: 114900, d: "Tomorrow", c: "#2874F0", off: "Axis Bank" },
                { n: "Amazon", p: 89990, o: 114900, d: "Tomorrow", c: "#FF9900", off: "HDFC Card" },
                { n: "Reliance Digital", p: 90900, o: 118900, d: "2 Days", c: "#E31E24", off: "ICICI Card" },
                { n: "Croma", p: 91900, o: 119000, d: "3 Days", c: "#00A63E", off: "Amazon Pay" },
              ].map((s, i) => (
                <div key={s.n} className={`grid grid-cols-[140px_1fr_120px_120px_100px_100px] px-4 py-3 items-center ${i < 3 ? "border-b border-white/5" : ""} ${i === 0 ? "bg-[#37D67A]/5" : ""}`}>
                  <div className="font-bold text-[13.5px]" style={{ color: s.c }}>{s.n}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[14px] font-bold text-white">₹{s.p.toLocaleString()}</span>
                    <span className="text-[10.5px] text-[#4A4D65] line-through">₹{s.o.toLocaleString()}</span>
                  </div>
                  <div className="text-[11.5px] text-[#B7B9C9]">{s.d}</div>
                  <div className="text-[11px] text-[#37D67A] font-medium bg-[#37D67A]/10 px-2 py-0.5 rounded border border-[#37D67A]/20 w-fit">{s.off}</div>
                  <div className="flex items-center gap-1">
                    <Star size={11} className="fill-[#F5A623] text-[#F5A623]" />
                    <span className="text-[11.5px] text-white font-medium">4.5</span>
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold py-1.5 rounded transition-colors border border-white/10">
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Price History Chart */}
          <div className="glass rounded-[16px] p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-white">Price History (Lowest Price)</h3>
              <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
                {["7D", "30D", "3M"].map(t => (
                  <button 
                    key={t}
                    onClick={() => setHistoryTab(t)}
                    className={`px-3 py-1 rounded text-[11px] font-bold transition-colors ${historyTab === t ? "bg-[#7C4DFF] text-white" : "text-[#7B7E9A] hover:text-white"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyData} margin={{ top: 10, right: 0, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C4DFF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7C4DFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="date" tick={{fontSize: 10, fill: '#7B7E9A'}} axisLine={false} tickLine={false} />
                  <YAxis domain={['auto', 'auto']} tick={{fontSize: 10, fill: '#7B7E9A'}} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`}/>
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="price" stroke="#9D6CFF" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" activeDot={{r: 4, fill: '#fff', stroke: '#9D6CFF', strokeWidth: 2}} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Reviews & Related Placeholder */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-[16px] p-4">
              <h3 className="text-[15px] font-bold text-white mb-3">Top Reviews</h3>
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7C4DFF] to-[#9D6CFF] text-[10px] font-bold flex items-center justify-center text-white">U{i}</div>
                        <span className="text-[11.5px] text-white font-medium">User {i}</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-[#F5A623] text-[#F5A623]" />)}
                      </div>
                    </div>
                    <p className="text-[11.5px] text-[#B7B9C9] leading-relaxed">
                      "Absolutely amazing machine. The battery life is incredible and the M2 chip handles everything I throw at it with ease."
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass rounded-[16px] p-4">
              <h3 className="text-[15px] font-bold text-white mb-3">Compare With</h3>
              <div className="flex flex-col gap-3">
                {[
                  {n: "MacBook Pro 14\" M3", p: 149900, d: "Better display & performance"},
                  {n: "MacBook Air M1", p: 74900, d: "Budget-friendly option"},
                  {n: "Dell XPS 13 OLED", p: 119900, d: "Windows alternative"},
                ].map(r => (
                  <div key={r.n} className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#121830] flex items-center justify-center text-xl">💻</div>
                    <div className="flex-1">
                      <div className="text-[12.5px] font-bold text-white">{r.n}</div>
                      <div className="text-[10.5px] text-[#7B7E9A]">{r.d}</div>
                    </div>
                    <div className="text-[12.5px] font-bold text-[#37D67A]">₹{r.p.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="w-[280px] flex-shrink-0 flex flex-col gap-4">
          <AIRecommendationCard />
          
          <div className="glass rounded-[16px] p-4">
             <div className="flex items-center gap-2 mb-3">
               <Shield size={16} className="text-[#4EB5FF]" />
               <span className="text-[13px] font-bold text-white">Purchase Protection</span>
             </div>
             <div className="flex flex-col gap-2">
               <div className="flex items-start gap-2 bg-white/5 p-2 rounded-lg">
                 <Truck size={14} className="text-[#B7B9C9] mt-0.5" />
                 <div>
                   <div className="text-[11.5px] font-bold text-white">Secure Delivery</div>
                   <div className="text-[10.5px] text-[#7B7E9A]">Free shipping with tracking</div>
                 </div>
               </div>
               <div className="flex items-start gap-2 bg-white/5 p-2 rounded-lg">
                 <Tag size={14} className="text-[#B7B9C9] mt-0.5" />
                 <div>
                   <div className="text-[11.5px] font-bold text-white">Easy Returns</div>
                   <div className="text-[10.5px] text-[#7B7E9A]">7-day replacement guarantee</div>
                 </div>
               </div>
             </div>
          </div>

          <CouponCard />
        </div>

      </div>
    </PageTransition>
  );
}
