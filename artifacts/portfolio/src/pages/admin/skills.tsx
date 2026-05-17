import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X, Save, GripVertical } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import Portal from "@/components/admin/Portal";
import { store, type Skill } from "@/lib/admin-store";

function uid() { return Math.random().toString(36).slice(2); }

const CATEGORIES = ["Languages", "Frameworks", "Tools", "Technologies", "Other"];

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Languages" });
  const [filter, setFilter] = useState("All");

  useEffect(() => { setSkills(store.getSkills()); }, []);

  const save = (data: Skill[]) => { setSkills(data); store.saveSkills(data); };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    save([...skills, { id: uid(), name: form.name, category: form.category, order: skills.length + 1 }]);
    setForm({ name: "", category: "Languages" });
    setModal(false);
  };

  const remove = (id: string) => { save(skills.filter((s) => s.id !== id)); };

  const cats = ["All", ...CATEGORIES];
  const visible = filter === "All" ? skills : skills.filter((s) => s.category === filter);

  const grouped = CATEGORIES.reduce((acc, cat) => {
    const items = visible.filter((s) => s.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Skills</h1>
            <p className="text-sm text-muted-foreground mt-1">{skills.length} skills total</p>
          </div>
          <button onClick={() => setModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors" data-testid="button-add-skill">
            <Plus size={15} /> Add Skill
          </button>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === c ? "bg-primary/15 text-primary border border-primary/30" : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Skills by category */}
        <div className="space-y-6">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">{cat}</h3>
              <div className="space-y-2">
                {items.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:border-primary/20 transition-all group"
                    data-testid={`skill-row-${s.id}`}
                  >
                    <GripVertical size={14} className="text-muted-foreground/40 cursor-grab" />
                    <span className="flex-1 text-sm font-medium text-foreground">{s.name}</span>
                    <span className="text-xs font-mono text-muted-foreground px-2 py-0.5 rounded border border-border bg-muted/50">{s.category}</span>
                    <button onClick={() => remove(s.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive hover:bg-destructive/10 transition-all">
                      <Trash2 size={13} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Portal>
        <AnimatePresence>
          {modal && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(false)} className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-sm mx-auto bg-card border border-border rounded-2xl shadow-2xl z-[101]">
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <h2 className="font-display font-bold text-foreground">Add Skill</h2>
                  <button onClick={() => setModal(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
                </div>
                <form onSubmit={handleAdd} className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Skill Name</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="e.g. Next.js" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 transition-all">
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => setModal(false)} className="flex-1 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-all">Cancel</button>
                    <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"><Save size={14} /> Add</button>
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
