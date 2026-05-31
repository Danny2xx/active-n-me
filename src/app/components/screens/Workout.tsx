import { useNavigate } from "react-router";
import { BottomNav } from "../BottomNav";
import { Dumbbell, Play, Clock, Flame } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function Workout() {
  const navigate = useNavigate();
  const { completedWorkouts } = useApp();

  return (
    <div className="min-h-screen pb-24">
      <div className="p-6">
        <h1 className="text-3xl mb-2">Workouts</h1>
        <p className="text-muted-foreground mb-8">
          Choose a workout to get started
        </p>

        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-white mb-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 mb-1">Today's Workout</p>
              <h2 className="text-2xl font-semibold">Full Body Strength</h2>
            </div>
            <button 
              onClick={() => navigate("/workout-session", {
                state: {
                  workout: { title: "Full Body Strength", duration: "45 min", calories: "350 cal", difficulty: "Intermediate" }
                }
              })}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            >
              <Play size={28} className="text-primary ml-1" />
            </button>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>45 min</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame size={16} />
              <span>~350 cal</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl mb-4">Recommended Workouts</h3>
        <div className="space-y-4 mb-6">
          {[
            {
              title: "Morning Yoga Flow",
              duration: "20 min",
              calories: "80 cal",
              difficulty: "Beginner",
            },
            {
              title: "HIIT Cardio Blast",
              duration: "30 min",
              calories: "420 cal",
              difficulty: "Advanced",
            },
            {
              title: "Core Strengthening",
              duration: "15 min",
              calories: "120 cal",
              difficulty: "Intermediate",
            },
            {
              title: "Evening Stretch",
              duration: "10 min",
              calories: "40 cal",
              difficulty: "Beginner",
            },
          ].map((workout, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-lg mb-1">{workout.title}</h4>
                  <div className="flex gap-3 text-sm text-muted-foreground">
                    <span>{workout.duration}</span>
                    <span>•</span>
                    <span>{workout.calories}</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate("/workout-session", { state: { workout } })}
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <Play size={20} className="text-primary ml-1" />
                </button>
              </div>
              <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs">
                {workout.difficulty}
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl mb-4">Recent Workouts</h3>
        <div className="space-y-3">
          {completedWorkouts.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No workouts completed yet.</p>
          ) : (
            completedWorkouts.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-muted rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Dumbbell size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">{item.workout}</h4>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{item.duration}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

