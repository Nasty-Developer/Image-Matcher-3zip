import { motion } from "framer-motion";
import { Flame, Sparkles, Bell, Zap } from "lucide-react";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";

const upcoming = [
  { icon: Zap, title: "Live Price Drops", desc: "Instant alerts the moment a tracked product's price falls." },
  { icon: Sparkles, title: "AI-Curated Picks", desc: "Deals ranked by genuine savings, not sponsored placement." },
  { icon: Bell, title: "Deal Digest", desc: "A daily digest of the best deals matched to your watchlist." },
];

export default function BestDeals() {
  return (
    <PageTransition>
      <PageHeader
        title="Today's Best Deals"
        subtitle="AI-curated deals across every store — coming soon"
        icon={Flame}
        actions={
          <div
            style={{
              fontSize: 11, fontWeight: 700, color: "#9D6CFF",
              background: "rgba(124,77,255,0.14)", border: "1px solid rgba(124,77,255,0.28)",
              padding: "5px 10px", borderRadius: 8,
            }}
          >
            Coming Soon
          </div>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          borderRadius: 16,
          background: "linear-gradient(135deg, rgba(124,77,255,0.12), rgba(11,15,30,0.92))",
          border: "1px solid rgba(124,77,255,0.25)",
          padding: "40px 28px",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
            background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 30px rgba(124,77,255,0.4)",
          }}
        >
          <Flame size={26} color="white" />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", marginBottom: 8 }}>
          We're building something better than coupons
        </h2>
        <p style={{ fontSize: 13.5, color: "#8385A0", maxWidth: 460, margin: "0 auto", lineHeight: 1.6 }}>
          Instead of hunting for codes that may or may not work, Prisma will automatically surface the best real price for every product you care about — tracked live, across every store.
        </p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {upcoming.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{
              borderRadius: 14, background: "rgba(11,15,30,0.92)",
              border: "1px solid rgba(255,255,255,0.07)", padding: 18,
            }}
          >
            <div
              style={{
                width: 34, height: 34, borderRadius: 10, marginBottom: 10,
                background: "rgba(124,77,255,0.14)", border: "1px solid rgba(124,77,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <f.icon size={16} style={{ color: "#9D6CFF" }} />
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "white", marginBottom: 4 }}>{f.title}</div>
            <div style={{ fontSize: 11.5, color: "#7B7E9A", lineHeight: 1.5 }}>{f.desc}</div>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
}
