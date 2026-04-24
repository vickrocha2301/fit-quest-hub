import { motion } from "framer-motion";
import { Crown, Medal, ChevronRight, Users, MessageCircle, Bike, Moon, Volleyball, Footprints } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const fullRanking = [
  { name: "Lucas", xp: 12400, avatar: "L" },
  { name: "Marina", xp: 11800, avatar: "M" },
  { name: "João", xp: 10200, avatar: "J" },
  { name: "Você", xp: 9500, avatar: "V", isUser: true },
  { name: "Ana", xp: 8700, avatar: "A" },
  { name: "Pedro", xp: 7900, avatar: "P" },
  { name: "Carla", xp: 7200, avatar: "C" },
  { name: "Rafael", xp: 6800, avatar: "R" },
  { name: "Bianca", xp: 6100, avatar: "B" },
  { name: "Diego", xp: 5400, avatar: "D" },
];

const communities = [
  { name: "Grupo de Corrida Manaus", members: 248, icon: Footprints, gradient: "from-primary to-primary/40" },
  { name: "Ciclismo Manaus", members: 156, icon: Bike, gradient: "from-accent to-accent/40" },
  { name: "Foco no Sono", members: 89, icon: Moon, gradient: "from-primary to-accent" },
  { name: "Vôlei", members: 124, icon: Volleyball, gradient: "from-accent to-primary" },
];

const messages = [
  { name: "Marina", avatar: "M", last: "Bora correr amanhã cedo? 🏃‍♀️", time: "agora", unread: 2 },
  { name: "Grupo de Corrida", avatar: "GC", last: "Lucas: Treino confirmado às 6h", time: "12min", unread: 5, isGroup: true },
  { name: "Lucas", avatar: "L", last: "Mandei meu tempo da última corrida", time: "1h", unread: 0 },
  { name: "Ciclismo Manaus", avatar: "CM", last: "Ana: Alguém topa pedalar no domingo?", time: "3h", unread: 0, isGroup: true },
  { name: "João", avatar: "J", last: "Valeu pelo treino hoje!", time: "ontem", unread: 0 },
];

export default function Social() {
  const [openRanking, setOpenRanking] = useState(false);
  const top3 = fullRanking.slice(0, 3);
  // Podium visual order: 2nd, 1st, 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]];
  const heights = ["h-20", "h-28", "h-16"];
  const medalColors = ["text-muted-foreground", "text-gold", "text-streak"];

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-heading font-bold mb-5">Social</h1>

      {/* Podium Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-5 mb-6 overflow-hidden card-glow"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.15),transparent_60%)] pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-heading font-semibold text-foreground/90">Top da Semana</h2>
            <Crown className="w-4 h-4 text-gold" />
          </div>

          <div className="flex items-end justify-center gap-3 mb-4">
            {podiumOrder.map((user, idx) => {
              const realRank = idx === 0 ? 2 : idx === 1 ? 1 : 3;
              return (
                <motion.div
                  key={user.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="flex flex-col items-center flex-1 max-w-[100px]"
                >
                  <div className="relative mb-2">
                    {realRank === 1 && (
                      <Crown className="w-5 h-5 text-gold absolute -top-5 left-1/2 -translate-x-1/2 drop-shadow-[0_0_8px_hsl(var(--gold)/0.6)]" />
                    )}
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-base font-heading font-bold ${
                      realRank === 1
                        ? "gradient-primary text-primary-foreground ring-2 ring-gold shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
                        : "bg-secondary text-foreground ring-1 ring-border"
                    }`}>
                      {user.avatar}
                    </div>
                  </div>
                  <p className="text-xs font-semibold truncate w-full text-center">{user.name}</p>
                  <p className="text-[10px] text-primary font-heading font-bold">{user.xp.toLocaleString()}</p>
                  <div className={`w-full mt-2 ${heights[idx]} rounded-t-lg ${
                    realRank === 1
                      ? "bg-gradient-to-t from-primary/30 to-primary/10 border border-primary/40"
                      : "bg-gradient-to-t from-secondary to-secondary/40 border border-border"
                  } flex items-start justify-center pt-1`}>
                    <Medal className={`w-4 h-4 ${medalColors[realRank - 1]}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Dialog open={openRanking} onOpenChange={setOpenRanking}>
            <DialogTrigger asChild>
              <button className="w-full flex items-center justify-center gap-1 mt-2 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 text-xs font-heading font-semibold text-primary transition-all">
                Ver ranking completo
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-card border-primary/20">
              <DialogHeader>
                <DialogTitle className="font-heading flex items-center gap-2">
                  <Crown className="w-5 h-5 text-gold" /> Ranking Completo
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                {fullRanking.map((user, i) => (
                  <div
                    key={user.name}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      user.isUser ? "bg-primary/10 border-primary/30 card-glow" : "bg-secondary/40 border-border"
                    }`}
                  >
                    <span className="text-xs font-heading font-bold w-6 text-center text-muted-foreground">
                      {i + 1}
                    </span>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-heading font-bold ${
                      user.isUser ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground"
                    }`}>
                      {user.avatar}
                    </div>
                    <p className="flex-1 text-sm font-medium">{user.name}</p>
                    <span className="text-xs font-heading font-bold text-primary">{user.xp.toLocaleString()} XP</span>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="communities" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/60 border border-border h-11">
          <TabsTrigger
            value="communities"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_15px_hsl(var(--primary)/0.4)] font-heading text-xs"
          >
            <Users className="w-4 h-4 mr-1.5" /> Comunidades
          </TabsTrigger>
          <TabsTrigger
            value="messages"
            className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-[0_0_15px_hsl(var(--accent)/0.4)] font-heading text-xs"
          >
            <MessageCircle className="w-4 h-4 mr-1.5" /> Mensagens
          </TabsTrigger>
        </TabsList>

        <TabsContent value="communities" className="space-y-3 mt-4">
          {communities.map((c, i) => (
            <motion.button
              key={c.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:card-glow transition-all text-left group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shadow-lg`}>
                <c.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-heading font-semibold truncate">{c.name}</p>
                <p className="text-[11px] text-muted-foreground">{c.members} membros</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>
          ))}
        </TabsContent>

        <TabsContent value="messages" className="space-y-2 mt-4">
          {messages.map((m, i) => (
            <motion.button
              key={m.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-accent/40 transition-all text-left"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-heading font-bold shrink-0 ${
                m.isGroup
                  ? "bg-gradient-to-br from-accent to-primary text-primary-foreground"
                  : "bg-gradient-to-br from-primary to-primary/50 text-primary-foreground"
              } shadow-[0_0_12px_hsl(var(--primary)/0.25)]`}>
                {m.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="text-sm font-heading font-semibold truncate">{m.name}</p>
                  <span className="text-[10px] text-muted-foreground shrink-0">{m.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground truncate">{m.last}</p>
                  {m.unread > 0 && (
                    <span className="shrink-0 min-w-[18px] h-[18px] px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-heading font-bold flex items-center justify-center shadow-[0_0_8px_hsl(var(--primary)/0.6)]">
                      {m.unread}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
