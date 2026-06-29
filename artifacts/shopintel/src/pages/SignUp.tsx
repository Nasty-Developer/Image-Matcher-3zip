import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "wouter";
import { Eye, EyeOff, Zap, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [, navigate] = useLocation();
  const { signUp } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = () => {
    if (password.length === 0) return { score: 0, text: "", color: "" };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { score: 1, text: "Weak", color: "#FF6B6B" };
    if (score <= 3) return { score: 2, text: "Medium", color: "#F5A623" };
    return { score: 3, text: "Strong", color: "#37D67A" };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Name is required");
    if (!email.includes("@")) return setError("Valid email is required");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirmPassword) return setError("Passwords do not match");
    
    setError("");
    setIsLoading(true);
    try {
      await signUp(name, email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to create account");
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
        className="w-full max-w-[420px] rounded-2xl bg-[#0d1222]/80 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative z-10 my-8"
      >
        <div className="flex justify-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <Zap size={24} color="white" fill="white" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-[#8385A0] text-[13.5px]">Join ShopIntel to start tracking prices</p>
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
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-xl bg-[#1a2035]/80 border border-white/10 px-4 py-3 text-[14px] text-white outline-none focus:border-[#7C4DFF] focus:bg-[#1a2035] transition-colors"
              placeholder="John Doe"
            />
          </div>

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
            <label className="block text-[12px] font-semibold text-[#8385A0] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl bg-[#1a2035]/80 border border-white/10 px-4 py-3 pr-10 text-[14px] text-white outline-none focus:border-[#7C4DFF] focus:bg-[#1a2035] transition-colors"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8385A0] hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="mt-2 flex items-center justify-between">
                <div className="flex gap-1 flex-1 mr-3">
                  {[1, 2, 3].map(i => (
                    <div 
                      key={i} 
                      className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden"
                    >
                      <div 
                        className="h-full w-full transition-colors duration-300"
                        style={{ 
                          backgroundColor: i <= strength.score ? strength.color : 'transparent' 
                        }}
                      />
                    </div>
                  ))}
                </div>
                <span className="text-[11px] font-medium" style={{ color: strength.color }}>
                  {strength.text}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#8385A0] uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl bg-[#1a2035]/80 border border-white/10 px-4 py-3 text-[14px] text-white outline-none focus:border-[#7C4DFF] focus:bg-[#1a2035] transition-colors"
              placeholder="Confirm your password"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D6CFF] py-3.5 text-[14px] font-bold text-white shadow-[0_0_20px_rgba(124,77,255,0.3)] mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-[52px]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-[13.5px] text-[#8385A0]">
            Already have an account?{" "}
            <Link href="/signin" style={{ textDecoration: 'none' }}>
              <span className="font-semibold text-white hover:text-[#9D6CFF] cursor-pointer">Sign in</span>
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
