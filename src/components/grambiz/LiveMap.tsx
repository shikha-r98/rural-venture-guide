import { useEffect, useRef, useState } from "react";
import type * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { NearbyPlace } from "@/lib/map-data";

type Props = {
  queries: string[];
  places: NearbyPlace[];
  radiusKm: number;
  selected: string | null;
  onSelect: (id: string | null) => void;
  labelFor: (p: NearbyPlace) => string;
};

const geoCache = new Map<string, [number, number]>();

async function geocode(queries: string[]): Promise<[number, number]> {
  const key = queries.join("|");
  const hit = geoCache.get(key);
  if (hit) return hit;
  for (const q of queries) {
    try {
      const r = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(q)}`,
      );
      const j = (await r.json()) as { lat: string; lon: string }[];
      if (j[0]) {
        const c: [number, number] = [Number(j[0].lat), Number(j[0].lon)];
        geoCache.set(key, c);
        return c;
      }
    } catch {
      /* try next */
    }
  }
  return [22.5, 79];
}

/** Offset a lat/lng by distance (km) at an angle (deg, 0 = east). */
function offset([lat, lng]: [number, number], km: number, angle: number): [number, number] {
  const rad = (angle * Math.PI) / 180;
  const dLat = (km * Math.sin(rad)) / 111;
  const dLng = (km * Math.cos(rad)) / (111 * Math.cos((lat * Math.PI) / 180));
  return [lat - dLat, lng + dLng];
}

export default function LiveMap({ queries, places, radiusKm, selected, onSelect, labelFor }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const libRef = useRef<typeof L | null>(null);
  const [center, setCenter] = useState<[number, number] | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const lib = (await import("leaflet")).default;
      if (cancelled || !el.current || mapRef.current) return;
      libRef.current = lib;
      const map = lib.map(el.current, { zoomControl: true, attributionControl: true }).setView([22.5, 79], 5);
      lib
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "© OpenStreetMap",
        })
        .addTo(map);
      layerRef.current = lib.layerGroup().addTo(map);
      mapRef.current = map;
      setReady(true);
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const qKey = queries.join("|");
  useEffect(() => {
    let cancelled = false;
    geocode(queries).then((c) => !cancelled && setCenter(c));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qKey]);

  useEffect(() => {
    const lib = libRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!ready || !lib || !map || !layer || !center) return;
    layer.clearLayers();
    const circle = lib
      .circle(center, {
        radius: radiusKm * 1000,
        color: "#1f5d45",
        weight: 2,
        fillColor: "#7fd1a8",
        fillOpacity: 0.15,
      })
      .addTo(layer);
    lib
      .circleMarker(center, { radius: 8, color: "#fff", weight: 2, fillColor: "#e0533d", fillOpacity: 1 })
      .bindTooltip("📍")
      .addTo(layer);
    for (const p of places) {
      const pos = offset(center, p.distanceKm, p.angle);
      const active = selected === p.id;
      const icon = lib.divIcon({
        className: "",
        html: `<div style="width:${active ? 34 : 28}px;height:${active ? 34 : 28}px;border-radius:50%;background:#fffaf0;border:${active ? 3 : 1.5}px solid #1f5d45;display:grid;place-items:center;font-size:${active ? 17 : 14}px;box-shadow:0 2px 6px rgba(0,0,0,.25)">${p.emoji}</div>`,
        iconSize: [active ? 34 : 28, active ? 34 : 28],
        iconAnchor: [active ? 17 : 14, active ? 17 : 14],
      });
      const m = lib.marker(pos, { icon }).addTo(layer);
      m.bindPopup(labelFor(p));
      m.on("click", () => onSelect(p.id));
      if (active) m.openPopup();
    }
    map.fitBounds(circle.getBounds(), { padding: [10, 10] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, center, places, radiusKm, selected]);

  return <div ref={el} className="relative z-0 h-[320px] w-full" />;
}
