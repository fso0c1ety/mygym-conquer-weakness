import { TrendingUp, Flame, Activity, Award, Target, Calendar, Zap, Trophy, Heart, Dumbbell, Timer } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { getTodayStats } from "@/lib/workoutTracking";
import { Progress } from "@/components/ui/progress";
import { getTotalStats, getStatsForLastDays, getCurrentStreak, getAchievements } from "@/lib/workoutTracking";
import { useMemo, useState, useEffect } from "react";

const Stats = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Listen for storage changes to refresh stats
  useEffect(() => {
    const handleUpdate = () => setRefreshKey(prev => prev + 1);
    
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('workoutUpdated', handleUpdate);
    
    // Also refresh every 10 seconds as backup
    const interval = setInterval(handleUpdate, 10000);
    
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('workoutUpdated', handleUpdate);
      clearInterval(interval);
    };
  }, []);
  
  // Get real data from workout tracking - refreshes when refreshKey changes
  const totalStats = useMemo(() => getTotalStats(), [refreshKey]);
  const weeklyStats = useMemo(() => getStatsForLastDays(7), [refreshKey]);
  const monthlyStats = useMemo(() => getStatsForLastDays(30), [refreshKey]);
  const streak = useMemo(() => getCurrentStreak(), [refreshKey]);
  const achievements = useMemo(() => getAchievements(), [refreshKey]);
  const todayStats = useMemo(() => getTodayStats(), [refreshKey]);
  
  // Calculate aggregates
  const totalWorkouts = totalStats.totalWorkouts;
  const totalMinutes = totalStats.totalMinutes;
  const totalCalories = totalStats.totalCalories;
  
  // Format minutes display
  const formatMinutes = (mins: number) => {
    if (mins === 0) return '0';
    if (mins < 60) return mins.toString();
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  };
  
  const weeklyAvg = Math.round(weeklyStats.reduce((sum, day) => sum + day.calories, 0) / 7);
  const monthlyTotal = monthlyStats.reduce((sum, day) => sum + day.calories, 0);
  const monthlyGoal = 50000; // 50k calories per month
  const weeklyGoalProgress = Math.min(Math.round((monthlyTotal / monthlyGoal) * 100), 100);
  
  const personalBests = achievements.filter(a => a.unlocked).length;
  const avgHeartRate = 145; // This would need heart rate tracking

  // Format weekly data for chart - last 7 days with day names
  const weeklyData = weeklyStats.map((day, idx) => {
    const date = new Date(day.date);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const maxCalories = Math.max(...weeklyStats.map(d => d.calories), 1);
    
    return {
      day: dayNames[date.getDay()],
      value: Math.round((day.calories / maxCalories) * 100),
      calories: day.calories
    };
  });

  return (
    <div className="min-h-screen pb-24">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gradient-primary mb-1">Your Stats</h1>
          <p className="text-sm text-muted-foreground">Track your fitness journey</p>
        </header>

        {/* Workout Streak Hero */}
        <div className="px-4 sm:px-6 mb-4 sm:mb-6">
          <div className="relative overflow-hidden card-gradient-glow rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-primary/30">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">Current Streak</h3>
                </div>
                <p className="text-4xl sm:text-6xl font-bold text-gradient-primary mb-2">{streak}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Days in a row - Keep crushing it!</p>
              </div>
              <div className="text-5xl sm:text-7xl opacity-20">🔥</div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="px-4 sm:px-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-3">Quick Overview</h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="card-gradient rounded-xl p-3 sm:p-4 border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-primary/20 rounded-lg">
                  <Dumbbell className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Total Workouts</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{totalWorkouts}</p>
            </div>

            <div className="card-gradient rounded-xl p-4 border border-purple-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-purple-500/20 rounded-lg">
                  <Timer className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-xs text-muted-foreground">Total Minutes</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatMinutes(totalMinutes)}</p>
            </div>

            <div className="card-gradient rounded-xl p-4 border border-pink-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-pink-500/20 rounded-lg">
                  <Heart className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-xs text-muted-foreground">Avg Heart Rate</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{avgHeartRate} <span className="text-sm text-muted-foreground">bpm</span></p>
            </div>

            <div className="card-gradient rounded-xl p-4 border border-orange-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-orange-500/20 rounded-lg">
                  <Trophy className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-xs text-muted-foreground">Achievements</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{personalBests}/{achievements.length}</p>
            </div>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="px-6 mb-6">
          <div className="card-gradient-glow rounded-2xl p-5 border border-primary/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Weekly Activity</h3>
                <p className="text-sm text-muted-foreground">Last 7 days</p>
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            
            <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-24 sm:h-32 mb-4">
              {weeklyData.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-muted/30 rounded-t-lg relative" style={{ height: '100%' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all duration-500"
                      style={{ height: `${item.value}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.day}</span>
                </div>
              ))}
            </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div>
                <p className="text-sm text-muted-foreground">Daily Average</p>
                <p className="text-xl font-bold text-foreground">{weeklyAvg} kcal</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-xl font-bold text-gradient-primary">{weeklyStats.reduce((sum, d) => sum + d.calories, 0)} kcal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Goal Progress */}
        <div className="px-6 mb-6">
          <div className="card-gradient-glow rounded-2xl p-5 border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">Monthly Goal</h3>
                <p className="text-sm text-muted-foreground">{monthlyTotal.toLocaleString()} / {monthlyGoal.toLocaleString()} kcal</p>
              </div>
              <span className="text-2xl font-bold text-primary">{weeklyGoalProgress}%</span>
            </div>
            <Progress value={weeklyGoalProgress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">You're {weeklyGoalProgress}% towards your monthly goal!</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-foreground">Achievements</h2>
            <Award className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className={`card-gradient rounded-lg sm:rounded-xl p-3 sm:p-4 border text-center transition-all ${
                  achievement.unlocked
                    ? 'border-primary/30 hover:border-primary/50 glow-primary'
                    : 'border-border/30 opacity-50'
                }`}
              >
                <div className={`text-4xl mb-2 ${achievement.unlocked ? 'scale-110' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <p className="text-xs font-semibold text-foreground mb-1">{achievement.title}</p>
                <p className="text-[10px] text-muted-foreground line-clamp-2">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="px-6 mb-6">
          <h2 className="text-xl font-bold text-foreground mb-3">Detailed Statistics</h2>
          <div className="space-y-3">
            <div className="card-gradient rounded-xl p-4 border border-primary/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Flame className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Today's Calories</h3>
                    <p className="text-xs text-muted-foreground">Burned</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gradient-primary">{todayStats.calories}</p>
              </div>
            </div>

            <div className="card-gradient rounded-xl p-4 border border-purple-500/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Activity className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Total This Month</h3>
                    <p className="text-xs text-muted-foreground">Calories burned</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{monthlyTotal.toLocaleString()}</p>
              </div>
            </div>

            <div className="card-gradient rounded-xl p-4 border border-green-500/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Zap className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Best Day</h3>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{Math.max(...weeklyStats.map(d => d.calories), 0).toLocaleString()} <span className="text-sm text-muted-foreground">kcal</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Stats;
