import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/grambiz/Panel";
import { useVillage } from "@/lib/app-state";
import { getBusinesses, getTrends, formatRupees } from "@/lib/grambiz-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/trends")({
  head: () => ({
    meta: [
      { title: "Market trends & competition — GramBiz AI" },
      {
        name: "description",
        content:
          "Village market price trends, demand growth and competition forecasts for small rural businesses.",
      },
      { property: "og:title", content: "Market trends & competition — GramBiz AI" },
      {
        property: "og:description",
        content: "Prices, demand growth and competition levels for rural business ideas.",
      },
    ],
  }),
  component: TrendsPage,
});

function TrendsPage() {
  const { lang, tr } = useLang();
  const village = useVillage();
  const list = getBusinesses(village.id).slice(0, 10);
  const trends = getTrends(village.id);

  return (
    <div className="flex flex-col gap-3">
      <Panel title={tr("marketTrends")}>
        <div className="flex flex-col gap-2">
          {trends.map((t) => (
            <div
              key={t.item.en}
              className="flex items-center justify-between rounded-xl bg-paper px-3 py-2.5"
            >
              <span className="text-sm font-bold text-ink">{t.item[lang]}</span>
              <span className="flex items-center gap-2">
                <span className="font-num text-base font-bold text-sign">{t.price}</span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-xs font-bold ${
                    t.change >= 0 ? "bg-mint/25 text-mint-deep" : "bg-tomato/15 text-tomato"
                  }`}
                >
                  {t.change >= 0 ? "▲" : "▼"} {Math.abs(t.change)}%
                </span>
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title={tr("competitionTitle")}>
        <div className="flex flex-col gap-2.5">
          {list.map((b) => {
            const width = b.competition === "low" ? 30 : b.competition === "moderate" ? 62 : 90;
            return (
              <div key={b.id} className="rounded-xl bg-paper p-3">
                <div className="flex items-center justify-between text-sm font-bold text-ink">
                  <span>
                    {b.emoji} {b.name[lang]}
                  </span>
                  <span className="text-xs font-semibold text-ink/60">{tr(b.competition)}</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-paper-warm">
                  <div
                    className={`h-full rounded-full ${
                      b.competition === "high"
                        ? "bg-tomato"
                        : b.competition === "moderate"
                          ? "bg-amber"
                          : "bg-mint-deep"
                    }`}
                    style={{ width: `${width}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-ink/70">
                  <span>
                    {tr("marketSize")} {formatRupees(b.profit * 12 * 4)}
                  </span>
                  <span>
                    {tr("roi")} {b.paybackMonths} {tr("months")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
