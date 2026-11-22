import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";

const items = [
  { to: "/", key: "home", icon: "🏠" },
  { to: "/map", key: "map", icon: "🗺️" },
  { to: "/trends", key: "trends", icon: "📈" },
  { to: "/shops", key: "shops", icon: "🏪" },
  { to: "/chat", key: "chat", icon: "💬" },
] as const;

export function BottomNav() {
  const { tr } = useLang();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 lg:sticky lg:inset-auto lg:top-6 lg:z-auto lg:w-48 lg:shrink-0">
      <div className="mx-auto flex max-w-[430px] items-center justify-around rounded-t-2xl bg-paper/95 px-2 py-2 backdrop-blur-md lg:mx-0 lg:w-full lg:max-w-none lg:flex-col lg:items-stretch lg:gap-1 lg:rounded-2xl lg:px-2 lg:py-3">
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            activeOptions={{ exact: it.to === "/" }}
            activeProps={{ className: "bg-sign/10 text-sign font-semibold" }}
            inactiveProps={{ className: "text-ink/50" }}
            className="flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[11px] lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:py-3 lg:text-sm"
          >
            <span className="text-base lg:w-6 lg:text-center">{it.icon}</span>
            {tr(it.key)}
          </Link>
        ))}
      </div>
    </nav>
  );
}
