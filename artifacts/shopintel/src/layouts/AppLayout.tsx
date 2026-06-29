import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AppLayout({ children }: { children: ReactNode }) {
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
      <div className="flex flex-col min-w-0" style={{ marginLeft: 165, flex: 1 }}>
        <Navbar />
        <main
          className="flex-1 overflow-auto"
          style={{ padding: "12px 14px 12px 14px" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
