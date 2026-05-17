import { Github, Mail, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10" data-testid="footer">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Terminal size={12} className="text-primary" />
          </span>
          <span className="font-display font-bold text-foreground">
            yz<span className="text-primary">.</span>dev
          </span>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Built by{" "}
          <span className="text-foreground font-medium">Yazan Mohammad</span>
          {" "}&mdash; Software Engineer
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/YazanMohammad"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 transition-all"
            data-testid="footer-github"
          >
            <Github size={14} />
          </a>
          <a
            href="mailto:ybmoh03@gmail.com"
            className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 transition-all"
            data-testid="footer-email"
          >
            <Mail size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
