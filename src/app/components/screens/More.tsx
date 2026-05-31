import { useNavigate } from "react-router";
import { BottomNav } from "../BottomNav";
import {
  User,
  Settings,
  CreditCard,
  MessageCircle,
  Trophy,
  Heart,
  Share2,
  LogOut,
  ChevronRight,
} from "lucide-react";

export function More() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: "Edit Profile", path: "/profile" },
    { icon: Trophy, label: "Rewards & Achievements", path: "/rewards" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: CreditCard, label: "Subscription & Billing", path: "/billing" },
    { icon: MessageCircle, label: "Customer Support", path: "/support" },
  ];

  const otherItems = [
    { icon: Heart, label: "Rate Us", action: "rate" },
    { icon: Share2, label: "Share App", action: "share" },
  ];

  return (
    <div className="min-h-screen pb-24">
      <div className="p-6">
        <h1 className="text-3xl mb-8">More</h1>

        <div className="bg-card rounded-2xl p-5 border border-border mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h2 className="text-xl">Alex Johnson</h2>
              <p className="text-muted-foreground">alex.j@email.com</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border mb-6 overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between p-5 ${
                i !== menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={22} className="text-muted-foreground" />
                <span className="text-base">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border mb-6 overflow-hidden">
          {otherItems.map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center justify-between p-5 ${
                i !== otherItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={22} className="text-muted-foreground" />
                <span className="text-base">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-3 p-5 bg-destructive/10 text-destructive rounded-2xl">
          <LogOut size={22} />
          <span className="text-base">Log Out</span>
        </button>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Active n Me v1.0.0</p>
          <p className="mt-1">© 2026 Active n Me. All rights reserved.</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
