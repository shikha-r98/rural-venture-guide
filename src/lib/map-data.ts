import { ideaCatalogue, villageById, type Bilingual } from "./grambiz-data";
import { seedNum } from "./india-data";

export type NearbyPlace = {
  id: string;
  categoryId: string;
  emoji: string;
  name: Bilingual;
  category: Bilingual;
  distanceKm: number;
  /** angle in degrees, 0 = east, used to place the marker on the map */
  angle: number;
  rating: number;
  openNow: boolean;
  rent: number;
};

const spotWords: Bilingual[] = [
  { hi: "मुख्य बाज़ार", en: "Main Bazaar" },
  { hi: "बस स्टॉप", en: "Bus Stop" },
  { hi: "स्कूल रोड", en: "School Road" },
  { hi: "पंचायत चौक", en: "Panchayat Chowk" },
  { hi: "मंडी गेट", en: "Mandi Gate" },
  { hi: "नहर रोड", en: "Canal Road" },
  { hi: "हाईवे मोड़", en: "Highway Turn" },
  { hi: "मंदिर गली", en: "Temple Lane" },
];

/** Existing shops around the village, tagged by business category. */
export function getNearbyPlaces(villageId: string): NearbyPlace[] {
  const village = villageById(villageId);
  const out: NearbyPlace[] = [];

  for (const idea of ideaCatalogue) {
    const matches = idea.tags.filter((t) => village.tags.includes(t)).length;
    const count = Math.min(
      4,
      seedNum(village.id + idea.id + "n", 0, 2 + matches + (idea.tags.length === 0 ? 2 : 0)),
    );
    for (let i = 0; i < count; i++) {
      const s = village.id + idea.id + i;
      const spot = spotWords[seedNum(s + "sp", 0, spotWords.length - 1)]!;
      out.push({
        id: `${village.id}-${idea.id}-${i}`,
        categoryId: idea.id,
        emoji: idea.emoji,
        name: {
          hi: `${spot.hi} ${idea.name.hi}`,
          en: `${spot.en} ${idea.name.en}`,
        },
        category: idea.name,
        distanceKm: seedNum(s + "km", 3, 145) / 10,
        angle: seedNum(s + "ang", 0, 359),
        rating: seedNum(s + "rt", 30, 49) / 10,
        openNow: seedNum(s + "op", 0, 9) > 2,
        rent: Math.round(seedNum(s + "rn", 2500, 14000) / 100) * 100,
      });
    }
  }

  return out.sort((a, b) => a.distanceKm - b.distanceKm);
}
