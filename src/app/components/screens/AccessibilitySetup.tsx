import { useNavigate } from "react-router";
import { ArrowLeft, Eye, Type, Volume2 } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function AccessibilitySetup() {
  const navigate = useNavigate();
  const { settings, toggleSetting } = useApp();

  return (
    <div className="h-screen flex flex-col p-6 bg-background">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl">Accessibility</h1>
      </div>

      <div className="flex-1">
        <p className="text-muted-foreground mb-8 text-lg">
          Customize your experience for better comfort and usability
        </p>

        <div className="space-y-4">
          <div className="bg-card rounded-2xl p-5 border border-border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Eye size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-base mb-1">High Contrast Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Warm peach background
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting("highContrast")}
              className={`w-12 h-7 rounded-full transition-colors ${
                settings.highContrast ? "bg-primary" : "bg-switch-background"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.highContrast ? "translate-x-6" : "translate-x-1"
                } mt-1`}
              />
            </button>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Type size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-base mb-1">Large Text</h3>
                <p className="text-sm text-muted-foreground">
                  Increase font size
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting("largeText")}
              className={`w-12 h-7 rounded-full transition-colors ${
                settings.largeText ? "bg-primary" : "bg-switch-background"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.largeText ? "translate-x-6" : "translate-x-1"
                } mt-1`}
              />
            </button>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Volume2 size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-base mb-1">Voice Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Screen reader support
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting("voiceGuidance")}
              className={`w-12 h-7 rounded-full transition-colors ${
                settings.voiceGuidance ? "bg-primary" : "bg-switch-background"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.voiceGuidance ? "translate-x-6" : "translate-x-1"
                } mt-1`}
              />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/login")}
        className="w-full bg-primary text-white py-4 rounded-2xl mb-6"
      >
        Continue
      </button>
    </div>
  );
}

