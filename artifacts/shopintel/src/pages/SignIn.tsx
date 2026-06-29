import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "wouter";
import { Eye, EyeOff, Zap, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const [, navigate] = useLocation();
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      await signIn(email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to sign in");
    } finally {
      setIsLoading(false);
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
          <p className="text-[#8385A0] text-[13.5px]">Enter your details to sign in to ShopIntel</p>
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

        <div className="mt-6 text-center space-y-4">
          <p className="text-[13.5px] text-[#8385A0]">
            Don't have an account?{" "}
            <Link href="/signup" style={{ textDecoration: 'none' }}>
              <span className="font-semibold text-white hover:text-[#9D6CFF] cursor-pointer">Sign up</span>
            </Link>
          </p>
          
          <button 
            onClick={() => navigate("/")}
            className="text-[13px] font-medium text-[#5A5D75] hover:text-white transition-colors"
          >
            Continue as Guest
          </button>
        </div>
      </motion.div>
    </div>
  );
}
