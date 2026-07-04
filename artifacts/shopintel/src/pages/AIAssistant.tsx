import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, Sparkles, Clock, Plus } from "lucide-react";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const suggestions = [
  "What's the best time to buy MacBook Air M2?",
  "Compare iPhone 15 vs Samsung S24",
  "Show today's best deals on electronics",
  "Predict price drop for Sony headphones",
];

const conversations = [
  { id: 1, title: "MacBook Price Analysis", time: "Today, 2:30 PM", history: [
    { id: 101, role: "user" as const, content: "What's the best time to buy MacBook Air M2?", time: "2:29 PM" },
    { id: 102, role: "assistant" as const, content: "Based on my analysis, the **Apple MacBook Air M2** is currently priced at ₹89,990 on Amazon. 📊\n\n**AI Recommendation:** Wait 3 days! Big Billion Days is approaching and the price is predicted to drop by ₹2,300–₹3,500.", time: "2:30 PM" }
  ]},
  { id: 2, title: "Best Deals This Week", time: "Yesterday", history: [
    { id: 201, role: "user" as const, content: "Show today's best deals on electronics", time: "Yesterday" },
    { id: 202, role: "assistant" as const, content: "Here are today's **best deals** on electronics! 🔥\n\n• **MacBook Air M2** — ₹87,990 (lowest in 30 days)\n• **Sony WH-1000XM5** — ₹25,990\n\nI'll keep tracking these and alert you if they drop further.", time: "Yesterday" }
  ]},
  { id: 3, title: "Smartphone Comparison", time: "28 May", history: [
    { id: 301, role: "user" as const, content: "Compare iPhone 15 vs Samsung S24", time: "28 May" },
    { id: 302, role: "assistant" as const, content: "Comparing **iPhone 15** vs **Samsung Galaxy S24 Ultra**: 📱\n\n**AI Pick:** For photography, Samsung wins. For ecosystem & longevity, iPhone is the better investment.", time: "28 May" }
  ]},
];

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("macbook") || lower.includes("mac")) {
    return "Based on my analysis, the **Apple MacBook Air M2** is currently priced at ₹89,990 on Amazon. 📊\n\n**AI Recommendation:** Wait 3 days! Big Billion Days is approaching and the price is predicted to drop by ₹2,300–₹3,500.\n\n**Best deal right now:** Flipkart at ₹87,990 with ₹3,000 off via Axis Bank card.\n\nWould you like me to set a price alert at ₹86,000?";
  }
  if (lower.includes("deal") || lower.includes("coupon")) {
    return "Here are today's **best deals** across stores! 🔥\n\n• **MacBook Air M2** — ₹87,990 on Flipkart (lowest in 30 days)\n• **Sony WH-1000XM5** — ₹25,990 on Amazon\n• **Samsung S24 Ultra** — ₹1,07,999 on Flipkart\n\nWant me to set price alerts for any of these?";
  }
  if (lower.includes("iphone") || lower.includes("samsung") || lower.includes("compare")) {
    return "Comparing **iPhone 15** vs **Samsung Galaxy S24 Ultra**: 📱\n\n| Feature | iPhone 15 | S24 Ultra |\n|---|---|---|\n| Price | ₹79,900 | ₹1,09,999 |\n| Camera | 48MP | 200MP |\n| Battery | 3,877mAh | 5,000mAh |\n\n**AI Pick:** For photography, Samsung wins. For ecosystem & longevity, iPhone is the better investment.\n\nWant me to track prices for both?";
  }
  return "Great question! 🤖 I'm analyzing real-time data across 5+ stores to give you the best recommendation.\n\nHere's what I found:\n• **Best price trend**: Prices are dropping 2–4% this week across major stores\n• **Recommended action**: It's a good time to buy electronics\n• **Best deal today**: Check Today's Best Deals for the top AI-curated pick\n\nIs there a specific product you'd like me to analyze in detail?";
};

