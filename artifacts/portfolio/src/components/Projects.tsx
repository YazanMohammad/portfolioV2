import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Star, Layers } from "lucide-react";

const projects = [
  {
    title: "Portfolio",
    description:
      "Personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS. Custom admin dashboard backed by PostgreSQL via Supabase. GitHub integration, dynamic CV upload, dark/light mode, and bilingual (AR/EN) support.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Supabase"],
    live: "https://www.yznmoh.com/",
    code: "https://github.com/YazanMohammad/portfolio",
    preview: "/preview-portfolio.png",
    featured: true,
    accentClass: "from-cyan-500/10 to-teal-500/10",
    borderHover: "hover:border-cyan-500/40",
    dotColor: "bg-cyan-400",
  },
  {
    title: "Chat App",
    description:
      "Full-stack real-time chat application. React frontend with ASP.NET Core backend and SignalR for low-latency bidirectional communication. Optimized state management for smooth multi-user experience.",
    tags: ["React.JS", "ASP.NET Core", "SignalR", "C#"],
    live: "https://chat-app-by-me.vercel.app/",
    code: "https://github.com/YazanMohammad/ChatApp",
    preview: "/preview-chat.png",
    featured: true,
    accentClass: "from-violet-500/10 to-purple-500/10",
    borderHover: "hover:border-violet-500/40",
    dotColor: "bg-violet-400",
  },
  {
    title: "Tic-Tac-Toe",
    description:
      "Interactive Tic-Tac-Toe game with clean state management, win detection logic, and a fully responsive UI. A deceptively simple project built with care and attention to detail.",
    tags: ["React.JS", "State Management"],
    preview: "/preview-ttt.png",
    featured: false,
    accentClass: "from-emerald-500/10 to-green-500/10",
    borderHover: "hover:border-emerald-500/40",
    dotColor: "bg-emerald-400",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24 bg-muted/20 relative" data-testid="section-projects" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">// open source &amp; custom</p>
          <h2 className="text-4xl font-display font-bold">
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="mt-3 text-muted-foreground">A selection of open source contributions and custom applications.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`group relative rounded-xl border border-border bg-card overflow-hidden transition-all hover:-translate-y-1.5 ${project.borderHover}`}
              data-testid={`project-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {/* Gradient bg on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accentClass} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />

              {/* Preview image */}
              <div className="relative h-44 overflow-hidden bg-muted border-b border-border">
                <img
                  src={project.preview}
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay with links on hover */}
                <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
                      data-testid={`project-live-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <ExternalLink size={13} /> Live Demo
                    </a>
                  )}
                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-foreground text-xs font-semibold hover:border-primary/60 transition-colors"
                      data-testid={`project-code-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <Github size={13} /> Source
                    </a>
                  )}
                </div>
                {/* Featured badge on image */}
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-yellow-400 text-xs font-mono border border-yellow-400/20">
                      <Star size={9} fill="currentColor" /> Featured
                    </span>
                  </div>
                )}
                {!project.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-muted-foreground text-xs font-mono border border-border">
                      <Layers size={9} /> Project
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="relative p-5">
                <h3 className="text-base font-display font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs font-mono border border-border bg-muted/50 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  )}
                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github size={12} /> View Code
                    </a>
                  )}
                  {!project.live && !project.code && (
                    <span className="text-xs text-muted-foreground/50 font-mono">private repo</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/YazanMohammad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-all text-sm font-medium"
            data-testid="link-all-projects"
          >
            <Github size={16} /> See all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
