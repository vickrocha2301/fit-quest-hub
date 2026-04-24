import { Home, Map, ListChecks, Users, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/journey", icon: Map, label: "Jornada" },
  { to: "/habits", icon: ListChecks, label: "Hábitos" },
  { to: "/social", icon: Users, label: "Social" },
  { to: "/profile", icon: User, label: "Perfil" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-primary scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium font-body">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
