import { useNavigate } from "react-router";
import { BottomNav } from "../BottomNav";
import { Footprints, Moon, Flame, Trophy, Accessibility, ChevronRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function Home() {
  const navigate = useNavigate();
  const { stats, completedWorkouts } = useApp();

  // Calculate calories burned: Resting (400) + Active steps (0.04/step) + Workouts
  const workoutCalories = completedWorkouts.reduce((sum, w) => sum + w.cal, 0);
  const activeCalories = Math.round(stats.steps * 0.04) + workoutCalories;
  const totalCaloriesBurned = 400 + activeCalories;

  const stepProgress = Math.min(stats.steps / stats.stepsGoal, 1);
  const sleepProgress = Math.min(stats.sleepHours / stats.sleepGoal, 1);
  const calorieProgress = Math.min(totalCaloriesBurned / stats.caloriesBurnedGoal, 1);

  const dailyProgressPercent = Math.round(((stepProgress + sleepProgress + calorieProgress) / 3) * 100);

  // Format today's date nicely
  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen pb-24">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-1">Hello, Alex</h1>
            <p className="text-muted-foreground">{todayStr}</p>
          </div>
          <button
            onClick={() => navigate("/accessibility")}
            className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center animate-pulse"
          >
            <Accessibility size={24} className="text-primary" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-white shadow-lg">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/80 mb-1">Daily Goal Progress</p>
                <h2 className="text-4xl font-semibold">{dailyProgressPercent}%</h2>
              </div>
              <div className="w-20 h-20">
                <svg className="transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeDasharray={`${dailyProgressPercent * 2.827} ${100 * 2.827}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
              </div>
            </div>
            <p className="text-white/90">
              {dailyProgressPercent >= 100
                ? "Congratulations! You have crushed all your goals for today!"
                : "Keep going! You're making excellent progress today."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate("/steps")}
            className="bg-card rounded-2xl p-5 border border-border text-left hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-3">
              <Footprints size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl mb-1">{stats.steps.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Steps Today</p>
          </button>

          <button
            onClick={() => navigate("/sleep")}
            className="bg-card rounded-2xl p-5 border border-border text-left hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-3">
              <Moon size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl mb-1">{stats.sleepHours}h</h3>
            <p className="text-sm text-muted-foreground">Sleep Last Night</p>
          </button>

          <button
            onClick={() => navigate("/calories")}
            className="bg-card rounded-2xl p-5 border border-border text-left hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-3">
              <Flame size={24} className="text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-2xl mb-1">{totalCaloriesBurned.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Calories Burned</p>
          </button>

          <button
            onClick={() => navigate("/rewards")}
            className="bg-card rounded-2xl p-5 border border-border text-left hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mb-3">
              <Trophy size={24} className="text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-2xl mb-1">{stats.rewardPoints.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Reward Points</p>
          </button>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">This Week's Activity</h3>
            <ChevronRight size={20} className="text-muted-foreground" />
          </div>
          <div className="flex items-end gap-2 h-32">
            {[65, 82, 75, 90, 68, dailyProgressPercent, 85].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end">
                <div
                  className={`rounded-t-lg transition-all duration-500 ${
                    i === 5 ? "bg-primary" : "bg-primary/20"
                  }`}
                  style={{ height: `${Math.max(5, Math.min(height, 100))}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

