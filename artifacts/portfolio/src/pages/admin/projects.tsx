import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, ExternalLink, Github, X, Save } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import Portal from "@/components/admin/Portal";
import { store, type Project } from "@/lib/admin-store";

function uid() { return Math.random().toString(36).slice(2); }
const CATEGORIES = ["Full Stack", "Web Development", "Mobile", "API", "Tool", "Other"];
const EMPTY: Omit<Project, "id"> = { title: "", description: "", imageUrl: "", technologies: "", liveUrl: "", githubUrl: "", category: "Full Stack", featured: false, isVisible: true, order: 0 };

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [modal, setModal] = useState<null | "add" | "edit">(null);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(EMPTY);

  useEffect(() => { setProjects(store.getProjects()); }, []);

  const save = (data: Project[]) => { setProjects(data); store.saveProjects(data); };
  const openAdd = () => { setForm({ ...EMPTY, order: projects.length + 1 }); setEditing(null); setModal("add"); };
  const openEdit = (p: Project) => { setForm(p); setEditing(p); setModal("edit"); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal === "edit" && editing) {
      save(projects.map((p) => p.id === editing.id ? { ...form, id: editing.id } : p));
    } else {
      save([...projects, { ...form, id: uid() }]);
    }
    setModal(null);
  };

  const remove = (id: string) => { if (confirm("Delete this project?")) save(projects.filter((p) => p.id !== id)); };
  const toggle = (id: string, key: "featured" | "isVisible") => {
    save(projects.map((p) => p.id === id ? { ...p, [key]: !p[key] } : p));
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Projects</h1>
            <p className="text-sm text-muted-foreground mt-1">{projects.length} projects total</p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            <Plus size={15} /> Add Project
          </button>
        </div>

        <div className="space-y-3">
          {projects.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/20 transition-all group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-foreground text-sm">{p.title}</h3>
                  <span className="px-1.5 py-0.5 rounded text-xs border border-border bg-muted/50 text-muted-foreground font-mono">{p.category}</span>
                  {p.featured && <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"><Star size={9} fill="currentColor" /> Featured</span>}
                  {!p.isVisible && <span className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground border border-border">Hidden</span>}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{p.description}</p>
                <div className="flex flex-wrap gap-1">
                  {p.technologies.split(",").filter(Boolean).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-xs font-mono border border-border bg-muted/50 text-muted-foreground">{t.trim()}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"><ExternalLink size={14} /></a>}
                {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"><Github size={14} /></a>}
                <button onClick={() => toggle(p.id, "isVisible")} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all" title={p.isVisible ? "Hide" : "Show"}>
                  {p.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button onClick={() => toggle(p.id, "featured")} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${p.featured ? "text-yellow-400 bg-yellow-400/10" : "text-muted-foreground hover:text-yellow-400 hover:bg-yellow-400/10"}`}>
                  <Star size={14} fill={p.featured ? "currentColor" : "none"} />
                </button>
                <button onClick={() => openEdit(p)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"><Pencil size={14} /></button>
                <button onClick={() => remove(p.id)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Portal>
        <AnimatePresence>
          {modal && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)} className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto bg-card border border-border rounded-2xl shadow-2xl z-[101] overflow-y-auto max-h-[90vh]">
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <h2 className="font-display font-bold text-foreground">{modal === "add" ? "Add Project" : "Edit Project"}</h2>
                  <button onClick={() => setModal(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
                  <Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea required />
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 transition-all">
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <Field label="Technologies (comma-separated)" value={form.technologies} onChange={(v) => setForm({ ...form, technologies: v })} placeholder="React.JS, TypeScript, ..." required />
                  <Field label="Live URL" value={form.liveUrl || ""} onChange={(v) => setForm({ ...form, liveUrl: v })} placeholder="https://..." />
                  <Field label="GitHub URL" value={form.githubUrl || ""} onChange={(v) => setForm({ ...form, githubUrl: v })} placeholder="https://github.com/..." />
                  <Field label="Image URL" value={form.imageUrl || ""} onChange={(v) => setForm({ ...form, imageUrl: v })} placeholder="https://..." />
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-primary" />
                      <span className="text-sm text-foreground">Featured</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" checked={form.isVisible} onChange={(e) => setForm({ ...form, isVisible: e.target.checked })} className="w-4 h-4 accent-primary" />
                      <span className="text-sm text-foreground">Visible</span>
                    </label>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setModal(null)} className="flex-1 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">Cancel</button>
                    <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"><Save size={14} /> Save</button>
                  </div>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </AdminLayout>
  );
}

function Field({ label, value, onChange, textarea, required, placeholder }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean; required?: boolean; placeholder?: string }) {
  const cls = "w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all";
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      {textarea
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} required={required} rows={3} placeholder={placeholder} className={cls + " resize-none"} />
        : <input type="text" value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} className={cls} />
      }
    </div>
  );
}
