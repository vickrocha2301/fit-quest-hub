import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

interface MissionCardProps {
  title: string;
  xp: number;
  completed: boolean;
  progress: number;
}

export function MissionCard({ title, xp, completed, progress }: MissionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
        completed
          ? "bg-primary/10 border-primary/30"
          : "bg-card border-border"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          completed ? "bg-primary" : "bg-secondary"
        }`}
      >
        {completed ? (
          <Check className="w-4 h-4 text-primary-foreground" />
        ) : (
          <Zap className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${completed ? "line-through text-muted-foreground" : ""}`}>
          {title}
        </p>
        {!completed && (
          <div className="h-1.5 rounded-full bg-secondary mt-1.5 overflow-hidden">
            <div className="h-full rounded-full gradient-xp" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
      <span className="text-xs font-heading font-semibold text-primary shrink-0">+{xp} XP</span>
    </motion.div>
  );
}
