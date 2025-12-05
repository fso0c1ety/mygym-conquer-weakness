import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, X, Flame, Timer, Trophy, CheckCircle2, ChevronRight, SkipForward, Video } from "lucide-react";
import { workouts } from "@/lib/workouts";
import { saveWorkoutToHistory, checkNewAchievements } from "@/lib/workoutTracking";
import logoImage from "@/assets/logo.png";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const WorkoutSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const workout = workouts.find((w) => w.id === id);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [completedSets, setCompletedSets] = useState<Set<string>>(new Set());
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  const timerRef = useRef<NodeJS.Timeout>();
  const restTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!workout) {
      navigate("/workouts");
      return;
    }
  }, [workout, navigate]);

  // Workout timer
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setWorkoutTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // Rest timer
  useEffect(() => {
    if (isResting && restTimeLeft > 0) {
      restTimerRef.current = setInterval(() => {
        setRestTimeLeft((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            toast({
              title: "Rest Complete!",
              description: "Ready for your next set",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    }
    return () => {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    };
  }, [isResting, restTimeLeft, toast]);

  if (!workout) return null;

  const currentExercise = workout.exercises[currentExerciseIndex];
  const totalExercises = workout.exercises.length;
  const caloriesBurned = Math.round((workoutTime / 60) * (workout.calories / workout.duration));
  
  // Calculate overall progress
  const totalSets = workout.exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const completedSetsCount = completedSets.size;
  const overallProgress = (completedSetsCount / totalSets) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCompleteSet = () => {
    const setKey = `${currentExerciseIndex}-${currentSet}`;
    setCompletedSets(new Set([...completedSets, setKey]));

    if (currentSet < currentExercise.sets) {
      // Start rest timer
      setIsResting(true);
      setRestTimeLeft(currentExercise.rest);
      setCurrentSet(currentSet + 1);
      toast({
        title: "Set Complete! 💪",
        description: `Rest for ${currentExercise.rest} seconds`,
      });
    } else {
      // Move to next exercise
      if (currentExerciseIndex < totalExercises - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        toast({
          title: "Exercise Complete! 🎯",
          description: `Moving to ${workout.exercises[currentExerciseIndex + 1].name}`,
        });
      } else {
        // Workout complete
        handleWorkoutComplete();
      }
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestTimeLeft(0);
  };

  const handleWorkoutComplete = () => {
    setIsTimerRunning(false);
    
    // Save workout to history
    saveWorkoutToHistory({
      workoutId: workout.id,
      workoutName: workout.title,
      date: new Date().toISOString(),
      duration: Math.floor(workoutTime / 60), // convert to minutes
      caloriesBurned: caloriesBurned,
      exercisesCompleted: totalExercises,
      totalSets: completedSetsCount
    });
    
    // Check for new achievements
    const newAchievements = checkNewAchievements();
    
    // Show workout complete toast
    toast({
      title: "Workout Complete! 🎉",
      description: `Great job! You burned ${caloriesBurned} calories`,
    });
    
    // Show achievement toasts
    if (newAchievements.length > 0) {
      newAchievements.forEach((achievement, index) => {
        setTimeout(() => {
          toast({
            title: `🏆 Achievement Unlocked!`,
            description: `${achievement.icon} ${achievement.title}: ${achievement.description}`,
            duration: 5000,
          });
        }, 1000 + (index * 1500)); // Stagger the achievement notifications
      });
      
      // Navigate after showing all achievements
      setTimeout(() => navigate("/workouts"), 2000 + (newAchievements.length * 1500));
    } else {
      setTimeout(() => navigate("/workouts"), 2000);
    }
  };

  const isSetComplete = (exerciseIdx: number, setNum: number) => {
    return completedSets.has(`${exerciseIdx}-${setNum}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden pb-safe">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="px-4 sm:px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-xl blur-md"></div>
                <div className="relative bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                  <img src={logoImage} alt="MY GYM" className="w-7 h-7 object-contain brightness-0 invert" />
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">In Progress</div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground">{workout.title}</h1>
              </div>
            </div>
            <button
              onClick={() => navigate("/workouts")}
              className="p-2 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="card-gradient rounded-xl p-3 border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Overall Progress</span>
              <span className="text-xs font-bold text-foreground">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2 bg-muted" />
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-muted-foreground">{completedSetsCount} / {totalSets} sets</span>
              <span className="text-muted-foreground">Exercise {currentExerciseIndex + 1} of {totalExercises}</span>
            </div>
          </div>
        </div>

        {/* Main Exercise Display */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 space-y-4">
          {/* Current Exercise Card */}
          <div className="card-gradient-glow rounded-2xl p-6 border-2 border-primary/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-primary/20 rounded-full mb-3">
                  <span className="text-xs font-bold text-primary uppercase tracking-wide">Current Exercise</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gradient-primary mb-2">{currentExercise.name}</h2>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  {currentExercise.targetMuscles.map((muscle, idx) => (
                    <span key={idx} className="px-2 py-1 bg-muted/50 rounded-lg">{muscle}</span>
                  ))}
                </div>
              </div>
              <div className="text-5xl opacity-20">💪</div>
            </div>

            {/* Set tracker */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {Array.from({ length: currentExercise.sets }).map((_, idx) => {
                const setNum = idx + 1;
                const isComplete = isSetComplete(currentExerciseIndex, setNum);
                const isCurrent = setNum === currentSet;
                
                return (
                  <div
                    key={setNum}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      isComplete
                        ? 'bg-green-500/20 border-green-500/50'
                        : isCurrent
                        ? 'bg-primary/20 border-primary/50 ring-2 ring-primary/30'
                        : 'bg-muted/30 border-border/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">Set {setNum}</span>
                      {isComplete && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    </div>
                    <div className="text-lg font-bold text-foreground">{currentExercise.reps}</div>
                  </div>
                );
              })}
            </div>

            {/* Video Player */}
            {showVideo && currentExercise.videoUrl && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Video className="w-4 h-4 text-primary" />
                    Exercise Demonstration
                  </h3>
                  <Button
                    onClick={() => setShowVideo(false)}
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                  >
                    Hide Video
                  </Button>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black border-2 border-primary/20">
                  <iframe
                    src={`${currentExercise.videoUrl}?autoplay=0&rel=0&modestbranding=1`}
                    title={currentExercise.name}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                </div>
              </div>
            )}

            {!showVideo && currentExercise.videoUrl && (
              <Button
                onClick={() => setShowVideo(true)}
                variant="outline"
                className="w-full mb-4"
              >
                <Video className="w-4 h-4 mr-2" />
                Show Exercise Video
              </Button>
            )}

            {/* Instructions */}
            <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
              <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                How to perform:
              </h3>
              <ol className="space-y-1.5 text-sm text-muted-foreground">
                {currentExercise.instructions.map((instruction, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="font-bold text-primary">{idx + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="card-gradient rounded-xl p-4 border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-primary/20 rounded-lg">
                  <Timer className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Time</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gradient-primary">{formatTime(workoutTime)}</p>
            </div>

            <div className="card-gradient rounded-xl p-4 border border-orange-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-orange-500/20 rounded-lg">
                  <Flame className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-xs text-muted-foreground">Calories</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gradient-secondary">{caloriesBurned}</p>
            </div>

            <div className="card-gradient rounded-xl p-4 border border-purple-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-purple-500/20 rounded-lg">
                  <Trophy className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-xs text-muted-foreground">Set</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-foreground">
                {currentSet}<span className="text-sm text-muted-foreground">/{currentExercise.sets}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="px-4 sm:px-6 py-4 bg-gradient-to-t from-background via-background/95 to-background/80 backdrop-blur-xl border-t border-border/50">
          {isResting ? (
            <div className="space-y-3">
              <div className="card-gradient-glow rounded-xl p-4 border border-primary/20 text-center">
                <div className="text-sm text-muted-foreground mb-1">Rest Time</div>
                <div className="text-4xl font-bold text-gradient-primary mb-2">{formatTime(restTimeLeft)}</div>
                <Progress value={((currentExercise.rest - restTimeLeft) / currentExercise.rest) * 100} className="h-2 bg-muted mb-3" />
                <Button
                  onClick={handleSkipRest}
                  variant="outline"
                  className="w-full"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Skip Rest
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {!isTimerRunning && completedSetsCount === 0 && (
                <Button
                  onClick={() => setIsTimerRunning(true)}
                  className="w-full bg-gradient-to-r from-primary to-secondary glow-primary h-14 text-lg font-bold"
                >
                  <Play className="w-6 h-6 mr-2" fill="white" />
                  Start Workout
                </Button>
              )}

              {isTimerRunning && (
                <>
                  <Button
                    onClick={handleCompleteSet}
                    className="w-full bg-gradient-to-r from-primary to-secondary glow-primary h-14 text-lg font-bold"
                  >
                    {currentSet >= currentExercise.sets && currentExerciseIndex >= totalExercises - 1 ? (
                      <>
                        <Trophy className="w-6 h-6 mr-2" />
                        Complete Workout
                      </>
                    ) : currentSet >= currentExercise.sets ? (
                      <>
                        <ChevronRight className="w-6 h-6 mr-2" />
                        Next Exercise
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-6 h-6 mr-2" />
                        Complete Set {currentSet}
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => setIsTimerRunning(false)}
                    variant="outline"
                    className="w-full h-12"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Pause Workout
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutSession;
