import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Flame, Dumbbell, Heart, Trophy, Pencil } from "lucide-react";

const presetGoals = [
  { id: "emagrecer", label: "Emagrecer", icon: Flame },
  { id: "massa", label: "Ganhar massa", icon: Dumbbell },
  { id: "condicionamento", label: "Condicionamento", icon: Heart },
  { id: "competir", label: "Competir", icon: Trophy },
  { id: "saude", label: "Manter saúde", icon: Target },
];

interface GoalSelectorProps {
  selectedGoals: string[];
  customGoal: string;
  onGoalsChange: (goals: string[]) => void;
  onCustomGoalChange: (goal: string) => void;
}

export function GoalSelector({
  selectedGoals,
  customGoal,
  onGoalsChange,
  onCustomGoalChange,
}: GoalSelectorProps) {
  const [showCustom, setShowCustom] = useState(!!customGoal);

  const toggleGoal = (id: string) => {
    onGoalsChange(
      selectedGoals.includes(id)
        ? selectedGoals.filter((g) => g !== id)
        : [...selectedGoals, id]
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {presetGoals.map(({ id, label, icon: Icon }, i) => {
          const active = selectedGoals.includes(id);
          return (
            <motion.button
              key={id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleGoal(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200 text-sm font-semibold ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </motion.button>
          );
        })}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCustom(!showCustom)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200 text-sm font-semibold ${
            showCustom
              ? "border-accent bg-accent/10 text-accent-foreground"
              : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30"
          }`}
        >
          <Pencil className="w-4 h-4" />
          Personalizar
        </motion.button>
      </div>

      {showCustom && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden"
        >
          <textarea
            value={customGoal}
            onChange={(e) => onCustomGoalChange(e.target.value)}
            placeholder="Descreva seu objetivo..."
            maxLength={200}
            className="w-full min-h-[80px] rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {customGoal.length}/200
          </p>
        </motion.div>
      )}
    </div>
  );
}
