import { motion } from "framer-motion";
import { ArrowRight, Github, Mail, Download, Briefcase } from "lucide-react";

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "5+", label: "Projects" },
  { value: "20+", label: "Technologies" },
  { value: "CS", label: "Graduate" },
];

const codeLines = [
  { tokens: [{ t: "const", c: "text-accent" }, { t: " developer = {", c: "text-foreground" }] },
  { tokens: [{ t: "  name", c: "text-primary" }, { t: ": ", c: "text-muted-foreground" }, { t: '"Yazan Mohammad"', c: "text-emerald-400" }, { t: ",", c: "text-foreground" }] },
  { tokens: [{ t: "  role", c: "text-primary" }, { t: ": ", c: "text-muted-foreground" }, { t: '"Software Engineer"', c: "text-emerald-400" }, { t: ",", c: "text-foreground" }] },
  { tokens: [{ t: "  skills", c: "text-primary" }, { t: ": [", c: "text-foreground" }, { t: '"LLMs"', c: "text-yellow-400" }, { t: ", ", c: "text-foreground" }, { t: '"React"', c: "text-yellow-400" }, { t: ", ", c: "text-foreground" }, { t: '"ASP.NET"', c: "text-yellow-400" }, { t: "],", c: "text-foreground" }] },
  { tokens: [{ t: "  passionate", c: "text-primary" }, { t: ": ", c: "text-muted-foreground" }, { t: "true", c: "text-accent" }, { t: ",", c: "text-foreground" }] },
  { tokens: [{ t: "  quickLearner", c: "text-primary" }, { t: ": ", c: "text-muted-foreground" }, { t: "true", c: "text-accent" }, { t: ",", c: "text-foreground" }] },
  { tokens: [{ t: "  hobbies", c: "text-primary" }, { t: ": [", c: "text-foreground" }, { t: '"Coding"', c: "text-yellow-400" }, { t: ", ", c: "text-foreground" }, { t: '"Gaming"', c: "text-yellow-400" }, { t: ", ", c: "text-foreground" }, { t: '"Coffee"', c: "text-yellow-400" }, { t: "],", c: "text-foreground" }] },
  { tokens: [{ t: "}", c: "text-foreground" }] },
  { tokens: [{ t: "// Ready to build something amazing", c: "text-muted-foreground/60 italic" }, { t: " ▋", c: "text-primary animate-pulse" }] },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      data-testid="section-hero"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono mb-6" data-testid="badge-status">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Open to opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl lg:text-6xl font-display font-bold leading-tight mb-2"
              data-testid="hero-name"
            >
              Yazan
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
            >
              <span className="text-gradient-primary">Mohammad</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 text-lg text-muted-foreground mb-4"
            >
              <Briefcase size={16} className="text-primary shrink-0" />
              <span>Full-stack Software Engineer</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-muted-foreground leading-relaxed mb-8 max-w-md"
            >
              Specializing in scalable backend systems and high-performance web applications.
              Building digital experiences with modern tech stack.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={() => {
                  const el = document.querySelector("#projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors glow-primary"
                data-testid="button-view-projects"
              >
                View Projects <ArrowRight size={14} />
              </button>
              <a
                href="https://github.com/YazanMohammad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-semibold text-sm hover:border-primary/60 hover:bg-primary/10 hover:text-primary transition-all"
                data-testid="link-github"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href="https://gvlmxittxprtcfavasgp.supabase.co/storage/v1/object/public/resumes/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-muted-foreground font-semibold text-sm hover:border-foreground/40 hover:text-foreground transition-all"
                data-testid="link-cv"
              >
                <Download size={14} /> Download CV
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="grid grid-cols-4 gap-4"
              data-testid="hero-stats"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-display font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <span className="terminal-dot bg-red-500/80" />
                <span className="terminal-dot bg-yellow-500/80" />
                <span className="terminal-dot bg-green-500/80" />
                <span className="ml-3 text-xs font-mono text-muted-foreground">developer.tsx</span>
              </div>
              <div className="p-5 font-mono text-sm leading-7">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.06 }}
                    className="flex"
                  >
                    <span className="w-8 text-muted-foreground/30 text-right shrink-0 select-none mr-4 text-xs leading-7">
                      {i + 1}
                    </span>
                    <span>
                      {line.tokens.map((tok, j) => (
                        <span key={j} className={tok.c}>{tok.t}</span>
                      ))}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating social links */}
            <div className="flex gap-3 mt-4 justify-end">
              <a
                href="https://github.com/YazanMohammad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 transition-all"
                data-testid="social-github"
              >
                <Github size={16} />
              </a>
              <a
                href="mailto:ybmoh03@gmail.com"
                className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 transition-all"
                data-testid="social-email"
              >
                <Mail size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
