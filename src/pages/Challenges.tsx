import { motion } from "framer-motion";
import { Target, CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const active = [
  { title: "Corra 50km em Janeiro", progress: 68, reward: "500 XP + Badge 🏅" },
  { title: "7 dias de streak", progress: 85, reward: "300 XP" },
];

const completed = [
  { title: "Primeira semana ativa", reward: "200 XP" },
  { title: "Caminhe 10km", reward: "150 XP + Badge 👟" },
];

const available = [
  { title: "Pedale 100km em Fevereiro", reward: "800 XP + Badge 🚴" },
  { title: "Treine 30 dias seguidos", reward: "1000 XP + Badge 🔥" },
];

export default function Challenges() {
  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-xl font-heading font-bold">Desafios</h1>

      {/* Active */}
      <section>
        <h2 className="text-sm font-heading font-semibold text-muted-foreground mb-3">Ativos</h2>
        <div className="space-y-3">
          {active.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-4 border border-border"
            >
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{c.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{c.reward}</p>
                  <div className="h-2 rounded-full bg-secondary mt-2 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full gradient-xp"
                      initial={{ width: 0 }}
                      animate={{ width: `${c.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                  <p className="text-[10px] text-primary mt-1 font-semibold">{c.progress}%</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Available */}
      <section>
        <h2 className="text-sm font-heading font-semibold text-muted-foreground mb-3">Novos Desafios</h2>
        <div className="space-y-2">
          {available.map((c, i) => (
            <div key={i} className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{c.title}</p>
                <p className="text-[10px] text-muted-foreground">{c.reward}</p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0 border-primary text-primary hover:bg-primary/10">
                <Plus className="w-4 h-4 mr-1" /> Entrar
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Completed */}
      <section>
        <h2 className="text-sm font-heading font-semibold text-muted-foreground mb-3">Concluídos</h2>
        <div className="space-y-2">
          {completed.map((c, i) => (
            <div key={i} className="bg-card/50 rounded-xl p-3 border border-border flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="font-medium text-sm">{c.title}</p>
                <p className="text-[10px] text-muted-foreground">{c.reward}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
