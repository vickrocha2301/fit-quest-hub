import { useState } from "react";
import { motion } from "framer-motion";
import { XPBar } from "@/components/XPBar";
import { SportSelector } from "@/components/SportSelector";
import { GoalSelector } from "@/components/GoalSelector";
import { AchievementsModal } from "@/components/AchievementsModal";
import { BADGES } from "@/data/badges";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import {
  Settings,
  Award,
  MapPin,
  Timer,
  Flame,
  Dumbbell,
  Target,
  Pencil,
  ChevronRight,
  Lock,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const stats = [
  { icon: Flame, label: "Treinos", value: "142" },
  { icon: MapPin, label: "Distância", value: "385km" },
  { icon: Timer, label: "Tempo total", value: "48h" },
  { icon: Award, label: "Badges", value: "12" },
];

const sportLabels: Record<string, string> = {
  academia: "Academia",
  corrida: "Corrida",
  maratona: "Maratona",
  "muay-thai": "Muay Thai",
  "jiu-jitsu": "Jiu-Jitsu",
  "outras-lutas": "Outras Lutas",
};

export default function Profile() {
  const { sports, goals, customGoal, setSports, setGoals, setCustomGoal } =
    useUserPreferences();

  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [editSportsOpen, setEditSportsOpen] = useState(false);

  const unlockedCount = BADGES.filter((b) => b.unlocked).length;

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-heading font-bold">Perfil</h1>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Avatar + Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-6"
      >
        {/* Neon gradient ring around avatar */}
        <div className="relative mb-3">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-streak blur-md opacity-70" />
          <div className="relative p-[3px] rounded-full bg-gradient-to-br from-primary via-accent to-streak">
            <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center">
              <div className="w-[72px] h-[72px] rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-2xl">
                A
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-heading font-bold">Atleta</h2>
        <p className="text-sm text-muted-foreground">Corredor • Desde Jan 2024</p>

        <div className="w-full max-w-xs mt-4">
          <XPBar current={720} max={1000} level={12} />
        </div>
      </motion.div>

      {/* Badges — carrossel horizontal */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-gold drop-shadow-[0_0_6px_hsl(var(--gold)/0.6)]" />
            <h3 className="text-sm font-heading font-semibold">
              Conquistas
              <span className="ml-2 text-[11px] font-body font-normal text-muted-foreground">
                {unlockedCount}/{BADGES.length}
              </span>
            </h3>
          </div>
          <button
            onClick={() => setAchievementsOpen(true)}
            className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Ver tudo
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
          {BADGES.map((b) => (
            <button
              key={b.name}
              onClick={() => setAchievementsOpen(true)}
              className={`relative shrink-0 snap-start w-20 h-24 rounded-xl flex flex-col items-center justify-center gap-1 p-2 border transition-all ${
                b.unlocked
                  ? "bg-gradient-to-br from-primary/20 to-accent/20 border-primary/40 shadow-[0_0_14px_hsl(var(--primary)/0.25)]"
                  : "bg-secondary/30 border-border"
              }`}
            >
              <span
                className={`text-2xl ${b.unlocked ? "" : "grayscale opacity-40"}`}
              >
                {b.icon}
              </span>
              <span
                className={`text-[9px] font-heading font-semibold leading-tight text-center ${
                  b.unlocked ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {b.name}
              </span>
              {!b.unlocked && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-background/80 flex items-center justify-center border border-border">
                  <Lock className="w-2 h-2 text-muted-foreground" />
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {stats.map(({ icon: Icon, label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card rounded-xl p-4 border border-border text-center"
          >
            <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-lg font-heading font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Minhas Modalidades — favoritas */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-xl p-4 border border-border mb-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-heading font-semibold">Minhas Modalidades</h3>
          </div>
          <button
            onClick={() => setEditSportsOpen(true)}
            className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <Pencil className="w-3 h-3" />
            Editar
          </button>
        </div>

        {sports.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {sports.map((s) => (
              <span
                key={s}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/15 text-primary border border-primary/30 shadow-[0_0_10px_hsl(var(--primary)/0.2)]"
              >
                {sportLabels[s] ?? s}
              </span>
            ))}
          </div>
        ) : (
          <button
            onClick={() => setEditSportsOpen(true)}
            className="w-full text-left text-xs text-muted-foreground py-2"
          >
            Nenhuma modalidade selecionada. Toque em "Editar" para escolher seu foco.
          </button>
        )}

        <p className="text-[10px] text-muted-foreground mt-3 leading-snug">
          As modalidades escolhidas guiam os hábitos sugeridos na sua rotina.
        </p>
      </motion.div>

      {/* Meu Objetivo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl p-4 border border-border mb-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-heading font-semibold">Meu Objetivo</h3>
        </div>
        <GoalSelector
          selectedGoals={goals}
          customGoal={customGoal}
          onGoalsChange={setGoals}
          onCustomGoalChange={setCustomGoal}
        />
      </motion.div>

      {/* Records */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-card rounded-xl p-4 border border-border"
      >
        <h3 className="text-sm font-heading font-semibold mb-3">Recordes Pessoais</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Maior distância</span>
            <span className="font-semibold">12.4km</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Melhor ritmo</span>
            <span className="font-semibold">4'32"/km</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Maior streak</span>
            <span className="font-semibold text-streak">14 dias 🔥</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Maior treino</span>
            <span className="font-semibold">1h 23min</span>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-3 leading-snug">
          Atualizado automaticamente conforme você registra novas atividades.
        </p>
      </motion.div>

      {/* Achievements modal — shared with Journey */}
      <AchievementsModal
        open={achievementsOpen}
        onOpenChange={setAchievementsOpen}
      />

      {/* Edit modalities modal */}
      <Dialog open={editSportsOpen} onOpenChange={setEditSportsOpen}>
        <DialogContent className="max-w-md border-border bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-primary" />
              Editar Modalidades
            </DialogTitle>
            <DialogDescription>
              Escolha as atividades que você quer focar. Elas vão aparecer nos seus hábitos.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2">
            <SportSelector selected={sports} onChange={setSports} />
          </div>

          <Button
            onClick={() => setEditSportsOpen(false)}
            className="mt-2 w-full"
          >
            Concluir
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
