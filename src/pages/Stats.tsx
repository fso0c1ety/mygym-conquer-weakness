import { TrendingUp, Flame, Activity, Award, Target, Calendar, Zap, Trophy, Heart, Dumbbell, Timer } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { todayActivity } from "@/lib/workouts";
import { Progress } from "@/components/ui/progress";

const Stats = () => {
  const weeklyAvg = 1650;
  const monthlyTotal = 42340;
  const workoutStreak = 7;
  const totalWorkouts = 124;
  const personalBests = 12;
  const avgHeartRate = 145;
  const totalMinutes = 3850;
  const weeklyGoalProgress = 75;

  // Weekly workout data for mini chart
  const weeklyData = [
    { day: 'Mon', value: 80, calories: 1850 },
    { day: 'Tue', value: 60, calories: 1420 },
    { day: 'Wed', value: 90, calories: 2100 },
    { day: 'Thu', value: 70, calories: 1650 },
    { day: 'Fri', value: 100, calories: 2300 },
    { day: 'Sat', value: 85, calories: 1980 },
    { day: 'Sun', value: 50, calories: 1200 }
  ];

  // Achievements
  const achievements = [
    { icon: '🏆', title: 'First Milestone', description: '10 workouts completed', unlocked: true },
    { icon: '💪', title: 'Strength Beast', description: '50 strength workouts', unlocked: true },
    { icon: '🔥', title: 'Week Warrior', description: '7-day streak', unlocked: true },
    { icon: '⚡', title: 'Speed Demon', description: 'Complete under 30 mins', unlocked: false },
    { icon: '🎯', title: 'Perfect Month', description: '30-day streak', unlocked: false },
    { icon: '👑', title: 'Gym Legend', description: '100 workouts', unlocked: true }
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 pt-8 pb-4">
          <h1 className="text-3xl font-bold text-gradient-primary mb-1">Your Stats</h1>
          <p className="text-muted-foreground">Track your fitness journey</p>
        </header>

        {/* Workout Streak Hero */}
        <div className="px-6 mb-6">
          <div className="relative overflow-hidden card-gradient-glow rounded-2xl p-6 border-2 border-primary/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Current Streak</h3>
                </div>
                <p className="text-6xl font-bold text-gradient-primary mb-2">{workoutStreak}</p>
                <p className="text-sm text-muted-foreground">Days in a row - Keep crushing it!</p>
              </div>
              <div className="text-7xl opacity-20">🔥</div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="px-6 mb-6">
          <h2 className="text-xl font-bold text-foreground mb-3">Quick Overview</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="card-gradient rounded-xl p-4 border border-primary/10">
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
              <p className="text-2xl font-bold text-foreground">{totalMinutes}</p>
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
                <span className="text-xs text-muted-foreground">Personal Bests</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{personalBests}</p>
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
            
            <div className="flex items-end justify-between gap-2 h-32 mb-4">
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
                <p className="text-xl font-bold text-gradient-primary">{weeklyAvg * 7} kcal</p>
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
                <p className="text-sm text-muted-foreground">{monthlyTotal.toLocaleString()} / {(monthlyTotal / (weeklyGoalProgress / 100)).toFixed(0)} kcal</p>
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
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className={`card-gradient rounded-xl p-4 border text-center transition-all ${
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
                <p className="text-2xl font-bold text-gradient-primary">{todayActivity.caloriesBurned}</p>
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
                <p className="text-2xl font-bold text-foreground">2,300 <span className="text-sm text-muted-foreground">kcal</span></p>
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
