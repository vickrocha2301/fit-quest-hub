import { motion } from "framer-motion";
import { BadgeCard } from "@/components/BadgeCard";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const badges = [
  { name: "Primeiro Passo", icon: "👟", unlocked: true, description: "Complete sua primeira atividade" },
  { name: "Maratonista", icon: "🏅", unlocked: true, description: "Corra 42km no total" },
  { name: "Streak Master", icon: "🔥", unlocked: true, description: "7 dias seguidos de treino" },
  { name: "Ciclista", icon: "🚴", unlocked: false, description: "Pedale 100km" },
  { name: "Noturno", icon: "🌙", unlocked: false, description: "Treine depois das 22h" },
  { name: "Velocista", icon: "⚡", unlocked: true, description: "Corra 1km em menos de 5min" },
  { name: "Social", icon: "👥", unlocked: false, description: "Adicione 10 amigos" },
  { name: "Lendário", icon: "🏆", unlocked: false, description: "Alcance o nível 50" },
  { name: "Explorador", icon: "🗺️", unlocked: true, description: "Treine em 5 locais diferentes" },
];

export default function Achievements() {
  const [selected, setSelected] = useState<typeof badges[0] | null>(null);

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
      <h1 className="text-xl font-heading font-bold mb-2">Conquistas</h1>
      <p className="text-sm text-muted-foreground mb-5">
        {badges.filter((b) => b.unlocked).length}/{badges.length} desbloqueadas
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-3 gap-3"
      >
        {badges.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <BadgeCard {...b} onClick={() => setSelected(b)} />
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-card border-border max-w-xs">
          <DialogHeader>
            <div className="text-5xl text-center mb-2">{selected?.icon}</div>
            <DialogTitle className="text-center font-heading">{selected?.name}</DialogTitle>
            <DialogDescription className="text-center">{selected?.description}</DialogDescription>
          </DialogHeader>
          <p className="text-center text-sm">
            {selected?.unlocked ? (
              <span className="text-primary font-semibold">✅ Desbloqueada!</span>
            ) : (
              <span className="text-muted-foreground">🔒 Continue treinando para desbloquear</span>
            )}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
