import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, SkipBack, SkipForward, X, Flame, Timer, Trophy, TrendingUp } from "lucide-react";
import { workouts } from "@/lib/workouts";
import logoImage from "@/assets/logo.png";
import { Progress } from "@/components/ui/progress";

const WorkoutSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = workouts.find((w) => w.id === id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const totalSets = 6;
  const caloriesBurned = Math.round((elapsed / 60) * 8);
  const progress = (currentSet / totalSets) * 100;

  useEffect(() => {
    if (!workout) {
      navigate("/workouts");
      return;
    }
  }, [workout, navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!workout) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getImagePath = () => {
    try {
      return new URL(`/src/assets/${workout.image}.jpg`, import.meta.url).href;
    } catch {
      return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Workout image - reduced height */}
      <div className="relative h-[35vh] sm:h-[40vh] md:h-[45vh] overflow-hidden flex-shrink-0">
        <img
          src={getImagePath()}
          alt={workout.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-xl blur-md"></div>
              <div className="relative bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                <img src={logoImage} alt="MY GYM" className="w-6 h-6 sm:w-8 sm:h-8 object-contain brightness-0 invert" />
              </div>
            </div>
            <button
              onClick={() => navigate("/workouts")}
              className="p-2 rounded-xl bg-background/20 backdrop-blur-sm border border-white/10 hover:bg-background/30 transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          {/* Workout Info - Compact */}
          <div className="space-y-1">
            <div className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
              <span className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wide">Active Workout</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{workout.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-white/80">
              {workout.exercises.slice(0, 2).map((exercise, idx) => (
                <span key={idx} className="text-[10px] sm:text-xs">• {exercise}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicator - Compact */}
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 z-10">
          <div className="bg-background/20 backdrop-blur-xl rounded-xl p-2 sm:p-3 border border-white/10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] sm:text-xs text-white/80">Progress</span>
              <span className="text-[10px] sm:text-xs font-bold text-white">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1 sm:h-1.5 bg-white/20" />
          </div>
        </div>

        {/* Progress Indicator - Compact */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
          <div className="bg-background/20 backdrop-blur-xl rounded-xl p-3 border border-white/10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-white/80">Progress</span>
              <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-white/20" />
          </div>
        </div>
      </div>

      {/* Control panel */}
      <div className="relative z-20 bg-gradient-to-b from-card to-background rounded-t-3xl p-6 sm:p-8 space-y-6 shadow-[0_-8px_32px_-8px_rgba(0,0,0,0.4)] border-t border-primary/20">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="card-gradient rounded-xl p-3 sm:p-4 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-primary/20 rounded-lg">
                <Timer className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Time</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gradient-primary">{formatTime(elapsed)}</p>
          </div>

          <div className="card-gradient rounded-xl p-3 sm:p-4 border border-purple-500/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-purple-500/20 rounded-lg">
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-xs text-muted-foreground">Set</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">
              {currentSet}<span className="text-lg text-muted-foreground">/{totalSets}</span>
            </p>
          </div>

          <div className="card-gradient rounded-xl p-3 sm:p-4 border border-orange-500/10 col-span-2 sm:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-orange-500/20 rounded-lg">
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
              <span className="text-xs text-muted-foreground">Calories Burned</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gradient-secondary">{caloriesBurned} <span className="text-lg text-muted-foreground">kcal</span></p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <button 
              onClick={() => setCurrentSet((prev) => Math.max(prev - 1, 1))}
              disabled={currentSet <= 1}
              className="p-3 sm:p-4 rounded-full bg-muted/50 hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-border/50"
            >
              <SkipBack className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-5 sm:p-6 rounded-full bg-gradient-to-br from-primary to-secondary hover:opacity-90 transition-all glow-primary scale-110"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="white" />
              ) : (
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="white" />
              )}
            </button>

            <button 
              onClick={() => setCurrentSet((prev) => Math.min(prev + 1, totalSets))}
              disabled={currentSet >= totalSets}
              className="p-3 sm:p-4 rounded-full bg-muted/50 hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-border/50"
            >
              <SkipForward className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </button>
          </div>

          {/* Next set button */}
          <button
            onClick={() => {
              if (currentSet >= totalSets) {
                navigate("/workouts");
              } else {
                setCurrentSet((prev) => Math.min(prev + 1, totalSets));
              }
            }}
            className="w-full py-4 sm:py-5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all glow-primary"
          >
            <span className="text-base sm:text-lg font-bold text-white flex items-center justify-center gap-2">
              {currentSet >= totalSets ? (
                <>
                  <Trophy className="w-5 h-5" />
                  Workout Complete!
                </>
              ) : (
                <>
                  Next Set ({currentSet + 1}/{totalSets})
                </>
              )}
            </span>
          </button>

          {/* Rest timer suggestion */}
          {isPlaying && (
            <div className="text-center p-3 bg-primary/10 rounded-xl border border-primary/20 animate-pulse">
              <p className="text-sm text-muted-foreground">
                Rest for <span className="font-bold text-primary">30-60 seconds</span> between sets
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutSession;
