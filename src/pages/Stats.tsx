import { TrendingUp, Flame, Activity } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { todayActivity } from "@/lib/workouts";

const Stats = () => {
  const weeklyAvg = 1650;
  const monthlyTotal = 42340;

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="px-6 pt-8 pb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Stats</h1>
        <p className="text-muted-foreground">Track your progress</p>
      </header>

      <div className="px-6 space-y-4">
        {/* Today's Stats */}
        <div className="bg-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Flame className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Today</h3>
              <p className="text-sm text-muted-foreground">Calories burned</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-foreground mb-2">
            {todayActivity.caloriesBurned}
          </p>
          <p className="text-sm text-muted-foreground">kcal burned today</p>
        </div>

        {/* Weekly Average */}
        <div className="bg-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-workout-purple/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-workout-purple" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Weekly Average</h3>
              <p className="text-sm text-muted-foreground">Last 7 days</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-foreground mb-2">{weeklyAvg}</p>
          <p className="text-sm text-muted-foreground">kcal per day</p>
        </div>

        {/* Monthly Total */}
        <div className="bg-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-workout-pink/20 rounded-xl">
              <Activity className="w-6 h-6 text-workout-pink" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">This Month</h3>
              <p className="text-sm text-muted-foreground">Total burned</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-foreground mb-2">{monthlyTotal}</p>
          <p className="text-sm text-muted-foreground">kcal this month</p>
        </div>

        {/* Workout Streak */}
        <div className="bg-gradient-to-r from-primary/20 to-workout-yellow/20 border-2 border-primary/30 rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">🔥 Workout Streak</h3>
          <p className="text-5xl font-bold text-primary mb-2">7</p>
          <p className="text-sm text-muted-foreground">Days in a row - Keep it up!</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Stats;
