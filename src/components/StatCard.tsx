import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color?: string;
}

export function StatCard({ icon: Icon, label, value, color = "text-primary" }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-card rounded-lg p-4 border border-border card-glow"
    >
      <Icon className={`w-5 h-5 ${color} mb-2`} />
      <p className="text-lg font-heading font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </motion.div>
  );
}
