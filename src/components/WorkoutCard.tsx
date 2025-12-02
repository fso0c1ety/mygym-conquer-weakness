import { useNavigate } from "react-router-dom";
import { Workout } from "@/lib/workouts";
import { Clock, Zap } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const navigate = useNavigate();

  const getColorClass = (color: string) => {
    switch (color) {
      case "purple":
        return "from-purple-500/30 to-purple-600/30 border-purple-500/30";
      case "pink":
        return "from-pink-500/30 to-pink-600/30 border-pink-500/30";
      case "yellow":
        return "from-yellow-500/30 to-yellow-600/30 border-yellow-500/30";
      case "green":
        return "from-green-500/30 to-green-600/30 border-green-500/30";
      case "orange":
        return "from-orange-500/30 to-orange-600/30 border-orange-500/30";
      case "cyan":
        return "from-cyan-500/30 to-cyan-600/30 border-cyan-500/30";
      default:
        return "from-primary/30 to-secondary/30 border-primary/30";
    }
  };

  const getGlowClass = (color: string) => {
    switch (color) {
      case "purple":
        return "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]";
      case "pink":
        return "hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.4)]";
      case "yellow":
        return "hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.4)]";
      case "green":
        return "hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.4)]";
      case "orange":
        return "hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)]";
      case "cyan":
        return "hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)]";
      default:
        return "glow-primary";
    }
  };

  const getImagePath = () => {
    try {
      return new URL(`/src/assets/${workout.image}.jpg`, import.meta.url).href;
    } catch {
      return "";
    }
  };

  return (
    <div
      onClick={() => navigate(`/workout/${workout.id}`)}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getColorClass(workout.color)} border backdrop-blur-sm p-5 cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${getGlowClass(workout.color)}`}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">{workout.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {workout.exercises.join(" • ")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-base font-bold text-foreground">{workout.duration}</span>
              <span className="text-xs text-muted-foreground">min</span>
            </div>
            <div className="p-2 bg-primary/20 rounded-full">
              <Zap className="w-4 h-4 text-primary" />
            </div>
          </div>
          
          {workout.image && (
            <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-white/10 shadow-lg">
              <img
                src={getImagePath()}
                alt={workout.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
