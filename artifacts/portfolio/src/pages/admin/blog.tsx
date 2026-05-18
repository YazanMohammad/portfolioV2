import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Rss, Eye, EyeOff, Star, ExternalLink, Clock } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import Portal from "@/components/admin/Portal";
import { store, type BlogPost } from "@/lib/admin-store";

function uid() { return Math.random().toString(36).slice(2); }
function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
const today = new Date().toISOString().split("T")[0];
const EMPTY: Omit<BlogPost, "id"> = { title: "", slug: "", excerpt: "", content: "", coverImage: "", category: "Technical", tags: "", readTime: 5, published: false, featured: false, externalUrl: "", publishedAt: today };
const CATEGORIES = ["Technical", "Career", "Tutorial", "Opinion", "Project"];

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [modal, setModal] = useState<null | "add" | "edit">(null);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(EMPTY);

  useEffect(() => { setPosts(store.getBlog()); }, []);

  const persist = (d: BlogPost[]) => { setPosts(d); store.saveBlog(d); };
  const openAdd = () => { setForm(EMPTY); setEditing(null); setModal("add"); };
  const openEdit = (p: BlogPost) => { setForm(p); setEditing(p); setModal("edit"); };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const slug = form.slug || slugify(form.title);
    if (modal === "edit" && editing) {
      persist(posts.map((p) => p.id === editing.id ? { ...form, slug, id: editing.id } : p));
    } else {
      persist([...posts, { ...form, slug, id: uid() }]);
    }
    setModal(null);
  };

  const remove = (id: string) => { if (confirm("Delete this post?")) persist(posts.filter((p) => p.id !== id)); };
  const toggle = (id: string, key: "published" | "featured") => {
    persist(posts.map((p) => p.id === id ? { ...p, [key]: !p[key] } : p));
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Blog</h1>
            <p className="text-sm text-muted-foreground mt-1">{posts.length} posts · {posts.filter((p) => p.published).length} published</p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            <Plus size={15} /> New Post
          </button>
        </div>

        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-2xl">
            <Rss size={36} className="text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">No blog posts yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Share your thoughts and experiences</p>
            <button onClick={openAdd} className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
              <Plus size={14} /> Write first post
            </button>
          </div>
        )}

        <div className="space-y-3">
          {posts.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/20 transition-all group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-semibold text-foreground text-sm">{p.title}</h3>
                  <span className="px-1.5 py-0.5 rounded text-xs border border-border bg-muted/50 text-muted-foreground font-mono">{p.category}</span>
                  {p.featured && <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"><Star size={9} fill="currentColor" /> Featured</span>}
                  {p.published
                    ? <span className="px-1.5 py-0.5 rounded text-xs bg-primary/10 text-primary border border-primary/20">Published</span>
                    : <span className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground border border-border">Draft</span>
                  }
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{p.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={11} /> {p.readTime} min read</span>
                  <span className="font-mono">{p.publishedAt}</span>
                  {p.tags && <span>{p.tags.split(",").slice(0, 3).map((t) => `#${t.trim()}`).join(" ")}</span>}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {p.externalUrl && <a href={p.externalUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"><ExternalLink size={14} /></a>}
                <button onClick={() => toggle(p.id, "published")} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${p.published ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`} title={p.published ? "Unpublish" : "Publish"}>
                  {p.published ? <Eye size={14} /> : <EyeOff size={14} />}
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
                  <h2 className="font-display font-bold text-foreground">{modal === "add" ? "New Post" : "Edit Post"}</h2>
                  <button onClick={() => setModal(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Title</label>
                    <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })} required placeholder="Post title" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Slug</label>
                    <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated-from-title" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Excerpt</label>
                    <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required rows={2} placeholder="Brief summary..." className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all resize-none placeholder:text-muted-foreground/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Category</label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 transition-all">
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Read Time (min)</label>
                      <input type="number" min={1} value={form.readTime} onChange={(e) => setForm({ ...form, readTime: parseInt(e.target.value) || 5 })} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Tags (comma-separated)</label>
                    <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="react, typescript, tutorial" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">External URL (Dev.to / Medium)</label>
                    <input type="url" value={form.externalUrl || ""} onChange={(e) => setForm({ ...form, externalUrl: e.target.value })} placeholder="https://dev.to/..." className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50" />
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-primary" />
                      <span className="text-sm text-foreground">Published</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-primary" />
                      <span className="text-sm text-foreground">Featured</span>
                    </label>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => setModal(null)} className="flex-1 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-all">Cancel</button>
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
