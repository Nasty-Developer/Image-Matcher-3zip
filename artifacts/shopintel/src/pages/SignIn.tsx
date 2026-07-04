import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "wouter";
import { Eye, EyeOff, Zap, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function getFirebaseErrorMessage(err: unknown): string {
  const code = (err as { code?: string })?.code || "";
  if (code.includes("user-not-found") || code.includes("wrong-password") || code.includes("invalid-credential")) {
    return "Invalid email or password";
  }
  if (code.includes("too-many-requests")) return "Too many attempts. Try again later.";
  if (code.includes("popup-closed-by-user")) return "Google sign-in was cancelled";
  return "Failed to sign in. Please try again.";
}

export default function SignIn() {
  const [, navigate] = useLocation();
  const { login, googleLogin } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setError("");
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await googleLogin();
      navigate("/dashboard");
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#060913] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,77,255,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(30,60,200,0.1) 0%, transparent 60%)"
      }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] rounded-2xl bg-[#0d1222]/80 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <Zap size={24} color="white" fill="white" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-[#8385A0] text-[13.5px]">Enter your details to sign in to Prisma</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-xl bg-[#FF6B6B]/10 border border-[#FF6B6B]/20 p-3 text-[13px] text-[#FF6B6B]">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#8385A0] uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl bg-[#1a2035]/80 border border-white/10 px-4 py-3 text-[14px] text-white outline-none focus:border-[#7C4DFF] focus:bg-[#1a2035] transition-colors"
              placeholder="name@example.com"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[12px] font-semibold text-[#8385A0] uppercase tracking-wider">
                Password
              </label>
              <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
                <span className="text-[12px] font-medium text-[#9D6CFF] hover:text-[#7C4DFF] transition-colors cursor-pointer">
                  Forgot password?
                </span>
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl bg-[#1a2035]/80 border border-white/10 px-4 py-3 pr-10 text-[14px] text-white outline-none focus:border-[#7C4DFF] focus:bg-[#1a2035] transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8385A0] hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D6CFF] py-3.5 text-[14px] font-bold text-white shadow-[0_0_20px_rgba(124,77,255,0.3)] mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-[52px]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] font-medium text-[#5A5D75] uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="button"
          disabled={googleLoading}
          onClick={handleGoogleLogin}
          className="w-full rounded-xl bg-white/[0.04] border border-white/10 py-3 text-[13.5px] font-semibold text-white flex justify-center items-center gap-2.5 h-[48px] hover:bg-white/[0.07] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {googleLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6C29.6 34.6 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.6 39.6 16.3 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4 5.8l6.6 5.6C41.4 36 44 30.6 44 24c0-1.3-.1-2.7-.4-3.5z"/>
              </svg>
              Continue with Google
            </>
          )}
        </motion.button>

        <div className="mt-6 text-center space-y-4">
          <p className="text-[13.5px] text-[#8385A0]">
            Don't have an account?{" "}
            <Link href="/signup" style={{ textDecoration: 'none' }}>
              <span className="font-semibold text-white hover:text-[#9D6CFF] cursor-pointer">Sign up</span>
            </Link>
          </p>
          
          <button 
            onClick={() => navigate("/dashboard")}
            className="text-[13px] font-medium text-[#5A5D75] hover:text-white transition-colors"
          >
            Continue as Guest
          </button>
        </div>
      </motion.div>
    </div>
  );
}
