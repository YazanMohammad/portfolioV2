export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string;
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  featured: boolean;
  isVisible: boolean;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  order: number;
  showInHero: boolean;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  logoUrl?: string;
  startDate: string;
  endDate?: string;
  description: string;
  current: boolean;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  logoUrl?: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  imageUrl?: string;
  content: string;
  rating: number;
  linkedinUrl?: string;
  featured: boolean;
  order: number;
  isVisible: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string;
  readTime: number;
  published: boolean;
  featured: boolean;
  externalUrl?: string;
  publishedAt: string;
}

export interface SiteStats {
  yearsExperience: number;
  projectsCompleted: number;
  technologiesMastered: number;
  githubContributions: number;
}

export interface AvailabilityStatus {
  isAvailable: boolean;
  status: string;
  message?: string;
}

const DEFAULTS = {
  projects: [
    { id: "1", title: "Portfolio", description: "Personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS. Custom admin dashboard backed by PostgreSQL via Supabase. GitHub integration, dynamic CV upload, dark/light mode, bilingual support.", imageUrl: "/preview-portfolio.png", technologies: "Next.js 16, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Supabase", liveUrl: "https://www.yznmoh.com/", githubUrl: "https://github.com/YazanMohammad/portfolio", category: "Full Stack", featured: true, isVisible: true, order: 1 },
    { id: "2", title: "Chat App", description: "Full-stack real-time chat application. React frontend with ASP.NET Core backend and SignalR for low-latency bidirectional communication.", imageUrl: "/preview-chat.png", technologies: "React.JS, ASP.NET Core, SignalR, C#", liveUrl: "https://chat-app-by-me.vercel.app/", githubUrl: "https://github.com/YazanMohammad/ChatApp", category: "Full Stack", featured: true, isVisible: true, order: 2 },
    { id: "3", title: "Tic-Tac-Toe", description: "Developed an interactive Tic-Tac-Toe game with clean state management, win detection logic, and a fully responsive UI.", imageUrl: "/preview-ttt.png", technologies: "React.JS, State Management", category: "Web Development", featured: false, isVisible: true, order: 3 },
  ] as Project[],
  skills: [
    { id: "1", name: "TypeScript", category: "Languages", order: 1, showInHero: true },
    { id: "2", name: "JavaScript", category: "Languages", order: 2, showInHero: true },
    { id: "3", name: "Python", category: "Languages", order: 3, showInHero: false },
    { id: "4", name: "Java", category: "Languages", order: 4, showInHero: false },
    { id: "5", name: "C#", category: "Languages", order: 5, showInHero: false },
    { id: "6", name: "C++", category: "Languages", order: 6, showInHero: false },
    { id: "7", name: "C", category: "Languages", order: 7, showInHero: false },
    { id: "8", name: "PHP", category: "Languages", order: 8, showInHero: false },
    { id: "9", name: "SQL", category: "Languages", order: 9, showInHero: false },
    { id: "10", name: "React.js", category: "Frameworks", order: 10, showInHero: true },
    { id: "11", name: "ASP.NET Core", category: "Frameworks", order: 11, showInHero: true },
    { id: "12", name: "Git", category: "Tools", order: 12, showInHero: false },
    { id: "13", name: "EF Core", category: "Tools", order: 13, showInHero: false },
    { id: "14", name: "LLMs", category: "Technologies", order: 14, showInHero: false },
  ] as Skill[],
  experience: [
    { id: "1", position: "Software Engineering Intern", company: "Xocialive", startDate: "2024-09-01", endDate: "2025-01-31", description: "• Developed and maintained web applications using React.JS, ASP.NET Core, and MS SQL Server.\n• Assisted in backend development, optimizing database queries for improved performance.\n• Collaborated with a team to enhance UI/UX for a seamless user experience.", current: false },
  ] as Experience[],
  education: [
    { id: "1", degree: "B.S. Computer Science", school: "Zarqa University", startDate: "2021-01-01", endDate: "2024-01-01", description: "GPA: 76.1% — Studied algorithms, data structures, software engineering, and computer networks." },
  ] as Education[],
  messages: [
    { id: "1", name: "Sample Visitor", email: "visitor@example.com", subject: "Job Opportunity", message: "Hi Yazan, I came across your portfolio and was really impressed. We have a full-stack role that might be a great fit.", isRead: false, createdAt: "2025-05-15" },
  ] as ContactMessage[],
  testimonials: [] as Testimonial[],
  blog: [] as BlogPost[],
  stats: { yearsExperience: 2, projectsCompleted: 5, technologiesMastered: 20, githubContributions: 0 } as SiteStats,
  availability: { isAvailable: true, status: "Open to opportunities", message: "Available for full-time roles and freelance projects." } as AvailabilityStatus,
};

function getKey(key: string) { return `yz_admin_${key}`; }

function loadArr<T>(key: string, fallback: T[]): T[] {
  try { const raw = localStorage.getItem(getKey(key)); return raw ? JSON.parse(raw) : fallback; }
  catch { return fallback; }
}
function loadObj<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(getKey(key)); return raw ? JSON.parse(raw) : fallback; }
  catch { return fallback; }
}
function save<T>(key: string, data: T) { localStorage.setItem(getKey(key), JSON.stringify(data)); }

export const store = {
  getProjects: () => loadArr<Project>("projects", DEFAULTS.projects),
  saveProjects: (d: Project[]) => save("projects", d),
  getSkills: () => loadArr<Skill>("skills", DEFAULTS.skills),
  saveSkills: (d: Skill[]) => save("skills", d),
  getExperience: () => loadArr<Experience>("experience", DEFAULTS.experience),
  saveExperience: (d: Experience[]) => save("experience", d),
  getEducation: () => loadArr<Education>("education", DEFAULTS.education),
  saveEducation: (d: Education[]) => save("education", d),
  getMessages: () => loadArr<ContactMessage>("messages", DEFAULTS.messages),
  saveMessages: (d: ContactMessage[]) => save("messages", d),
  getTestimonials: () => loadArr<Testimonial>("testimonials", DEFAULTS.testimonials),
  saveTestimonials: (d: Testimonial[]) => save("testimonials", d),
  getBlog: () => loadArr<BlogPost>("blog", DEFAULTS.blog),
  saveBlog: (d: BlogPost[]) => save("blog", d),
  getStats: () => loadObj<SiteStats>("stats", DEFAULTS.stats),
  saveStats: (d: SiteStats) => save("stats", d),
  getAvailability: () => loadObj<AvailabilityStatus>("availability", DEFAULTS.availability),
  saveAvailability: (d: AvailabilityStatus) => save("availability", d),
};
