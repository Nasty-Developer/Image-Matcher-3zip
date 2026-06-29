import React, { Suspense } from "react";
import { Route, Switch } from "wouter";
import { AnimatePresence } from "framer-motion";
import AppLayout from "./layouts/AppLayout";
import "./index.css";
import { SkeletonCard } from "./components/SkeletonLoader";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const PriceCompare = React.lazy(() => import("./pages/PriceCompare"));
const PriceHistory = React.lazy(() => import("./pages/PriceHistory"));
const StockTracker = React.lazy(() => import("./pages/StockTracker"));
const Coupons = React.lazy(() => import("./pages/Coupons"));
const Watchlist = React.lazy(() => import("./pages/Watchlist"));
const AIAssistant = React.lazy(() => import("./pages/AIAssistant"));
const Notifications = React.lazy(() => import("./pages/Notifications"));
const Settings = React.lazy(() => import("./pages/Settings"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));

function Fallback() {
  return (
    <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <SkeletonCard height={200} />
      <SkeletonCard height={200} />
      <SkeletonCard height={200} />
    </div>
  );
}

export default function App() {
  return (
    <AppLayout>
      <Suspense fallback={<Fallback />}>
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/price-compare" component={PriceCompare} />
            <Route path="/price-history" component={PriceHistory} />
            <Route path="/stock-tracker" component={StockTracker} />
            <Route path="/coupons" component={Coupons} />
            <Route path="/watchlist" component={Watchlist} />
            <Route path="/ai-assistant" component={AIAssistant} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/settings" component={Settings} />
            <Route path="/product/:id" component={ProductDetails} />
          </Switch>
        </AnimatePresence>
      </Suspense>
    </AppLayout>
  );
}

