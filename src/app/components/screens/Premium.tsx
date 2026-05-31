import { useNavigate } from "react-router";
import { BottomNav } from "../BottomNav";
import { Sparkles, Clock, Bookmark } from "lucide-react";

export function Premium() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={28} className="text-primary" />
          <h1 className="text-3xl">AM+ Premium</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Exclusive wellness content & insights
        </p>

        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-white mb-6">
          <h2 className="text-2xl mb-2">Featured Article</h2>
          <h3 className="text-xl mb-3">
            10 Science-Backed Ways to Improve Your Sleep Quality
          </h3>
          <p className="text-white/80 mb-4 text-sm">
            Discover evidence-based strategies to optimize your sleep and wake up refreshed every morning.
          </p>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>8 min read</span>
            </div>
            <span>•</span>
            <span>Dr. Sarah Chen</span>
          </div>
        </div>

        <h3 className="text-xl mb-4">Latest Articles</h3>
        <div className="space-y-4 mb-6">
          {[
            {
              title: "The Ultimate Guide to Mindful Eating",
              author: "Dr. Michael Ross",
              readTime: "12 min",
              category: "Nutrition",
            },
            {
              title: "Building Sustainable Exercise Habits",
              author: "Emma Thompson",
              readTime: "6 min",
              category: "Fitness",
            },
            {
              title: "Understanding Your Body's Recovery Signals",
              author: "Dr. James Liu",
              readTime: "10 min",
              category: "Recovery",
            },
            {
              title: "Stress Management Techniques That Actually Work",
              author: "Dr. Anna Martinez",
              readTime: "9 min",
              category: "Mental Health",
            },
          ].map((article, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs mb-2">
                    {article.category}
                  </div>
                  <h4 className="text-lg mb-2">{article.title}</h4>
                  <div className="flex gap-3 text-sm text-muted-foreground">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.readTime} read</span>
                  </div>
                </div>
                <button className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border text-center">
          <Sparkles size={32} className="text-primary mx-auto mb-3" />
          <h3 className="text-xl mb-2">Unlock More Content</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Get unlimited access to premium articles, expert advice, and personalized wellness plans
          </p>
          <button
            onClick={() => navigate("/billing")}
            className="w-full bg-primary text-white py-3 rounded-xl"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
