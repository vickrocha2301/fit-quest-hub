import { motion } from "framer-motion";
import { Dumbbell, PersonStanding, Trophy, Swords, Shield, Flame } from "lucide-react";

const sports = [
  { id: "academia", label: "Academia", icon: Dumbbell },
  { id: "corrida", label: "Corrida", icon: PersonStanding },
  { id: "maratona", label: "Maratona", icon: Trophy },
  { id: "muay-thai", label: "Muay Thai", icon: Flame },
  { id: "jiu-jitsu", label: "Jiu-Jitsu", icon: Shield },
  { id: "outras-lutas", label: "Outras Lutas", icon: Swords },
];

interface SportSelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function SportSelector({ selected, onChange }: SportSelectorProps) {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {sports.map(({ id, label, icon: Icon }, i) => {
        const active = selected.includes(id);
        return (
          <motion.button
            key={id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggle(id)}
            className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
              active
                ? "border-primary bg-primary/10 shadow-[0_0_16px_hsl(var(--primary)/0.2)]"
                : "border-border bg-card hover:border-muted-foreground/30"
            }`}
          >
            {active && (
              <motion.div
                layoutId="sport-check"
                className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
              >
                <span className="text-primary-foreground text-xs font-bold">✓</span>
              </motion.div>
            )}
            <Icon className={`w-7 h-7 ${active ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`text-xs font-semibold ${active ? "text-primary" : "text-muted-foreground"}`}>
              {label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
