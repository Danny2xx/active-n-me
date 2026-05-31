import { useNavigate } from "react-router";
import { BottomNav } from "../BottomNav";
import { ArrowLeft, Moon, Sunrise, Sunset, Plus, Minus } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function SleepTracking() {
  const navigate = useNavigate();
  const { stats, setSleepHours } = useApp();

  const sleepScore = Math.min(Math.round((stats.sleepHours / stats.sleepGoal) * 100), 100);
  const sleepStatus = sleepScore >= 90 ? "Excellent" : sleepScore >= 75 ? "Good" : "Fair";
  const sleepTip = sleepScore >= 90
    ? "Your sleep quality was excellent last night. You got a good balance of all sleep stages."
    : "Try to sleep a bit longer tonight to reach your full 8-hour goal and feel fully recharged!";

  const deepSleep = (stats.sleepHours * 0.3).toFixed(1);
  const remSleep = (stats.sleepHours * 0.24).toFixed(1);
  const lightSleep = (stats.sleepHours * 0.46).toFixed(1);

  return (
    <div className="min-h-screen pb-24">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl">Sleep Tracking</h1>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 text-white mb-6 text-center shadow-lg">
          <Moon size={48} className="mx-auto mb-4 animate-pulse" />
          <h2 className="text-6xl mb-2 font-semibold">{stats.sleepHours}h</h2>
          <p className="text-white/80 text-lg mb-4">Last Night</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Sunset size={16} />
              <span>11:30 PM</span>
            </div>
            <div className="w-1 h-1 bg-white/50 rounded-full" />
            <div className="flex items-center gap-2">
              <Sunrise size={16} />
              <span>{stats.sleepHours === 7.5 ? "7:00 AM" : `${Math.floor((23.5 + stats.sleepHours) % 12 || 12)}:${((23.5 + stats.sleepHours) % 1).toFixed(1) === "0.5" ? "30" : "00"} AM`}</span>
            </div>
          </div>
        </div>

        {/* Interactive Sleep Hours adjusters */}
        <div className="bg-card rounded-2xl p-5 border border-border mb-6">
          <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
            <Moon size={18} className="text-purple-600" />
            Log Sleep Duration
          </h3>
          <div className="flex items-center justify-between bg-muted p-3 rounded-xl">
            <button
              onClick={() => setSleepHours(Math.max(1, stats.sleepHours - 0.5))}
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow hover:bg-gray-50 transition-colors"
            >
              <Minus size={20} className="text-purple-600" />
            </button>
            <span className="text-xl font-medium">{stats.sleepHours} Hours</span>
            <button
              onClick={() => setSleepHours(Math.min(15, stats.sleepHours + 0.5))}
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow hover:bg-gray-50 transition-colors"
            >
              <Plus size={20} className="text-purple-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-2xl p-4 border border-border">
            <p className="text-muted-foreground text-xs mb-2">Deep Sleep</p>
            <h3 className="text-2xl mb-1">{deepSleep}h</h3>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <p className="text-muted-foreground text-xs mb-2">REM</p>
            <h3 className="text-2xl mb-1">{remSleep}h</h3>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <p className="text-muted-foreground text-xs mb-2">Light</p>
            <h3 className="text-2xl mb-1">{lightSleep}h</h3>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border mb-6">
          <h3 className="text-lg mb-4">Sleep Stages</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex gap-1">
                  <div className="h-8 bg-purple-600 rounded transition-all duration-500" style={{ width: "30%" }} />
                  <div className="h-8 bg-purple-400 rounded transition-all duration-500" style={{ width: "24%" }} />
                  <div className="h-8 bg-purple-200 rounded transition-all duration-500" style={{ width: "46%" }} />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">11:30 PM</span>
              <span className="text-muted-foreground">Wake Up</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded" />
              <span className="text-xs text-muted-foreground">Deep (30%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded" />
              <span className="text-xs text-muted-foreground">REM (24%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-200 rounded" />
              <span className="text-xs text-muted-foreground">Light (46%)</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border">
          <h3 className="text-lg mb-4">Sleep Quality Score</h3>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 relative flex-shrink-0">
              <svg className="transform -rotate-90 w-24 h-24" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e5e5"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="8"
                  strokeDasharray={`${sleepScore * 2.513} ${100 * 2.513}`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">{sleepScore}</h2>
                <p className="text-[10px] text-muted-foreground">{sleepStatus}</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                {sleepTip}
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

