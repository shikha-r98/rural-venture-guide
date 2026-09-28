import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";

const LiveMap = lazy(() => import("@/components/grambiz/LiveMap"));
import { Panel } from "@/components/grambiz/Panel";
import { useVillage } from "@/lib/app-state";
import { formatRupees, getBusinesses } from "@/lib/grambiz-data";
import { useLang } from "@/lib/i18n";
import { getNearbyPlaces } from "@/lib/map-data";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Village map & nearby shops — GramBiz AI" },
      {
        name: "description",
        content:
          "See shops of the same type around your village on a map, change the search radius and check distance, rent and competition.",
      },
      { property: "og:title", content: "Village map & nearby shops — GramBiz AI" },
      {
        property: "og:description",
        content:
          "Map view of nearby shops by business type with an adjustable radius, distance, rent and competition insight.",
      },
    ],
  }),
  component: MapPage,
});

const MAP_SIZE = 300;
const CENTER = MAP_SIZE / 2;

function MapPage() {
  const { lang, tr } = useLang();
  const village = useVillage();
  const [radius, setRadius] = useState(6);
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);

  const businesses = getBusinesses(village.id);
  const places = useMemo(() => getNearbyPlaces(village.id), [village.id]);

  const categories = useMemo(() => {
    const ids = Array.from(new Set(places.map((p) => p.categoryId)));
    return ids
      .map((id) => ({ id, b: businesses.find((x) => x.id === id) }))
      .filter((c) => c.b)
      .slice(0, 12);
  }, [places, businesses]);

  const inRadius = places.filter((p) => p.distanceKm <= radius);
  const visible = category === "all" ? inRadius : inRadius.filter((p) => p.categoryId === category);

  const maxKm = 15;
  const ringR = (km: number) => (km / maxKm) * (CENTER - 14);

  const density = visible.length;
  const verdict =
    density <= 2
      ? { key: "gapHere", cls: "bg-mint/25 text-mint-deep" }
      : density <= 6
        ? { key: "someHere", cls: "bg-amber/25 text-ink" }
        : { key: "crowdedHere", cls: "bg-tomato/20 text-tomato" };

  return (
    <div className="flex flex-col gap-3">
      <Panel
        title={tr("mapTitle")}
        badge={
          <span className="rounded-full bg-mint/25 px-2 py-0.5 text-xs font-bold text-mint-deep">
            {village.name[lang]}
          </span>
        }
      >
        <div className="relative overflow-hidden rounded-2xl bg-paper">
          {hydrated ? (
            <Suspense fallback={<div className="h-[320px]" />}>
              <LiveMap
                queries={[
                  `${village.name.en}, ${village.district.en}, ${village.stateName.en}, India`,
                  `${village.district.en}, ${village.stateName.en}, India`,
                  `${village.stateName.en}, India`,
                ]}
                places={visible}
                radiusKm={radius}
                selected={selected}
                onSelect={setSelected}
                labelFor={(p) =>
                  `<b>${p.name[lang]}</b><br/>${p.distanceKm} km · ⭐ ${p.rating} · ${formatRupees(p.rent)}${tr("perMonth")}`
                }
              />
            </Suspense>
          ) : (
            <div className="h-[320px]" />
          )}
          <span className="pointer-events-none absolute left-12 top-2 z-[500] rounded-full bg-paper/90 px-2 py-0.5 text-[10px] font-bold text-sign">
            {radius} km
          </span>
        </div>

        {/* Radius control */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs font-semibold text-ink/70">
            <span>{tr("radius")}</span>
            <span className="font-num text-sign">{radius} km</span>
          </div>
          <input
            type="range"
            min={1}
            max={maxKm}
            step={1}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="mt-1 w-full accent-[var(--sign)]"
            aria-label={tr("radius")}
          />
          <div className="flex justify-between text-[10px] text-ink/40">
            <span>1 km</span>
            <span>{maxKm} km</span>
          </div>
        </div>

        {/* Category filter */}
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
              category === "all" ? "bg-sign text-paper" : "bg-paper text-ink/60"
            }`}
          >
            {tr("allTypes")}
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                category === c.id ? "bg-sign text-paper" : "bg-paper text-ink/60"
              }`}
            >
              {c.b!.emoji} {c.b!.name[lang]}
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-paper p-3">
          <div className="text-xs text-ink/70">
            <span className="font-num text-lg font-bold text-sign">{visible.length}</span>{" "}
            {tr("shopsWithin")} {radius} km
          </div>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${verdict.cls}`}>
            {tr(verdict.key)}
          </span>
        </div>
      </Panel>

      <Panel title={tr("sameTypeNearby")}>
        {visible.length === 0 ? (
          <p className="text-xs text-ink/60">{tr("noShopsHere")}</p>
        ) : (
          <div className="flex flex-col gap-2">
            {visible.slice(0, 20).map((p) => (
              <button
                type="button"
                key={p.id}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
                className={`rounded-xl p-3 text-left ${
                  selected === p.id ? "bg-mint/20 ring-1 ring-sign/40" : "bg-paper"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-ink">
                      {p.emoji} {p.name[lang]}
                    </div>
                    <div className="text-xs text-ink/60">
                      {p.category[lang]} · ⭐ {p.rating} ·{" "}
                      {p.openNow ? tr("openNow") : tr("closedNow")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-num text-base font-bold text-sign">{p.distanceKm} km</div>
                    <div className="text-[10px] text-ink/60">
                      {formatRupees(p.rent)} {tr("perMonth")}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
        {category !== "all" && (
          <Link
            to="/business/$id"
            params={{ id: category }}
            className="mt-3 block rounded-xl bg-sign px-4 py-2.5 text-center text-sm font-bold text-paper"
          >
            {tr("viewPlan")}
          </Link>
        )}
      </Panel>

      <p className="px-1 pb-2 text-[11px] text-ink/50">{tr("estimateNote")}</p>
    </div>
  );
}
