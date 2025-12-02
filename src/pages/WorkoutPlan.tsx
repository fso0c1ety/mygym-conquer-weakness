import { useState } from "react";
import { Bell, Flame, TrendingUp, Dumbbell } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import WorkoutCard from "@/components/WorkoutCard";
import { workouts } from "@/lib/workouts";
import logoImage from "@/assets/logo.png";

const WorkoutPlan = () => {
  const [activeTab, setActiveTab] = useState<"all" | "lower" | "upper">("all");
  const caloriesBurned = 538;
  const totalWorkouts = workouts.length;
  const completedToday = 2;

  const filteredWorkouts = workouts.filter(
    (w) => activeTab === "all" || w.category === activeTab
  );

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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-md"></div>
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                  <img
                    src={logoImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Hi James</h1>
                <p className="text-sm text-muted-foreground">Ready to crush it?</p>
              </div>
            </div>
            <button className="p-2 rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card transition-colors border border-border/50">
              <Bell className="w-6 h-6 text-foreground" />
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
                  <h2 className="text-3xl font-bold text-gradient-primary mb-1">Lower Body</h2>
                  <p className="text-sm text-muted-foreground">C6001 · 10 mins completed</p>
                </div>
                <div className="text-5xl opacity-20">💪</div>
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="flex-1 bg-background/50 backdrop-blur-sm rounded-xl p-3 border border-primary/20">
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
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">Your Workouts</h3>
              <p className="text-sm text-muted-foreground">{totalWorkouts} exercises available</p>
            </div>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          
          {/* Category Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-primary to-secondary text-white glow-primary"
                  : "bg-card/50 backdrop-blur-sm text-foreground hover:bg-card border border-border/50"
              }`}
            >
              All Workouts
            </button>
            <button
              onClick={() => setActiveTab("lower")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "lower"
                  ? "bg-gradient-to-r from-primary to-secondary text-white glow-primary"
                  : "bg-card/50 backdrop-blur-sm text-foreground hover:bg-card border border-border/50"
              }`}
            >
              Lower Body
            </button>
            <button
              onClick={() => setActiveTab("upper")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "upper"
                  ? "bg-gradient-to-r from-primary to-secondary text-white glow-primary"
                  : "bg-card/50 backdrop-blur-sm text-foreground hover:bg-card border border-border/50"
              }`}
            >
              Upper Body
            </button>
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
