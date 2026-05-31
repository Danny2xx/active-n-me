import { useNavigate } from "react-router";
import { BottomNav } from "../BottomNav";
import { ArrowLeft, Flame, Plus, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

export function CalorieTracking() {
  const navigate = useNavigate();
  const { stats, meals, addMeal, completedWorkouts } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [calories, setCalories] = useState("");

  // Calculate calories burned
  const stepCalories = Math.round(stats.steps * 0.04);
  const workoutCalories = completedWorkouts.reduce((sum, w) => sum + w.cal, 0);
  const activeCalories = stepCalories + workoutCalories;
  const restingCalories = 400;
  const totalCaloriesBurned = restingCalories + activeCalories;

  // Calculate calories consumed
  const totalCaloriesConsumed = meals.reduce((sum, m) => sum + m.cal, 0);
  const consumedPercent = Math.min(Math.round((totalCaloriesConsumed / stats.caloriesConsumedGoal) * 100), 100);
  const burnedPercent = Math.min(Math.round((totalCaloriesBurned / stats.caloriesBurnedGoal) * 100), 100);

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealName || !calories) return;
    
    addMeal(mealType, mealName, Number(calories));
    setMealName("");
    setCalories("");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen pb-24 relative">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl">Calorie Tracking</h1>
        </div>

        {/* Calories Burned card */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white mb-6 text-center shadow-lg">
          <Flame size={48} className="mx-auto mb-4 animate-pulse" />
          <h2 className="text-6xl mb-2 font-semibold">{totalCaloriesBurned.toLocaleString()}</h2>
          <p className="text-white/80 text-lg mb-4">Total Calories Burned</p>
          <div className="bg-white/20 rounded-2xl p-4">
            <p className="text-sm mb-2">Burn Goal: {stats.caloriesBurnedGoal.toLocaleString()} cal</p>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${burnedPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Burn details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-2xl p-5 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Active Burn</p>
            <h3 className="text-3xl mb-1">{activeCalories.toLocaleString()}</h3>
            <p className="text-xs text-muted-foreground">cal</p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Resting Burn</p>
            <h3 className="text-3xl mb-1">{restingCalories}</h3>
            <p className="text-xs text-muted-foreground">cal</p>
          </div>
        </div>

        {/* Calories Consumed summary */}
        <div className="bg-card rounded-2xl p-5 border border-border mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg">Food Calorie Intake</h3>
            <span className="text-base font-semibold text-primary">{totalCaloriesConsumed} / {stats.caloriesConsumedGoal} cal</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-primary rounded-full h-3 transition-all duration-500"
              style={{ width: `${consumedPercent}%` }}
            />
          </div>
        </div>

        {/* Meals Today */}
        <div className="bg-card rounded-2xl p-5 border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Meals Today</h3>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-10 h-10 bg-primary hover:bg-primary/95 active:scale-95 transition-transform rounded-full flex items-center justify-center shadow"
            >
              <Plus size={20} className="text-white" />
            </button>
          </div>
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
            {meals.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No meals logged yet today.</p>
            ) : (
              meals.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-xl transition-all duration-300"
                >
                  <div className="flex-1">
                    <h4 className="text-base font-medium mb-1">{item.meal}</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.items}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-orange-600">{item.cal}</p>
                    <p className="text-xs text-muted-foreground">cal</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-card rounded-2xl p-5 border border-border">
          <h3 className="text-lg mb-4">Weekly Calorie Burn</h3>
          <div className="flex items-end gap-2 h-32">
            {[1100, 1350, 980, 1450, 1200, totalCaloriesBurned, 1380].map((cal, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center">
                <span className="text-[10px] text-muted-foreground mb-1">
                  {cal}
                </span>
                <div
                  className={`w-full rounded-t transition-all duration-500 ${i === 5 ? "bg-orange-500" : "bg-orange-400/30"}`}
                  style={{ height: `${Math.max(5, (cal / 1500) * 100)}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>
        </div>
      </div>

      {/* Slide up modal for meal logging */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-card w-full rounded-t-3xl p-6 border-t border-border animate-slide-up max-h-[80%] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Log New Meal</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleAddMeal} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Meal Category</label>
                <div className="grid grid-cols-4 gap-2">
                  {["Breakfast", "Lunch", "Dinner", "Snack"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setMealType(type)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold border ${mealType === type ? 'bg-primary text-white border-primary' : 'bg-muted border-transparent'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Food Items</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oatmeal with blueberries"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  className="w-full bg-muted border-0 rounded-2xl p-4 text-base focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Calories (kcal)</label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="e.g. 350"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full bg-muted border-0 rounded-2xl p-4 text-base focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white py-4 rounded-2xl font-bold mt-6 shadow active:scale-[0.98] transition-transform"
              >
                Add Meal Log
              </button>
            </form>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

