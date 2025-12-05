import { Calendar, Flame, Settings as SettingsIcon, TrendingUp, Zap, Star, ChevronLeft, ChevronRight } from "lucide-react";
import ProgressRing from "@/components/ProgressRing";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { getTodaysChallenges } from "@/lib/workouts";
import { getTodayStats, getCurrentStreak, getWorkoutHistory } from "@/lib/workoutTracking";
import logoImage from "@/assets/logo.png";

import challengeRunning from "@/assets/challenge-running.jpg";
import workoutSquats from "@/assets/workout-squats.jpg";
import workoutLunges from "@/assets/workout-lunges.jpg";
import workoutPushups from "@/assets/workout-pushups.jpg";

import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";

const ActivityDashboard = () => {
  const challenges = getTodaysChallenges();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshKey, setRefreshKey] = useState(0);
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week, -1 = previous week, etc.
  
  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || 'Warrior';
  
  // Get real workout stats - refreshes when refreshKey changes
  const todayStats = useMemo(() => getTodayStats(), [refreshKey]);
  const streak = useMemo(() => getCurrentStreak(), [refreshKey]);
  
  // Get stats for selected date
  const selectedDateStats = useMemo(() => {
    const workouts = getWorkoutHistory();
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    
    const dayWorkouts = workouts.filter((w: any) => w.date.split('T')[0] === selectedDateStr);
    
    return {
      calories: dayWorkouts.reduce((sum: number, w: any) => sum + w.caloriesBurned, 0),
      workouts: dayWorkouts.length,
      minutes: dayWorkouts.reduce((sum: number, w: any) => sum + w.duration, 0)
    };
  }, [selectedDate, refreshKey]);
  
  const todayActivity = {
    caloriesGoal: 2000,
    caloriesBurned: selectedDateStats.calories,
    caloriesRemaining: Math.max(0, 2000 - selectedDateStats.calories)
  };
  
  const progressPercent = (todayActivity.caloriesBurned / todayActivity.caloriesGoal) * 100;
  
  // Listen for storage changes and refresh periodically
  useEffect(() => {
    const handleUpdate = () => setRefreshKey(prev => prev + 1);
    
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('workoutUpdated', handleUpdate);
    
    // Refresh every 10 seconds as backup
    const interval = setInterval(handleUpdate, 10000);
    
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('workoutUpdated', handleUpdate);
      clearInterval(interval);
    };
  }, []);

  // Get current week data with navigation support
  const weekData = useMemo(() => {
    const today = new Date();
    today.setDate(today.getDate() + (weekOffset * 7)); // Adjust for week offset
    
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Calculate Monday of current week
    
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    
    const daysOfWeek = ["M", "T", "W", "T", "F", "S"];
    const dates = [];
    
    for (let i = 0; i < 6; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    
    return { daysOfWeek, dates, today: new Date() }; // Keep original today reference
  }, [weekOffset]);

  // Format month and year
  const currentMonthYear = useMemo(() => {
    const months = ["January", "February", "March", "April", "May", "June", 
                   "July", "August", "September", "October", "November", "December"];
    return `${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
  }, [selectedDate]);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };


  return (
    <div className="min-h-screen pb-20">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md"></div>
                <div className="relative bg-gradient-to-br from-primary to-secondary p-1.5 sm:p-2 rounded-xl">
                  <img src={logoImage} alt="MY GYM" className="w-6 h-6 sm:w-8 sm:h-8 object-contain brightness-0 invert" />
                </div>
              </div>
              <div>
                <h2 className="text-xs text-muted-foreground">Your Activity</h2>
                <h1 className="text-lg sm:text-xl font-bold text-gradient-primary">{currentMonthYear}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
                <Flame className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-primary">{streak}</span>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10" aria-label="Open settings">
                    <SettingsIcon className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-48 p-2 card-gradient border-primary/20">
                  <div className="text-sm font-semibold px-2 py-1.5">Menu</div>
                  <button
                    className="w-full text-left px-2 py-1.5 rounded-md hover:bg-primary/20 transition-colors text-sm"
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </header>

        {/* Calendar */}
        <div className="px-4 sm:px-6 mb-4 sm:mb-6">
          <div className="card-gradient-glow rounded-xl sm:rounded-2xl p-4 sm:p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground">
                  {weekOffset === 0 ? 'This Week' : weekOffset === -1 ? 'Last Week' : `${Math.abs(weekOffset)} weeks ago`}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setWeekOffset(prev => prev - 1)}
                  className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                  aria-label="Previous week"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={() => setWeekOffset(prev => Math.min(prev + 1, 0))}
                  disabled={weekOffset === 0}
                  className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next week"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {weekData.daysOfWeek.map((day, idx) => {
                const date = weekData.dates[idx];
                const isCurrentDay = isToday(date);
                const isSelected = isSameDay(date, selectedDate);
                
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(date)}
                    className="text-center focus:outline-none"
                  >
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1 sm:mb-2">{day}</div>
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 mx-auto rounded-lg sm:rounded-xl flex items-center justify-center text-sm sm:text-base font-semibold transition-all cursor-pointer ${
                        isCurrentDay
                          ? "bg-gradient-to-br from-primary to-secondary text-white glow-primary scale-110"
                          : isSelected
                          ? "bg-primary/20 text-primary border-2 border-primary"
                          : "bg-muted/50 text-foreground hover:bg-muted hover:scale-105"
                      }`}
                    >
                      {date.getDate()}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-4 sm:px-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              {isSameDay(selectedDate, new Date()) ? "Today's Stats" : selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </h2>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative overflow-hidden card-gradient rounded-2xl p-4 border-2 border-pink-500/20">
              <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-pink-500/20 rounded-lg">
                    <Flame className="w-4 h-4 text-pink-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">Goal</span>
                </div>
                <p className="text-3xl font-bold text-gradient-secondary mb-1">{todayActivity.caloriesGoal}</p>
                <p className="text-xs text-muted-foreground">kcal to burn</p>
              </div>
            </div>

            <div className="relative overflow-hidden card-gradient rounded-2xl p-4 border-2 border-purple-500/20">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-purple-500/20 rounded-lg">
                    <Zap className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">Burned</span>
                </div>
                <p className="text-3xl font-bold text-gradient-primary mb-1">{todayActivity.caloriesBurned}</p>
                <p className="text-xs text-muted-foreground">kcal today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="px-6 mb-6">
          <div className="card-gradient-glow rounded-2xl p-6 flex items-center justify-between backdrop-blur-sm">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Total Burned</p>
              <p className="text-3xl font-bold text-gradient-primary mb-4">
                {todayActivity.caloriesBurned} <span className="text-lg text-muted-foreground">kcal</span>
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <p className="text-sm text-muted-foreground">
                    Remaining: <span className="font-semibold text-foreground">{todayActivity.caloriesRemaining} kcal</span>
                  </p>
                </div>
              </div>
            </div>
            <ProgressRing progress={progressPercent} />
          </div>
        </div>

        {/* Today's Challenges */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">Today's Challenges</h2>
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
            {challenges.map((ch, idx) => (
              <div
                key={idx}
                className="relative min-w-[280px] max-w-xs card-gradient rounded-2xl p-5 overflow-hidden h-36 flex flex-col justify-end border border-primary/20 cursor-pointer transition-all hover:scale-[1.02] hover:border-primary/40 active:scale-[0.98] glow-primary"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                <img
                  src={
                    ch.image === 'challenge-running' ? challengeRunning :
                    ch.image === 'workout-squats' ? workoutSquats :
                    ch.image === 'workout-lunges' ? workoutLunges :
                    ch.image === 'workout-pushups' ? workoutPushups :
                    challengeRunning
                  }
                  alt={ch.title}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
                />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">{ch.title}</h3>
                  <p className="text-sm text-white/90 drop-shadow">{ch.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Fitness Trainers */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">Top Trainers</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
              onClick={() => navigate("/trainers")}
            >
              View All
            </Button>
          </div>
          <div className="grid gap-4">
            <div className="card-gradient-glow rounded-2xl p-4 flex items-center gap-4 border border-primary/10 hover:border-primary/30 transition-all cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-md"></div>
                <img src={logoImage} alt="Emma Johnson" className="relative w-14 h-14 rounded-full object-cover border-2 border-primary" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-base">Emma Johnson</div>
                <div className="text-xs text-muted-foreground mb-1">Strength & Conditioning</div>
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-muted-foreground">4.9 (120 reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-primary font-bold text-lg">$40</div>
                <div className="text-xs text-muted-foreground">/session</div>
              </div>
            </div>
            
            <div className="card-gradient-glow rounded-2xl p-4 flex items-center gap-4 border border-primary/10 hover:border-primary/30 transition-all cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-secondary/30 rounded-full blur-md"></div>
                <img src={logoImage} alt="Liam Smith" className="relative w-14 h-14 rounded-full object-cover border-2 border-secondary" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-base">Liam Smith</div>
                <div className="text-xs text-muted-foreground mb-1">Cardio & HIIT</div>
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-muted-foreground">4.8 (95 reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-primary font-bold text-lg">$35</div>
                <div className="text-xs text-muted-foreground">/session</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ActivityDashboard;
