import React, { createContext, useContext, useState, useEffect } from "react";

export interface Meal {
  id: string;
  meal: string; // e.g., "Breakfast", "Lunch", "Snack", "Dinner"
  items: string;
  cal: number;
  time: string;
}

export interface WorkoutLog {
  id: string;
  workout: string;
  duration: string;
  date: string;
  cal: number;
}

interface AppSettings {
  notifications: boolean;
  darkMode: boolean;
  largeText: boolean;
  highContrast: boolean;
  voiceGuidance: boolean;
}

interface HealthStats {
  steps: number;
  stepsGoal: number;
  sleepHours: number;
  sleepGoal: number;
  caloriesBurnedGoal: number;
  caloriesConsumedGoal: number;
  rewardPoints: number;
}

interface AppContextType {
  settings: AppSettings;
  stats: HealthStats;
  meals: Meal[];
  completedWorkouts: WorkoutLog[];
  toggleSetting: (key: keyof AppSettings) => void;
  addSteps: (amount: number) => void;
  setSleepHours: (hours: number) => void;
  addMeal: (meal: string, items: string, cal: number) => void;
  completeWorkout: (workoutName: string, durationMin: number, calBurned: number) => void;
  resetAllData: () => void;
}

const defaultSettings: AppSettings = {
  notifications: true,
  darkMode: false,
  largeText: false,
  highContrast: false,
  voiceGuidance: false,
};

const defaultStats: HealthStats = {
  steps: 7834,
  stepsGoal: 10000,
  sleepHours: 7.5,
  sleepGoal: 8.0,
  caloriesBurnedGoal: 2000,
  caloriesConsumedGoal: 2000,
  rewardPoints: 2450,
};

const defaultMeals: Meal[] = [
  { id: "1", meal: "Breakfast", items: "Oatmeal, Banana, Coffee", cal: 380, time: "8:30 AM" },
  { id: "2", meal: "Lunch", items: "Grilled Chicken Salad", cal: 520, time: "1:00 PM" },
  { id: "3", meal: "Snack", items: "Apple, Almonds", cal: 150, time: "3:30 PM" },
];

const defaultWorkouts: WorkoutLog[] = [
  { id: "w1", workout: "Full Body Strength", date: "Yesterday", duration: "45 min", cal: 350 },
  { id: "w2", workout: "Morning Yoga Flow", date: "2 days ago", duration: "20 min", cal: 80 },
  { id: "w3", workout: "HIIT Cardio Blast", date: "3 days ago", duration: "30 min", cal: 420 },
];

const LOCAL_STORAGE_KEY = "health_wellness_prototype_state_v1";

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + "_settings");
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [stats, setStats] = useState<HealthStats>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + "_stats");
      return saved ? JSON.parse(saved) : defaultStats;
    } catch {
      return defaultStats;
    }
  });

  const [meals, setMeals] = useState<Meal[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + "_meals");
      return saved ? JSON.parse(saved) : defaultMeals;
    } catch {
      return defaultMeals;
    }
  });

  const [completedWorkouts, setCompletedWorkouts] = useState<WorkoutLog[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + "_workouts");
      return saved ? JSON.parse(saved) : defaultWorkouts;
    } catch {
      return defaultWorkouts;
    }
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + "_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + "_stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + "_meals", JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + "_workouts", JSON.stringify(completedWorkouts));
  }, [completedWorkouts]);

  const toggleSetting = (key: keyof AppSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const addSteps = (amount: number) => {
    setStats((prev) => {
      const newSteps = prev.steps + amount;
      // Assume 1 step burns ~0.04 calories
      const extraCalories = Math.round(amount * 0.04);
      return {
        ...prev,
        steps: newSteps,
        // Award points: 10 points per 1000 steps simulated
        rewardPoints: prev.rewardPoints + Math.floor(amount * 0.01),
      };
    });
  };

  const setSleepHours = (hours: number) => {
    setStats((prev) => ({
      ...prev,
      sleepHours: Number(hours.toFixed(1)),
    }));
  };

  const addMeal = (meal: string, items: string, cal: number) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMeal: Meal = {
      id: Date.now().toString(),
      meal,
      items,
      cal,
      time: timeStr,
    };
    setMeals((prev) => [newMeal, ...prev]);
  };

  const completeWorkout = (workoutName: string, durationMin: number, calBurned: number) => {
    const newWorkoutLog: WorkoutLog = {
      id: Date.now().toString(),
      workout: workoutName,
      date: "Just now",
      duration: `${durationMin} min`,
      cal: calBurned,
    };
    setCompletedWorkouts((prev) => [newWorkoutLog, ...prev]);
    setStats((prev) => ({
      ...prev,
      rewardPoints: prev.rewardPoints + 250, // +250 points for finishing workout
    }));
  };

  const resetAllData = () => {
    setSettings(defaultSettings);
    setStats(defaultStats);
    setMeals(defaultMeals);
    setCompletedWorkouts(defaultWorkouts);
    localStorage.removeItem(LOCAL_STORAGE_KEY + "_settings");
    localStorage.removeItem(LOCAL_STORAGE_KEY + "_stats");
    localStorage.removeItem(LOCAL_STORAGE_KEY + "_meals");
    localStorage.removeItem(LOCAL_STORAGE_KEY + "_workouts");
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        stats,
        meals,
        completedWorkouts,
        toggleSetting,
        addSteps,
        setSleepHours,
        addMeal,
        completeWorkout,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
