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
      className="flex items-center justify-between"
      style={{
        paddingBottom: 20,
        marginBottom: 20,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center gap-3.5">
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(124, 77, 255, 0.14)",
            border: "1px solid rgba(124, 77, 255, 0.28)",
            boxShadow: "0 0 16px rgba(124,77,255,0.1)",
          }}
        >
          <Icon size={20} style={{ color: "#9D6CFF" }} />
        </div>
        <div>
          <h1 className="text-[22px] font-extrabold page-header-gradient m-0 leading-tight">
            {title}
          </h1>
          <p style={{ fontSize: 12.5, color: "#7B7E9A", marginTop: 3, margin: 0 }}>
            {subtitle}
          </p>
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-2.5">
          {actions}
        </div>
      )}
    </motion.div>
  );
}
