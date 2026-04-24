import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock, Play, Users, User, Sparkles, X, Flame, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BADGES = [
  { name: "Primeiro Passo", icon: "👟", unlocked: true, description: "Complete sua primeira atividade" },
  { name: "Maratonista", icon: "🏅", unlocked: true, description: "Corra 42km no total" },
  { name: "Streak Master", icon: "🔥", unlocked: true, description: "7 dias seguidos de treino" },
  { name: "Velocista", icon: "⚡", unlocked: true, description: "Corra 1km em menos de 5min" },
  { name: "Explorador", icon: "🗺️", unlocked: true, description: "Treine em 5 locais diferentes" },
  { name: "Ciclista", icon: "🚴", unlocked: false, description: "Pedale 100km" },
  { name: "Noturno", icon: "🌙", unlocked: false, description: "Treine depois das 22h" },
  { name: "Social", icon: "👥", unlocked: false, description: "Adicione 10 amigos" },
  { name: "Lendário", icon: "🏆", unlocked: false, description: "Alcance o nível 50" },
];

type NodeStatus = "completed" | "current" | "locked";

interface JourneyNode {
  id: number;
  title: string;
  description: string;
  reward: string;
  status: NodeStatus;
}

interface FriendOnTrail {
  id: string;
  name: string;
  avatar?: string;
  fallback: string;
  nodeIndex: number;
}

const NODES: JourneyNode[] = [
  { id: 1, title: "Primeiro Passo", description: "Aquecimento de 5 minutos", reward: "+50 XP", status: "completed" },
  { id: 2, title: "Caminhada Leve", description: "1km em ritmo confortável", reward: "+80 XP", status: "completed" },
  { id: 3, title: "Trote Inicial", description: "Corrida de 2km", reward: "+120 XP", status: "completed" },
  { id: 4, title: "Resistência", description: "Treino HIIT de 15 minutos", reward: "+150 XP", status: "current" },
  { id: 5, title: "Força Total", description: "Treino completo de academia", reward: "+200 XP", status: "locked" },
  { id: 6, title: "Combate", description: "30 min de Muay Thai", reward: "+220 XP", status: "locked" },
  { id: 7, title: "Maratonista", description: "Corrida de 5km", reward: "+300 XP", status: "locked" },
  { id: 8, title: "Mestre", description: "Desafio supremo", reward: "+500 XP", status: "locked" },
];

const FRIENDS: FriendOnTrail[] = [
  { id: "f1", name: "Ana", fallback: "AN", nodeIndex: 1 },
  { id: "f2", name: "Bruno", fallback: "BR", nodeIndex: 2 },
  { id: "f3", name: "Carla", fallback: "CA", nodeIndex: 4 },
  { id: "f4", name: "Diego", fallback: "DI", nodeIndex: 5 },
];

// Layout constants — single source of truth so SVG path & nodes stay aligned
const VIEW_W = 400;
const NODE_COUNT = NODES.length;
const TOP_PADDING = 120;
const BOTTOM_PADDING = 120;
const ROW_GAP = 140;
const VIEW_H = TOP_PADDING + BOTTOM_PADDING + ROW_GAP * (NODE_COUNT - 1);
const CENTER_X = VIEW_W / 2;
const AMPLITUDE = 110;

function getNodePosition(index: number) {
  // Bottom (index 0) to top (last) — but SVG y grows downward, so invert
  const y = VIEW_H - TOP_PADDING - index * ROW_GAP;
  // Sine wave: alternating curves
  const x = CENTER_X + Math.sin(index * 0.9) * AMPLITUDE;
  return { x, y };
}

