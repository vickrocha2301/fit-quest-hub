import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, Droplet, Brain, BookOpen, Plus, Sparkles } from "lucide-react";
import {
  RegisterActivityModal,
  type RegisterCategory,
} from "@/components/RegisterActivityModal";

const weekDays = [
  { short: "Dom", full: "Domingo" },
  { short: "Seg", full: "Segunda" },
  { short: "Ter", full: "Terça" },
  { short: "Qua", full: "Quarta" },
  { short: "Qui", full: "Quinta" },
  { short: "Sex", full: "Sexta" },
  { short: "Sáb", full: "Sábado" },
];

type Habit = {
  id: string;
  name: string;
  goal: string;
  icon: typeof Droplet;
  done: boolean;
};

const initialHabits: Habit[] = [
  { id: "water", name: "Água", goal: "2L por dia", icon: Droplet, done: false },
  { id: "meditation", name: "Meditação", goal: "10 minutos", icon: Brain, done: true },
  { id: "reading", name: "Leitura", goal: "20 páginas", icon: BookOpen, done: false },
];

export default function Habits() {
  const todayIndex = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [initialCategory, setInitialCategory] = useState<
    RegisterCategory | undefined
  >(undefined);

  const openRegister = (category?: RegisterCategory) => {
    setInitialCategory(category);
    setRegisterOpen(true);
  };

  const toggleHabit = (id: string) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h)));
  };

  const completed = habits.filter((h) => h.done).length;

  return (
    <div className="min-h-screen pb-32 px-4 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-heading font-bold">Minha Rotina</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {completed}/{habits.length} hábitos concluídos hoje
        </p>
      </div>

      {/* Day selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
        {weekDays.map((day, i) => {
          const isSelected = i === selectedDay;
          const isToday = i === todayIndex;
          return (
            <button
              key={day.short}
              onClick={() => setSelectedDay(i)}
              className={`flex flex-col items-center justify-center min-w-[52px] h-16 rounded-xl border transition-all shrink-0 ${
                isSelected
                  ? "gradient-primary text-primary-foreground border-primary shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
                  : "bg-card border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              <span className={`text-[10px] font-heading font-semibold uppercase ${isSelected ? "opacity-90" : ""}`}>
                {day.short}
              </span>
              <span className="text-lg font-heading font-bold leading-tight">{i + 1}</span>
              {isToday && !isSelected && (
                <span className="w-1 h-1 rounded-full bg-primary mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Habits list */}
      {habits.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-8 text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-3 rounded-full gradient-primary flex items-center justify-center shadow-[0_0_24px_hsl(var(--primary)/0.4)]">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-base font-heading font-bold mb-1">Sentimos sua falta!</h3>
          <p className="text-sm text-muted-foreground">
            Que tal registrar sua primeira atividade de hoje?
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3 mb-8">
          <AnimatePresence>
            {habits.map((habit, i) => {
              const Icon = habit.icon;
              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    habit.done
                      ? "bg-primary/5 border-primary/30"
                      : "bg-card border-border"
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    habit.done
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary text-muted-foreground"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-heading font-semibold ${habit.done ? "text-foreground" : ""}`}>
                      {habit.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{habit.goal}</p>
                  </div>
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    aria-label={`Marcar ${habit.name} como ${habit.done ? "não concluído" : "concluído"}`}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all shrink-0 border ${
                      habit.done
                        ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_hsl(var(--primary)/0.7)]"
                        : "bg-secondary/40 border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                    }`}
                  >
                    <Check className={`w-5 h-5 transition-transform ${habit.done ? "scale-100" : "scale-90"}`} strokeWidth={3} />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Main CTA */}
      <div className="flex flex-col items-center gap-3 mt-10">
        <motion.button
          onClick={() => navigate("/activity")}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="relative w-32 h-32 rounded-full gradient-primary flex items-center justify-center shadow-[0_0_40px_hsl(var(--accent)/0.5)] group"
          style={{
            background: "linear-gradient(135deg, hsl(var(--accent)), hsl(280 70% 40%))",
          }}
        >
          <span className="absolute inset-0 rounded-full bg-accent/30 blur-xl group-hover:bg-accent/50 transition-all -z-10" />
          <span className="absolute inset-1 rounded-full border border-white/20" />
          <Plus className="w-12 h-12 text-white" strokeWidth={2.5} />
        </motion.button>
        <p className="text-sm font-heading font-semibold text-center">Iniciar Nova Atividade</p>
        <p className="text-xs text-muted-foreground text-center -mt-2">Registre seu treino agora</p>
      </div>
    </div>
  );
}
