import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Zap, Target, BarChart3, ArrowRight } from "lucide-react";

type Step = "welcome" | "setup";

const levels = ["Iniciante", "Intermediário", "Avançado"];
const goals = ["Perder peso", "Ganhar condicionamento", "Manter ativo", "Competir"];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("welcome");
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {step === "welcome" && (
          <motion.div key="welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center w-full">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="text-3xl font-heading font-bold mb-2 text-glow">FitQuest</h1>
            <p className="text-muted-foreground mb-8">Transforme treinos em aventuras. Ganhe XP, conquiste badges e desafie amigos!</p>
            <Button onClick={() => setStep("setup")} className="w-full h-14 gradient-primary text-primary-foreground font-heading font-bold rounded-xl border-0 mb-3">
              Começar Agora <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" onClick={() => navigate("/")} className="w-full">
              Já tenho conta
            </Button>
          </motion.div>
        )}

        {step === "setup" && (
          <motion.div key="setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full">
            <h2 className="text-xl font-heading font-bold mb-1">Configure seu perfil</h2>
            <p className="text-sm text-muted-foreground mb-6">Personalize sua experiência</p>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-heading font-semibold">Seu objetivo</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {goals.map((g, i) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGoal(i)}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      selectedGoal === i ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-heading font-semibold">Nível de experiência</span>
              </div>
              <div className="flex gap-2">
                {levels.map((l, i) => (
                  <button
                    key={l}
                    onClick={() => setSelectedLevel(i)}
                    className={`flex-1 p-3 rounded-lg border text-sm transition-all ${
                      selectedLevel === i ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={() => navigate("/")} className="w-full h-14 gradient-primary text-primary-foreground font-heading font-bold rounded-xl border-0">
              Vamos lá! 🚀
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
