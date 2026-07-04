import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/signin");
    }
  }, [loading, currentUser, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "50vh" }}>
        <div
          className="w-8 h-8 rounded-full animate-spin"
          style={{ border: "3px solid rgba(124,77,255,0.2)", borderTopColor: "#7C4DFF" }}
        />
      </div>
    );
  }

  if (!currentUser) return null;

  return <>{children}</>;
}
