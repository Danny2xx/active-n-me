import { useNavigate } from "react-router";
import { BottomNav } from "../BottomNav";
import { ArrowLeft, Trophy, Medal, Award, Crown } from "lucide-react";

export function Rewards() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl">Rewards</h1>
        </div>

        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-8 text-white mb-6 text-center">
          <Trophy size={48} className="mx-auto mb-4" />
          <h2 className="text-6xl mb-2">2,450</h2>
          <p className="text-white/90 text-lg">Reward Points</p>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border mb-6">
          <h3 className="text-lg mb-4">Leaderboard</h3>
          <div className="space-y-3">
            {[
              { rank: 1, name: "Sarah M.", points: 3840, avatar: "👑" },
              { rank: 2, name: "Mike D.", points: 3520, avatar: "🥈" },
              { rank: 3, name: "You (Alex)", points: 2450, avatar: "🥉", isYou: true },
              { rank: 4, name: "Emma R.", points: 2180, avatar: "👤" },
              { rank: 5, name: "David L.", points: 1920, avatar: "👤" },
            ].map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-4 rounded-xl ${
                  user.isYou ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">
                    {user.avatar}
                  </div>
                  <div>
                    <h4 className="text-base">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Rank #{user.rank}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl">{user.points.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border mb-6">
          <h3 className="text-lg mb-4">Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Medal, label: "Week Warrior", unlocked: true },
              { icon: Award, label: "Step Master", unlocked: true },
              { icon: Crown, label: "Sleep King", unlocked: true },
              { icon: Trophy, label: "Marathon", unlocked: false },
              { icon: Medal, label: "Early Bird", unlocked: false },
              { icon: Award, label: "Consistency", unlocked: false },
            ].map((achievement, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl text-center ${
                  achievement.unlocked ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <achievement.icon
                  size={32}
                  className={`mx-auto mb-2 ${
                    achievement.unlocked
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                />
                <p className="text-xs">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border">
          <h3 className="text-lg mb-4">Redeem Points</h3>
          <div className="space-y-3">
            {[
              { reward: "Premium 1 Month Free", points: 1000 },
              { reward: "Fitness Tracker Discount", points: 2500 },
              { reward: "Personal Training Session", points: 5000 },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-muted rounded-xl"
              >
                <h4 className="text-base">{item.reward}</h4>
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                  {item.points} pts
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
