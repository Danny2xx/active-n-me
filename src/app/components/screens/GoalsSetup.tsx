import { useNavigate } from "react-router";
import { ArrowLeft, Footprints, Moon, Flame, Check } from "lucide-react";
import { useState } from "react";

export function GoalsSetup() {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    { id: "steps", icon: Footprints, title: "10,000 Steps Daily", color: "bg-blue-500" },
    { id: "sleep", icon: Moon, title: "8 Hours Sleep", color: "bg-purple-500" },
    { id: "calories", icon: Flame, title: "Track Calories", color: "bg-orange-500" },
  ];

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="h-screen flex flex-col p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl">Set Your Goals</h1>
      </div>

      <div className="flex-1">
        <p className="text-muted-foreground mb-8 text-lg">
          Choose what you'd like to track and achieve
        </p>

        <div className="space-y-4">
          {goals.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id);
            return (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`w-full rounded-2xl p-6 border-2 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${goal.color} rounded-xl flex items-center justify-center`}>
                      <goal.icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-lg">{goal.title}</h3>
                  </div>
                  {isSelected && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Check size={18} className="text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => navigate("/account-created")}
        className="w-full bg-primary text-white py-4 rounded-2xl mb-6"
      >
        Continue
      </button>
    </div>
  );
}
