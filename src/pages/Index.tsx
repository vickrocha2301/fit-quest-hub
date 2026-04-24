import { useState } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Footprints,
  Bike,
  Zap,
  ChevronRight,
  Brain,
  Moon,
  Smile,
  Sparkles,
  MapPin,
} from "lucide-react";
import { XPBar } from "@/components/XPBar";
import { StatCard } from "@/components/StatCard";
import { MissionCard } from "@/components/MissionCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  RegisterActivityModal,
  type RegisterCategory,
} from "@/components/RegisterActivityModal";

const missions = [
  { title: "Corra 2km hoje", xp: 50, completed: false, progress: 40 },
  { title: "Complete 3 treinos essa semana", xp: 100, completed: false, progress: 66 },
  { title: "Faça 10min de caminhada", xp: 30, completed: true, progress: 100 },
];

// Resumo estático da Jornada — quando o backend estiver plugado vem do banco
const journeySummary = {
  level: 4,
  totalLevels: 8,
  currentTitle: "Resistência",
  nextTitle: "Força Total",
  xpCurrent: 720,
  xpNeeded: 1000,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const navigate = useNavigate();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [initialCategory, setInitialCategory] = useState<
    RegisterCategory | undefined
  >(undefined);

  const openRegister = (category?: RegisterCategory) => {
    setInitialCategory(category);
    setRegisterOpen(true);
  };

  const journeyPct = Math.round(
    (journeySummary.xpCurrent / journeySummary.xpNeeded) * 100,
  );
  const xpRemaining = journeySummary.xpNeeded - journeySummary.xpCurrent;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-lg">
          A
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-heading font-bold">Olá, Atleta! 💪</h1>
          <XPBar current={720} max={1000} level={12} />
        </div>
      </motion.div>

      {/* Insight do Dia — IA */}
      <motion.div
        variants={item}
        className="relative mb-5 rounded-xl p-[1px] bg-gradient-to-r from-primary via-accent to-streak"
      >
        <div className="rounded-[11px] bg-card/95 backdrop-blur p-4">
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_18px_hsl(var(--primary)/0.5)]">
                <Brain className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <motion.span
                aria-hidden
                className="absolute -top-1 -right-1"
                animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.15, 0.95, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-3.5 h-3.5 text-gold drop-shadow-[0_0_4px_hsl(var(--gold)/0.8)]" />
              </motion.span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary mb-0.5">
                Insight do Dia
              </p>
              <p className="text-sm font-body leading-snug text-foreground">
                Você dormiu <span className="font-semibold text-accent">2h a menos</span>{" "}
                que o habitual. Que tal uma meditação de 5 minutos agora para reequilibrar?
              </p>
              <button
                onClick={() => openRegister("health")}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80"
              >
                Como você está? <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Streak */}
      <motion.div
        variants={item}
        className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border mb-5"
      >
        <div className="w-10 h-10 rounded-full gradient-streak flex items-center justify-center animate-pulse-glow">
          <Flame className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <p className="font-heading font-bold text-streak">7 dias seguidos 🔥</p>
          <p className="text-xs text-muted-foreground">Continue assim para manter seu streak!</p>
        </div>
      </motion.div>

      {/* Resumo da Jornada */}
      <motion.button
        variants={item}
        onClick={() => navigate("/journey")}
        className="w-full text-left mb-5 rounded-xl p-4 bg-card border border-border hover:border-primary/40 transition-colors group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground">
              Sua Jornada
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-xs text-muted-foreground">
              Nível {journeySummary.level}/{journeySummary.totalLevels}
            </p>
            <p className="text-base font-heading font-bold">
              {journeySummary.currentTitle}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground">Próximo</p>
            <p className="text-xs font-heading font-semibold text-accent">
              {journeySummary.nextTitle}
            </p>
          </div>
        </div>
        <div className="relative h-1.5 rounded-full bg-secondary overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${journeyPct}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary via-accent to-streak shadow-[0_0_10px_hsl(var(--primary)/0.6)]"
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5">
          Faltam <span className="font-semibold text-foreground">{xpRemaining} XP</span> para o próximo ponto
        </p>
      </motion.button>

      {/* Weekly Stats */}
      <motion.div variants={item} className="mb-5">
        <h2 className="text-sm font-heading font-semibold text-muted-foreground mb-3">Resumo Semanal</h2>
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={Zap} label="Treinos" value="5" />
          <StatCard icon={Footprints} label="Distância" value="18km" color="text-streak" />
          <StatCard icon={Bike} label="Calorias" value="1.2k" color="text-accent" />
        </div>
      </motion.div>

      {/* Missions */}
      <motion.div variants={item} className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-heading font-semibold text-muted-foreground">Missões do Dia</h2>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          {missions.map((m, i) => (
            <MissionCard key={i} {...m} />
          ))}
        </div>
      </motion.div>

      {/* Atalhos rápidos + CTA principal */}
      <motion.div variants={item} className="space-y-2">
        <Button
          onClick={() => openRegister()}
          className="w-full h-14 text-base font-heading font-bold gradient-primary text-primary-foreground rounded-xl animate-pulse-glow border-0"
        >
          <Zap className="w-5 h-5 mr-2" />
          Iniciar Atividade
        </Button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => openRegister("sleep")}
            className="flex items-center justify-center gap-2 h-12 rounded-xl border border-border bg-card hover:border-accent/50 hover:bg-accent/5 transition-all group"
          >
            <Moon className="w-4 h-4 text-accent group-hover:drop-shadow-[0_0_6px_hsl(var(--accent)/0.7)]" />
            <span className="text-sm font-heading font-semibold">Registrar Sono</span>
          </button>
          <button
            onClick={() => openRegister("health")}
            className="flex items-center justify-center gap-2 h-12 rounded-xl border border-border bg-card hover:border-gold/50 hover:bg-gold/5 transition-all group"
          >
            <Smile className="w-4 h-4 text-gold group-hover:drop-shadow-[0_0_6px_hsl(var(--gold)/0.7)]" />
            <span className="text-sm font-heading font-semibold">Registrar Humor</span>
          </button>
        </div>
      </motion.div>

      <RegisterActivityModal
        open={registerOpen}
        onOpenChange={setRegisterOpen}
        initialCategory={initialCategory}
      />
    </motion.div>
  );
}
