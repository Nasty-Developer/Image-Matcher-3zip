import React, { createContext, useContext, useState, useEffect } from "react";

// TODO: Replace with Firebase Authentication

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  signIn: (email: string, password?: string) => Promise<void>;
  signUp: (name: string, email: string, password?: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("shopintel_auth");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return { name: "Aryan Sharma", email: "aryan@shopintel.ai", avatar: "A" };
  });

  useEffect(() => {
    localStorage.setItem("shopintel_auth", JSON.stringify(user));
  }, [user]);

  const isGuest = user === null;

  const signIn = async (email: string, _password?: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({ name: "Aryan Sharma", email, avatar: email.charAt(0).toUpperCase() });
        resolve();
      }, 800);
    });
  };

  const signUp = async (name: string, email: string, _password?: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({ name, email, avatar: name.charAt(0).toUpperCase() });
        resolve();
      }, 1000);
    });
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
