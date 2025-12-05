import { dietPlans } from "@/lib/dietPlans";
import { getActiveMealPlan } from "@/lib/mealNotifications";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import workoutSquats from "@/assets/workout-squats.jpg";
import workoutPushups from "@/assets/workout-pushups.jpg";
import workoutDeadlift from "@/assets/workout-deadlift.jpg";
import challengeRunning from "@/assets/challenge-running.jpg";
import { Apple, Flame, Target, ChefHat, Bell } from "lucide-react";
import { useState, useEffect } from "react";

const imageMap: Record<string, string> = {
  "workout-squats": workoutSquats,
  "workout-pushups": workoutPushups,
  "workout-deadlift": workoutDeadlift,
  "challenge-running": challengeRunning,
};

const DietPlans = () => {
  const navigate = useNavigate();
  const [notificationPlanId, setNotificationPlanId] = useState<string | null>(null);
  
  useEffect(() => {
    // Check which plan has notifications enabled
    const activeMealPlan = getActiveMealPlan();
    if (activeMealPlan) {
      setNotificationPlanId(activeMealPlan.planId);
    }
  }, []);
  
  return (
    <div className="min-h-screen pb-24">
      {/* Static Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md"></div>
              <div className="relative bg-gradient-to-br from-primary to-secondary p-1.5 sm:p-2 rounded-xl">
                <Apple className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gradient-primary">Nutrition</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Fuel your transformation</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="card-gradient rounded-lg sm:rounded-xl p-2 sm:p-3 border border-primary/10">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              </div>
                <div className="text-lg sm:text-xl font-bold text-foreground">2,400</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">Daily Goal</div>
            </div>
            <div className="card-gradient rounded-xl p-3 border border-purple-500/10">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-xl font-bold text-foreground">180g</div>
              <div className="text-xs text-muted-foreground">Protein</div>
            </div>
            <div className="card-gradient rounded-xl p-3 border border-green-500/10">
              <div className="flex items-center gap-2 mb-1">
                <ChefHat className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-xl font-bold text-foreground">{dietPlans.length}</div>
              <div className="text-xs text-muted-foreground">Plans</div>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-foreground mb-1">Meal Plans</h2>
            <p className="text-sm text-muted-foreground">Choose the perfect plan for your goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dietPlans.map((plan, index) => (
              <div 
                key={plan.id} 
                onClick={() => navigate(`/diet-plan/${plan.id}`)}
                className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:border-primary/40 transition-all cursor-pointer"
              >
                {/* Background Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={imageMap[plan.image]}
                    alt={plan.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                    {notificationPlanId === plan.id && (
                      <Badge className="bg-green-500/90 backdrop-blur-md text-white border-0 font-semibold flex items-center gap-1 shadow-lg">
                        <Bell className="w-3 h-3" />
                        Active
                      </Badge>
                    )}
                    <Badge className="bg-primary/90 backdrop-blur-md text-white border-0 font-bold shadow-lg">
                      {plan.meals} Meals
                    </Badge>
                  </div>

                  {/* Goal Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-background/90 backdrop-blur-md text-foreground border border-border/50 capitalize font-semibold">
                      {plan.goal.replace("-", " ")}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">
                    {plan.name.replace(/^plans\./, "")}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                    {plan.description.replace(/^plans\./, "")}
                  </p>

                  {/* Macros Row */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="text-center p-2 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="text-sm font-bold text-primary">{plan.calories}</div>
                      <div className="text-[10px] text-muted-foreground">Cal</div>
                    </div>
                    <div className="text-center p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="text-sm font-bold text-purple-400">{plan.protein}g</div>
                      <div className="text-[10px] text-muted-foreground">Protein</div>
                    </div>
                    <div className="text-center p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="text-sm font-bold text-orange-400">{plan.carbs}g</div>
                      <div className="text-[10px] text-muted-foreground">Carbs</div>
                    </div>
                    <div className="text-center p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="text-sm font-bold text-green-400">{plan.fats}g</div>
                      <div className="text-[10px] text-muted-foreground">Fats</div>
                    </div>
                  </div>

                  {/* View Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-sm font-bold shadow-lg shadow-primary/20" 
                    size="sm"
                  >
                    View Full Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default DietPlans;
