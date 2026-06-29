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
    <div
      className="min-h-screen flex"
      style={{
        fontFamily: "'Inter', sans-serif",
        background:
          "radial-gradient(ellipse 80% 50% at 20% 10%, rgba(124,77,255,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(30,60,200,0.05) 0%, transparent 60%), #060913",
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      {/* Main area offset by sidebar */}
      <div
        className="flex flex-col min-w-0"
        style={{ marginLeft: 165, flex: 1 }}
      >
        <Navbar />
        <div
          className="flex-1 overflow-auto"
          style={{ padding: "12px 14px 12px 14px" }}
        >
          {/* Two-column layout: center + right */}
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
        </div>
      </div>
    </div>
  );
}
