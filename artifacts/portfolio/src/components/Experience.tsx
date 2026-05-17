import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const timeline = [
  {
    type: "work",
    icon: Briefcase,
    role: "Software Engineering Intern",
    org: "Xocialive",
    period: "Aug 2024 – Jan 2025",
    bullets: [
      "Developed and maintained web applications using React.JS, ASP.NET Core, and MS SQL Server.",
      "Assisted in backend development, optimizing database queries for improved performance.",
      "Collaborated with a team to enhance UI/UX for a seamless user experience.",
    ],
    tags: ["React.JS", "ASP.NET Core", "MS SQL Server"],
  },
  {
    type: "education",
    icon: GraduationCap,
    role: "B.S. Computer Science",
    org: "Zarqa University",
    period: "Dec 2020 – Dec 2023",
    bullets: [
      "Studied algorithms, data structures, software engineering, and computer networks.",
      "Graduated with a 76.1% GPA.",
    ],
    tags: ["GPA: 76.1%"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24" data-testid="section-experience" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">// journey</p>
          <h2 className="text-4xl font-display font-bold">
            Career <span className="text-gradient-primary">Timeline</span>
          </h2>
          <p className="mt-3 text-muted-foreground">My professional journey and educational background.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative sm:pl-20"
                data-testid={`timeline-${item.type}-${i}`}
              >
                {/* Icon dot */}
                <div className="hidden sm:flex absolute left-0 w-16 h-16 items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center
                    group-hover:border-primary/60 transition-colors">
                    <item.icon size={16} className={item.type === "work" ? "text-primary" : "text-accent"} />
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-display font-semibold text-foreground">{item.role}</h3>
                      <p className="text-primary font-medium mt-0.5">{item.org}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono whitespace-nowrap">
                      <Calendar size={12} />
                      {item.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-5">
                    {item.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1 shrink-0">›</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs font-mono border border-border bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
