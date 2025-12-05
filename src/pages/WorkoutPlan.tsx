import { useState, useEffect, useMemo } from "react";
import { Bell, Flame, TrendingUp, Dumbbell } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import WorkoutCard from "@/components/WorkoutCard";
import { workouts, WorkoutCategory, getCategoryLabel, getCategoryIcon } from "@/lib/workouts";
import { getTodayStats, getWorkoutHistory } from "@/lib/workoutTracking";
import logoImage from "@/assets/logo.png";

const WorkoutPlan = () => {
  const [activeTab, setActiveTab] = useState<WorkoutCategory | "all">("all");
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || 'Warrior';
  
  // Get real workout stats
  const todayStats = useMemo(() => getTodayStats(), [refreshKey]);
  const workoutHistory = useMemo(() => getWorkoutHistory(), [refreshKey]);
  
  // Get last completed workout
  const lastWorkout = workoutHistory.length > 0 
    ? workoutHistory[workoutHistory.length - 1]
    : null;
  
  const caloriesBurned = todayStats.calories;
  const totalWorkouts = workouts.length;
  const completedToday = todayStats.workouts;
  
  // Listen for workout updates
  useEffect(() => {
    const handleUpdate = () => setRefreshKey(prev => prev + 1);
    
    window.addEventListener('workoutUpdated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    
    return () => {
      window.removeEventListener('workoutUpdated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const categories: Array<WorkoutCategory | "all"> = [
    "all",
    "upper",
    "lower",
    "core",
    "full-body",
    "hiit",
    "flexibility",
  ];

  const filteredWorkouts = workouts.filter(
    (w) => activeTab === "all" || w.category === activeTab
  );

  return (
    <div className="min-h-screen pb-24">
      {/* Static Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-md"></div>
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                  <img
                    src={logoImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Hi {userName}</h1>
                <p className="text-sm text-muted-foreground">Ready to crush it?</p>
              </div>
            </div>
            <button className="p-2 rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card transition-colors border border-border/50">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </button>
          </div>

          {/* Progress Card */}
          <div className="card-gradient-glow rounded-2xl overflow-hidden border-2 border-primary/20 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-primary/20 rounded-lg">
                      <Flame className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                      Today's Progress
                    </span>
                  </div>
                  {lastWorkout ? (
                    <>
                      <h2 className="text-3xl font-bold text-gradient-primary mb-1">{lastWorkout.workoutName}</h2>
                      <p className="text-sm text-muted-foreground">
                        Last workout · {lastWorkout.duration} mins · {lastWorkout.totalSets} sets
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl font-bold text-gradient-primary mb-1">Start Your Day</h2>
                      <p className="text-sm text-muted-foreground">No workouts yet · Let's get moving!</p>
                    </>
                  )}
                </div>
                <div className="text-4xl sm:text-5xl opacity-20">💪</div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4 mt-4">
                <div className="flex-1 bg-background/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-primary/20">
                  <div className="text-2xl font-bold text-gradient-primary">{caloriesBurned}</div>
                  <div className="text-xs text-muted-foreground">Calories Burned</div>
                </div>
                <div className="flex-1 bg-background/50 backdrop-blur-sm rounded-xl p-3 border border-purple-500/20">
                  <div className="text-2xl font-bold text-foreground">{completedToday}</div>
                  <div className="text-xs text-muted-foreground">Workouts Today</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Your Plan Section */}
        <div className="px-4 sm:px-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">Your Workouts</h3>
              <p className="text-sm text-muted-foreground">{totalWorkouts} exercises available</p>
            </div>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          
          {/* Category Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === category
                    ? "bg-gradient-to-r from-primary to-secondary text-white glow-primary"
                    : "bg-card/50 backdrop-blur-sm text-foreground hover:bg-card border border-border/50"
                }`}
              >
                {category !== "all" && (
                  <span className="text-lg">{getCategoryIcon(category as WorkoutCategory)}</span>
                )}
                {category === "all" ? "All Workouts" : getCategoryLabel(category as WorkoutCategory)}
              </button>
            ))}
          </div>

          {/* Workout Cards */}
          <div className="space-y-4">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>

          {filteredWorkouts.length === 0 && (
            <div className="text-center py-12 card-gradient rounded-2xl border border-border/50">
              <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No workouts in this category</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default WorkoutPlan;