function buildPath() {
  const points = NODES.map((_, i) => getNodePosition(i));
  if (points.length === 0) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midY = (prev.y + curr.y) / 2;
    // Smooth cubic curve
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export default function Journey() {
  const [mode, setMode] = useState<"solo" | "friends">("solo");
  const [selected, setSelected] = useState<JourneyNode | null>(null);
  const [achievementsOpen, setAchievementsOpen] = useState(false);

  const path = useMemo(() => buildPath(), []);
  const positions = useMemo(() => NODES.map((_, i) => getNodePosition(i)), []);
  const unlockedCount = BADGES.filter((b) => b.unlocked).length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pb-24">
      {/* Ambient background — gradient fog + particles */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--primary)/0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,_hsl(220_80%_40%/0.12),_transparent_50%)]" />
        {/* Particles */}
        {Array.from({ length: 28 }).map((_, i) => {
          const left = (i * 37) % 100;
          const top = (i * 53) % 100;
          const delay = (i % 7) * 0.6;
          const duration = 6 + (i % 5);
          const size = 2 + (i % 3);
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-primary/40"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                filter: "blur(0.5px)",
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-heading font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Jornada
            </h1>
            <p className="text-xs text-muted-foreground font-body">
              Complete os desafios e suba de nível
            </p>
          </div>

          {/* Solo / Friends toggle */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-secondary border border-border">
            <button
              onClick={() => setMode("solo")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                mode === "solo"
                  ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Solo
            </button>
            <button
              onClick={() => setMode("friends")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                mode === "friends"
                  ? "bg-accent text-accent-foreground shadow-[0_0_12px_hsl(var(--accent)/0.5)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Amigos
            </button>
          </div>
        </div>
      </header>

      {/* Floating Trophy Button */}
      <motion.button
        onClick={() => setAchievementsOpen(true)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Minhas Conquistas"
        className="fixed top-20 right-4 z-30 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-gold to-streak shadow-[0_0_24px_hsl(var(--gold)/0.6)] border border-gold/40"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-gold/30"
          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <Trophy className="w-5 h-5 text-background relative z-10" strokeWidth={2.5} />
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-heading font-bold flex items-center justify-center border border-background z-10">
          {unlockedCount}
        </span>
      </motion.button>

      {/* Trail */}
      <main className="relative z-10 max-w-lg mx-auto px-4 pt-6">
        <div className="relative w-full" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="trailGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                <stop offset="50%" stopColor="hsl(220 80% 55%)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="trailDashed" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.15" />
              </linearGradient>
              <filter id="trailGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glow layer */}
            <path
              d={path}
              fill="none"
              stroke="url(#trailGradient)"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.25"
              filter="url(#trailGlow)"
            />
            {/* Dashed full trail (background) */}
            <path
              d={path}
              fill="none"
              stroke="url(#trailDashed)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="2 10"
            />
            {/* Solid trail up to current node */}
            <path
              d={path}
              fill="none"
              stroke="url(#trailGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - (NODES.findIndex((n) => n.status === "current") + 0.5) / NODES.length}
            />
          </svg>

          {/* Nodes (HTML overlay for interactivity) */}
          {NODES.map((node, i) => {
            const pos = positions[i];
            const xPct = (pos.x / VIEW_W) * 100;
            const yPct = (pos.y / VIEW_H) * 100;
            const friendsHere =
              mode === "friends" ? FRIENDS.filter((f) => f.nodeIndex === i) : [];

            return (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${xPct}%`, top: `${yPct}%` }}
              >
                <NodeBubble node={node} index={i} onClick={() => setSelected(node)} />

                {/* Friends on this node */}
                {friendsHere.length > 0 && (
                  <div className="absolute -right-2 -top-2 flex -space-x-2">
                    {friendsHere.map((f) => (
                      <Avatar
                        key={f.id}
                        className="w-7 h-7 border-2 border-background ring-2 ring-accent/60"
                      >
                        <AvatarImage src={f.avatar} alt={f.name} />
                        <AvatarFallback className="text-[10px] bg-accent text-accent-foreground font-semibold">
                          {f.fallback}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 mb-2 flex items-center justify-center gap-4 text-[11px] text-muted-foreground font-body">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
            Concluído
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            Atual
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-badge-locked" />
            Bloqueado
          </span>
        </div>
      </main>

      {/* Challenge dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-sm border-border bg-card/95 backdrop-blur-xl">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-heading font-semibold uppercase tracking-wider ${
                      selected.status === "completed"
                        ? "text-primary"
                        : selected.status === "current"
                        ? "text-accent"
                        : "text-muted-foreground"
                    }`}
                  >
                    Nível {selected.id}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-heading font-semibold text-gold">
                    <Trophy className="w-3.5 h-3.5" />
                    {selected.reward}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-heading">{selected.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selected.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-secondary/50 p-3">
                <Flame className="w-4 h-4 text-streak shrink-0" />
                <p className="text-xs text-muted-foreground font-body">
                  {selected.status === "completed"
                    ? "Você já conquistou este desafio. Refazer mantém sua streak ativa!"
                    : selected.status === "current"
                    ? "Este é o seu próximo desafio. Vamos lá!"
                    : "Complete os níveis anteriores para desbloquear."}
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelected(null)}
                  className="flex-1"
                >
                  Fechar
                </Button>
                <Button
                  disabled={selected.status === "locked"}
                  className="flex-1 gap-2"
                >
                  {selected.status === "locked" ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Bloqueado
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      Iniciar Atividade
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NodeBubble({
  node,
  index,
  onClick,
}: {
  node: JourneyNode;
  index: number;
  onClick: () => void;
}) {
  const isCompleted = node.status === "completed";
  const isCurrent = node.status === "current";
  const isLocked = node.status === "locked";

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 220, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
      aria-label={node.title}
    >
      {/* Pulse ring for current */}
      {isCurrent && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          />
        </>
      )}

      <div
        className={`relative w-16 h-16 rounded-full flex items-center justify-center border-[3px] transition-shadow ${
          isCompleted
            ? "bg-primary border-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.7)]"
            : isCurrent
            ? "bg-gradient-to-br from-accent to-primary border-accent shadow-[0_0_28px_hsl(var(--accent)/0.8)]"
            : "bg-card/60 border-border backdrop-blur-sm"
        }`}
      >
        {isCompleted && <Check className="w-7 h-7 text-primary-foreground" strokeWidth={3} />}
        {isCurrent && (
          <div className="flex flex-col items-center justify-center">
            <User className="w-6 h-6 text-accent-foreground" strokeWidth={2.5} />
          </div>
        )}
        {isLocked && <Lock className="w-5 h-5 text-muted-foreground" />}

        {/* Level number badge */}
        <span
          className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-heading font-bold border ${
            isLocked
              ? "bg-secondary border-border text-muted-foreground"
              : isCurrent
              ? "bg-accent border-accent text-accent-foreground"
              : "bg-primary border-primary text-primary-foreground"
          }`}
        >
          {node.id}
        </span>
      </div>

      {/* Hover label */}
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap rounded-md bg-card border border-border px-2 py-1 text-[10px] font-body text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        {node.title}
      </span>
    </motion.button>
  );
}
