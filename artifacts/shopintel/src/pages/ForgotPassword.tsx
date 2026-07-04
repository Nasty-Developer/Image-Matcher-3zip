import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "wouter";
import { Zap, Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const [, navigate] = useLocation();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;

    setError("");
    setIsLoading(true);
    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      const code = (err as { code?: string })?.code || "";
      setError(code.includes("user-not-found") ? "No account found with this email" : "Failed to send reset link. Please try again.");
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
        
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
                <p className="text-[#8385A0] text-[13.5px]">Enter your email and we'll send you a link to reset your password</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#8385A0] uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A5D75]">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full rounded-xl bg-[#1a2035]/80 border border-white/10 pl-10 pr-4 py-3 text-[14px] text-white outline-none focus:border-[#7C4DFF] focus:bg-[#1a2035] transition-colors"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-[#FF6B6B] text-[12.5px] bg-[#FF6B6B]/10 border border-[#FF6B6B]/20 rounded-lg px-3 py-2">
                    <AlertCircle size={14} className="shrink-0" />
                    {error}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isLoading}
                  className="w-full rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D6CFF] py-3.5 text-[14px] font-bold text-white shadow-[0_0_20px_rgba(124,77,255,0.3)] mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-[52px]"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Send Reset Link"
                  )}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
              <div className="flex justify-center mb-4">
                <CheckCircle2 size={48} className="text-[#37D67A]" />
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Check your inbox!</h2>
              <p className="text-[#8385A0] text-[13.5px] leading-relaxed mb-6">
                We sent a reset link to <span className="text-white font-medium">{email}</span>. Click the link to create a new password.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          <Link href="/signin" style={{ textDecoration: 'none' }}>
            <span className="flex items-center gap-2 text-[13px] font-medium text-[#8385A0] hover:text-white transition-colors cursor-pointer">
              <ArrowLeft size={14} />
              Back to Sign In
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
