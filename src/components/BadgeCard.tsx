import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface BadgeCardProps {
  name: string;
  icon: string;
  unlocked: boolean;
  description: string;
  onClick?: () => void;
}

export function BadgeCard({ name, icon, unlocked, description, onClick }: BadgeCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all ${
        unlocked
          ? "bg-card border-primary/30 card-glow"
          : "bg-secondary/50 border-border opacity-60"
      }`}
    >
      <div className="relative text-3xl">
        {icon}
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-full">
            <Lock className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
      </div>
      <span className="text-xs font-heading font-semibold">{name}</span>
      <span className="text-[10px] text-muted-foreground leading-tight">{description}</span>
    </motion.button>
  );
}
