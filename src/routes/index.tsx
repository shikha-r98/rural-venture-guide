import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import villageMap from "@/assets/village-map.jpg";
import { Panel } from "@/components/grambiz/Panel";
import { useAppState, useVillage } from "@/lib/app-state";
import {
  budgets,
  formatRupees,
  getBusinesses,
  getShops,
  getTrends,
  states,
  villagesByState,
  type Business,
} from "@/lib/grambiz-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GramBiz AI — Village business advisor" },
      {
        name: "description",
        content:
          "Find the right small business for your village with AI: local demand, competition, investment, profit and shop rent in Hindi or English.",
      },
      { property: "og:title", content: "GramBiz AI — Village business advisor" },
      {
        property: "og:description",
        content:
          "AI business recommendations for rural India: demand, competition, profit estimates and nearby rental shops.",
      },
    ],
  }),
  component: Dashboard,
});

function compLabel(c: Business["competition"], tr: (k: string) => string) {
  return tr(c);
}

function Dashboard() {
  const { lang, tr } = useLang();
  const { stateId, setStateId, villageId, setVillageId, budget, setBudget } = useAppState();
  const village = useVillage();
  const [searched, setSearched] = useState(false);

  const stateVillages = villagesByState(stateId);
  const all = getBusinesses(villageId);
  const trends = getTrends(villageId);
  const rentalShops = getShops(villageId);
  const picks = all.filter((b) => b.investment <= budget);
  const list = (picks.length > 0 ? picks : all.slice(0, 3)).slice(0, 8);

  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <section className="panel-dark rounded-2xl p-4">
        <p className="font-display text-[15px] tracking-wide text-mint">{tr("findBusiness")}</p>
        <p className="mt-0.5 text-xs text-paper/60">{tr("findBusinessSub")}</p>

        <label className="mt-3 flex items-center gap-2 rounded-xl bg-paper/95 px-3 py-2.5">
          <span className="text-base">🗺️</span>
          <select
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
          >
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name[lang]}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-2 flex items-center gap-2 rounded-xl bg-paper/95 px-3 py-2.5">
          <span className="text-base">📍</span>
          <select
            value={villageId}
            onChange={(e) => setVillageId(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
          >
            {stateVillages.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name[lang]} · {v.district[lang]}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-2 flex items-center gap-2 rounded-xl bg-paper/95 px-3 py-2.5">
          <span className="text-base">₹</span>
          <select
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
          >
            {budgets.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label[lang]}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={() => setSearched(true)}
          className="mt-3 w-full rounded-xl bg-amber py-3 font-display text-[16px] tracking-wide text-sign-deep transition-transform active:scale-[0.99]"
        >
          {tr("search")}
        </button>
        {searched && (
          <p className="mt-2 text-center text-xs text-mint">
            {list.length} {lang === "hi" ? "सुझाव मिले" : "matches found"}
          </p>
        )}
      </section>

      {/* Location analysis */}
      <Panel
        title={tr("locationAnalysis")}
        badge={
          <span className="rounded-full bg-mint/25 px-2 py-0.5 font-num text-xs font-bold text-mint-deep">
            {village.demandScore}/100
          </span>
        }
      >
        <img
          src={villageMap}
          alt={`${village.name.en} village map with market and roads`}
          width={1024}
          height={512}
          className="h-32 w-full rounded-xl object-cover"
        />
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs font-medium text-ink/80">
            <span>{tr("demand")}</span>
            <span className="font-num font-bold text-sign">{village.demandScore}/100</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-paper-warm">
            <div
              className="h-full rounded-full bg-mint-deep transition-all"
              style={{ width: `${village.demandScore}%` }}
            />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <Stat value={village.population.toLocaleString("en-IN")} label={tr("population")} />
          <Stat value={String(village.existingShops)} label={tr("existingShops")} />
          <Stat value={village.footfall[lang]} label={tr("footfall")} />
        </div>
      </Panel>

      {/* Recommendations */}
      <Panel title={tr("topPicks")}>
        <div className="flex flex-col gap-2.5">
          {list.map((b) => (
            <article key={b.id} className="rounded-xl bg-paper p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm font-bold text-ink">
                  <span className="text-base">{b.emoji}</span>
                  {b.name[lang]}
                </span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                    b.competition === "high"
                      ? "bg-tomato/15 text-tomato"
                      : "bg-amber/20 text-amber-deep"
                  }`}
                >
                  {b.fit}% fit
                </span>
              </div>
              <p className="mt-1 text-xs text-ink/70">{b.why[lang]}</p>
              <div className="mt-2 flex items-center justify-between text-xs font-medium text-ink/70">
                <span>
                  {tr("invest")} {formatRupees(b.investment)}
                </span>
                <span>
                  {tr("competition")} · {compLabel(b.competition, tr)}
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-sm font-semibold text-mint-deep">{tr("profit")}</span>
                <span className="font-num text-2xl font-bold text-sign">
                  {formatRupees(b.profit)}
                </span>
                <span className="text-xs text-ink/60">{tr("perMonth")}</span>
                <span className="ml-auto font-num text-xs text-ink/60">
                  {tr("roi")} {b.paybackMonths} {tr("months")}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Panel>

      {/* Market trends */}
      <Panel
        title={tr("marketTrends")}
        badge={
          <Link to="/trends" className="text-xs font-semibold text-mint-deep">
            {tr("viewAll")}
          </Link>
        }
      >
        <div className="flex gap-2 overflow-x-auto pb-1">
          {trends.slice(0, 4).map((t) => (
            <div key={t.item.en} className="shrink-0 rounded-xl bg-paper px-3 py-2">
              <div className="text-xs text-ink/60">{t.item[lang]}</div>
              <div className="flex items-center gap-1">
                <span
                  className={`font-num text-base font-bold ${t.change >= 0 ? "text-mint-deep" : "text-tomato"}`}
                >
                  {t.price}
                </span>
                <span
                  className={`text-xs font-semibold ${t.change >= 0 ? "text-mint-deep" : "text-tomato"}`}
                >
                  {t.change >= 0 ? "▲" : "▼"} {Math.abs(t.change)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Nearby shops */}
      <Panel
        title={tr("nearbyShops")}
        badge={
          <Link to="/shops" className="text-xs font-semibold text-mint-deep">
            {tr("viewAll")}
          </Link>
        }
      >
        <div className="flex flex-col gap-2">
          {rentalShops.slice(0, 3).map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-xl bg-paper px-3 py-2.5"
            >
              <div>
                <div className="text-sm font-bold text-ink">{s.name[lang]}</div>
                <div className="text-xs text-ink/60">
                  {s.distanceKm} km · {s.sqft} sq ft
                </div>
              </div>
              <div className="font-num text-base font-bold text-sign">{formatRupees(s.rent)}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* AI help */}
      <Panel title={tr("aiHelp")}>
        <div className="rounded-xl bg-paper/80 p-3 text-sm text-ink/80">
          {lang === "hi"
            ? "नमस्ते! बताइए आपके पास कितना पैसा है — मैं सही धंधा सुझाऊँगा।"
            : "Hello! Tell me your budget and I'll suggest the right business."}
        </div>
        <Link
          to="/chat"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-sign py-3 font-display text-[15px] tracking-wide text-paper"
        >
          💬 {tr("ask")}
        </Link>
      </Panel>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-paper py-2">
      <span className="block font-num text-[17px] font-bold text-sign">{value}</span>
      <span className="text-[10px] text-ink/60">{label}</span>
    </div>
  );
}
