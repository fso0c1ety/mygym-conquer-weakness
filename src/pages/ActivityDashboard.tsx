import { Calendar, Flame } from "lucide-react";
import ProgressRing from "@/components/ProgressRing";
import BottomNav from "@/components/BottomNav";
import { todayActivity, getTodaysChallenge } from "@/lib/workouts";
import logoImage from "@/assets/logo.png";
import challengeImage from "@/assets/challenge-running.jpg";

const ActivityDashboard = () => {
  const challenge = getTodaysChallenge();
  const progressPercent = (todayActivity.caloriesBurned / todayActivity.caloriesGoal) * 100;

  const daysOfWeek = ["M", "T", "W", "T", "F", "S"];
  const dates = [5, 16, 18, 20, 21, 22];
  const today = 16;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm text-muted-foreground">Your Activity</h2>
          <h1 className="text-2xl font-bold text-foreground">May 2024</h1>
        </div>
        <img src={logoImage} alt="MY GYM" className="w-12 h-12 object-contain" />
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

      {/* Today's Challenge */}
      <div className="px-6 mb-6">
        <div className="relative bg-primary rounded-2xl p-4 overflow-hidden h-32">
          <img
            src={challengeImage}
            alt="Challenge"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
          />
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-primary-foreground mb-1">
              {challenge.title}
            </h3>
            <p className="text-sm text-primary-foreground/90">
              {challenge.description}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="px-6 mb-6">
        <div className="flex gap-2">
          <button className="bg-foreground text-background px-6 py-2 rounded-full text-sm font-semibold">
            All
          </button>
          <button className="bg-card text-foreground px-6 py-2 rounded-full text-sm font-semibold">
            Running
          </button>
          <button className="bg-card text-foreground px-6 py-2 rounded-full text-sm font-semibold">
            Cycling
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mb-6 grid grid-cols-2 gap-4">
        <div className="bg-workout-pink/20 border-2 border-workout-pink/30 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Goal</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{todayActivity.caloriesGoal}</p>
          <p className="text-xs text-muted-foreground">kcal</p>
        </div>

        <div className="bg-workout-purple/20 border-2 border-workout-purple/30 rounded-2xl p-4">
          <span className="text-sm text-muted-foreground mb-2 block">My Goals</span>
          <p className="text-lg font-bold text-foreground">Lose confirm</p>
          <p className="text-xs text-muted-foreground">years rollins</p>
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

      <BottomNav />
    </div>
  );
};

export default ActivityDashboard;
