import { motion } from "framer-motion";
import { XPBar } from "@/components/XPBar";
import { Settings, Award, MapPin, Timer, Flame } from "lucide-react";

const stats = [
  { icon: Flame, label: "Treinos", value: "142" },
  { icon: MapPin, label: "Distância", value: "385km" },
  { icon: Timer, label: "Tempo total", value: "48h" },
  { icon: Award, label: "Badges", value: "12" },
];

export default function Profile() {
  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
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
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-2xl mb-3">
          A
        </div>
        <h2 className="text-lg font-heading font-bold">Atleta</h2>
        <p className="text-sm text-muted-foreground">Corredor • Desde Jan 2024</p>
        <div className="w-full max-w-xs mt-3">
          <XPBar current={720} max={1000} level={12} />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map(({ icon: Icon, label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl p-4 border border-border text-center"
          >
            <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-lg font-heading font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Records */}
      <div className="bg-card rounded-xl p-4 border border-border">
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
      </div>
    </div>
  );
}
