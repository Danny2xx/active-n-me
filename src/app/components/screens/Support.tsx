import { useNavigate } from "react-router";
import { ArrowLeft, Send, Paperclip } from "lucide-react";

export function Support() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl">Customer Support</h1>
            <p className="text-sm text-muted-foreground">
              Usually replies within minutes
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex justify-start">
          <div className="max-w-[75%]">
            <div className="bg-muted rounded-2xl rounded-tl-sm p-4">
              <p className="text-sm">
                Hi! I'm here to help. What can I assist you with today?
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1 ml-2">10:24 AM</p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[75%]">
            <div className="bg-primary text-white rounded-2xl rounded-tr-sm p-4">
              <p className="text-sm">
                I'm having trouble syncing my sleep data. Can you help?
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1 mr-2 text-right">
              10:25 AM
            </p>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[75%]">
            <div className="bg-muted rounded-2xl rounded-tl-sm p-4">
              <p className="text-sm">
                I'd be happy to help with that! Let's troubleshoot together. First, can you tell me which device you're using to track your sleep?
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1 ml-2">10:25 AM</p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[75%]">
            <div className="bg-primary text-white rounded-2xl rounded-tr-sm p-4">
              <p className="text-sm">I'm using an Apple Watch</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1 mr-2 text-right">
              10:26 AM
            </p>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[75%]">
            <div className="bg-muted rounded-2xl rounded-tl-sm p-4">
              <p className="text-sm mb-3">
                Great! Here are a few steps to try:
              </p>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li>Open Settings on your Apple Watch</li>
                <li>Go to Health → Permissions</li>
                <li>Make sure Active n Me has access to Sleep data</li>
                <li>Try manually syncing from the app</li>
              </ul>
              <p className="text-sm mt-3">Let me know if this helps!</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1 ml-2">10:27 AM</p>
          </div>
        </div>

        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">Today</p>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-muted">
            <Paperclip size={20} className="text-muted-foreground" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-input-background rounded-full py-3 px-5 border border-border"
          />
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary">
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
