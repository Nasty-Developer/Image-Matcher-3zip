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
      <div className="flex gap-3">
        {/* Center column */}
        <div className="flex flex-col gap-3 min-w-0" style={{ flex: 1 }}>
          <HeroSection />
          <ProductCard />
          <AnalyticsCards />
        </div>
        {/* Right column */}
        <div className="flex flex-col gap-3 flex-shrink-0" style={{ width: 262 }}>
          <AIRecommendationCard />
          <PriceHistoryCard />
          <CouponCard />
        </div>
      </div>
      <div className="mt-3">
        <FeatureBar />
      </div>
    </PageTransition>
  );
}
