import "./i18n"; // initialize i18n
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { startNotificationService } from "@/lib/mealNotifications";
import { startWorkoutReminderService } from "@/lib/workoutReminders";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load pages for better performance
const ActivityDashboard = lazy(() => import("./pages/ActivityDashboard"));
const WorkoutPlan = lazy(() => import("./pages/WorkoutPlan"));
const WorkoutSession = lazy(() => import("./pages/WorkoutSession"));
const Stats = lazy(() => import("./pages/Stats"));
const Memberships = lazy(() => import("./pages/Memberships"));
const DietPlans = lazy(() => import("./pages/DietPlans"));
const DietPlanDetail = lazy(() => import("./pages/DietPlanDetail"));
const Shop = lazy(() => import("./pages/Shop"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OnlineTrainers = lazy(() => import("./pages/OnlineTrainers"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Settings = lazy(() => import("./pages/Settings"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

const App = () => {
  // Start notification service on app load
  useEffect(() => {
    startNotificationService();
    startWorkoutReminderService();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="animate-pulse text-primary text-xl">Loading...</div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><ActivityDashboard /></ProtectedRoute>} />
            <Route path="/workouts" element={<ProtectedRoute><WorkoutPlan /></ProtectedRoute>} />
            <Route path="/workout/:id" element={<ProtectedRoute><WorkoutSession /></ProtectedRoute>} />
            <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
            <Route path="/memberships" element={<ProtectedRoute><Memberships /></ProtectedRoute>} />
            <Route path="/diet-plans" element={<ProtectedRoute><DietPlans /></ProtectedRoute>} />
            <Route path="/diet-plan/:id" element={<ProtectedRoute><DietPlanDetail /></ProtectedRoute>} />
            <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/trainers" element={<ProtectedRoute><OnlineTrainers /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
};

export default App;
