import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Star, Eye, EyeOff, Quote } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import Portal from "@/components/admin/Portal";
import { store, type Testimonial } from "@/lib/admin-store";

function uid() { return Math.random().toString(36).slice(2); }
const EMPTY: Omit<Testimonial, "id"> = { name: "", position: "", company: "", imageUrl: "", content: "", rating: 5, linkedinUrl: "", featured: false, order: 0, isVisible: true };

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [modal, setModal] = useState<null | "add" | "edit">(null);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(EMPTY);

  useEffect(() => { setItems(store.getTestimonials()); }, []);

  const persist = (d: Testimonial[]) => { setItems(d); store.saveTestimonials(d); };
  const openAdd = () => { setForm({ ...EMPTY, order: items.length + 1 }); setEditing(null); setModal("add"); };
  const openEdit = (t: Testimonial) => { setForm(t); setEditing(t); setModal("edit"); };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (modal === "edit" && editing) {
      persist(items.map((i) => i.id === editing.id ? { ...form, id: editing.id } : i));
    } else {
      persist([...items, { ...form, id: uid() }]);
    }
    setModal(null);
  };

  const remove = (id: string) => { if (confirm("Delete this testimonial?")) persist(items.filter((i) => i.id !== id)); };
  const toggle = (id: string, key: "featured" | "isVisible") => {
    persist(items.map((i) => i.id === id ? { ...i, [key]: !i[key] } : i));
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Testimonials</h1>
            <p className="text-sm text-muted-foreground mt-1">{items.length} testimonials</p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            <Plus size={15} /> Add Testimonial
          </button>
        </div>

        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-2xl">
            <Quote size={36} className="text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">No testimonials yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Add a testimonial from a colleague or client</p>
            <button onClick={openAdd} className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
              <Plus size={14} /> Add first testimonial
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="p-5 rounded-xl border border-border bg-card hover:border-primary/20 transition-all group relative">
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={12} className={idx < t.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic line-clamp-3 mb-4">"{t.content}"</p>
              <div className="flex items-center gap-3">
                {t.imageUrl ? (
                  <img src={t.imageUrl} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-border" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name[0]}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.position} · {t.company}</p>
                </div>
              </div>
              {/* Badges */}
              <div className="flex items-center gap-1 mt-3">
                {t.featured && <span className="px-1.5 py-0.5 rounded text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 inline-flex items-center gap-0.5"><Star size={9} fill="currentColor" /> Featured</span>}
                {!t.isVisible && <span className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground border border-border">Hidden</span>}
              </div>
              {/* Actions */}
              <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => toggle(t.id, "isVisible")} className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all" title={t.isVisible ? "Hide" : "Show"}>
                  {t.isVisible ? <Eye size={13} /> : <EyeOff size={13} />}
                </button>
                <button onClick={() => toggle(t.id, "featured")} className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all ${t.featured ? "text-yellow-400" : "text-muted-foreground hover:text-yellow-400 hover:bg-yellow-400/10"}`}>
                  <Star size={13} fill={t.featured ? "currentColor" : "none"} />
                </button>
                <button onClick={() => openEdit(t)} className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"><Pencil size={13} /></button>
                <button onClick={() => remove(t.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"><Trash2 size={13} /></button>
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
                  <h2 className="font-display font-bold text-foreground">{modal === "add" ? "Add Testimonial" : "Edit Testimonial"}</h2>
                  <button onClick={() => setModal(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  {[
                    { key: "name", label: "Full Name", placeholder: "Jane Doe", req: true },
                    { key: "position", label: "Position / Title", placeholder: "Senior Engineer", req: true },
                    { key: "company", label: "Company", placeholder: "Acme Corp", req: true },
                    { key: "imageUrl", label: "Photo URL", placeholder: "https://..." },
                    { key: "linkedinUrl", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/..." },
                  ].map(({ key, label, placeholder, req }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
                      <input type="text" value={(form as Record<string, string | number | boolean>)[key] as string || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} required={req}
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Testimonial</label>
                    <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={4} placeholder="What they said about you..."
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all resize-none placeholder:text-muted-foreground/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}
                          className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${form.rating >= n ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-400" : "border-border text-muted-foreground hover:border-yellow-400/30"}`}>
                          <Star size={14} fill={form.rating >= n ? "currentColor" : "none"} />
                        </button>
                      ))}
                      <span className="text-sm text-muted-foreground self-center ml-1">{form.rating}/5</span>
                    </div>
                  </div>
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
