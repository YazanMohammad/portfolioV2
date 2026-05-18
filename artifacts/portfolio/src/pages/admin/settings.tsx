import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, TrendingUp, Activity, RefreshCw } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { store, type SiteStats, type AvailabilityStatus } from "@/lib/admin-store";

const card = (delay = 0) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay } });

export default function AdminSettings() {
  const [stats, setStats] = useState<SiteStats>({ yearsExperience: 2, projectsCompleted: 5, technologiesMastered: 20, githubContributions: 0 });
  const [availability, setAvailability] = useState<AvailabilityStatus>({ isAvailable: true, status: "Open to opportunities", message: "" });
  const [statsSaved, setStatsSaved] = useState(false);
  const [availSaved, setAvailSaved] = useState(false);

  useEffect(() => {
    setStats(store.getStats());
    setAvailability(store.getAvailability());
  }, []);

  const saveStats = (e: React.FormEvent) => {
    e.preventDefault();
    store.saveStats(stats);
    setStatsSaved(true);
    setTimeout(() => setStatsSaved(false), 2000);
  };

  const saveAvail = (e: React.FormEvent) => {
    e.preventDefault();
    store.saveAvailability(availability);
    setAvailSaved(true);
    setTimeout(() => setAvailSaved(false), 2000);
  };

  const statFields: { key: keyof SiteStats; label: string; suffix: string }[] = [
    { key: "yearsExperience", label: "Years of Experience", suffix: "+" },
    { key: "projectsCompleted", label: "Projects Completed", suffix: "+" },
    { key: "technologiesMastered", label: "Technologies Mastered", suffix: "+" },
    { key: "githubContributions", label: "GitHub Contributions", suffix: "" },
  ];

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.div {...card(0)}>
          <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage site stats and availability status</p>
        </motion.div>

        {/* Availability */}
        <motion.div {...card(0.05)}>
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-primary" />
            <h2 className="text-base font-semibold text-foreground">Availability Status</h2>
          </div>
          <form onSubmit={saveAvail} className="p-5 rounded-xl border border-border bg-card space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
              <div>
                <p className="text-sm font-medium text-foreground">Available for work</p>
                <p className="text-xs text-muted-foreground mt-0.5">Shows the status badge on your portfolio</p>
              </div>
              <button
                type="button"
                onClick={() => setAvailability({ ...availability, isAvailable: !availability.isAvailable })}
                className={`relative w-12 h-6 rounded-full transition-colors ${availability.isAvailable ? "bg-primary" : "bg-muted border border-border"}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${availability.isAvailable ? "left-7" : "left-1"}`} />
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Status Text</label>
              <input type="text" value={availability.status} onChange={(e) => setAvailability({ ...availability, status: e.target.value })} placeholder="Open to opportunities"
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Message (optional)</label>
              <textarea value={availability.message || ""} onChange={(e) => setAvailability({ ...availability, message: e.target.value })} rows={2} placeholder="Available for full-time roles and freelance..."
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all resize-none placeholder:text-muted-foreground/50" />
            </div>
            <button type="submit" className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${availSaved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
              {availSaved ? <><RefreshCw size={14} className="animate-spin" /> Saved!</> : <><Save size={14} /> Save Availability</>}
            </button>
          </form>
        </motion.div>

        {/* Site Stats */}
        <motion.div {...card(0.1)}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-primary" />
            <h2 className="text-base font-semibold text-foreground">Hero Stats</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">These numbers appear in the hero section of your portfolio.</p>
          <form onSubmit={saveStats} className="p-5 rounded-xl border border-border bg-card space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {statFields.map(({ key, label, suffix }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      value={stats[key]}
                      onChange={(e) => setStats({ ...stats, [key]: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all pr-8"
                    />
                    {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">{suffix}</span>}
                  </div>
                  <p className="text-xs text-muted-foreground/60 mt-1 font-mono">Shows as: {stats[key]}{suffix}</p>
                </div>
              ))}
            </div>
            <button type="submit" className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${statsSaved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
              {statsSaved ? <><RefreshCw size={14} className="animate-spin" /> Saved!</> : <><Save size={14} /> Save Stats</>}
            </button>
          </form>
        </motion.div>

        {/* Credentials reminder */}
        <motion.div {...card(0.15)}>
          <div className="p-5 rounded-xl border border-border bg-card/50">
            <h3 className="text-sm font-semibold text-foreground mb-3">Admin Credentials</h3>
            <div className="space-y-2 text-xs font-mono text-muted-foreground">
              <div className="flex justify-between"><span>Username</span><span className="text-foreground">root</span></div>
              <div className="flex justify-between"><span>Password</span><span className="text-foreground">admin123</span></div>
              <div className="flex justify-between"><span>Email</span><span className="text-foreground">ybmoh03@gmail.com</span></div>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-3">Credentials are stored in code. Change them in <code className="text-primary">src/lib/admin-auth.ts</code>.</p>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
