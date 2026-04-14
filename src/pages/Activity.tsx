import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Square, Timer, MapPin, Gauge, Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type ActivityType = "run" | "walk" | "bike";
type Phase = "select" | "active" | "done";

const types: { id: ActivityType; label: string; emoji: string }[] = [
  { id: "run", label: "Corrida", emoji: "🏃" },
  { id: "walk", label: "Caminhada", emoji: "🚶" },
  { id: "bike", label: "Bike", emoji: "🚴" },
];

export default function Activity() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("select");
  const [selected, setSelected] = useState<ActivityType>("run");
  const [paused, setPaused] = useState(false);

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
      <button onClick={() => navigate("/")} className="flex items-center gap-1 text-muted-foreground mb-4 text-sm">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <AnimatePresence mode="wait">
        {phase === "select" && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-xl font-heading font-bold mb-6">Escolha sua atividade</h1>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {types.map((t) => (
                <motion.button
                  key={t.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelected(t.id)}
                  className={`flex flex-col items-center gap-2 p-5 rounded-xl border transition-all ${
                    selected === t.id
                      ? "border-primary bg-primary/10 card-glow"
                      : "border-border bg-card"
                  }`}
                >
                  <span className="text-3xl">{t.emoji}</span>
                  <span className="text-sm font-heading font-semibold">{t.label}</span>
                </motion.button>
              ))}
            </div>
            <Button
              onClick={() => setPhase("active")}
              className="w-full h-14 gradient-primary text-primary-foreground font-heading font-bold rounded-xl border-0"
            >
              <Play className="w-5 h-5 mr-2" /> Iniciar
            </Button>
          </motion.div>
        )}

        {phase === "active" && (
          <motion.div key="active" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-xl font-heading font-bold mb-6 text-center">
              {types.find((t) => t.id === selected)?.emoji}{" "}
              {types.find((t) => t.id === selected)?.label}
            </h1>
            <div className="flex flex-col items-center gap-6">
              <motion.div
                animate={{ scale: paused ? 1 : [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-40 h-40 rounded-full gradient-primary flex items-center justify-center"
              >
                <span className="text-4xl font-heading font-bold text-primary-foreground">12:34</span>
              </motion.div>
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="text-center">
                  <Timer className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-lg font-heading font-bold">12:34</p>
                  <p className="text-[10px] text-muted-foreground">Tempo</p>
                </div>
                <div className="text-center">
                  <MapPin className="w-5 h-5 text-streak mx-auto mb-1" />
                  <p className="text-lg font-heading font-bold">2.4km</p>
                  <p className="text-[10px] text-muted-foreground">Distância</p>
                </div>
                <div className="text-center">
                  <Gauge className="w-5 h-5 text-accent mx-auto mb-1" />
                  <p className="text-lg font-heading font-bold">5'12"</p>
                  <p className="text-[10px] text-muted-foreground">Ritmo</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => setPaused(!paused)}
                  variant="outline"
                  className="w-14 h-14 rounded-full p-0"
                >
                  {paused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </Button>
                <Button
                  onClick={() => setPhase("done")}
                  className="w-14 h-14 rounded-full p-0 bg-destructive hover:bg-destructive/90"
                >
                  <Square className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <motion.div animate={{ scale: [0.8, 1.1, 1] }} transition={{ duration: 0.5 }}>
              <Trophy className="w-16 h-16 text-gold mx-auto mb-4" />
            </motion.div>
            <h1 className="text-2xl font-heading font-bold mb-2">Atividade Concluída! 🎉</h1>
            <p className="text-muted-foreground mb-6">Você foi incrível!</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-lg font-heading font-bold text-primary">+120 XP</p>
                <p className="text-[10px] text-muted-foreground">Experiência</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-lg font-heading font-bold">2.4km</p>
                <p className="text-[10px] text-muted-foreground">Distância</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-lg font-heading font-bold">12:34</p>
                <p className="text-[10px] text-muted-foreground">Tempo</p>
              </div>
            </div>
            <div className="flex gap-2 justify-center mb-4">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-heading font-semibold">🏅 Corredor Matinal</span>
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-heading font-semibold">⚡ Rápido</span>
            </div>
            <Button onClick={() => setPhase("select")} className="gradient-primary text-primary-foreground font-heading font-bold rounded-xl border-0">
              Nova Atividade
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
