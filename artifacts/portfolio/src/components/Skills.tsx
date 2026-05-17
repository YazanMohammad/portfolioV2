import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiPython, SiTypescript, SiJavascript, SiReact,
  SiDotnet, SiGit, SiMysql, SiCplusplus,
  SiPhp, SiOpenai,
} from "react-icons/si";
import { Database, GitBranch, Code } from "lucide-react";

const categories = [
  {
    label: "Languages",
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "Python", icon: SiPython, color: "#3776ab" },
      { name: "Java", icon: Code, color: "#f89820" },
      { name: "C#", icon: Code, color: "#9b59b6" },
      { name: "C++", icon: SiCplusplus, color: "#00599c" },
      { name: "PHP", icon: SiPhp, color: "#8892be" },
      { name: "SQL", icon: SiMysql, color: "#4479a1" },
    ],
  },
  {
    label: "Frameworks & Tools",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61dafb" },
      { name: "ASP.NET Core", icon: SiDotnet, color: "#512bd4" },
      { name: "Git", icon: SiGit, color: "#f05032" },
      { name: "EF Core", icon: Database, color: "#4caf50" },
      { name: "LLMs & AI", icon: SiOpenai, color: "#10a37f" },
      { name: "Version Control", icon: GitBranch, color: "#f05032" },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 relative bg-muted/20" data-testid="section-skills" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">// technical expertise</p>
          <h2 className="text-4xl font-display font-bold">
            Skills &amp; <span className="text-gradient-primary">Technologies</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg">
            A comprehensive toolkit for building robust, scalable, and beautiful applications.
          </p>
        </motion.div>

        <div className="space-y-10">
          {categories.map((cat, ci) => (
            <div key={cat.label}>
              <motion.h3
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: ci * 0.1 }}
                className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-5"
              >
                {cat.label}
              </motion.h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((sk, i) => (
                  <motion.div
                    key={sk.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: ci * 0.1 + i * 0.05 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/10 transition-all group cursor-default"
                    data-testid={`skill-${sk.name.toLowerCase().replace(/[\s.+#]/g, "-")}`}
                  >
                    <sk.icon
                      size={16}
                      style={{ color: sk.color }}
                      className="shrink-0 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-medium text-foreground">{sk.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency bars */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 grid sm:grid-cols-2 gap-6"
        >
          {[
            { name: "React.js / TypeScript", level: 88 },
            { name: "ASP.NET Core / C#", level: 82 },
            { name: "SQL / Database Design", level: 80 },
            { name: "Python / LLMs / AI", level: 75 },
          ].map((item, i) => (
            <div key={item.name} data-testid={`proficiency-${item.name.toLowerCase().replace(/[\s/().]/g, "-")}`}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground font-medium">{item.name}</span>
                <span className="font-mono text-primary text-xs">{item.level}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${item.level}%` } : {}}
                  transition={{ duration: 0.9, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
