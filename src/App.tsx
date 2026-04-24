import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BottomNav } from "@/components/BottomNav";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Activity from "./pages/Activity";
import Achievements from "./pages/Achievements";
import Challenges from "./pages/Challenges";
import Ranking from "./pages/Ranking";
import Profile from "./pages/Profile";
import Social from "./pages/Social";
import Store from "./pages/Store";
import Onboarding from "./pages/Onboarding";
import Journey from "./pages/Journey";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname === "/onboarding";

  return (
    <>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/social" element={<Social />} />
        <Route path="/store" element={<Store />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
