import { motion } from "framer-motion";
import { Coins, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const items = [
  { name: "Badge Diamante", icon: "💎", price: 500, category: "badge" },
  { name: "Tema Neon", icon: "🎨", price: 300, category: "tema" },
  { name: "Boost 2x XP", icon: "⚡", price: 200, category: "boost" },
  { name: "Badge Fogo", icon: "🔥", price: 400, category: "badge" },
  { name: "Tema Escuro Pro", icon: "🌑", price: 350, category: "tema" },
  { name: "Boost Streak Shield", icon: "🛡️", price: 250, category: "boost" },
];

export default function Store() {
  const coins = 1250;

  const handleBuy = (name: string) => {
    toast.success(`${name} comprado com sucesso! 🎉`);
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-heading font-bold">Loja</h1>
        <div className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-full border border-border">
          <Coins className="w-4 h-4 text-gold" />
          <span className="text-sm font-heading font-bold text-gold">{coins}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card rounded-xl p-4 border border-border flex flex-col items-center text-center"
          >
            <span className="text-4xl mb-2">{item.icon}</span>
            <p className="text-sm font-heading font-semibold mb-1">{item.name}</p>
            <p className="text-[10px] text-muted-foreground capitalize mb-3">{item.category}</p>
            <Button
              size="sm"
              onClick={() => handleBuy(item.name)}
              className="w-full gradient-primary text-primary-foreground border-0 font-heading text-xs"
            >
              <Coins className="w-3 h-3 mr-1" /> {item.price}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
