import { dietPlans } from "@/lib/dietPlans";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import logo from "@/assets/logo.png";
import workoutSquats from "@/assets/workout-squats.jpg";
import workoutPushups from "@/assets/workout-pushups.jpg";
import workoutDeadlift from "@/assets/workout-deadlift.jpg";
import challengeRunning from "@/assets/challenge-running.jpg";

const imageMap: Record<string, string> = {
  "workout-squats": workoutSquats,
  "workout-pushups": workoutPushups,
  "workout-deadlift": workoutDeadlift,
  "challenge-running": challengeRunning,
};

const DietPlans = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MY GYM" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold text-foreground">MY GYM</h1>
            <p className="text-xs text-muted-foreground">There's no weakness</p>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Nutrition</h2>
          <p className="text-muted-foreground">Fuel your transformation with expert meal plans</p>
        </div>

        <div className="grid gap-6">
          {dietPlans.map((plan) => (
            <Card key={plan.id} className="overflow-hidden">
              <div className="relative h-40">
                <img
                  src={imageMap[plan.image]}
                  alt={plan.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${plan.color} opacity-80`} />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {plan.name.replace(/^plans\./, "")}
                  </h3>
                  <p className="text-white/90 text-sm">{plan.description.replace(/^plans\./, "")}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="capitalize">
                    {plan.goal.replace("-", " ")}
                  </Badge>
                  <Badge variant="outline">{plan.meals} meals/day</Badge>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {plan.calories}
                    </div>
                    <div className="text-xs text-muted-foreground">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {plan.protein}g
                    </div>
                    <div className="text-xs text-muted-foreground">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {plan.carbs}g
                    </div>
                    <div className="text-xs text-muted-foreground">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {plan.fats}g
                    </div>
                    <div className="text-xs text-muted-foreground">Fats</div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  View Plan Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default DietPlans;
