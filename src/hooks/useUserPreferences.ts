import { useState, useEffect } from "react";

interface UserPreferences {
  sports: string[];
  goals: string[];
  customGoal: string;
}

const STORAGE_KEY = "growin-user-prefs";

const defaults: UserPreferences = {
  sports: [],
  goals: [],
  customGoal: "",
};

export function useUserPreferences() {
  const [prefs, setPrefs] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch {
      return defaults;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const setSports = (sports: string[]) => setPrefs((p) => ({ ...p, sports }));
  const setGoals = (goals: string[]) => setPrefs((p) => ({ ...p, goals }));
  const setCustomGoal = (customGoal: string) => setPrefs((p) => ({ ...p, customGoal }));

  return { ...prefs, setSports, setGoals, setCustomGoal };
}
