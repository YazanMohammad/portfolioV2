import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, GraduationCap } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import Portal from "@/components/admin/Portal";
import { store, type Education } from "@/lib/admin-store";

function uid() { return Math.random().toString(36).slice(2); }
const EMPTY: Omit<Education, "id"> = { degree: "", school: "", startDate: "", endDate: "", description: "" };

export default function AdminEducation() {
  const [items, setItems] = useState<Education[]>([]);
  const [modal, setModal] = useState<null | "add" | "edit">(null);
  const [editing, setEditing] = useState<Education | null>(null);
  const [form, setForm] = useState(EMPTY);

  useEffect(() => { setItems(store.getEducation()); }, []);

  const persist = (d: Education[]) => { setItems(d); store.saveEducation(d); };
  const openAdd = () => { setForm(EMPTY); setEditing(null); setModal("add"); };
  const openEdit = (e: Education) => { setForm(e); setEditing(e); setModal("edit"); };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (modal === "edit" && editing) {
      persist(items.map((i) => i.id === editing.id ? { ...form, id: editing.id } : i));
    } else {
      persist([...items, { ...form, id: uid() }]);
    }
    setModal(null);
  };

  const remove = (id: string) => { if (confirm("Delete this education entry?")) persist(items.filter((i) => i.id !== id)); };

  const fmt = (d?: string) => d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "Present";

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Education</h1>
            <p className="text-sm text-muted-foreground mt-1">{items.length} entries</p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            <Plus size={15} /> Add Education
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/20 transition-all group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-accent/10 border border-accent/30">
                <GraduationCap size={16} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{item.degree}</h3>
                    <p className="text-xs font-medium text-accent mt-0.5">{item.school}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground shrink-0">{fmt(item.startDate)} – {fmt(item.endDate)}</span>
                </div>
                {item.description && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.description}</p>}
              </div>
              <div className="flex items-start gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(item)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"><Pencil size={14} /></button>
                <button onClick={() => remove(item.id)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <GraduationCap size={32} className="text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">No education entries yet</p>
            </div>
          )}
        </div>
      </div>

      <Portal>
        <AnimatePresence>
          {modal && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)} className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto bg-card border border-border rounded-2xl shadow-2xl z-[101] overflow-y-auto max-h-[90vh]">
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <h2 className="font-display font-bold text-foreground">{modal === "add" ? "Add Education" : "Edit Education"}</h2>
                  <button onClick={() => setModal(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  {[
                    { key: "degree", label: "Degree / Qualification", placeholder: "B.S. Computer Science", req: true },
                    { key: "school", label: "School / Institution", placeholder: "University name", req: true },
                    { key: "startDate", label: "Start Date", type: "date", req: true },
                    { key: "endDate", label: "End Date", type: "date" },
                  ].map(({ key, label, placeholder, type, req }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
                      <input type={type || "text"} value={(form as Record<string, string>)[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} required={req}
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Description / GPA</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="GPA: 76.1% — describe your studies..."
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all resize-none placeholder:text-muted-foreground/50" />
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
