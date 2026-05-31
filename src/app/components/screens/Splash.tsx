import { useNavigate } from "react-router";

export function Splash() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-white p-6">
      <div className="flex flex-col items-center gap-6 mb-12">
        <img 
          src="/logo.png" 
          alt="Active n Me Logo" 
          className="w-64 max-w-xs object-contain animate-pulse"
        />
        <div className="text-center">
          <p className="text-muted-foreground text-lg">
            Your wellness journey starts here
          </p>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <button
          onClick={() => navigate("/accessibility")}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow hover:bg-primary/95 active:scale-[0.98] transition-transform"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-white text-foreground py-4 rounded-2xl border border-border font-bold shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-transform"
        >
          I already have an account
        </button>
      </div>
    </div>
  );
}

