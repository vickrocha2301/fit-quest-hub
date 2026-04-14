import { motion } from "framer-motion";

interface XPBarProps {
  current: number;
  max: number;
  level: number;
}

export function XPBar({ current, max, level }: XPBarProps) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-heading font-bold text-primary">Lv {level}</span>
      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full gradient-xp"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="text-[10px] text-muted-foreground font-body">
        {current}/{max} XP
      </span>
    </div>
  );
}
