import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { languages, useLang, type UiLang } from "@/lib/i18n";
import { useAuthUser } from "@/lib/use-auth";
import { Notifications } from "./Notifications";

export function TopBar() {
  const { lang, uiLang, setLang, tr } = useLang();
  const { user } = useAuthUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="panel-dark flex items-center justify-between rounded-2xl px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-xl bg-amber font-display text-lg text-sign-deep">
          ग
        </span>
        <div className="leading-tight">
          <p className="font-display text-[17px] tracking-wide text-paper">
            GramBiz <span className="text-mint">AI</span>
          </p>
          <p className="text-[10px] text-paper/60">{tr("appTagline")}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {user && <Notifications />}
        <select
          value={uiLang}
          onChange={(e) => setLang(e.target.value as UiLang)}
          aria-label={tr("language")}
          className="max-w-[88px] rounded-full bg-paper/15 px-2 py-1.5 text-xs font-semibold text-paper outline-none"
        >
          {languages.map((l) => (
            <option key={l.id} value={l.id} className="text-ink">
              {l.label}
            </option>
          ))}
        </select>
        {user ? (
          <button
            onClick={signOut}
            aria-label={lang === "hi" ? "लॉगआउट" : "Sign out"}
            className="rounded-full bg-paper/15 px-2.5 py-1.5 text-xs font-semibold text-paper"
          >
            ⏻
          </button>
        ) : (
          <Link
            to="/auth"
            className="rounded-full bg-mint/25 px-3 py-1.5 text-xs font-semibold text-mint"
          >
            {lang === "hi" ? "लॉगिन" : "Sign in"}
          </Link>
        )}
      </div>
    </header>
  );
}
