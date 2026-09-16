import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { useAuthUser } from "@/lib/use-auth";
import { AuthPanel } from "./AuthPanel";

/** Everything except /auth requires a signed-in user. */
export function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthUser();
  const { lang } = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname.startsWith("/auth")) return <>{children}</>;

  if (loading) {
    return (
      <div className="panel-dark rounded-2xl px-4 py-10 text-center text-sm text-paper/70">
        {lang === "hi" ? "लोड हो रहा है…" : "Loading…"}
      </div>
    );
  }

  if (!user) return <AuthPanel />;

  return <>{children}</>;
}
