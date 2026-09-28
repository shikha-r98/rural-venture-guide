import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppState, useVillage } from "@/lib/app-state";
import { formatRupees, getBusinesses, getTrends } from "@/lib/grambiz-data";
import { bi, useLang } from "@/lib/i18n";

type Note = { id: string; icon: string; text: string; to: string; params?: { id: string } };

const KEY = "grambiz-read-notes";

export function Notifications() {
  const { lang, tr } = useLang();
  const village = useVillage();
  const { budget } = useAppState();
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setRead(JSON.parse(window.localStorage.getItem(KEY) ?? "[]"));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const notes = useMemo<Note[]>(() => {
    const picks = getBusinesses(village.id);
    const top = picks[0];
    const affordable = picks.find((b) => b.investment <= budget);
    const trends = getTrends(village.id);
    const up = [...trends].sort((a, b) => b.change - a.change)[0];
    const down = [...trends].sort((a, b) => a.change - b.change)[0];
    const vn = village.name[lang];
    const out: Note[] = [];
    if (top)
      out.push({
        id: `top-${village.id}-${top.id}`,
        icon: "⭐",
        text: bi(
          `${vn} के लिए सबसे अच्छा धंधा: ${top.name.hi} (${top.fit}% मेल)`,
          `Best business for ${vn}: ${top.name.en} (${top.fit}% fit)`,
          lang,
        ),
        to: "/business/$id",
        params: { id: top.id },
      });
    if (affordable)
      out.push({
        id: `budget-${village.id}-${budget}-${affordable.id}`,
        icon: "💰",
        text: bi(
          `आपके बजट में: ${affordable.name.hi} — ${formatRupees(affordable.profit)}/माह मुनाफ़ा`,
          `Within your budget: ${affordable.name.en} — ${formatRupees(affordable.profit)}/month profit`,
          lang,
        ),
        to: "/business/$id",
        params: { id: affordable.id },
      });
    if (up && up.change > 0)
      out.push({
        id: `up-${village.id}-${up.key}`,
        icon: "📈",
        text: bi(`${up.item.hi} का भाव ${up.change}% बढ़ा`, `${up.item.en} price up ${up.change}%`, lang),
        to: "/trends",
      });
    if (down && down.change < 0)
      out.push({
        id: `down-${village.id}-${down.key}`,
        icon: "📉",
        text: bi(`${down.item.hi} का भाव ${Math.abs(down.change)}% गिरा`, `${down.item.en} price down ${Math.abs(down.change)}%`, lang),
        to: "/trends",
      });
    out.push({
      id: "scheme-mudra",
      icon: "🏛️",
      text: bi(
        "मुद्रा लोन: ₹10 लाख तक बिना गारंटी — अपना प्लान देखें",
        "Mudra loan: up to ₹10 lakh without collateral — check your plan",
        lang,
      ),
      to: top ? "/business/$id" : "/",
      params: top ? { id: top.id } : undefined,
    });
    out.push({
      id: `map-${village.id}`,
      icon: "🗺️",
      text: bi(`${vn} के पास की दुकानें नक्शे पर देखें`, `See shops near ${vn} on the map`, lang),
      to: "/map",
    });
    return out;
  }, [village, budget, lang]);

  const unread = notes.filter((n) => !read.includes(n.id));

  function markRead(ids: string[]) {
    const next = Array.from(new Set([...read, ...ids])).slice(-200);
    setRead(next);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={tr("notifications")}
        className="relative grid size-8 place-items-center rounded-full bg-paper/15 text-base"
      >
        🔔
        {unread.length > 0 && (
          <span className="absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full bg-tomato px-1 text-[10px] font-bold text-paper">
            {unread.length}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-[1000] w-[290px] rounded-2xl bg-paper p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-bold text-ink">{tr("notifications")}</p>
            {unread.length > 0 && (
              <button
                type="button"
                onClick={() => markRead(notes.map((n) => n.id))}
                className="text-[11px] font-semibold text-sign"
              >
                {tr("markAllRead")}
              </button>
            )}
          </div>
          {notes.length === 0 ? (
            <p className="text-xs text-ink/60">{tr("noNotifications")}</p>
          ) : (
            <ul className="flex max-h-80 flex-col gap-1.5 overflow-y-auto">
              {notes.map((n) => {
                const isNew = !read.includes(n.id);
                return (
                  <li key={n.id}>
                    <Link
                      to={n.to}
                      params={n.params as never}
                      onClick={() => {
                        markRead([n.id]);
                        setOpen(false);
                      }}
                      className={`flex gap-2 rounded-xl p-2 text-xs ${
                        isNew ? "bg-mint/20 font-semibold text-ink" : "text-ink/60"
                      }`}
                    >
                      <span className="text-base">{n.icon}</span>
                      <span className="flex-1">{n.text}</span>
                      {isNew && <span className="mt-1 size-2 shrink-0 rounded-full bg-tomato" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
