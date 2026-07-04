import {
  LayoutDashboard, BarChart2, Clock,
  Bot, Sparkles, Zap as ZapIcon,
  PackageSearch, Flame, Bookmark,
  Bell, Settings,
  BarChart, FileText, Search, AlertCircle, Heart, TrendingDown,
  Globe, Cpu, Share2, Key, Code2, DollarSign, MessageSquare, HelpCircle, Map,
  LucideIcon,
} from "lucide-react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  comingSoon?: boolean;
}

export interface SidebarSection {
  id: string;
  title: string;
  items: SidebarItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  action?: string;
}

export const sidebarSections: SidebarSection[] = [
  {
    id: "main",
    title: "Main",
    defaultOpen: true,
    items: [
      { id: "dashboard",     label: "Dashboard",     icon: LayoutDashboard, href: "/dashboard"     },
      { id: "price-compare", label: "Price Compare",  icon: BarChart2,       href: "/price-compare" },
      { id: "price-history", label: "Price History",  icon: Clock,           href: "/price-history" },
    ],
  },
  {
    id: "ai-tools",
    title: "AI Tools",
    defaultOpen: true,
    items: [
      { id: "ai-assistant",       label: "AI Assistant",          icon: Bot,      href: "/ai-assistant"          },
      { id: "smart-recs",         label: "Smart Recommendations", icon: Sparkles, href: "#", comingSoon: true },
      { id: "ai-deals",           label: "AI Deals",              icon: ZapIcon,  href: "#", comingSoon: true, badge: "Soon" },
    ],
  },
  {
    id: "product-tools",
    title: "Product Tools",
    defaultOpen: true,
    items: [
      { id: "stock-tracker", label: "Stock Tracker",     icon: PackageSearch, href: "/stock-tracker" },
      { id: "best-deals",    label: "Today's Best Deals", icon: Flame,        href: "/best-deals"     },
      { id: "watchlist",     label: "Watchlist",          icon: Bookmark,      href: "/watchlist"     },
    ],
  },
  {
    id: "user",
    title: "User",
    defaultOpen: true,
    items: [
      { id: "notifications", label: "Notifications", icon: Bell,     href: "/notifications" },
      { id: "settings",      label: "Settings",      icon: Settings, href: "/settings"      },
    ],
  },
  {
    id: "more",
    title: "More",
    collapsible: true,
    defaultOpen: false,
    items: [
      { id: "analytics",       label: "Analytics",         icon: BarChart,      href: "#", comingSoon: true },
      { id: "reports",         label: "Reports",            icon: FileText,      href: "#", comingSoon: true },
      { id: "saved-searches",  label: "Saved Searches",    icon: Search,        href: "#", comingSoon: true },
      { id: "deal-alerts",     label: "Deal Alerts",       icon: AlertCircle,   href: "#", comingSoon: true },
      { id: "favorites",       label: "Favorites",         icon: Heart,         href: "#", comingSoon: true },
      { id: "price-prediction",label: "Price Prediction",  icon: TrendingDown,  href: "#", comingSoon: true },
      { id: "integrations",    label: "Integrations",      icon: Share2,        href: "#", comingSoon: true },
      { id: "api-keys",        label: "API Keys",          icon: Key,           href: "#", comingSoon: true },
      { id: "dev-tools",       label: "Developer Tools",   icon: Code2,         href: "#", comingSoon: true },
      { id: "affiliate",       label: "Affiliate Earnings",icon: DollarSign,    href: "#", comingSoon: true },
      { id: "feedback",        label: "Feedback",          icon: MessageSquare, href: "#", comingSoon: true },
      { id: "help",            label: "Help Center",       icon: HelpCircle,    href: "#", comingSoon: true },
      { id: "roadmap",         label: "Roadmap",           icon: Map,           href: "#", comingSoon: true },
      { id: "mobile-app",      label: "Mobile App",        icon: Globe,         href: "#", comingSoon: true },
      { id: "browser-ext",     label: "Browser Extension", icon: Cpu,           href: "#", comingSoon: true },
    ],
  },
];

export const quickActions: QuickAction[] = [
  { id: "add-product",      label: "Add Product",       icon: PackageSearch, href: "/price-compare" },
  { id: "best-deals",       label: "Best Deals",        icon: Flame,         href: "/best-deals"    },
  { id: "new-watchlist",    label: "New Watchlist",     icon: Bookmark,      href: "/watchlist"     },
  { id: "ai-search",        label: "AI Search",         icon: Bot,           href: "/ai-assistant"  },
];
