import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Dumbbell,
  Brain,
  Moon,
  HeartPulse,
  Sparkles,
  Check,
  ChevronLeft,
  Play,
  Pause,
  Square,
  MapPin,
  Navigation,
  Footprints,
  Bike,
  Music,
  Waves,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type RegisterCategory = "exercise" | "mind" | "sleep" | "health" | "other";

type ExerciseType = "running" | "cycling" | "walking" | "dance" | "swimming";

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
    label: "Atividade Física",
    description: "Corrida, ciclismo, dança",
    icon: Dumbbell,
    gradient: "from-primary to-accent",
    glow: "shadow-[0_0_22px_hsl(var(--primary)/0.5)]",
  },
  {
    id: "mind",
    label: "Mente",
    description: "Leitura ou meditação",
    icon: Brain,
    gradient: "from-accent to-primary",
    glow: "shadow-[0_0_22px_hsl(var(--accent)/0.5)]",
  },
  {
    id: "sleep",
    label: "Sono",
    description: "Horas dormidas",
    icon: Moon,
    gradient: "from-primary/80 to-accent/80",
    glow: "shadow-[0_0_22px_hsl(var(--accent)/0.45)]",
  },
  {
    id: "health",
    label: "Saúde",
    description: "Água, humor, peso",
    icon: HeartPulse,
    gradient: "from-streak to-gold",
    glow: "shadow-[0_0_22px_hsl(var(--streak)/0.45)]",
  },
  {
    id: "other",
    label: "Outros",
    description: "Qualquer hábito",
    icon: Sparkles,
    gradient: "from-gold to-streak",
    glow: "shadow-[0_0_22px_hsl(var(--gold)/0.4)]",
  },
];

const exerciseTypes: {
  id: ExerciseType;
  label: string;
  icon: typeof Footprints;
  outdoor: boolean;
}[] = [
  { id: "running", label: "Corrida", icon: Footprints, outdoor: true },
  { id: "cycling", label: "Ciclismo", icon: Bike, outdoor: true },
  { id: "walking", label: "Caminhada", icon: Navigation, outdoor: true },
  { id: "dance", label: "Dança", icon: Music, outdoor: false },
  { id: "swimming", label: "Natação", icon: Waves, outdoor: false },
];

