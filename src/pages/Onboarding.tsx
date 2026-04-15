import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, ArrowLeft } from "lucide-react";
import { SportSelector } from "@/components/SportSelector";
import { GoalSelector } from "@/components/GoalSelector";
import { useUserPreferences } from "@/hooks/useUserPreferences";

type Step = "welcome" | "sports" | "goals";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("welcome");
  const { sports, goals, customGoal, setSports, setGoals, setCustomGoal } = useUserPreferences();

  const canAdvanceFromSports = sports.length > 0;
  const canFinish = goals.length > 0 || customGoal.trim().length > 0;

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
            <Button onClick={() => setStep("sports")} className="w-full h-14 gradient-primary text-primary-foreground font-heading font-bold rounded-xl border-0 mb-3">
              Começar Agora <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" onClick={() => navigate("/")} className="w-full">
              Já tenho conta
            </Button>
          </motion.div>
        )}

        {step === "sports" && (
          <motion.div key="sports" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
            <button onClick={() => setStep("welcome")} className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>

            {/* Step indicator */}
            <div className="flex gap-2 mb-6">
              <div className="h-1 flex-1 rounded-full bg-primary" />
              <div className="h-1 flex-1 rounded-full bg-border" />
            </div>

            <h2 className="text-xl font-heading font-bold mb-1">Suas modalidades</h2>
            <p className="text-sm text-muted-foreground mb-6">Selecione uma ou mais atividades que você pratica</p>

            <SportSelector selected={sports} onChange={setSports} />

            <Button
              onClick={() => setStep("goals")}
              disabled={!canAdvanceFromSports}
              className="w-full h-14 gradient-primary text-primary-foreground font-heading font-bold rounded-xl border-0 mt-8"
            >
              Continuar <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}

        {step === "goals" && (
          <motion.div key="goals" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
            <button onClick={() => setStep("sports")} className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>

            {/* Step indicator */}
            <div className="flex gap-2 mb-6">
              <div className="h-1 flex-1 rounded-full bg-primary" />
              <div className="h-1 flex-1 rounded-full bg-primary" />
            </div>

            <h2 className="text-xl font-heading font-bold mb-1">Seu objetivo</h2>
            <p className="text-sm text-muted-foreground mb-6">O que você quer alcançar? Escolha ou personalize</p>

            <GoalSelector
              selectedGoals={goals}
              customGoal={customGoal}
              onGoalsChange={setGoals}
              onCustomGoalChange={setCustomGoal}
            />

            <Button
              onClick={() => navigate("/")}
              disabled={!canFinish}
              className="w-full h-14 gradient-primary text-primary-foreground font-heading font-bold rounded-xl border-0 mt-8"
            >
              Vamos lá! 🚀
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
