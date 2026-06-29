import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  actions?: ReactNode;
}

export default function PageHeader({ title, subtitle, icon: Icon, actions }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-center justify-between pb-4 mb-4 border-b border-white/5"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(124, 77, 255, 0.15)",
            border: "1px solid rgba(124, 77, 255, 0.3)",
          }}
        >
          <Icon size={20} style={{ color: "#9D6CFF" }} />
        </div>
        <div>
          <h1 className="text-[22px] font-extrabold page-header-gradient m-0 leading-tight">
            {title}
          </h1>
          <p className="text-[12.5px] text-[#B7B9C9] mt-0.5 m-0">
            {subtitle}
          </p>
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </motion.div>
  );
}
