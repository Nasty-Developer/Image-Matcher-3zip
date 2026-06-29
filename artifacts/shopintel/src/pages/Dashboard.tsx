import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AIRecommendationCard from "../components/AIRecommendationCard";
import ProductCard from "../components/ProductCard";
import PriceHistoryCard from "../components/PriceHistoryCard";
import CouponCard from "../components/CouponCard";
import AnalyticsCards from "../components/AnalyticsCards";
import FeatureBar from "../components/FeatureBar";

export default function Dashboard() {
  return (
    <div className="bg-main min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-[260px]">
        <Navbar />
        <div className="flex-1 p-4 pt-3 overflow-auto">
          {/* Main grid */}
          <div className="flex gap-4">
            {/* Center column */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              <HeroSection />
              <ProductCard />
              <AnalyticsCards />
            </div>
            {/* Right column */}
            <div className="flex flex-col gap-4" style={{ width: 270 }}>
              <AIRecommendationCard />
              <PriceHistoryCard />
              <CouponCard />
            </div>
          </div>
          <FeatureBar />
        </div>
      </div>
    </div>
  );
}
