import React, { createContext, useContext, useEffect, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import {
  loginWithEmail,
  loginWithGoogle,
  logout as logoutService,
  resetPassword,
  signupWithEmail,
  subscribeToAuthChanges,
} from "../services/auth.service";

interface SimpleUser {
  name: string;
  email: string;
  avatar: string;
  photoURL: string | null;
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;

  user: SimpleUser | null;
  isGuest: boolean;
  signIn: (email: string, password?: string) => Promise<void>;
  signUp: (name: string, email: string, password?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function toSimpleUser(fbUser: FirebaseUser | null): SimpleUser | null {
  if (!fbUser) return null;
  const name = fbUser.displayName || fbUser.email?.split("@")[0] || "User";
  return {
    name,
    email: fbUser.email || "",
    avatar: name.charAt(0).toUpperCase(),
    photoURL: fbUser.photoURL,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((fbUser) => {
      setCurrentUser(fbUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await loginWithEmail(email, password);
  };

  const signup = async (name: string, email: string, password: string) => {
    await signupWithEmail(name, email, password);
  };

  const googleLogin = async () => {
    await loginWithGoogle();
  };

  const logout = async () => {
    await logoutService();
  };

  const forgotPassword = async (email: string) => {
    await resetPassword(email);
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    login,
    signup,
    googleLogin,
    logout,
    forgotPassword,

    user: toSimpleUser(currentUser),
    isGuest: currentUser === null,
    signIn: (email, password = "") => login(email, password),
    signUp: (name, email, password = "") => signup(name, email, password),
    signOut: () => logout(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
