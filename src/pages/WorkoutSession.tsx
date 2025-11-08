import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, SkipBack, SkipForward, X } from "lucide-react";
import { workouts } from "@/lib/workouts";
import logoImage from "@/assets/logo.png";

const WorkoutSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = workouts.find((w) => w.id === id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const totalSets = 6;
  const caloriesBurned = Math.round((elapsed / 60) * 8);

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Full-screen workout image */}
      <div className="relative flex-1 overflow-hidden">
        <img
          src={getImagePath()}
          alt={workout.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/90" />

        {/* Close button */}
        <button
          onClick={() => navigate("/workouts")}
          className="absolute top-6 right-6 p-2 rounded-full bg-background/80 backdrop-blur-sm"
        >
          <X className="w-6 h-6 text-foreground" />
        </button>

        {/* Logo */}
        <div className="absolute top-6 left-6">
          <img src={logoImage} alt="MY GYM" className="w-12 h-12 object-contain" />
        </div>

        {/* Workout title */}
        <div className="absolute top-20 left-6 right-6">
          <h1 className="text-3xl font-bold text-foreground">Your Workout</h1>
          <p className="text-lg text-muted-foreground mt-1">{workout.title}</p>
        </div>
      </div>

      {/* Control panel */}
      <div className="bg-foreground rounded-t-3xl p-6 space-y-6">
        {/* Stats */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-background/60 mb-1">Elapsed</p>
            <p className="text-3xl font-bold text-background">{formatTime(elapsed)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-background/60 mb-1">Set</p>
            <p className="text-3xl font-bold text-background">
              {currentSet}/{totalSets}
            </p>
          </div>
        </div>

        {/* Calories */}
        <div className="bg-background/10 rounded-2xl p-4">
          <p className="text-sm text-background/60 mb-1">Calories Burned</p>
          <p className="text-2xl font-bold text-background">{caloriesBurned} kcal</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button className="p-4 rounded-full bg-primary hover:bg-primary/90 transition-colors">
            <SkipBack className="w-6 h-6 text-primary-foreground" fill="white" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-6 rounded-full bg-primary hover:bg-primary/90 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-primary-foreground" fill="white" />
            ) : (
              <Play className="w-8 h-8 text-primary-foreground" fill="white" />
            )}
          </button>

          <button className="p-4 rounded-full bg-primary hover:bg-primary/90 transition-colors">
            <SkipForward className="w-6 h-6 text-primary-foreground" fill="white" />
          </button>
        </div>

        {/* Next set button */}
        <button
          onClick={() => setCurrentSet((prev) => Math.min(prev + 1, totalSets))}
          disabled={currentSet >= totalSets}
          className="w-full py-4 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="text-lg font-bold text-primary-foreground">
            {currentSet >= totalSets ? "Workout Complete!" : "Next Set"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default WorkoutSession;
