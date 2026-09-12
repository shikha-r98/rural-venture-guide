import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";

const items = [
  { to: "/", key: "home", icon: "🏠" },
  { to: "/trends", key: "trends", icon: "📈" },
  { to: "/shops", key: "shops", icon: "🏪" },
  { to: "/chat", key: "chat", icon: "💬" },
] as const;

export function BottomNav() {
  const { tr } = useLang();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20">
      <div className="mx-auto flex max-w-[430px] items-center justify-around rounded-t-2xl bg-paper/95 px-2 py-2 backdrop-blur-md">
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            activeOptions={{ exact: it.to === "/" }}
            activeProps={{ className: "bg-sign/10 text-sign font-semibold" }}
            inactiveProps={{ className: "text-ink/50" }}
            className="flex flex-col items-center gap-0.5 rounded-xl px-4 py-1.5 text-[11px]"
          >
            <span className="text-base">{it.icon}</span>
            {tr(it.key)}
          </Link>
        ))}
      </div>
    </nav>
  );
}
