export interface BadgeData {
  name: string;
  icon: string;
  unlocked: boolean;
  description: string;
}

export const BADGES: BadgeData[] = [
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
