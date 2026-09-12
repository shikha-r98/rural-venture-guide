import { useLang } from "@/lib/i18n";

export function TopBar() {
  const { lang, setLang, tr } = useLang();

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
      <div className="flex rounded-full bg-paper/15 p-1">
        <button
          onClick={() => setLang("hi")}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            lang === "hi" ? "bg-paper text-sign-deep" : "text-paper/70"
          }`}
        >
          हिंदी
        </button>
        <button
          onClick={() => setLang("en")}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            lang === "en" ? "bg-paper text-sign-deep" : "text-paper/70"
          }`}
        >
          EN
        </button>
      </div>
    </header>
  );
}
