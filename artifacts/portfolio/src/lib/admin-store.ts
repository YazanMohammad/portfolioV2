export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string;
  live?: string;
  code?: string;
  featured: boolean;
  visible: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  order: number;
}

export interface ExperienceItem {
  id: string;
  type: "work" | "education";
  role: string;
  org: string;
  period: string;
  description: string;
  tags: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const DEFAULTS = {
  projects: [
    { id: "1", title: "Portfolio", description: "Personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS. Custom admin dashboard backed by PostgreSQL via Supabase. GitHub integration, dynamic CV upload, dark/light mode, bilingual support.", tags: "Next.js 16, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Supabase", live: "https://www.yznmoh.com/", code: "https://github.com/YazanMohammad/portfolio", featured: true, visible: true },
    { id: "2", title: "Chat App", description: "Full-stack real-time chat application. React frontend with ASP.NET Core backend and SignalR for low-latency bidirectional communication.", tags: "React.JS, ASP.NET Core, SignalR, C#", live: "https://chat-app-by-me.vercel.app/", code: "https://github.com/YazanMohammad/ChatApp", featured: true, visible: true },
    { id: "3", title: "Tic-Tac-Toe", description: "Interactive Tic-Tac-Toe game with clean state management, win detection logic, and a fully responsive UI.", tags: "React.JS, State Management", featured: false, visible: true },
  ] as Project[],
  skills: [
    { id: "1", name: "TypeScript", category: "Languages", order: 1 },
    { id: "2", name: "JavaScript", category: "Languages", order: 2 },
    { id: "3", name: "Python", category: "Languages", order: 3 },
    { id: "4", name: "Java", category: "Languages", order: 4 },
    { id: "5", name: "C#", category: "Languages", order: 5 },
    { id: "6", name: "C++", category: "Languages", order: 6 },
    { id: "7", name: "C", category: "Languages", order: 7 },
    { id: "8", name: "PHP", category: "Languages", order: 8 },
    { id: "9", name: "SQL", category: "Languages", order: 9 },
    { id: "10", name: "React.js", category: "Frameworks", order: 10 },
    { id: "11", name: "ASP.NET Core", category: "Frameworks", order: 11 },
    { id: "12", name: "Git", category: "Tools", order: 12 },
    { id: "13", name: "EF Core", category: "Tools", order: 13 },
    { id: "14", name: "LLMs / AI", category: "Tools", order: 14 },
  ] as Skill[],
  experience: [
    { id: "1", type: "work" as const, role: "Software Engineering Intern", org: "Xocialive", period: "Sep 2024 – Jan 2025", description: "• Developed and maintained web applications using React.JS, ASP.NET Core, and MS SQL Server.\n• Assisted in backend development, optimizing database queries for improved performance.\n• Collaborated with a team to enhance UI/UX for a seamless user experience.", tags: "React.JS, ASP.NET Core, MS SQL Server, C#" },
    { id: "2", type: "education" as const, role: "B.S. Computer Science", org: "Zarqa University", period: "Jan 2021 – Jan 2024", description: "Studied algorithms, data structures, software engineering, and computer networks. GPA: 76.1%", tags: "GPA: 76.1%, Computer Science" },
  ] as ExperienceItem[],
  messages: [
    { id: "1", name: "Sample Visitor", email: "visitor@example.com", subject: "Job Opportunity", message: "Hi Yazan, I came across your portfolio and was really impressed. We have a full-stack role that might be a great fit.", date: "2025-05-15", read: false },
  ] as Message[],
};

function getKey(key: string) { return `yz_admin_${key}`; }

function load<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(getKey(key));
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(getKey(key), JSON.stringify(data));
}

export const store = {
  getProjects: () => load<Project>("projects", DEFAULTS.projects),
  saveProjects: (data: Project[]) => save("projects", data),
  getSkills: () => load<Skill>("skills", DEFAULTS.skills),
  saveSkills: (data: Skill[]) => save("skills", data),
  getExperience: () => load<ExperienceItem>("experience", DEFAULTS.experience),
  saveExperience: (data: ExperienceItem[]) => save("experience", data),
  getMessages: () => load<Message>("messages", DEFAULTS.messages),
  saveMessages: (data: Message[]) => save("messages", data),
};
