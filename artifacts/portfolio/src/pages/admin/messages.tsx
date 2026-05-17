import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen, Trash2, X, Reply, Clock } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { store, type Message } from "@/lib/admin-store";

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => { setMessages(store.getMessages()); }, []);

  const save = (data: Message[]) => { setMessages(data); store.saveMessages(data); };

  const open = (m: Message) => {
    setSelected(m);
    if (!m.read) save(messages.map((msg) => msg.id === m.id ? { ...msg, read: true } : msg));
  };

  const remove = (id: string) => {
    if (confirm("Delete this message?")) {
      save(messages.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-display font-bold text-foreground">Messages</h1>
            {unread > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-mono border border-primary/20">
                {unread} unread
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{messages.length} messages total</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          {/* Message list */}
          <div className="lg:col-span-2 space-y-2">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Mail size={32} className="text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">No messages yet</p>
              </div>
            )}
            {messages.map((m, i) => (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => open(m)}
                className={`w-full text-left p-4 rounded-xl border transition-all group ${
                  selected?.id === m.id
                    ? "border-primary bg-primary/10"
                    : m.read
                    ? "border-border bg-card hover:border-primary/20"
                    : "border-primary/30 bg-primary/5 hover:border-primary/50"
                }`}
                data-testid={`message-row-${m.id}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    {m.read
                      ? <MailOpen size={13} className="text-muted-foreground shrink-0" />
                      : <Mail size={13} className="text-primary shrink-0" />
                    }
                    <span className={`text-sm truncate ${m.read ? "font-medium text-foreground" : "font-semibold text-foreground"}`}>
                      {m.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-xs font-mono text-muted-foreground">{m.date}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); remove(m.id); }}
                      className="w-5 h-5 flex items-center justify-center rounded text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
                {m.subject && <p className="text-xs text-muted-foreground truncate mb-1">{m.subject}</p>}
                <p className="text-xs text-muted-foreground/70 line-clamp-1">{m.message}</p>
              </motion.button>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="h-full rounded-xl border border-border bg-card"
                >
                  <div className="flex items-start justify-between p-5 border-b border-border">
                    <div>
                      <h2 className="font-display font-bold text-foreground">{selected.subject || "(no subject)"}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-primary font-medium">{selected.name}</span>
                        <a href={`mailto:${selected.email}`} className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono">{selected.email}</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono"><Clock size={11} />{selected.date}</span>
                      <button onClick={() => setSelected(null)} className="ml-2 text-muted-foreground hover:text-foreground"><X size={16} /></button>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>
                  <div className="px-5 pb-5 flex gap-3">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      <Reply size={14} /> Reply
                    </a>
                    <button
                      onClick={() => remove(selected.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-all"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-64 rounded-xl border border-border bg-card/50 flex flex-col items-center justify-center gap-2 text-center p-8"
                >
                  <MailOpen size={32} className="text-muted-foreground/30 mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">Select a message to read</p>
                  <p className="text-xs text-muted-foreground/60">Click any message on the left</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
