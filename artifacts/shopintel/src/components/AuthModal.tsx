import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  feature?: string;
}

export default function AuthModal({ open, onClose, feature = "save your data" }: AuthModalProps) {
  const [, navigate] = useLocation();

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[400px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d1222]/95 p-6 shadow-2xl backdrop-blur-xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-white/50 hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>
            
            <div className="mb-6 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#7C4DFF]/20 to-[#9D6CFF]/20 border border-[#7C4DFF]/30 shadow-[0_0_20px_rgba(124,77,255,0.2)]">
                <Lock size={24} className="text-[#9D6CFF]" />
              </div>
            </div>

            <div className="mb-6 text-center">
              <h2 className="mb-2 text-xl font-bold text-white">Sign in Required</h2>
              <p className="text-[13.5px] leading-relaxed text-[#B7B9C9]">
                Sign in to {feature} and access it across all your devices.
              </p>
            </div>

            <div className="mb-8 space-y-3 rounded-xl bg-white/[0.03] p-4 border border-white/5">
              {[
                "Sync across devices",
                "Price alerts",
                "Personalized AI"
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-[#37D67A]" />
                  <span className="text-[13px] font-medium text-[#8385A0]">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { onClose(); navigate("/signin"); }}
                className="w-full rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9D6CFF] py-3 text-[13.5px] font-bold text-white shadow-[0_0_20px_rgba(124,77,255,0.3)] hover:shadow-[0_0_25px_rgba(124,77,255,0.4)]"
              >
                Sign In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { onClose(); navigate("/signup"); }}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-[13.5px] font-bold text-white hover:bg-white/10"
              >
                Create Account
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
