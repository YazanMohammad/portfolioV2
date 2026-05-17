import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center relative pt-20 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />
      
      <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Open to opportunities
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-foreground">
            Yazan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Mohammad</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-mono">
            Software Engineer / Full-stack Developer
          </p>

          <div className="pt-8">
            <div className="terminal-window max-w-2xl">
              <div className="terminal-header">
                <div className="flex gap-1.5">
                  <div className="terminal-dot red" />
                  <div className="terminal-dot yellow" />
                  <div className="terminal-dot green" />
                </div>
                <div className="ml-4 text-xs font-mono text-muted-foreground flex items-center gap-2">
                  <Terminal className="w-3 h-3" /> yazan@portfolio ~
                </div>
              </div>
              <div className="p-4 md:p-6 font-mono text-sm md:text-base space-y-2 text-muted-foreground overflow-x-auto">
                <p><span className="text-primary">❯</span> whoami</p>
                <p className="text-foreground">Full-stack developer building scalable backend systems and high-performance web apps.</p>
                <p><span className="text-primary">❯</span> cat interests.txt</p>
                <p className="text-foreground">["coding", "gaming", "coffee", "crafting precise UI"]</p>
                <p className="animate-pulse text-primary">_</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-8">
            <a 
              href="#projects" 
              className="px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 font-mono text-sm transition-colors"
            >
              View Work
            </a>
            <a 
              href="https://gvlmxittxprtcfavasgp.supabase.co/storage/v1/object/public/resumes/cv.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border text-foreground rounded hover:bg-muted font-mono text-sm transition-colors"
            >
              Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
