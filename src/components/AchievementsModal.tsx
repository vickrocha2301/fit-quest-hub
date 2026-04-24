import { motion } from "framer-motion";
import { Lock, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BADGES } from "@/data/badges";

interface AchievementsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AchievementsModal({ open, onOpenChange }: AchievementsModalProps) {
  const unlockedCount = BADGES.filter((b) => b.unlocked).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-white/10 bg-background/40 backdrop-blur-2xl shadow-[0_0_60px_hsl(var(--accent)/0.3)]">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold drop-shadow-[0_0_8px_hsl(var(--gold)/0.7)]" />
            Minhas Conquistas
          </DialogTitle>
          <DialogDescription>
            {unlockedCount} de {BADGES.length} medalhas desbloqueadas
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-3 mt-2 max-h-[60vh] overflow-y-auto pr-1">
          {BADGES.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className={`relative aspect-square rounded-xl flex flex-col items-center justify-center p-2 border text-center transition-all ${
                b.unlocked
                  ? "bg-gradient-to-br from-primary/20 to-accent/20 border-primary/40 shadow-[0_0_16px_hsl(var(--primary)/0.3)]"
                  : "bg-secondary/30 border-border"
              }`}
            >
              <span
                className={`text-3xl mb-1 transition-all ${
                  b.unlocked ? "" : "grayscale opacity-40"
                }`}
              >
                {b.icon}
              </span>
              <span
                className={`text-[10px] font-heading font-semibold leading-tight ${
                  b.unlocked ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {b.name}
              </span>
              {!b.unlocked && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-background/80 flex items-center justify-center border border-border">
                  <Lock className="w-2.5 h-2.5 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
