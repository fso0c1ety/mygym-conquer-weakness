import { Calendar, Flame, Settings as SettingsIcon } from "lucide-react";
import ProgressRing from "@/components/ProgressRing";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { todayActivity, getTodaysChallenges } from "@/lib/workouts";
import logoImage from "@/assets/logo.png";

import challengeRunning from "@/assets/challenge-running.jpg";
import workoutSquats from "@/assets/workout-squats.jpg";
import workoutLunges from "@/assets/workout-lunges.jpg";
import workoutPushups from "@/assets/workout-pushups.jpg";

import { useNavigate } from "react-router-dom";

const ActivityDashboard = () => {
  const challenges = getTodaysChallenges();
  const progressPercent = (todayActivity.caloriesBurned / todayActivity.caloriesGoal) * 100;
  const navigate = useNavigate();

  const daysOfWeek = ["M", "T", "W", "T", "F", "S"];
  const dates = [5, 16, 18, 20, 21, 22];
  const today = 16;


  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <img src={logoImage} alt="MY GYM" className="w-12 h-12 object-contain" />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open settings">
                <SettingsIcon className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48 p-2">
              <div className="text-sm font-semibold px-2 py-1.5">Menu</div>
              <button
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground text-sm"
                onClick={() => navigate("/settings")}
              >
                Settings
              </button>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <h2 className="text-sm text-muted-foreground">Your Activity</h2>
          <h1 className="text-2xl font-bold text-foreground">May 2024</h1>
        </div>
      </header>

      {/* Calendar */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">Date</span>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xs text-muted-foreground mb-2">{day}</div>
                <div
                  className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-semibold ${
                    dates[idx] === today
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground"
                  }`}
                >
                  {dates[idx]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Today's Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-workout-pink/20 border-2 border-workout-pink/30 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Calories Goal</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{todayActivity.caloriesGoal}</p>
            <p className="text-xs text-muted-foreground">kcal</p>
          </div>

          <div className="bg-workout-purple/20 border-2 border-workout-purple/30 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Burned</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{todayActivity.caloriesBurned}</p>
            <p className="text-xs text-muted-foreground">kcal</p>
          </div>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary mb-1">
              {todayActivity.caloriesBurned} kcal
            </p>
            <p className="text-sm text-muted-foreground">Burned</p>
            <p className="text-xl font-bold text-foreground mt-4">
              {todayActivity.caloriesRemaining} kcal
            </p>
            <p className="text-sm text-muted-foreground">Remaining</p>
          </div>
          <ProgressRing progress={progressPercent} />
        </div>
      </div>

      {/* Today's Challenges */}
      <div className="px-6 mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Today's Challenges</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
          {challenges.map((ch, idx) => (
            <div
              key={idx}
              className="relative min-w-[260px] max-w-xs bg-primary/20 rounded-2xl p-4 overflow-hidden h-32 flex flex-col justify-end shadow-lg cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <img
                src={
                  ch.image === 'challenge-running' ? challengeRunning :
                  ch.image === 'workout-squats' ? workoutSquats :
                  ch.image === 'workout-lunges' ? workoutLunges :
                  ch.image === 'workout-pushups' ? workoutPushups :
                  challengeRunning
                }
                alt={ch.title}
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
              />
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-primary-foreground mb-1">{ch.title}</h3>
                <p className="text-sm text-primary-foreground/90">{ch.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Fitness Trainers */}
      <div className="px-6 mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Top Fitness Trainers</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Example trainers, you can expand this list */}
          <div className="bg-card rounded-2xl p-4 flex items-center gap-4 shadow">
            <img src={logoImage} alt="Emma Johnson" className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
            <div>
              <div className="font-bold text-lg">Emma Johnson</div>
              <div className="text-sm text-muted-foreground mb-1">Strength & Conditioning</div>
              <div className="text-primary font-semibold">$40/session</div>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-4 flex items-center gap-4 shadow">
            <img src={logoImage} alt="Liam Smith" className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
            <div>
              <div className="font-bold text-lg">Liam Smith</div>
              <div className="text-sm text-muted-foreground mb-1">Cardio & HIIT</div>
              <div className="text-primary font-semibold">$35/session</div>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-4 flex items-center gap-4 shadow">
            <img src={logoImage} alt="Sophia Lee" className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
            <div>
              <div className="font-bold text-lg">Sophia Lee</div>
              <div className="text-sm text-muted-foreground mb-1">Yoga & Flexibility</div>
              <div className="text-primary font-semibold">$30/session</div>
            </div>
          </div>
        </div>
      </div>



      <BottomNav />
    </div>
  );
};

export default ActivityDashboard;
