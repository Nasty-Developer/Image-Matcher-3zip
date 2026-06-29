import { Route, Switch } from "wouter";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import PriceCompare from "./pages/PriceCompare";
import PriceHistory from "./pages/PriceHistory";
import StockTracker from "./pages/StockTracker";
import Coupons from "./pages/Coupons";
import Watchlist from "./pages/Watchlist";
import AIAssistant from "./pages/AIAssistant";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import "./index.css";

export default function App() {
  return (
    <AppLayout>
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
      </Switch>
    </AppLayout>
  );
}
