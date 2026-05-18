import { motion } from "framer-motion";
import { 
  SiTypescript, SiJavascript, SiPython, SiCplusplus, 
  SiPhp, SiReact, SiDotnet, SiGit, 
  SiPostgresql, SiSupabase, SiPrisma, SiNextdotjs
} from "react-icons/si";
import { Terminal, Database, Code2, Globe } from "lucide-react";

const skills = [
  { category: "Languages", icon: <Code2 className="w-5 h-5 text-primary" />, items: [
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "Python", icon: <SiPython /> },
    { name: "C++", icon: <SiCplusplus /> },
    { name: "C#", icon: <Code2 /> },
    { name: "PHP", icon: <SiPhp /> },
    { name: "Java", icon: <Code2 /> },
    { name: "C", icon: <Code2 /> },
  ]},
  { category: "Frontend", icon: <Globe className="w-5 h-5 text-accent" />, items: [
    { name: "React.js", icon: <SiReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Tailwind CSS", icon: <Code2 /> },
  ]},
  { category: "Backend & Tools", icon: <Database className="w-5 h-5 text-green-400" />, items: [
    { name: "ASP.NET Core", icon: <SiDotnet /> },
    { name: "EF Core", icon: <Code2 /> },
    { name: "SQL", icon: <SiPostgresql /> },
    { name: "Git", icon: <SiGit /> },
    { name: "LLMs", icon: <Terminal /> },
  ]}
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-primary w-12" />
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest">02. Arsenal</h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">Technologies I Work With</h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="terminal-window h-full"
            >
              <div className="terminal-header">
                {group.icon}
                <span className="font-mono text-xs text-muted-foreground ml-2">{group.category}</span>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                      <span className="text-xl group-hover:text-primary transition-colors">
                        {item.icon}
                      </span>
                      <span className="font-mono text-sm">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
