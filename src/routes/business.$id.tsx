import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Panel } from "@/components/grambiz/Panel";
import { useVillage } from "@/lib/app-state";
import { buildPlan, costBreakdown, schemesFor } from "@/lib/finance";
import { formatRupees, getBusinesses, getShops } from "@/lib/grambiz-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/business/$id")({
  head: () => ({
    meta: [
      { title: "Business plan, loan EMI & govt schemes — GramBiz AI" },
      {
        name: "description",
        content:
          "Full village business plan: investment, monthly profit, loan EMI calculation, payback time and the government schemes you can apply for.",
      },
      { property: "og:title", content: "Business plan, loan EMI & govt schemes — GramBiz AI" },
      {
        property: "og:description",
        content: "Investment, profit, EMI and subsidy schemes for a rural business idea.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BusinessDetail,
});

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-ink/70">{label}</span>
      <span className={`font-num ${strong ? "text-base font-bold text-sign" : "font-semibold text-ink"}`}>
        {value}
      </span>
    </div>
  );
}

function BusinessDetail() {
  const { id } = useParams({ from: "/business/$id" });
  const { lang, tr } = useLang();
  const village = useVillage();
  const business = getBusinesses(village.id).find((b) => b.id === id);

  const [loanPct, setLoanPct] = useState(70);
  const [rate, setRate] = useState(11);
  const [months, setMonths] = useState(36);

  if (!business) {
    return (
      <Panel title={tr("notFound")}>
        <Link to="/" className="text-sm font-semibold text-mint-deep">
          ← {tr("home")}
        </Link>
      </Panel>
    );
  }

  const plan = buildPlan(business, loanPct, rate, months);
  const rent = getShops(village.id)[0]?.rent ?? 4000;
  const costs = costBreakdown(business, rent);
  const schemes = schemesFor(business);

  return (
    <div className="flex flex-col gap-3">
      <Link to="/" className="text-sm font-semibold text-mint-deep">
        ← {tr("backToPicks")}
      </Link>

      <section className="panel-dark rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{business.emoji}</span>
          <div>
            <h1 className="font-display text-[19px] tracking-wide text-mint">{business.name[lang]}</h1>
            <p className="text-xs text-paper/60">
              {village.name[lang]} · {village.district[lang]}
            </p>
          </div>
          <span className="ml-auto rounded-md bg-amber/25 px-2 py-1 font-num text-xs font-bold text-amber">
            {business.fit}% fit
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-paper/85">{business.why[lang]}</p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            [formatRupees(business.investment), tr("invest")],
            [formatRupees(business.profit), tr("profit")],
            [`${business.paybackMonths} ${tr("months")}`, tr("roi")],
          ].map(([v, l]) => (
            <div key={l} className="rounded-lg bg-paper/10 py-2">
              <span className="block font-num text-[15px] font-bold text-mint">{v}</span>
              <span className="text-[10px] text-paper/60">{l}</span>
            </div>
          ))}
        </div>
      </section>

      <Panel title={tr("loanCalc")}>
        <div className="flex flex-col gap-3">
          <Slider
            label={`${tr("loanShare")} · ${loanPct}%`}
            value={loanPct}
            min={0}
            max={90}
            step={5}
            onChange={setLoanPct}
          />
          <Slider
            label={`${tr("interestRate")} · ${rate}%`}
            value={rate}
            min={4}
            max={20}
            step={1}
            onChange={setRate}
          />
          <Slider
            label={`${tr("tenure")} · ${months} ${tr("months")}`}
            value={months}
            min={12}
            max={84}
            step={6}
            onChange={setMonths}
          />
        </div>

        <div className="mt-3 rounded-xl bg-paper p-3">
          <Row label={tr("ownFunds")} value={formatRupees(plan.ownFunds)} />
          <Row label={tr("loanAmount")} value={formatRupees(plan.loanAmount)} />
          <Row label={tr("emi")} value={`${formatRupees(plan.emi)} ${tr("perMonth")}`} strong />
          <Row label={tr("totalInterest")} value={formatRupees(plan.totalInterest)} />
          <Row label={tr("totalRepaid")} value={formatRupees(plan.totalRepaid)} />
        </div>

        <div
          className={`mt-2 rounded-xl p-3 ${
            plan.monthlyProfitAfterEmi > 0 ? "bg-mint/20" : "bg-tomato/15"
          }`}
        >
          <Row
            label={tr("profitAfterEmi")}
            value={`${formatRupees(plan.monthlyProfitAfterEmi)} ${tr("perMonth")}`}
            strong
          />
          <Row label={tr("yearOne")} value={formatRupees(plan.yearOneProfit)} />
          <Row
            label={tr("breakEven")}
            value={
              plan.breakEvenMonths > 0
                ? `${plan.breakEvenMonths} ${tr("months")}`
                : lang === "hi"
                  ? "EMI ज़्यादा है"
                  : "EMI too high"
            }
          />
          <Row label={tr("annualRoi")} value={`${plan.annualRoi}%`} />
        </div>
      </Panel>

      <Panel title={tr("monthlyMath")}>
        <div className="rounded-xl bg-paper p-3">
          <Row label={tr("revenue")} value={formatRupees(costs.revenue)} strong />
          <Row label={tr("stockCost")} value={`− ${formatRupees(costs.stock)}`} />
          <Row label={tr("labourCost")} value={`− ${formatRupees(costs.labour)}`} />
          <Row label={tr("powerCost")} value={`− ${formatRupees(costs.power)}`} />
          <Row label={tr("rentCost")} value={`− ${formatRupees(costs.rent)}`} />
          <Row label={tr("miscCost")} value={`− ${formatRupees(costs.misc)}`} />
          <div className="mt-1 border-t border-ink/10 pt-1">
            <Row label={tr("profit")} value={formatRupees(business.profit)} strong />
          </div>
        </div>
        <p className="mt-2 text-xs text-ink/60">{tr("estimateNote")}</p>
      </Panel>

      <Panel title={tr("govtSchemes")}>
        <div className="flex flex-col gap-2">
          {schemes.map((s) => (
            <a
              key={s.id}
              href={s.link}
              target="_blank"
              rel="noreferrer noopener"
              className="block rounded-xl bg-paper p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-ink">{s.name[lang]}</span>
                <span className="text-xs font-semibold text-mint-deep">↗</span>
              </div>
              <p className="mt-1 text-xs text-ink/70">{s.who[lang]}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-mint/25 px-2 py-0.5 text-[11px] font-semibold text-mint-deep">
                  {s.benefit[lang]}
                </span>
                <span className="rounded-md bg-amber/20 px-2 py-0.5 text-[11px] font-semibold text-amber-deep">
                  {s.rate[lang]}
                </span>
              </div>
            </a>
          ))}
        </div>
      </Panel>

      <Link
        to="/chat"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-sign py-3 font-display text-[15px] tracking-wide text-paper"
      >
        💬 {tr("ask")}
      </Link>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-ink/80">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 h-2 w-full cursor-pointer appearance-none rounded-full bg-paper-warm accent-mint-deep"
      />
    </label>
  );
}
