import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Wrench, Briefcase,
  MessageSquare, LogOut, Terminal, Menu, ExternalLink,
} from "lucide-react";
import { isAuthenticated, logout } from "@/lib/admin-auth";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Skills", href: "/admin/skills", icon: Wrench },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const [location, setLocation] = useLocation();

  const go = (href: string) => {
    setLocation(href);
    onNavigate?.();
  };

  const handleLogout = () => {
    logout();
    setLocation("/admin");
    onNavigate?.();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
            <Terminal size={14} className="text-primary" />
          </span>
          <div className="min-w-0">
            <p className="font-display font-bold text-sm text-foreground leading-none">yz.dev</p>
            <p className="text-xs text-muted-foreground mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = location === item.href;
          return (
            <button
              key={item.href}
              onClick={() => go(item.href)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${active
                  ? "bg-primary/15 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                }`}
            >
              <item.icon size={16} className="shrink-0" />
              <span className="truncate">{item.label}</span>
              {item.label === "Messages" && (
                <span className="ml-auto w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-mono shrink-0">
                  1
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border space-y-0.5 shrink-0">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all border border-transparent"
        >
          <ExternalLink size={16} className="shrink-0" />
          <span className="truncate">View Portfolio</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent"
        >
          <LogOut size={16} className="shrink-0" />
          <span className="truncate">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) setLocation("/admin");
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* ── Desktop sidebar (flex child, sticky) ── */}
      <aside className="hidden lg:flex flex-col w-56 xl:w-60 shrink-0 border-r border-border bg-card/50 sticky top-0 h-screen overflow-hidden">
        <SidebarContent />
      </aside>

      {/* ── Mobile sidebar overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-56 flex flex-col bg-card border-r border-border z-50 lg:hidden"
            >
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top bar */}
        <header className="h-13 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-20 flex items-center px-5 gap-4 shrink-0" style={{ height: "52px" }}>
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border">
            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
            <span className="text-xs font-mono text-muted-foreground">root@yz.dev</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
