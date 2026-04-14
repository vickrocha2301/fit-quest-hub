import { motion } from "framer-motion";
import { Crown, Medal, ChevronUp, Users } from "lucide-react";
import { useState } from "react";

const generalRanking = [
  { name: "Lucas", xp: 12400, avatar: "L" },
  { name: "Marina", xp: 11800, avatar: "M" },
  { name: "João", xp: 10200, avatar: "J" },
  { name: "Você", xp: 9500, avatar: "A", isUser: true },
  { name: "Ana", xp: 8700, avatar: "A" },
  { name: "Pedro", xp: 7900, avatar: "P" },
  { name: "Carla", xp: 7200, avatar: "C" },
];

const friendsRanking = [
  { name: "Você", xp: 9500, avatar: "A", isUser: true },
  { name: "Rafael", xp: 8200, avatar: "R" },
  { name: "Bianca", xp: 7100, avatar: "B" },
  { name: "Diego", xp: 5800, avatar: "D" },
];

export default function Ranking() {
  const [tab, setTab] = useState<"general" | "friends">("general");
  const data = tab === "general" ? generalRanking : friendsRanking;

  const getMedal = (i: number) => {
    if (i === 0) return <Crown className="w-5 h-5 text-gold" />;
    if (i === 1) return <Medal className="w-5 h-5 text-muted-foreground" />;
    if (i === 2) return <Medal className="w-5 h-5 text-streak" />;
    return <span className="text-xs text-muted-foreground font-heading w-5 text-center">{i + 1}</span>;
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
      <h1 className="text-xl font-heading font-bold mb-4">Ranking</h1>

      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setTab("general")}
          className={`flex-1 py-2 rounded-lg text-sm font-heading font-semibold transition-all ${
            tab === "general" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
          }`}
        >
          <ChevronUp className="w-4 h-4 inline mr-1" /> Geral
        </button>
        <button
          onClick={() => setTab("friends")}
          className={`flex-1 py-2 rounded-lg text-sm font-heading font-semibold transition-all ${
            tab === "friends" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
          }`}
        >
          <Users className="w-4 h-4 inline mr-1" /> Amigos
        </button>
      </div>

      <div className="space-y-2">
        {data.map((user, i) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              user.isUser ? "bg-primary/10 border-primary/30 card-glow" : "bg-card border-border"
            }`}
          >
            {getMedal(i)}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-heading font-bold shrink-0 ${
              user.isUser ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground"
            }`}>
              {user.avatar}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user.name}</p>
            </div>
            <span className="text-xs font-heading font-bold text-primary">{user.xp.toLocaleString()} XP</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
