import { motion } from "framer-motion";
import { TrendingUp, Heart, Star } from "lucide-react";

const stores = [
  {
    name: "amazon",
    logo: "amazon",
    price: "₹89,990",
    original: "₹1,14,900",
    discount: "21% OFF",
    delivery: "Tomorrow",
    deliveryFree: true,
    rating: 4.6,
    reviews: "12.4K",
    stock: true,
    offer: "₹2,000 Off on HDFC Cards",
    color: "#FF9900",
  },
  {
    name: "Flipkart",
    logo: "flipkart",
    price: "₹87,990",
    original: "₹1,14,900",
    discount: "23% OFF",
    delivery: "2 Days",
    deliveryFree: true,
    rating: 4.5,
    reviews: "8.7K",
    stock: true,
    offer: "₹3,000 Off with Flipkart Axis Card",
    color: "#2874F0",
  },
  {
    name: "Reliance Digital",
    logo: "reliance",
    price: "₹90,900",
    original: "₹1,18,900",
    discount: "20% OFF",
    delivery: "Tomorrow",
    deliveryFree: true,
    rating: 4.4,
    reviews: "2.1K",
    stock: true,
    offer: "₹2,500 Off on ICICI Cards",
    color: "#E31E24",
  },
  {
    name: "croma",
    logo: "croma",
    price: "₹91,900",
    original: "₹1,19,000",
    discount: "19% OFF",
    delivery: "2 Days",
    deliveryFree: true,
    rating: 4.6,
    reviews: "1.3K",
    stock: true,
    offer: "₹2,000 Cashback on Amazon Pay",
    color: "#00A63E",
  },
  {
    name: "VIJAY SALES",
    logo: "vijay",
    price: "₹92,500",
    original: "₹1,20,000",
    discount: "18% OFF",
    delivery: "3 Days",
    deliveryFree: true,
    rating: 4.4,
    reviews: "980",
    stock: true,
    offer: "₹1,500 Off on Yes Bank Cards",
    color: "#F5A623",
  },
];

function StoreNameDisplay({ store }: { store: typeof stores[0] }) {
  const styles: Record<string, React.CSSProperties> = {
    amazon: { color: "#FF9900", fontWeight: 800, fontSize: 15, letterSpacing: 0 },
    flipkart: { color: "#2874F0", fontWeight: 700, fontSize: 14 },
    reliance: { color: "#E31E24", fontWeight: 700, fontSize: 11 },
    croma: { color: "#00A63E", fontWeight: 700, fontSize: 14 },
    vijay: { color: "#F5A623", fontWeight: 700, fontSize: 11 },
  };
  return <span style={styles[store.logo] || {}}>{store.name}</span>;
}

export default function ProductCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(13,18,34,0.9)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Product header */}
      <div className="p-4 pb-3 flex items-start gap-4">
        {/* Product image placeholder */}
        <div
          className="rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            width: 90,
            height: 80,
            background: "rgba(20,28,50,0.8)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="text-[10px] text-center font-bold leading-tight"
            style={{ color: "#9D6CFF" }}
          >
            MacBook<br />Air M2
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-bold text-white text-[18px]">Apple MacBook Air M2</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < 5 ? "#F5A623" : "transparent"}
                      style={{ color: "#F5A623" }}
                    />
                  ))}
                </div>
                <span className="text-[12px]" style={{ color: "#B7B9C9" }}>4.8</span>
                <span className="text-[12px]" style={{ color: "#7B7E9A" }}>(2,453)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-white"
                style={{
                  background: "rgba(124,77,255,0.15)",
                  border: "1px solid rgba(124,77,255,0.3)",
                }}
              >
                <TrendingUp size={13} style={{ color: "#9D6CFF" }} />
                Track Price
              </motion.button>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Heart size={14} style={{ color: "#B7B9C9" }} />
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mt-2">
            {["M2 Chip", "8GB RAM", "256GB SSD", "13.6-inch"].map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Table header */}
        <div
          className="grid text-[11px] font-semibold px-4 py-2"
          style={{
            color: "#7B7E9A",
            gridTemplateColumns: "140px 130px 100px 90px 90px 1fr 100px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span>Store</span>
          <span>Price</span>
          <span>Delivery</span>
          <span>Rating</span>
          <span>Stock</span>
          <span>Best Offer</span>
          <span></span>
        </div>

        {/* Table rows */}
        {stores.map((store, i) => (
          <motion.div
            key={store.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid items-center px-4 py-2.5 hover:bg-white/[0.02] transition-colors"
            style={{
              gridTemplateColumns: "140px 130px 100px 90px 90px 1fr 100px",
              borderBottom: i < stores.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}
          >
            {/* Store name */}
            <div className="text-[13px] font-bold">
              <StoreNameDisplay store={store} />
            </div>

            {/* Price */}
            <div>
              <span className="font-bold text-white text-[14px]">{store.price}</span>
              <span
                className="text-[11px] line-through ml-1.5"
                style={{ color: "#7B7E9A" }}
              >
                {store.original}
              </span>
              <span
                className="text-[10px] ml-1 font-semibold"
                style={{ color: "#37D67A" }}
              >
                {store.discount}
              </span>
            </div>

            {/* Delivery */}
            <div>
              <div className="text-[12px] text-white">{store.delivery}</div>
              {store.deliveryFree && (
                <div className="text-[10px] font-semibold" style={{ color: "#37D67A" }}>
                  FREE
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star size={11} fill="#F5A623" style={{ color: "#F5A623" }} />
              <span className="text-[12px] text-white font-medium">{store.rating}</span>
              <span className="text-[10px]" style={{ color: "#7B7E9A" }}>({store.reviews})</span>
            </div>

            {/* Stock */}
            <div
              className="text-[11px] font-semibold"
              style={{ color: "#37D67A" }}
            >
              In Stock
            </div>

            {/* Offer */}
            <div className="text-[11px] pr-2" style={{ color: "#B7B9C9" }}>
              {store.offer}
            </div>

            {/* Action */}
            <div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="view-deal-btn px-3 py-1.5 rounded-lg text-white text-[12px] font-semibold w-full"
              >
                View Deal
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
