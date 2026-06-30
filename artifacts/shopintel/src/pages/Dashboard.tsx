import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import HeroSection from "../components/HeroSection";
import AIRecommendationCard from "../components/AIRecommendationCard";
import ProductCard from "../components/ProductCard";
import PriceHistoryCard from "../components/PriceHistoryCard";
import CouponCard from "../components/CouponCard";
import AnalyticsCards from "../components/AnalyticsCards";
import FeatureBar from "../components/FeatureBar";

export default function Dashboard() {
  return (
    <PageTransition>
      <div className="flex gap-5">
        {/* Center column */}
        <div className="flex flex-col gap-4 min-w-0" style={{ flex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <HeroSection />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <ProductCard />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <AnalyticsCards />
          </motion.div>
        </div>
        {/* Right column */}
        <div className="flex flex-col gap-4 flex-shrink-0" style={{ width: 268 }}>
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <AIRecommendationCard />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <PriceHistoryCard />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <CouponCard />
          </motion.div>
        </div>
      </div>
      <div className="mt-4">
        <FeatureBar />
      </div>
    </PageTransition>
  );
}

