import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dumbbell, Moon, BookOpen, Sparkles, Smile } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type RegisterCategory = "exercise" | "sleep" | "reading" | "mood" | "other";

interface RegisterActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialCategory?: RegisterCategory;
}

const categories: {
  id: RegisterCategory;
  label: string;
  description: string;
  icon: typeof Dumbbell;
  gradient: string;
  glow: string;
}[] = [
  {
    id: "exercise",
    label: "Exercício",
    description: "Corrida, treino, luta",
    icon: Dumbbell,
    gradient: "from-primary to-accent",
    glow: "shadow-[0_0_18px_hsl(var(--primary)/0.45)]",
  },
  {
    id: "sleep",
    label: "Sono",
    description: "Registrar horas dormidas",
    icon: Moon,
    gradient: "from-accent to-primary",
    glow: "shadow-[0_0_18px_hsl(var(--accent)/0.45)]",
  },
  {
    id: "reading",
    label: "Leitura",
    description: "Páginas ou minutos",
    icon: BookOpen,
    gradient: "from-streak to-gold",
    glow: "shadow-[0_0_18px_hsl(var(--streak)/0.4)]",
  },
  {
    id: "mood",
    label: "Humor",
    description: "Como você está hoje",
    icon: Smile,
    gradient: "from-gold to-streak",
    glow: "shadow-[0_0_18px_hsl(var(--gold)/0.4)]",
  },
  {
    id: "other",
    label: "Outros",
    description: "Qualquer hábito",
    icon: Sparkles,
    gradient: "from-primary/70 to-accent/70",
    glow: "shadow-[0_0_18px_hsl(var(--primary)/0.3)]",
  },
];

export function RegisterActivityModal({
  open,
  onOpenChange,
  initialCategory,
}: RegisterActivityModalProps) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<RegisterCategory | null>(
    initialCategory ?? null,
  );

  useEffect(() => {
    if (open) setSelected(initialCategory ?? null);
  }, [open, initialCategory]);

  const handleConfirm = () => {
    if (!selected) return;
    onOpenChange(false);
    if (selected === "exercise") {
      navigate("/activity");
    }
    // Outras categorias ficam visualmente registradas — backend ainda não plugado.
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg">Novo Registro</DialogTitle>
          <DialogDescription>
            O que você quer registrar agora?
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 mt-2">
          {categories.map((c, i) => {
            const Icon = c.icon;
            const active = selected === c.id;
            return (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelected(c.id)}
                className={`relative flex flex-col items-start gap-2 p-3 rounded-xl border text-left transition-all ${
                  active
                    ? `border-primary bg-primary/10 ${c.glow}`
                    : "border-border bg-secondary/40 hover:border-muted-foreground/40"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg bg-gradient-to-br ${c.gradient} flex items-center justify-center`}
                >
                  <Icon className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-heading font-semibold">{c.label}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    {c.description}
                  </p>
                </div>
                {active && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    ✓
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            disabled={!selected}
            onClick={handleConfirm}
            className="flex-1 gradient-primary text-primary-foreground border-0"
          >
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
