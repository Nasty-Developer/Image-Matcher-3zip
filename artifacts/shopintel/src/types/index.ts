import { LucideIcon } from "lucide-react";

export interface StorePrice {
  name: string;
  color: string;
  price: number;
  original: number;
  delivery: string;
  rating: number;
  reviews: string;
  offer?: string;
  fontStyle?: React.CSSProperties;
  savings?: number;
  emi?: { months: number; amount: number };
  cashback?: string;
  extraOffer?: string;
}

export interface Product {
  id: string | number;
  name: string;
  category: string;
  image: string;
  stores: StorePrice[];
}

export interface WatchlistItem {
  id: number;
  name: string;
  category: string;
  image: string;
  currentPrice: number;
  targetPrice: number;
  originalPrice: number;
  bestStore: string;
  rating: number;
  priceChange: number;
  priceChangePct: number;
  addedDate: string;
}

export interface Notification {
  id: number;
  type: string;
  read: boolean;
  title: string;
  body: string;
  time: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
}

export interface PricePoint {
  date: string;
  price?: number;
  amazon?: number;
  flipkart?: number;
  reliance?: number;
}

export interface StockItem {
  name: string;
  color: string;
  status: string;
  qty: string;
  updated: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  comingSoon?: boolean;
}
