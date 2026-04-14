import { motion } from "framer-motion";
import { Flame, Footprints, Bike, Zap, ChevronRight } from "lucide-react";
import { XPBar } from "@/components/XPBar";
import { StatCard } from "@/components/StatCard";
import { MissionCard } from "@/components/MissionCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const missions = [
  { title: "Corra 2km hoje", xp: 50, completed: false, progress: 40 },
  { title: "Complete 3 treinos essa semana", xp: 100, completed: false, progress: 66 },
  { title: "Faça 10min de caminhada", xp: 30, completed: true, progress: 100 },
];

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

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto"
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

      {/* Start Activity CTA */}
      <motion.div variants={item}>
        <Button
          onClick={() => navigate("/activity")}
          className="w-full h-14 text-base font-heading font-bold gradient-primary text-primary-foreground rounded-xl animate-pulse-glow border-0"
        >
          <Zap className="w-5 h-5 mr-2" />
          Iniciar Atividade
        </Button>
      </motion.div>
    </motion.div>
  );
}
