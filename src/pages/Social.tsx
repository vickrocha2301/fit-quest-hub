import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

const posts = [
  { user: "Marina", avatar: "M", activity: "Corrida", distance: "5.2km", time: "26:10", xp: 80, likes: 12, comments: 3, timeAgo: "2h", liked: false },
  { user: "Lucas", avatar: "L", activity: "Bike", distance: "18km", time: "45:00", xp: 150, likes: 24, comments: 5, timeAgo: "4h", liked: true },
  { user: "João", avatar: "J", activity: "Caminhada", distance: "3.1km", time: "35:20", xp: 40, likes: 8, comments: 1, timeAgo: "6h", liked: false },
  { user: "Ana", avatar: "A", activity: "Corrida", distance: "10km", time: "52:15", xp: 200, likes: 31, comments: 8, timeAgo: "8h", liked: false },
];

export default function Social() {
  const [feed, setFeed] = useState(posts);

  const toggleLike = (i: number) => {
    setFeed((prev) =>
      prev.map((p, idx) =>
        idx === i ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
      <h1 className="text-xl font-heading font-bold mb-5">Feed</h1>
      <div className="space-y-4">
        {feed.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl p-4 border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-heading font-bold">
                {p.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{p.user}</p>
                <p className="text-[10px] text-muted-foreground">{p.timeAgo} atrás</p>
              </div>
              <span className="text-xs font-heading font-semibold text-primary">+{p.xp} XP</span>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 mb-3">
              <p className="text-sm font-medium mb-1">{p.activity}</p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>📍 {p.distance}</span>
                <span>⏱ {p.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => toggleLike(i)} className="flex items-center gap-1 text-sm transition-colors">
                <Heart className={`w-4 h-4 ${p.liked ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                <span className="text-xs text-muted-foreground">{p.likes}</span>
              </button>
              <button className="flex items-center gap-1 text-muted-foreground">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">{p.comments}</span>
              </button>
              <button className="text-muted-foreground ml-auto">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
