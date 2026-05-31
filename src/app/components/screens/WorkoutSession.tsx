import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Play, Pause, Square, Trophy, Flame, Clock } from "lucide-react";
import { useApp } from "../../context/AppContext";
// @ts-ignore
import confetti from "canvas-confetti";

export function WorkoutSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const { completeWorkout } = useApp();

  // Get workout details from route state, or default to a full body strength workout
  const workout = location.state?.workout || {
    title: "Full Body Strength",
    duration: "45 min",
    calories: "350 cal",
    difficulty: "Intermediate",
  };

  const totalDurationSeconds = 60; // 1-minute demo timer
  const [secondsLeft, setSecondsLeft] = useState(totalDurationSeconds);
  const [isActive, setIsActive] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((seconds => seconds - 1));
      }, 1000);
    } else if (secondsLeft === 0 && !isCompleted) {
      handleWorkoutComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, isCompleted]);

  const handleWorkoutComplete = () => {
    setIsActive(false);
    setIsCompleted(true);
    
    // Parse values
    const durationMin = parseInt(workout.duration) || 20;
    const calBurned = parseInt(workout.calories) || 150;
    
    completeWorkout(workout.title, durationMin, calBurned);
    
    // Fire confetti!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
    
    // Extra bursts
    setTimeout(() => {
      confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
    }, 200);
    setTimeout(() => {
      confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
    }, 400);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = ((totalDurationSeconds - secondsLeft) / totalDurationSeconds) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen p-6 flex flex-col justify-center items-center text-center bg-background">
        <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6 animate-bounce shadow">
          <Trophy size={48} className="text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Workout Completed!</h1>
        <p className="text-muted-foreground mb-8">
          Incredible effort! You finished your <span className="font-semibold text-foreground">{workout.title}</span>.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-xs space-y-4 mb-8">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <span className="text-muted-foreground flex items-center gap-2">
              <Clock size={18} className="text-primary" /> Duration
            </span>
            <span className="font-semibold">{workout.duration}</span>
          </div>
          <div className="flex justify-between items-center border-b border-border pb-3">
            <span className="text-muted-foreground flex items-center gap-2">
              <Flame size={18} className="text-orange-500" /> Burned
            </span>
            <span className="font-semibold">~{workout.calories}</span>
          </div>
          <div className="flex justify-between items-center text-primary font-bold">
            <span className="flex items-center gap-2">
              <Trophy size={18} /> Points Earned
            </span>
            <span>+250 XP</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/workout")}
          className="w-full max-w-xs bg-primary hover:bg-primary/95 text-white py-4 rounded-2xl font-bold shadow active:scale-[0.98] transition-transform"
        >
          Return to Workouts
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col bg-background">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="hover:text-primary transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-semibold">Active Session</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
          {workout.difficulty}
        </span>
        <h2 className="text-3xl font-bold mb-8 text-center">{workout.title}</h2>

        {/* Circular Countdown Progress */}
        <div className="w-64 h-64 relative mb-12">
          <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="var(--border)"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="6"
              strokeDasharray={`${progressPercent * 2.764} ${100 * 2.764}`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-mono font-bold tracking-tight">
              {formatTime(secondsLeft)}
            </span>
            <span className="text-xs text-muted-foreground mt-1">remaining</span>
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex items-center gap-6 mb-8">
          <button
            onClick={() => setIsActive(!isActive)}
            className="w-16 h-16 rounded-full bg-primary hover:bg-primary/95 text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            {isActive ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
          </button>
          
          <button
            onClick={handleWorkoutComplete}
            className="w-12 h-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-destructive hover:text-white transition-colors shadow active:scale-95"
            title="Complete Workout"
          >
            <Square size={20} fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 flex justify-around text-center">
        <div>
          <span className="text-xs text-muted-foreground block mb-1">Target Burn</span>
          <span className="font-semibold flex items-center gap-1 text-orange-600 justify-center">
            <Flame size={16} /> ~{workout.calories}
          </span>
        </div>
        <div className="border-r border-border h-8 my-auto" />
        <div>
          <span className="text-xs text-muted-foreground block mb-1">Duration</span>
          <span className="font-semibold flex items-center gap-1 justify-center">
            <Clock size={16} /> {workout.duration}
          </span>
        </div>
      </div>
    </div>
  );
}
