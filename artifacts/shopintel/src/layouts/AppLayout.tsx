import { ReactNode, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FloatingActions from "../components/FloatingActions";
import CommandPalette from "../components/CommandPalette";
import AuthModal from "../components/AuthModal";
import { useTheme } from "../context/ThemeContext";

export default function AppLayout({ children }: { children: ReactNode }) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex app-shell ${theme === 'light' ? 'light-mode' : ''}`}
      style={{
        fontFamily: "'Inter', sans-serif",
        background:
          "radial-gradient(ellipse 80% 50% at 20% 10%, rgba(124,77,255,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(30,60,200,0.05) 0%, transparent 60%), #060913",
        minHeight: "100vh",
      }}
    >
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} feature="create watchlists" />
      <Sidebar />
      <div className="flex flex-col min-w-0" style={{ marginLeft: 208, flex: 1 }}>
        <Navbar onOpenSearch={() => setCmdOpen(true)} onOpenAuth={() => setAuthModalOpen(true)} />
        <main
          className="flex-1 overflow-auto"
          style={{ padding: "22px 22px 28px 22px" }}
        >
          {children}
        </main>
      </div>
      <FloatingActions onOpenSearch={() => setCmdOpen(true)} onOpenAuth={() => setAuthModalOpen(true)} />
    </div>
  );
}

