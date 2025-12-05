import { useNavigate } from "react-router-dom";
import { Workout } from "@/lib/workouts";
import { Clock, Zap, TrendingUp, Bell, BellOff } from "lucide-react";
import { useState, useEffect, memo } from "react";
import { getWorkoutReminder, saveWorkoutReminder, deleteWorkoutReminder, requestWorkoutNotificationPermission } from "@/lib/workoutReminders";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = memo(({ workout }: WorkoutCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [reminderTime, setReminderTime] = useState("07:00");
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]); // Mon-Fri default
  const [hasReminder, setHasReminder] = useState(false);
  
  useEffect(() => {
    const reminder = getWorkoutReminder(workout.id);
    setHasReminder(reminder?.enabled || false);
    if (reminder) {
      setReminderTime(reminder.time);
      setSelectedDays(reminder.days);
    }
  }, [workout.id]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

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
      case "red":
        return "from-red-500/30 to-red-600/30 border-red-500/30";
      case "blue":
        return "from-blue-500/30 to-blue-600/30 border-blue-500/30";
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
      case "red":
        return "hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.4)]";
      case "blue":
        return "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]";
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
  
  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };
  
  const handleSetReminder = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (hasReminder) {
      // Delete existing reminder
      deleteWorkoutReminder(workout.id);
      setHasReminder(false);
      toast({
        title: "Reminder Removed",
        description: "Workout reminder has been disabled",
      });
    } else {
      // Open dialog to set new reminder
      setReminderDialogOpen(true);
    }
  };
  
  const handleSaveReminder = async () => {
    const granted = await requestWorkoutNotificationPermission();
    
    if (!granted) {
      toast({
        title: "Permission Denied",
        description: "Please enable notifications in your browser settings",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedDays.length === 0) {
      toast({
        title: "Select Days",
        description: "Please select at least one day for the reminder",
        variant: "destructive"
      });
      return;
    }
    
    saveWorkoutReminder({
      workoutId: workout.id,
      workoutName: workout.title,
      time: reminderTime,
      enabled: true,
      days: selectedDays
    });
    
    setHasReminder(true);
    setReminderDialogOpen(false);
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const selectedDayNames = selectedDays.map(d => dayNames[d]).join(', ');
    
    toast({
      title: "Reminder Set! 🔔",
      description: `${workout.title} at ${reminderTime} on ${selectedDayNames}`,
    });
  };

  return (
    <>
      <div
        onClick={() => navigate(`/workout/${workout.id}`)}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getColorClass(workout.color)} border backdrop-blur-sm p-5 cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${getGlowClass(workout.color)}`}
      >
        {/* Reminder badge */}
        {hasReminder && (
          <div className="absolute top-3 right-3 z-20">
            <div className="bg-green-500/20 backdrop-blur-sm text-green-400 border border-green-500/30 rounded-full p-1.5">
              <Bell className="w-3 h-3" />
            </div>
          </div>
        )}
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-foreground">{workout.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(workout.difficulty)} font-semibold uppercase tracking-wide`}>
                {workout.difficulty}
              </span>
            </div>
            {workout.description && (
              <p className="text-sm text-muted-foreground mb-2">{workout.description}</p>
            )}
            <p className="text-xs text-muted-foreground line-clamp-1">
              {workout.exercises.map(e => e.name).join(" • ")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-border/50">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm font-bold text-foreground">{workout.duration}</span>
              <span className="text-xs text-muted-foreground">min</span>
            </div>
            <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-border/50">
              <Zap className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-sm font-bold text-foreground">{workout.calories}</span>
              <span className="text-xs text-muted-foreground">cal</span>
            </div>
            <button
              onClick={handleSetReminder}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 border transition-all ${
                hasReminder 
                  ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                  : 'bg-background/60 backdrop-blur-sm border-border/50 text-muted-foreground hover:text-primary'
              }`}
            >
              {hasReminder ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
            </button>
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
    
    {/* Reminder Dialog */}
    <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
      <DialogContent className="card-gradient border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-gradient-primary">Set Workout Reminder</DialogTitle>
          <DialogDescription>Schedule a reminder for {workout.title}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="bg-background/50 border-border/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Days of Week</Label>
            <div className="flex gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleDay(index)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedDays.includes(index)
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setReminderDialogOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveReminder}
            className="flex-1 bg-gradient-to-r from-primary to-secondary"
          >
            Set Reminder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </>
  );
});

WorkoutCard.displayName = 'WorkoutCard';

export default WorkoutCard;
