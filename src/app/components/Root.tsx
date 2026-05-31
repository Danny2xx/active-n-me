import { Outlet } from "react-router";
import { AppProvider, useApp } from "../context/AppContext";
import { useEffect } from "react";

function RootContent() {
  const { settings } = useApp();

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  useEffect(() => {
    if (settings.largeText) {
      document.documentElement.style.setProperty("--font-size", "19px");
    } else {
      document.documentElement.style.setProperty("--font-size", "16px");
    }
  }, [settings.largeText]);

  useEffect(() => {
    if (settings.highContrast) {
      document.documentElement.style.setProperty("--background", "#fef3e8");
      document.documentElement.style.setProperty("--card", "#fdfbf7");
    } else {
      document.documentElement.style.removeProperty("--background");
      document.documentElement.style.removeProperty("--card");
    }
  }, [settings.highContrast]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      <div className="max-w-md mx-auto h-screen overflow-y-auto relative">
        <Outlet />
      </div>
    </div>
  );
}

export function Root() {
  return (
    <AppProvider>
      <RootContent />
    </AppProvider>
  );
}

