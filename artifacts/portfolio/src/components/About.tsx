import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Cpu, Coffee, Gamepad2 } from "lucide-react";

const traits = [
  { icon: Code2, label: "Clean Code", desc: "Writing readable, maintainable, and efficient code." },
  { icon: Cpu, label: "Systems Thinker", desc: "Building scalable backend systems from the ground up." },
  { icon: Coffee, label: "Coffee-Powered", desc: "Best ideas happen over a perfectly brewed cup." },
  { icon: Gamepad2, label: "Always Learning", desc: "Gaming mindset — level up, iterate, improve." },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 relative" data-testid="section-about" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">// about me</p>
          <h2 className="text-4xl font-display font-bold">
            Who I <span className="text-gradient-primary">Am</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
              I'm a <span className="text-foreground font-medium">full-stack software engineer</span> based in Jordan, passionate about building 
              digital experiences that are fast, reliable, and beautiful. I specialize in scalable backend systems 
              and high-performance web applications.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5">
              With a Computer Science degree from Zarqa University and hands-on experience as a Software Engineering 
              intern at <span className="text-foreground font-medium">Xocialive</span>, I've worked across the full stack — 
              from React frontends to ASP.NET Core APIs backed by SQL Server.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I'm currently open to new opportunities where I can bring my skills in{" "}
              <span className="text-primary font-mono text-sm">React.js</span>,{" "}
              <span className="text-primary font-mono text-sm">ASP.NET Core</span>,{" "}
              <span className="text-primary font-mono text-sm">TypeScript</span>, and{" "}
              <span className="text-primary font-mono text-sm">LLMs</span> to challenging problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid grid-cols-2 gap-4"
          >
            {traits.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group"
                data-testid={`trait-${t.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <t.icon size={20} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-semibold text-foreground mb-1">{t.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
