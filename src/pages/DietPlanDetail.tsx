import { useParams, useNavigate } from "react-router-dom";
import { dietPlans } from "@/lib/dietPlans";
import { requestNotificationPermission, scheduleMealNotifications, cancelMealNotifications, getActiveMealPlan } from "@/lib/mealNotifications";
import { getUserKey } from "@/lib/userData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Flame, CheckCircle2, Circle, Bell, BellOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const DietPlanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const plan = dietPlans.find(p => p.id === id);
  
  const [completedMeals, setCompletedMeals] = useState<Set<string>>(new Set());
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Load completed meals for today
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(getUserKey(`meals-${today}`));
    if (saved) {
      setCompletedMeals(new Set(JSON.parse(saved)));
    }

    // Load active plan
    const active = localStorage.getItem(getUserKey('activeDietPlan'));
    setActivePlan(active);
    
    // Check if notifications are enabled for this plan
    const activeMealPlan = getActiveMealPlan();
    if (activeMealPlan && activeMealPlan.planId === id) {
      setNotificationsEnabled(true);
    }
  }, [id]);

  if (!plan) {
    navigate("/diet-plans");
    return null;
  }

  const toggleMeal = (mealName: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newCompleted = new Set(completedMeals);
    
    if (newCompleted.has(mealName)) {
      newCompleted.delete(mealName);
      toast({
        title: "Meal unchecked",
        description: `${mealName} marked as incomplete`,
      });
    } else {
      newCompleted.add(mealName);
      toast({
        title: "Meal completed! ✓",
        description: `Great job! ${mealName} logged`,
      });
    }
    
    setCompletedMeals(newCompleted);
    localStorage.setItem(getUserKey(`meals-${today}`), JSON.stringify([...newCompleted]));
  };

  const activatePlan = () => {
    localStorage.setItem(getUserKey('activeDietPlan'), plan.id);
    setActivePlan(plan.id);
    toast({
      title: "Plan Activated! 🎯",
      description: `${plan.name} is now your active nutrition plan`,
    });
  };
  
  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      // Request permission and enable notifications
      const granted = await requestNotificationPermission();
      
      if (granted) {
        const meals = plan.mealPlan.map(meal => ({
          mealName: meal.name,
          time: meal.time,
          calories: meal.calories
        }));
        
        scheduleMealNotifications(plan.id, meals);
        setNotificationsEnabled(true);
        
        toast({
          title: "Notifications Enabled 🔔",
          description: "You'll receive reminders for each meal",
        });
      } else {
        toast({
          title: "Permission Denied",
          description: "Please enable notifications in your browser settings",
          variant: "destructive"
        });
      }
    } else {
      // Disable notifications
      cancelMealNotifications();
      setNotificationsEnabled(false);
      
      toast({
        title: "Notifications Disabled 🔕",
        description: "Meal reminders have been turned off",
      });
    }
  };

  const completedCount = completedMeals.size;
  const totalMeals = plan.mealPlan.length;
  const progressPercent = (completedCount / totalMeals) * 100;

  const consumedCalories = plan.mealPlan
    .filter(meal => completedMeals.has(meal.name))
    .reduce((sum, meal) => sum + meal.calories, 0);

  const consumedProtein = plan.mealPlan
    .filter(meal => completedMeals.has(meal.name))
    .reduce((sum, meal) => sum + meal.protein, 0);

  const consumedCarbs = plan.mealPlan
    .filter(meal => completedMeals.has(meal.name))
    .reduce((sum, meal) => sum + meal.carbs, 0);

  const consumedFats = plan.mealPlan
    .filter(meal => completedMeals.has(meal.name))
    .reduce((sum, meal) => sum + meal.fats, 0);

  return (
    <div className="min-h-screen pb-24">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 sm:px-6 pt-6 pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/diet-plans")}
            className="mb-4 hover:bg-primary/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-primary/20 text-primary border-primary/30 capitalize">
                {plan.goal.replace("-", " ")}
              </Badge>
              {activePlan === plan.id && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Active Plan
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gradient-primary mb-2">{plan.name}</h1>
            <p className="text-muted-foreground">{plan.description}</p>
          </div>

          {/* Daily Progress */}
          <div className="card-gradient-glow rounded-2xl p-5 border border-primary/10 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-foreground">Today's Progress</h3>
              <span className="text-sm text-primary font-semibold">{completedCount}/{totalMeals} meals</span>
            </div>
            <Progress value={progressPercent} className="h-2 mb-4" />
            
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center">
                <div className="text-xl font-bold text-primary">{consumedCalories}</div>
                <div className="text-xs text-muted-foreground">Calories</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-foreground">{consumedProtein}g</div>
                <div className="text-xs text-muted-foreground">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-foreground">{consumedCarbs}g</div>
                <div className="text-xs text-muted-foreground">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-foreground">{consumedFats}g</div>
                <div className="text-xs text-muted-foreground">Fats</div>
              </div>
            </div>
          </div>

          {/* Activate Plan Button */}
          {activePlan !== plan.id && (
            <Button 
              onClick={activatePlan}
              className="w-full mb-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 glow-primary"
            >
              Set as Active Plan
            </Button>
          )}
          
          {/* Notification Toggle */}
          <Button 
            onClick={toggleNotifications}
            variant={notificationsEnabled ? "default" : "outline"}
            className={`w-full mb-4 ${notificationsEnabled ? 'bg-primary hover:bg-primary/90' : ''}`}
          >
            {notificationsEnabled ? (
              <>
                <Bell className="w-4 h-4 mr-2" />
                Notifications Enabled
              </>
            ) : (
              <>
                <BellOff className="w-4 h-4 mr-2" />
                Enable Meal Reminders
              </>
            )}
          </Button>
        </header>

        {/* Meal Plan */}
        <div className="px-4 sm:px-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Meal Schedule</h2>
          
          <div className="space-y-4">
            {plan.mealPlan.map((meal, index) => {
              const isCompleted = completedMeals.has(meal.name);
              
              return (
                <div
                  key={index}
                  className={`card-gradient-glow rounded-xl p-5 border transition-all ${
                    isCompleted 
                      ? 'border-primary/30 bg-primary/5' 
                      : 'border-border/30 hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary font-semibold">{meal.time}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{meal.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{meal.calories} cal</span>
                        <span>•</span>
                        <span>P: {meal.protein}g</span>
                        <span>•</span>
                        <span>C: {meal.carbs}g</span>
                        <span>•</span>
                        <span>F: {meal.fats}g</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleMeal(meal.name)}
                      className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  {/* Foods List */}
                  {meal.foods && meal.foods.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border/30">
                      <p className="text-sm font-semibold text-foreground mb-2">Foods:</p>
                      <ul className="space-y-1">
                        {meal.foods.map((food, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {food}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlanDetail;
