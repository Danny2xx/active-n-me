import { useNavigate } from "react-router";
import { ArrowLeft, Camera, User, Mail, Phone, Calendar } from "lucide-react";

export function ProfileEdit() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl">Edit Profile</h1>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-4xl mb-2">
            👤
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Camera size={16} className="text-white" />
          </button>
        </div>
        <p className="text-sm text-primary mt-2">Change Photo</p>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block mb-2 text-sm">Full Name</label>
          <div className="relative">
            <User
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              defaultValue="Alex Johnson"
              className="w-full bg-input-background rounded-2xl py-4 px-12 border border-border"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm">Email</label>
          <div className="relative">
            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="email"
              defaultValue="alex.j@email.com"
              className="w-full bg-input-background rounded-2xl py-4 px-12 border border-border"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm">Phone</label>
          <div className="relative">
            <Phone
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full bg-input-background rounded-2xl py-4 px-12 border border-border"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm">Date of Birth</label>
          <div className="relative">
            <Calendar
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="date"
              defaultValue="1995-06-15"
              className="w-full bg-input-background rounded-2xl py-4 px-12 border border-border"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm">Height (cm)</label>
            <input
              type="number"
              defaultValue="175"
              className="w-full bg-input-background rounded-2xl py-4 px-4 border border-border"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Weight (kg)</label>
            <input
              type="number"
              defaultValue="70"
              className="w-full bg-input-background rounded-2xl py-4 px-4 border border-border"
            />
          </div>
        </div>
      </div>

      <button className="w-full bg-primary text-white py-4 rounded-2xl mb-3">
        Save Changes
      </button>
      <button
        onClick={() => navigate(-1)}
        className="w-full bg-muted text-foreground py-4 rounded-2xl"
      >
        Cancel
      </button>
    </div>
  );
}
