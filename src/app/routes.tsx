import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Splash } from "./components/screens/Splash";
import { AccessibilitySetup } from "./components/screens/AccessibilitySetup";
import { Login } from "./components/screens/Login";
import { SignupForm } from "./components/screens/SignupForm";
import { GoalsSetup } from "./components/screens/GoalsSetup";
import { AccountCreated } from "./components/screens/AccountCreated";
import { Home } from "./components/screens/Home";
import { StepTracking } from "./components/screens/StepTracking";
import { SleepTracking } from "./components/screens/SleepTracking";
import { CalorieTracking } from "./components/screens/CalorieTracking";
import { Rewards } from "./components/screens/Rewards";
import { Workout } from "./components/screens/Workout";
import { WorkoutSession } from "./components/screens/WorkoutSession";
import { Premium } from "./components/screens/Premium";
import { More } from "./components/screens/More";
import { ProfileEdit } from "./components/screens/ProfileEdit";
import { Settings } from "./components/screens/Settings";
import { Billing } from "./components/screens/Billing";
import { Support } from "./components/screens/Support";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Splash },
      { path: "accessibility", Component: AccessibilitySetup },
      { path: "login", Component: Login },
      { path: "signup", Component: SignupForm },
      { path: "goals", Component: GoalsSetup },
      { path: "account-created", Component: AccountCreated },
      { path: "home", Component: Home },
      { path: "steps", Component: StepTracking },
      { path: "sleep", Component: SleepTracking },
      { path: "calories", Component: CalorieTracking },
      { path: "rewards", Component: Rewards },
      { path: "workout", Component: Workout },
      { path: "workout-session", Component: WorkoutSession },
      { path: "premium", Component: Premium },
      { path: "more", Component: More },
      { path: "profile", Component: ProfileEdit },
      { path: "settings", Component: Settings },
      { path: "billing", Component: Billing },
      { path: "support", Component: Support },
    ],
  },
]);

