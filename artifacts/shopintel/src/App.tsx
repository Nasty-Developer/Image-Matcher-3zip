import React, { Suspense } from "react";
import { Route, Switch } from "wouter";
import { AnimatePresence } from "framer-motion";
import AppLayout from "./layouts/AppLayout";
import "./index.css";
import { SkeletonCard } from "./components/SkeletonLoader";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = React.lazy(() => import("./pages/Home"));
const SearchResults = React.lazy(() => import("./pages/SearchResults"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const PriceCompare = React.lazy(() => import("./pages/PriceCompare"));
const PriceHistory = React.lazy(() => import("./pages/PriceHistory"));
const StockTracker = React.lazy(() => import("./pages/StockTracker"));
const BestDeals = React.lazy(() => import("./pages/BestDeals"));
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
            <Route path="/" component={Home} />
            <Route path="/search" component={SearchResults} />

            <Route>
              <AppLayout>
                <AnimatePresence mode="wait">
                  <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/price-compare" component={PriceCompare} />
                    <Route path="/price-history" component={PriceHistory} />
                    <Route path="/stock-tracker" component={StockTracker} />
                    <Route path="/best-deals" component={BestDeals} />
                    <Route path="/watchlist">
                      <ProtectedRoute><Watchlist /></ProtectedRoute>
                    </Route>
                    <Route path="/ai-assistant" component={AIAssistant} />
                    <Route path="/notifications">
                      <ProtectedRoute><Notifications /></ProtectedRoute>
                    </Route>
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

