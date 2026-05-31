import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Lock } from "lucide-react";

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl">Welcome Back</h1>
      </div>

      <div className="flex-1">
        <p className="text-muted-foreground mb-8 text-lg">
          Sign in to continue your wellness journey
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-input-background rounded-2xl py-4 px-12 border border-border"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm">Password</label>
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-input-background rounded-2xl py-4 px-12 border border-border"
              />
            </div>
          </div>
        </div>

        <button className="text-primary text-sm mb-8">Forgot password?</button>

        <button
          onClick={() => navigate("/home")}
          className="w-full bg-primary text-white py-4 rounded-2xl mb-4"
        >
          Sign In
        </button>

        <div className="text-center">
          <span className="text-muted-foreground text-sm">
            Don't have an account?{" "}
          </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-primary text-sm"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
