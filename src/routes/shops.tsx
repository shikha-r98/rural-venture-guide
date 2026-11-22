import { createFileRoute } from "@tanstack/react-router";
import villageMap from "@/assets/village-map.jpg";
import { Panel } from "@/components/grambiz/Panel";
import { useVillage } from "@/lib/app-state";
import { formatRupees, getShops } from "@/lib/grambiz-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/shops")({
  head: () => ({
    meta: [
      { title: "Nearby rental shops — GramBiz AI" },
      {
        name: "description",
        content:
          "Shops available for rent near your village with monthly rent, size, distance and footfall.",
      },
      { property: "og:title", content: "Nearby rental shops — GramBiz AI" },
      {
        property: "og:description",
        content: "Compare rent, size and footfall of shops available near your village.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopsPage,
});

function ShopsPage() {
  const { lang, tr } = useLang();
  const village = useVillage();
  const rentalShops = getShops(village.id);

  return (
    <div className="flex flex-col gap-3">
      <Panel
        title={tr("nearbyShops")}
        badge={
          <span className="rounded-full bg-mint/25 px-2 py-0.5 text-xs font-bold text-mint-deep">
            {village.name[lang]}
          </span>
        }
      >
        <div className="grid gap-3 lg:grid-cols-2 lg:items-start">
        <img
          src={villageMap}
          alt={`Rental shop locations near ${village.name.en}`}
          width={1024}
          height={512}
          loading="lazy"
          className="h-32 w-full rounded-xl object-cover lg:sticky lg:top-6 lg:h-64"
        />
        <div className="flex flex-col gap-2">
          {rentalShops.map((s) => (
            <div key={s.id} className="rounded-xl bg-paper p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-bold text-ink">{s.name[lang]}</div>
                  <div className="text-xs text-ink/60">
                    {s.distanceKm} km · {s.sqft} sq ft · {tr("footfall")} {s.footfall[lang]}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-num text-lg font-bold text-sign">{formatRupees(s.rent)}</div>
                  <div className="text-[10px] text-ink/60">{tr("perMonth")}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </Panel>
    </div>
  );
}
