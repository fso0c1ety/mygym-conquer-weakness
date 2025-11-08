import { useState } from "react";
import { Bell } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import WorkoutCard from "@/components/WorkoutCard";
import { workouts } from "@/lib/workouts";
import logoImage from "@/assets/logo.png";

const WorkoutPlan = () => {
  const [activeTab, setActiveTab] = useState<"all" | "lower" | "upper">("all");
  const caloriesBurned = 538;

  const filteredWorkouts = workouts.filter(
    (w) => activeTab === "all" || w.category === activeTab
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
              <img
                src={logoImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Hi James</h1>
              <p className="text-sm text-muted-foreground">1 | 1mm ko' Peak</p>
            </div>
          </div>
          <button className="p-2 rounded-full bg-card">
            <Bell className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Progress Card */}
        <div className="bg-workout-yellow/90 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <span className="text-xs text-background/70 font-semibold uppercase">
                Progress
              </span>
              <h2 className="text-2xl font-bold text-background mt-1">Lower Body</h2>
              <p className="text-sm text-background/80">C6001. 10 mins</p>
              <div className="mt-3 bg-background text-foreground inline-block px-4 py-2 rounded-full">
                <span className="text-xl font-bold">{caloriesBurned}</span>
                <span className="text-xs ml-1">CALORIES</span>
              </div>
            </div>
            <div className="ml-4">
              <img src={logoImage} alt="MY GYM" className="w-16 h-16 object-contain" />
            </div>
          </div>
        </div>
      </header>

      {/* Your Plan Section */}
      <div className="px-6 mb-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Your plan</h3>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "all"
                ? "bg-foreground text-background"
                : "bg-card text-foreground"
            }`}
          >
            All workouts
          </button>
          <button
            onClick={() => setActiveTab("lower")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "lower"
                ? "bg-foreground text-background"
                : "bg-card text-foreground"
            }`}
          >
            Lower body
          </button>
          <button
            onClick={() => setActiveTab("upper")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "upper"
                ? "bg-foreground text-background"
                : "bg-card text-foreground"
            }`}
          >
            Upper
          </button>
        </div>

        {/* Workout Cards */}
        <div className="space-y-4">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default WorkoutPlan;