export default function AIAssistant() {
  const initialMessage: Message = {
    id: 1, role: "assistant",
    content: "Hi Aryan! 👋 I'm Prisma, your AI shopping assistant. I can help you find the best deals, predict price drops, and compare products across stores. What would you like to know today?",
    time: "Just now",
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text?: string) => {
    const content = text ?? input;
    if (!content.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content, time: "Just now" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const assistantMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: getResponse(content),
        time: "Just now",
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setLoading(false);
    }, 1200);
  };

  const handleNewChat = () => {
    setMessages([initialMessage]);
    setInput("");
  };

  const loadConversation = (id: number) => {
    const convo = conversations.find(c => c.id === id);
    if (convo) {
      setMessages(convo.history);
      setInput("");
    }
  };

  return (
    <PageTransition>
      <PageHeader
        title="AI Assistant"
        subtitle="Your intelligent shopping companion powered by AI"
        icon={Bot}
      />
      <div style={{ display: "flex", gap: 12, height: "calc(100vh - 170px)" }}>
        {/* Left: conversation history */}
        <div
          style={{
            width: 220, flexShrink: 0, borderRadius: 14,
            background: "rgba(11,15,30,0.92)", border: "1px solid rgba(255,255,255,0.07)",
            display: "flex", flexDirection: "column", padding: "14px 12px",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNewChat}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 7, padding: "8px 12px",
              borderRadius: 10, background: "linear-gradient(135deg, #7C4DFF, #9D6CFF)",
              color: "white", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
              border: "none", marginBottom: 14,
            }}
          >
            <Plus size={13} /> New Chat
          </motion.button>

          <div style={{ fontSize: 10.5, color: "#4A4D65", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Recent
          </div>

          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => loadConversation(c.id)}
              style={{
                padding: "9px 10px", borderRadius: 9, cursor: "pointer",
                marginBottom: 4, transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ fontWeight: 500, color: "#B7B9C9", fontSize: 12, marginBottom: 2 }}>{c.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={9} style={{ color: "#4A4D65" }} />
                <span style={{ fontSize: 10, color: "#4A4D65" }}>{c.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: chat */}
        <div
          style={{
            flex: 1, borderRadius: 14,
            background: "rgba(11,15,30,0.92)", border: "1px solid rgba(255,255,255,0.07)",
            display: "flex", flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", gap: 10,
            }}
          >
            <div
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, rgba(124,77,255,0.3), rgba(111,60,255,0.2))",
                border: "1px solid rgba(124,77,255,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 18px rgba(124,77,255,0.25)",
              }}
            >
              <Bot size={18} style={{ color: "#9D6CFF" }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "white", fontSize: 14 }}>Prisma AI</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#37D67A" }} />
                <span style={{ fontSize: 11, color: "#37D67A" }}>Online · Ready to help</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex",
                    flexDirection: msg.role === "user" ? "row-reverse" : "row",
                    gap: 10, alignItems: "flex-start",
                  }}
                >
                  {msg.role === "assistant" && (
                    <div
                      style={{
                        width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                        background: "rgba(124,77,255,0.2)", border: "1px solid rgba(124,77,255,0.35)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <Sparkles size={14} style={{ color: "#9D6CFF" }} />
                    </div>
                  )}
                  <div style={{ maxWidth: "75%" }}>
                    <div
                      style={{
                        padding: "10px 14px", borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                        background: msg.role === "user"
                          ? "linear-gradient(135deg, #7C4DFF, #9D6CFF)"
                          : "rgba(18,24,46,0.9)",
                        border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.07)" : "none",
                        fontSize: 13, color: "white", lineHeight: 1.65,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {msg.content}
                    </div>
                    <div style={{ fontSize: 10, color: "#4A4D65", marginTop: 4, textAlign: msg.role === "user" ? "right" : "left" }}>
                      {msg.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
              >
                <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(124,77,255,0.2)", border: "1px solid rgba(124,77,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Sparkles size={14} style={{ color: "#9D6CFF" }} />
                </div>
                <div style={{ padding: "12px 16px", borderRadius: "14px 14px 14px 4px", background: "rgba(18,24,46,0.9)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 4 }}>
                  {[0, 0.2, 0.4].map((d) => (
                    <motion.div
                      key={d}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, delay: d, repeat: Infinity }}
                      style={{ width: 7, height: 7, borderRadius: "50%", background: "#7C4DFF" }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div style={{ padding: "0 18px 10px", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {suggestions.map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.02, borderColor: "rgba(124,77,255,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => send(s)}
                  style={{
                    padding: "6px 12px", borderRadius: 8, fontSize: 11.5,
                    background: "rgba(124,77,255,0.1)", border: "1px solid rgba(124,77,255,0.2)",
                    color: "#B7B9C9", cursor: "pointer", transition: "border-color 0.15s",
                  }}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex", gap: 8,
            }}
          >
            <div
              style={{
                flex: 1, display: "flex", alignItems: "center", gap: 10,
                background: "rgba(15,20,40,0.8)", border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 11, padding: "0 14px",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Ask about prices, deals, recommendations..."
                style={{ background: "transparent", outline: "none", flex: 1, fontSize: 13, color: "#B7B9C9", padding: "10px 0" }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => send()}
              disabled={loading || !input.trim()}
              style={{
                width: 42, height: 42, borderRadius: 11, flexShrink: 0,
                background: input.trim() ? "linear-gradient(135deg, #7C4DFF, #9D6CFF)" : "rgba(255,255,255,0.06)",
                border: "none", cursor: input.trim() ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}
            >
              <Send size={16} style={{ color: input.trim() ? "white" : "#4A4D65" }} />
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