function formatTime(secs: number) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function RegisterActivityModal({
  open,
  onOpenChange,
  initialCategory,
}: RegisterActivityModalProps) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<RegisterCategory | null>(
    initialCategory ?? null,
  );
  const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null);

  // Exercise generic
  const [duration, setDuration] = useState<number>(30);
  const [intensity, setIntensity] = useState<number>(2);

  // Timer
  const [timerSecs, setTimerSecs] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Sleep
  const [bedtime, setBedtime] = useState("23:00");
  const [waketime, setWaketime] = useState("07:00");

  // Mind
  const [mindType, setMindType] = useState<"reading" | "meditation">("reading");
  const [mindDuration, setMindDuration] = useState<number>(15);

  // Health
  const [healthType, setHealthType] = useState<"water" | "mood" | "weight">("water");
  const [healthValue, setHealthValue] = useState("");

  // Other state
  const [otherTitle, setOtherTitle] = useState("");
  const [otherNotes, setOtherNotes] = useState("");

  useEffect(() => {
    if (open) {
      setSelected(initialCategory ?? null);
      setExerciseType(null);
      setTimerSecs(0);
      setTimerRunning(false);
    }
  }, [open, initialCategory]);

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimerSecs((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerRunning]);

  const intensityLabel = ["Leve", "Média", "Alta"][intensity - 1];
  const sleepHours = (() => {
    const [bh, bm] = bedtime.split(":").map(Number);
    const [wh, wm] = waketime.split(":").map(Number);
    let mins = wh * 60 + wm - (bh * 60 + bm);
    if (mins <= 0) mins += 24 * 60;
    return (mins / 60).toFixed(1);
  })();

  const isOutdoor = exerciseType
    ? exerciseTypes.find((e) => e.id === exerciseType)?.outdoor
    : false;

  const handleBack = () => {
    if (selected === "exercise" && exerciseType) {
      setExerciseType(null);
      setTimerRunning(false);
      setTimerSecs(0);
      return;
    }
    setSelected(null);
  };

  const handleSave = () => {
    if (!selected) return;
    setTimerRunning(false);
    const labelMap: Record<RegisterCategory, string> = {
      exercise: "Atividade finalizada!",
      mind: "Sessão registrada!",
      sleep: "Sono registrado!",
      health: "Registro de saúde salvo!",
      other: "Registro salvo!",
    };
    toast.success(labelMap[selected], {
      description: "Seu progresso foi atualizado. +XP creditado.",
    });
    onOpenChange(false);
  };

  const headerTitle = !selected
    ? "Registrar Atividade"
    : selected === "exercise" && exerciseType
    ? exerciseTypes.find((e) => e.id === exerciseType)?.label
    : categories.find((c) => c.id === selected)?.label;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="border-border bg-card/95 backdrop-blur-xl rounded-t-3xl h-[80vh] flex flex-col p-0"
      >
        {/* Drag handle */}
        <div className="shrink-0 flex justify-center pt-3 pb-2">
          <div className="w-10 h-1.5 rounded-full bg-muted-foreground/30" />
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8">
          <SheetHeader className="text-left mb-4">
            <div className="flex items-center gap-2">
              {selected && (
                <button
                  onClick={handleBack}
                  className="p-1 -ml-1 rounded-full hover:bg-secondary transition-colors"
                  aria-label="Voltar"
                >
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
              <SheetTitle className="font-heading text-xl">{headerTitle}</SheetTitle>
            </div>
            <SheetDescription>
              {!selected
                ? "O que você quer registrar agora?"
                : selected === "exercise" && !exerciseType
                ? "Escolha sua modalidade"
                : "Preencha os detalhes abaixo"}
            </SheetDescription>
          </SheetHeader>

          <AnimatePresence mode="wait">
            {/* Category picker */}
            {!selected && (
              <motion.div
                key="picker"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid grid-cols-2 gap-3"
              >
                {categories.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <motion.button
                      key={c.id}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelected(c.id)}
                      className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-secondary/30 hover:border-primary/40 transition-all"
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center ${c.glow}`}
                      >
                        <Icon className="w-7 h-7 text-primary-foreground" strokeWidth={2.5} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-heading font-semibold">{c.label}</p>
                        <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                          {c.description}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}

            {/* Exercise sub-picker */}
            {selected === "exercise" && !exerciseType && (
              <motion.div
                key="ex-picker"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-2 gap-3"
              >
                {exerciseTypes.map((e, i) => {
                  const Icon = e.icon;
                  return (
                    <motion.button
                      key={e.id}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setExerciseType(e.id)}
                      className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-secondary/30 hover:border-primary/40 transition-all"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_22px_hsl(var(--primary)/0.45)]">
                        <Icon className="w-7 h-7 text-primary-foreground" strokeWidth={2.5} />
                      </div>
                      <p className="text-sm font-heading font-semibold">{e.label}</p>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}

            {/* Exercise detail (outdoor map vs indoor inputs) */}
            {selected === "exercise" && exerciseType && (
              <motion.div
                key="ex-detail"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-5"
              >
                {isOutdoor ? (
                  <>
                    {/* Simulated map */}
                    <div className="relative h-44 rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-accent/20 via-primary/10 to-streak/20">
                      {/* Grid pattern */}
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage:
                            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                      />
                      {/* Fake route */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180" preserveAspectRatio="none">
                        <path
                          d="M 20 140 Q 80 60, 140 100 T 280 40"
                          stroke="hsl(var(--streak))"
                          strokeWidth="3"
                          strokeLinecap="round"
                          fill="none"
                          strokeDasharray="6 6"
                          className="drop-shadow-[0_0_6px_hsl(var(--streak)/0.7)]"
                        />
                      </svg>
                      {/* Pin */}
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        className="absolute top-[50%] left-[40%] -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="relative">
                          <MapPin
                            className="w-7 h-7 text-streak drop-shadow-[0_0_8px_hsl(var(--streak)/0.8)]"
                            fill="hsl(var(--streak))"
                          />
                        </div>
                      </motion.div>
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-card/80 backdrop-blur px-2.5 py-1 rounded-full border border-border">
                        <div className="w-1.5 h-1.5 rounded-full bg-streak animate-pulse" />
                        <span className="text-[10px] font-heading font-semibold text-foreground">
                          GPS ativo
                        </span>
                      </div>
                    </div>

                    {/* Timer display */}
                    <div className="rounded-2xl p-6 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 text-center">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-heading mb-1">
                        Cronômetro
                      </p>
                      <p className="text-5xl font-heading font-bold tabular-nums bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {formatTime(timerSecs)}
                      </p>
                    </div>

                    {/* Play/Pause */}
                    <div className="flex items-center justify-center gap-4">
                      {timerSecs > 0 && !timerRunning && (
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => {
                            setTimerSecs(0);
                          }}
                          className="w-12 h-12 rounded-full border-border"
                          aria-label="Resetar"
                        >
                          <Square className="w-4 h-4" />
                        </Button>
                      )}
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setTimerRunning((r) => !r)}
                        className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br ${
                          timerRunning
                            ? "from-gold to-streak shadow-[0_0_30px_hsl(var(--gold)/0.65)]"
                            : "from-primary to-accent shadow-[0_0_30px_hsl(var(--primary)/0.65)]"
                        } text-primary-foreground transition-all`}
                        aria-label={timerRunning ? "Pausar" : "Iniciar"}
                      >
                        {timerRunning ? (
                          <Pause className="w-9 h-9" fill="currentColor" />
                        ) : (
                          <Play className="w-9 h-9 ml-1" fill="currentColor" />
                        )}
                      </motion.button>
                    </div>
                    <p className="text-center text-xs text-muted-foreground -mt-2">
                      {timerRunning ? "Atividade em andamento..." : timerSecs > 0 ? "Pausado" : "Toque para iniciar"}
                    </p>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="font-heading">Duração</Label>
                        <span className="text-sm font-heading font-bold text-primary">
                          {duration} min
                        </span>
                      </div>
                      <Slider
                        value={[duration]}
                        onValueChange={(v) => setDuration(v[0])}
                        min={5}
                        max={180}
                        step={5}
                      />
                    </div>

                    <div>
                      <Label className="font-heading mb-2 block">Intensidade</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((lvl) => {
                          const labels = ["Leve", "Média", "Alta"];
                          const active = intensity === lvl;
                          return (
                            <button
                              key={lvl}
                              onClick={() => setIntensity(lvl)}
                              className={`py-3 rounded-xl border text-sm font-heading font-semibold transition-all ${
                                active
                                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_14px_hsl(var(--primary)/0.35)]"
                                  : "border-border bg-secondary/40 text-muted-foreground"
                              }`}
                            >
                              {labels[lvl - 1]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground bg-secondary/40 rounded-lg p-3 border border-border">
                      💡 Intensidade {intensityLabel.toLowerCase()} por {duration} min ≈{" "}
                      <span className="text-foreground font-semibold">
                        +{Math.round(duration * intensity * 1.5)} XP
                      </span>
                    </p>
                  </>
                )}
              </motion.div>
            )}

            {selected === "sleep" && (
              <motion.div
                key="sleep"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="bedtime" className="font-heading mb-2 block">
                      Dormiu às
                    </Label>
                    <Input
                      id="bedtime"
                      type="time"
                      value={bedtime}
                      onChange={(e) => setBedtime(e.target.value)}
                      className="h-12 text-lg font-heading text-center"
                    />
                  </div>
                  <div>
                    <Label htmlFor="waketime" className="font-heading mb-2 block">
                      Acordou às
                    </Label>
                    <Input
                      id="waketime"
                      type="time"
                      value={waketime}
                      onChange={(e) => setWaketime(e.target.value)}
                      className="h-12 text-lg font-heading text-center"
                    />
                  </div>
                </div>

                <div className="rounded-xl p-4 bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 text-center">
                  <Moon className="w-6 h-6 text-accent mx-auto mb-1" />
                  <p className="text-2xl font-heading font-bold text-accent">{sleepHours}h</p>
                  <p className="text-xs text-muted-foreground">de descanso</p>
                </div>
              </motion.div>
            )}

            {selected === "mind" && (
              <motion.div
                key="mind"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <Label className="font-heading mb-2 block">Tipo</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["reading", "meditation"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setMindType(t)}
                        className={`py-3 rounded-xl border text-sm font-heading font-semibold transition-all ${
                          mindType === t
                            ? "border-accent bg-accent/10 text-accent shadow-[0_0_14px_hsl(var(--accent)/0.35)]"
                            : "border-border bg-secondary/40 text-muted-foreground"
                        }`}
                      >
                        {t === "reading" ? "📖 Leitura" : "🧘 Meditação"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="font-heading">Duração</Label>
                    <span className="text-sm font-heading font-bold text-accent">
                      {mindDuration} min
                    </span>
                  </div>
                  <Slider
                    value={[mindDuration]}
                    onValueChange={(v) => setMindDuration(v[0])}
                    min={5}
                    max={120}
                    step={5}
                  />
                </div>
              </motion.div>
            )}

            {selected === "health" && (
              <motion.div
                key="health"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <Label className="font-heading mb-2 block">O que registrar?</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["water", "mood", "weight"] as const).map((t) => {
                      const labels = { water: "💧 Água", mood: "😊 Humor", weight: "⚖️ Peso" };
                      return (
                        <button
                          key={t}
                          onClick={() => setHealthType(t)}
                          className={`py-3 rounded-xl border text-xs font-heading font-semibold transition-all ${
                            healthType === t
                              ? "border-streak bg-streak/10 text-streak shadow-[0_0_14px_hsl(var(--streak)/0.35)]"
                              : "border-border bg-secondary/40 text-muted-foreground"
                          }`}
                        >
                          {labels[t]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="health-value" className="font-heading mb-2 block">
                    {healthType === "water"
                      ? "Quantos copos? (200ml)"
                      : healthType === "mood"
                      ? "De 1 a 10, como está?"
                      : "Peso (kg)"}
                  </Label>
                  <Input
                    id="health-value"
                    type="number"
                    inputMode="decimal"
                    value={healthValue}
                    onChange={(e) => setHealthValue(e.target.value)}
                    placeholder={
                      healthType === "water" ? "8" : healthType === "mood" ? "7" : "72.5"
                    }
                    className="h-12 text-lg font-heading text-center"
                  />
                </div>
              </motion.div>
            )}

            {selected === "other" && (
              <motion.div
                key="other"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="other-title" className="font-heading mb-2 block">
                    Nome do hábito
                  </Label>
                  <Input
                    id="other-title"
                    value={otherTitle}
                    onChange={(e) => setOtherTitle(e.target.value)}
                    placeholder="Ex: Tomar sol 10min"
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="other-notes" className="font-heading mb-2 block">
                    Notas (opcional)
                  </Label>
                  <Textarea
                    id="other-notes"
                    value={otherNotes}
                    onChange={(e) => setOtherNotes(e.target.value)}
                    placeholder="Como foi?"
                    rows={3}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Save button: only show after a final detail screen */}
          {selected &&
            !(selected === "exercise" && !exerciseType) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-6"
              >
                <Button
                  onClick={handleSave}
                  className="w-full h-14 text-base font-heading font-bold rounded-xl border-0 bg-gradient-to-r from-streak to-streak/80 text-primary-foreground shadow-[0_0_24px_hsl(var(--streak)/0.55)] hover:shadow-[0_0_32px_hsl(var(--streak)/0.75)] transition-shadow animate-pulse"
                >
                  <Check className="w-5 h-5 mr-2" strokeWidth={3} />
                  Finalizar e Ganhar XP
                </Button>
              </motion.div>
            )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
