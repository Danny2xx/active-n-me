import { useNavigate } from "react-router";
import { ArrowLeft, Bell, Lock, Accessibility, Moon, Globe, ChevronRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function Settings() {
  const navigate = useNavigate();
  const { settings, toggleSetting, resetAllData } = useApp();

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl">Settings</h1>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm text-muted-foreground mb-3 px-1">
            PREFERENCES
          </h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-4">
                <Bell size={22} className="text-muted-foreground" />
                <span className="text-base">Notifications</span>
              </div>
              <button
                onClick={() => toggleSetting("notifications")}
                className={`w-12 h-7 rounded-full transition-colors ${
                  settings.notifications ? "bg-primary" : "bg-switch-background"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.notifications ? "translate-x-6" : "translate-x-1"
                  } mt-1`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-4">
                <Moon size={22} className="text-muted-foreground" />
                <span className="text-base">Dark Mode</span>
              </div>
              <button
                onClick={() => toggleSetting("darkMode")}
                className={`w-12 h-7 rounded-full transition-colors ${
                  settings.darkMode ? "bg-primary" : "bg-switch-background"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.darkMode ? "translate-x-6" : "translate-x-1"
                  } mt-1`}
                />
              </button>
            </div>

            <button
              onClick={() => navigate("/accessibility")}
              className="w-full flex items-center justify-between p-5"
            >
              <div className="flex items-center gap-4">
                <Accessibility size={22} className="text-muted-foreground" />
                <span className="text-base">Accessibility</span>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm text-muted-foreground mb-3 px-1">ACCOUNT</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <button className="w-full flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-4">
                <Lock size={22} className="text-muted-foreground" />
                <span className="text-base">Privacy & Security</span>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <Globe size={22} className="text-muted-foreground" />
                <span className="text-base">Language</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">English</span>
                <ChevronRight size={20} className="text-muted-foreground" />
              </div>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm text-muted-foreground mb-3 px-1">DATA</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <button 
              onClick={() => alert(JSON.stringify({ settings, stats }, null, 2))}
              className="w-full flex items-center justify-between p-5 border-b border-border"
            >
              <span className="text-base">Export Data</span>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>

            <button 
              onClick={() => {
                if (confirm("Are you sure you want to reset all your data and preferences?")) {
                  resetAllData();
                  navigate("/");
                }
              }}
              className="w-full flex items-center justify-between p-5"
            >
              <span className="text-base text-destructive">Delete Account</span>
              <ChevronRight size={20} className="text-destructive" />
            </button>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5">
          <h3 className="text-base mb-2">About</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Version 1.0.0</p>
            <p>© 2026 Active n Me</p>
            <button className="text-primary">Terms of Service</button>
            <span className="mx-2">•</span>
            <button className="text-primary">Privacy Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

