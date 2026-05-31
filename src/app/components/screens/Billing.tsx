import { useNavigate } from "react-router";
import { ArrowLeft, Check, Crown, CreditCard } from "lucide-react";

export function Billing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl">Subscription</h1>
      </div>

      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-white mb-6">
        <Crown size={40} className="mb-3" />
        <h2 className="text-2xl mb-2">Active n Me Premium</h2>
        <p className="text-white/90 mb-4">
          Unlock all features and get personalized health insights
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="bg-card rounded-2xl p-6 border-2 border-primary">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl mb-1">Annual Plan</h3>
              <p className="text-muted-foreground text-sm">Save 40%</p>
            </div>
            <div className="text-right">
              <p className="text-3xl">$59</p>
              <p className="text-sm text-muted-foreground">/year</p>
            </div>
          </div>
          <div className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm text-center">
            Best Value - $4.99/month
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl mb-1">Monthly Plan</h3>
              <p className="text-muted-foreground text-sm">Flexible billing</p>
            </div>
            <div className="text-right">
              <p className="text-3xl">$9.99</p>
              <p className="text-sm text-muted-foreground">/month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border mb-6">
        <h3 className="text-lg mb-4">Premium Features</h3>
        <div className="space-y-3">
          {[
            "Unlimited access to AM+ articles",
            "Personalized workout plans",
            "Advanced sleep & health analytics",
            "Custom goal tracking",
            "Priority customer support",
            "Ad-free experience",
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={14} className="text-white" />
              </div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base">Payment Method</h3>
          <button className="text-primary text-sm">Edit</button>
        </div>
        <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
          <CreditCard size={24} className="text-muted-foreground" />
          <div>
            <p className="text-sm">•••• •••• •••• 4242</p>
            <p className="text-xs text-muted-foreground">Expires 12/28</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-primary text-white py-4 rounded-2xl mb-3">
        Subscribe to Premium
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Cancel anytime. By subscribing you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
