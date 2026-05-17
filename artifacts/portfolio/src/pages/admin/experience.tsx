import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Briefcase, GraduationCap } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import Portal from "@/components/admin/Portal";
import { store, type ExperienceItem } from "@/lib/admin-store";

function uid() { return Math.random().toString(36).slice(2); }

const EMPTY: Omit<ExperienceItem, "id"> = { type: "work", role: "", org: "", period: "", description: "", tags: "" };

export default function AdminExperience() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [modal, setModal] = useState<null | "add" | "edit">(null);
  const [editing, setEditing] = useState<ExperienceItem | null>(null);
  const [form, setForm] = useState(EMPTY);

  useEffect(() => { setItems(store.getExperience()); }, []);

  const save = (data: ExperienceItem[]) => { setItems(data); store.saveExperience(data); };

  const openAdd = () => { setForm(EMPTY); setEditing(null); setModal("add"); };
  const openEdit = (item: ExperienceItem) => { setForm(item); setEditing(item); setModal("edit"); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal === "edit" && editing) {
      save(items.map((i) => i.id === editing.id ? { ...form, id: editing.id } : i));
    } else {
      save([...items, { ...form, id: uid() }]);
    }
    setModal(null);
  };

  const remove = (id: string) => {
    if (confirm("Delete this item?")) save(items.filter((i) => i.id !== id));
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Experience</h1>
            <p className="text-sm text-muted-foreground mt-1">Work history and education</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            data-testid="button-add-experience"
          >
            <Plus size={15} /> Add Entry
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/20 transition-all group"
              data-testid={`experience-row-${item.id}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${item.type === "work" ? "bg-primary/10 border-primary/30" : "bg-accent/10 border-accent/30"}`}>
                {item.type === "work"
                  ? <Briefcase size={16} className="text-primary" />
                  : <GraduationCap size={16} className="text-accent" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{item.role}</h3>
                    <p className={`text-xs font-medium mt-0.5 ${item.type === "work" ? "text-primary" : "text-accent"}`}>{item.org}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground shrink-0">{item.period}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2 whitespace-pre-line">{item.description}</p>
                {item.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.split(",").map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded text-xs font-mono border border-border bg-muted/50 text-muted-foreground">{t.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-start gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(item)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                  <Pencil size={14} />
                </button>
                <button onClick={() => remove(item.id)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Portal>
        <AnimatePresence>
          {modal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModal(null)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto bg-card border border-border rounded-2xl shadow-2xl z-[101] overflow-y-auto max-h-[90vh]"
              >
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <h2 className="font-display font-bold text-foreground">{modal === "add" ? "Add Entry" : "Edit Entry"}</h2>
                  <button onClick={() => setModal(null)} className="text-muted-foreground hover:text-foreground">
                    <X size={18} />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Type</label>
                    <div className="flex gap-3">
                      {(["work", "education"] as const).map((t) => (
                        <label
                          key={t}
                          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all
                            ${form.type === t ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-foreground/30"}`}
                        >
                          <input type="radio" name="type" value={t} checked={form.type === t} onChange={() => setForm({ ...form, type: t })} className="hidden" />
                          {t === "work" ? <Briefcase size={14} /> : <GraduationCap size={14} />}
                          <span className="text-sm capitalize">{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {[
                    { key: "role", label: form.type === "work" ? "Position" : "Degree", placeholder: form.type === "work" ? "Software Engineer" : "B.S. Computer Science" },
                    { key: "org", label: form.type === "work" ? "Company" : "School", placeholder: form.type === "work" ? "Company name" : "University name" },
                    { key: "period", label: "Period", placeholder: "Sep 2024 – Jan 2025" },
                    { key: "tags", label: "Tags (comma-separated)", placeholder: "React, Node.js, ..." },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
                      <input
                        type="text"
                        value={(form as Record<string, string>)[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        required={["role", "org", "period"].includes(key)}
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      required
                      rows={4}
                      placeholder="Describe your role and responsibilities..."
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all resize-none placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setModal(null)}
                      className="flex-1 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      <Save size={14} /> Save
                    </button>
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
