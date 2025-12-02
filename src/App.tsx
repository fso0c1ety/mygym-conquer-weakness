import "./i18n"; // initialize i18n
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ActivityDashboard from "./pages/ActivityDashboard";
import WorkoutPlan from "./pages/WorkoutPlan";
import WorkoutSession from "./pages/WorkoutSession";
import Stats from "./pages/Stats";
import Memberships from "./pages/Memberships";
import DietPlans from "./pages/DietPlans";
import Shop from "./pages/Shop";

import OnlineTrainers from "./pages/OnlineTrainers";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ActivityDashboard />} />
          <Route path="/workouts" element={<WorkoutPlan />} />
          <Route path="/workout/:id" element={<WorkoutSession />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/diet-plans" element={<DietPlans />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/trainers" element={<OnlineTrainers />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
