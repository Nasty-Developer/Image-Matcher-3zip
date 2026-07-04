import { ReactNode, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FloatingActions from "../components/FloatingActions";
import CommandPalette from "../components/CommandPalette";
import AuthModal from "../components/AuthModal";
import { useTheme } from "../context/ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";

export default function AppLayout({ children }: { children: ReactNode }) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { theme } = useTheme();
  const { isDesktop } = useBreakpoint();

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
      <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex flex-col min-w-0" style={{ marginLeft: isDesktop ? 208 : 0, flex: 1, minWidth: 0 }}>
        <Navbar
          onOpenSearch={() => setCmdOpen(true)}
          onOpenAuth={() => setAuthModalOpen(true)}
          onOpenMenu={() => setMobileNavOpen(true)}
        />
        <main
          className="flex-1 overflow-auto overflow-x-hidden"
          style={{ padding: isDesktop ? "22px 22px 28px 22px" : "16px 14px 90px 14px" }}
        >
          {children}
        </main>
      </div>
      <FloatingActions onOpenSearch={() => setCmdOpen(true)} onOpenAuth={() => setAuthModalOpen(true)} />
    </div>
  );
}
