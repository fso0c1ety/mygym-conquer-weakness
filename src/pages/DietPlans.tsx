import { dietPlans } from "@/lib/dietPlans";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import logo from "@/assets/logo.png";
import workoutSquats from "@/assets/workout-squats.jpg";
import workoutPushups from "@/assets/workout-pushups.jpg";
import workoutDeadlift from "@/assets/workout-deadlift.jpg";
import challengeRunning from "@/assets/challenge-running.jpg";
import { Apple, Flame, Target, ChefHat } from "lucide-react";

const imageMap: Record<string, string> = {
  "workout-squats": workoutSquats,
  "workout-pushups": workoutPushups,
  "workout-deadlift": workoutDeadlift,
  "challenge-running": challengeRunning,
};

const DietPlans = () => {
  return (
    <div className="min-h-screen pb-24">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md"></div>
              <div className="relative bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                <Apple className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient-primary">Nutrition</h1>
              <p className="text-sm text-muted-foreground">Fuel your transformation</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="card-gradient rounded-xl p-3 border border-primary/10">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xl font-bold text-foreground">2,400</div>
              <div className="text-xs text-muted-foreground">Daily Goal</div>
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

        <div className="px-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-foreground mb-1">Meal Plans</h2>
            <p className="text-sm text-muted-foreground">Choose the perfect plan for your goals</p>
          </div>

          <div className="space-y-5">
            {dietPlans.map((plan, index) => (
              <div key={plan.id} className="card-gradient-glow rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all group">
                {/* Plan Header with Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={imageMap[plan.image]}
                    alt={plan.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Floating badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90 backdrop-blur-sm text-white border-0 font-semibold">
                      {plan.meals} Meals/Day
                    </Badge>
                  </div>

                  {/* Plan Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 capitalize">
                        {plan.goal.replace("-", " ")}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                      {plan.name.replace(/^plans\./, "")}
                    </h3>
                    <p className="text-white/90 text-sm drop-shadow">
                      {plan.description.replace(/^plans\./, "")}
                    </p>
                  </div>
                </div>

                {/* Macros Grid */}
                <div className="p-5">
                  <div className="grid grid-cols-4 gap-3 mb-5">
                    <div className="text-center p-3 bg-primary/10 rounded-xl border border-primary/20">
                      <div className="text-2xl font-bold text-gradient-primary mb-1">
                        {plan.calories}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">Calories</div>
                    </div>
                    <div className="text-center p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {plan.protein}g
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">Protein</div>
                    </div>
                    <div className="text-center p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {plan.carbs}g
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">Carbs</div>
                    </div>
                    <div className="text-center p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {plan.fats}g
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">Fats</div>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 glow-primary text-base font-semibold" 
                    size="lg"
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
