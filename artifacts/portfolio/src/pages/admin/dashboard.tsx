import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderKanban, Wrench, Briefcase, MessageSquare, TrendingUp, Eye, Github, Mail } from "lucide-react";
import { useLocation } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";
import { store } from "@/lib/admin-store";

const card = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [counts, setCounts] = useState({ projects: 0, skills: 0, experience: 0, messages: 0, unread: 0 });

  useEffect(() => {
    const projects = store.getProjects();
    const skills = store.getSkills();
    const experience = store.getExperience();
    const messages = store.getMessages();
    setCounts({
      projects: projects.length,
      skills: skills.length,
      experience: experience.length,
      messages: messages.length,
      unread: messages.filter((m) => !m.read).length,
    });
  }, []);

  const stats = [
    { label: "Projects", value: counts.projects, icon: FolderKanban, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20", href: "/admin/projects" },
    { label: "Skills", value: counts.skills, icon: Wrench, color: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/20", href: "/admin/skills" },
    { label: "Experience", value: counts.experience, icon: Briefcase, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", href: "/admin/experience" },
    { label: "Messages", value: counts.messages, icon: MessageSquare, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20", href: "/admin/messages", badge: counts.unread },
  ];

  const quickActions = [
    { label: "Add Project", icon: FolderKanban, href: "/admin/projects", color: "text-cyan-400" },
    { label: "Add Skill", icon: Wrench, href: "/admin/skills", color: "text-violet-400" },
    { label: "View Messages", icon: MessageSquare, href: "/admin/messages", color: "text-yellow-400" },
    { label: "View Portfolio", icon: Eye, href: "/", color: "text-primary" },
  ];

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div {...card(0)} className="mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back, Yazan. Here's an overview of your portfolio content.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.button
              key={s.label}
              {...card(0.05 + i * 0.07)}
              onClick={() => setLocation(s.href)}
              className={`text-left p-5 rounded-xl border ${s.border} bg-card hover:bg-muted/30 transition-all group`}
              data-testid={`stat-${s.label.toLowerCase()}`}
            >
              <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <s.icon size={17} className={s.color} />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
                {s.badge != null && s.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-mono">
                    {s.badge} new
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick actions */}
          <motion.div {...card(0.3)} className="lg:col-span-1">
            <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
            <div className="space-y-2">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  onClick={() => a.href === "/" ? window.open("/", "_blank") : setLocation(a.href)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group text-left"
                  data-testid={`quick-action-${a.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <a.icon size={16} className={`${a.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm text-foreground">{a.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Site info */}
          <motion.div {...card(0.35)} className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-foreground mb-3">Portfolio Info</h2>
            <div className="p-5 rounded-xl border border-border bg-card space-y-4">
              {[
                { label: "Live Site", value: "www.yznmoh.com", icon: Eye, link: "https://www.yznmoh.com/" },
                { label: "GitHub", value: "github.com/YazanMohammad", icon: Github, link: "https://github.com/YazanMohammad" },
                { label: "Contact Email", value: "ybmoh03@gmail.com", icon: Mail, link: "mailto:ybmoh03@gmail.com" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon size={14} className="text-muted-foreground shrink-0" />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-primary hover:underline"
                  >
                    {item.value}
                  </a>
                </div>
              ))}

              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Status</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-primary font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Open to opportunities
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Trend</span>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                  <TrendingUp size={11} /> Growing
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
