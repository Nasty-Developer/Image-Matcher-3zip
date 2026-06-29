import React, { Suspense } from "react";
import { Route, Switch } from "wouter";
import { AnimatePresence } from "framer-motion";
import AppLayout from "./layouts/AppLayout";
import "./index.css";
import { SkeletonCard } from "./components/SkeletonLoader";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

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

const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));

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
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/forgot-password" component={ForgotPassword} />
            
            <Route>
              <AppLayout>
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
              </AppLayout>
            </Route>
          </Switch>
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

