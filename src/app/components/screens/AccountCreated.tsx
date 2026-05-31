import { useNavigate } from "react-router";
import { CheckCircle2 } from "lucide-react";

export function AccountCreated() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-primary/10 to-white">
      <div className="flex flex-col items-center gap-6 mb-12">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
          <CheckCircle2 size={56} className="text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl mb-3">You're All Set!</h1>
          <p className="text-muted-foreground text-lg max-w-xs">
            Your account has been created successfully. Let's start your wellness journey!
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate("/home")}
        className="w-full max-w-xs bg-primary text-white py-4 rounded-2xl"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
