import { useNavigate } from "react-router";
import { BottomNav } from "../BottomNav";
import { ArrowLeft, Footprints, TrendingUp, Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function StepTracking() {
  const navigate = useNavigate();
  const { stats, addSteps } = useApp();

  const percent = Math.min(Math.round((stats.steps / stats.stepsGoal) * 100), 100);
  const stepsToGo = stats.stepsGoal - stats.steps;
  const distanceKm = (stats.steps * 0.0008).toFixed(1); // approx 0.8m per step
  const caloriesBurned = Math.round(stats.steps * 0.04); // approx 0.04 cal per step

  return (
    <div className="min-h-screen pb-24">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl">Step Tracking</h1>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white mb-6 text-center shadow-lg">
          <Footprints size={48} className="mx-auto mb-4 animate-bounce" />
          <h2 className="text-6xl mb-2 font-semibold">{stats.steps.toLocaleString()}</h2>
          <p className="text-white/80 text-lg mb-4">of {stats.stepsGoal.toLocaleString()} steps</p>
          <div className="w-full bg-white/20 rounded-full h-3 mb-2">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-white/90 text-sm">
            {stepsToGo > 0 ? `${stepsToGo.toLocaleString()} steps to go!` : "Daily step goal achieved!"}
          </p>
        </div>

        {/* Simulator controls */}
        <div className="bg-card rounded-2xl p-5 border border-border mb-6">
          <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
            <Plus size={18} className="text-primary" />
            Log / Simulate Steps
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => addSteps(1000)}
              className="bg-muted hover:bg-primary hover:text-white transition-colors py-2 px-3 rounded-xl text-sm"
            >
              +1,000
            </button>
            <button
              onClick={() => addSteps(2500)}
              className="bg-muted hover:bg-primary hover:text-white transition-colors py-2 px-3 rounded-xl text-sm"
            >
              +2,500
            </button>
            <button
              onClick={() => addSteps(5000)}
              className="bg-muted hover:bg-primary hover:text-white transition-colors py-2 px-3 rounded-xl text-sm"
            >
              +5,000
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-2xl p-5 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Distance</p>
            <h3 className="text-3xl mb-1">{distanceKm} km</h3>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Calories</p>
            <h3 className="text-3xl mb-1">{caloriesBurned} cal</h3>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-primary" />
            <h3 className="text-lg">Weekly Progress</h3>
          </div>
          <div className="space-y-3">
            {[
              { day: "Monday", steps: 8234, percent: 82 },
              { day: "Tuesday", steps: 10452, percent: 100 },
              { day: "Wednesday", steps: 7891, percent: 79 },
              { day: "Thursday", steps: 11234, percent: 100 },
              { day: "Friday", steps: 6543, percent: 65 },
              { day: "Saturday", steps: 9876, percent: 99 },
              { day: "Today", steps: stats.steps, percent: percent },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{item.day}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.steps.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border">
          <h3 className="text-lg mb-4">Hourly Activity</h3>
          <div className="flex items-end gap-1 h-40">
            {[200, 450, 680, 920, 1100, 1300, 1450, 1580, 1720, 1880, stats.steps % 3000].map((steps, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end">
                <div
                  className="bg-primary/30 rounded-t"
                  style={{ height: `${Math.max(5, (steps / 3000) * 100)}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

