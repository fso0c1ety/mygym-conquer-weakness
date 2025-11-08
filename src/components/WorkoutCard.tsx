import { useNavigate } from "react-router-dom";
import { Workout } from "@/lib/workouts";
import logoImage from "@/assets/logo.png";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const navigate = useNavigate();

  const getColorClass = (color: string) => {
    switch (color) {
      case "purple":
        return "bg-workout-purple/20 border-workout-purple/30";
      case "pink":
        return "bg-workout-pink/20 border-workout-pink/30";
      case "yellow":
        return "bg-workout-yellow/20 border-workout-yellow/30";
      case "green":
        return "bg-workout-green/20 border-workout-green/30";
      default:
        return "bg-primary/20 border-primary/30";
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
      className={`relative overflow-hidden rounded-2xl border-2 ${getColorClass(workout.color)} p-4 cursor-pointer transition-transform hover:scale-105 active:scale-95`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-1">{workout.title}</h3>
          <p className="text-sm text-muted-foreground">
            {workout.exercises.join(" | ")}
          </p>
        </div>
        <div className="ml-4">
          <img src={logoImage} alt="MY GYM" className="w-12 h-12 object-contain" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-background/50 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-lg font-bold text-foreground">{workout.duration}</span>
            <span className="text-xs text-muted-foreground ml-1">MINS</span>
          </div>
        </div>
        
        {workout.image && (
          <div className="w-20 h-20 rounded-xl overflow-hidden">
            <img
              src={getImagePath()}
              alt={workout.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
