import { seedNum, states, type Bi, type RegionTag, type StateSeed } from "./india-data";

export type Bilingual = Bi;

export type Village = {
  id: string;
  stateId: string;
  stateName: Bilingual;
  tags: RegionTag[];
  name: Bilingual;
  district: Bilingual;
  population: number;
  demandScore: number;
  existingShops: number;
  footfall: Bilingual;
};

const footfallLevels: Bilingual[] = [
  { hi: "कम", en: "Low" },
  { hi: "मध्यम", en: "Medium" },
  { hi: "अच्छी", en: "Good" },
  { hi: "ज़्यादा", en: "High" },
];

function buildVillages(list: StateSeed[]): Village[] {
  return list.flatMap((s) =>
    s.villages.map((v) => {
      const demandScore = seedNum(v.id + "d", 58, 94);
      return {
        id: v.id,
        stateId: s.id,
        stateName: s.name,
        tags: s.tags,
        name: v.name,
        district: { hi: `जिला ${v.district.hi}`, en: `${v.district.en} district` },
        population: seedNum(v.id + "p", 900, 12000),
        demandScore,
        existingShops: seedNum(v.id + "s", 3, 28),
        footfall: footfallLevels[Math.min(3, Math.floor((demandScore - 55) / 11))]!,
      } satisfies Village;
    }),
  );
}

export { states };
export const villages: Village[] = buildVillages(states);

export function villageById(id: string) {
  return villages.find((v) => v.id === id) ?? villages[0]!;
}

export function villagesByState(stateId: string) {
  return villages.filter((v) => v.stateId === stateId);
}

export const budgets = [
  { value: 25000, label: { hi: "₹ 25,000 तक", en: "Up to ₹25,000" } },
  { value: 50000, label: { hi: "₹ 50,000 तक", en: "Up to ₹50,000" } },
  { value: 100000, label: { hi: "₹ 1,00,000 तक", en: "Up to ₹1,00,000" } },
  { value: 200000, label: { hi: "₹ 2,00,000 तक", en: "Up to ₹2,00,000" } },
  { value: 400000, label: { hi: "₹ 4,00,000 तक", en: "Up to ₹4,00,000" } },
  { value: 800000, label: { hi: "₹ 8,00,000 तक", en: "Up to ₹8,00,000" } },
];

export type Competition = "low" | "moderate" | "high";

export type Business = {
  id: string;
  emoji: string;
  name: Bilingual;
  investment: number;
  profit: number;
  competition: Competition;
  paybackMonths: number;
  fit: number;
  why: Bilingual;
  commodities: string[];
};

type Idea = {
  id: string;
  emoji: string;
  name: Bilingual;
  baseInvestment: number;
  margin: number; // monthly profit as share of investment
  tags: RegionTag[];
  why: Bilingual;
  commodities: string[];
};

/** Business idea catalogue — generic ideas work anywhere, tagged ideas suit a region. */
export const ideaCatalogue: Idea[] = [
  {
    id: "kirana",
    emoji: "🏪",
    name: { hi: "किराना दुकान", en: "Kirana grocery" },
    baseInvestment: 120000,
    margin: 0.12,
    tags: [],
    why: { hi: "रोज़ की ज़रूरत, हर गाँव में पक्की बिक्री।", en: "Daily essentials sell steadily in every village." },
    commodities: ["flour", "oil", "sugar"],
  },
  {
    id: "recharge",
    emoji: "📱",
    name: { hi: "मोबाइल रिचार्ज व मरम्मत", en: "Mobile recharge & repair" },
    baseInvestment: 45000,
    margin: 0.2,
    tags: [],
    why: { hi: "कम पैसे में शुरू, मरम्मत के लिए लोग शहर जाते हैं।", en: "Low cost to start; people travel to town for repairs." },
    commodities: ["data", "accessories"],
  },
  {
    id: "flourmill",
    emoji: "⚙️",
    name: { hi: "आटा चक्की", en: "Flour mill" },
    baseInvestment: 90000,
    margin: 0.14,
    tags: ["wheat", "paddy"],
    why: { hi: "पास की चक्की कई किलोमीटर दूर है।", en: "The nearest mill is several kilometres away." },
    commodities: ["wheat", "flour"],
  },
  {
    id: "dairy",
    emoji: "🥛",
    name: { hi: "दूध डेयरी", en: "Milk dairy" },
    baseInvestment: 150000,
    margin: 0.13,
    tags: ["dairy"],
    why: { hi: "गाँव में पशुपालन ज़्यादा, दूध की रोज़ मांग।", en: "Cattle rearing is common and milk sells daily." },
    commodities: ["milk", "ghee"],
  },
  {
    id: "feed",
    emoji: "🌾",
    name: { hi: "पशु चारा दुकान", en: "Animal feed store" },
    baseInvestment: 80000,
    margin: 0.16,
    tags: ["dairy", "wheat"],
    why: { hi: "चारा अभी शहर से आता है, ढुलाई महँगी पड़ती है।", en: "Feed comes from town today and transport is costly." },
    commodities: ["feed", "husk"],
  },
  {
    id: "seeds",
    emoji: "🌱",
    name: { hi: "बीज व खाद केंद्र", en: "Seed & fertiliser centre" },
    baseInvestment: 110000,
    margin: 0.15,
    tags: ["wheat", "paddy", "cotton"],
    why: { hi: "बुवाई के मौसम में बिक्री तेज़ी से बढ़ती है।", en: "Sales spike sharply during every sowing season." },
    commodities: ["urea", "seed"],
  },
  {
    id: "coldstore",
    emoji: "❄️",
    name: { hi: "छोटा कोल्ड स्टोरेज", en: "Mini cold storage" },
    baseInvestment: 600000,
    margin: 0.09,
    tags: ["horticulture", "paddy"],
    why: { hi: "फल-सब्ज़ी खराब होने से किसान का नुकसान होता है।", en: "Farmers lose produce for want of nearby storage." },
    commodities: ["potato", "tomato"],
  },
  {
    id: "tractor",
    emoji: "🚜",
    name: { hi: "ट्रैक्टर किराया सेवा", en: "Tractor rental service" },
    baseInvestment: 700000,
    margin: 0.08,
    tags: ["wheat", "paddy", "cotton"],
    why: { hi: "छोटे किसान मशीन किराए पर लेते हैं।", en: "Small farmers rent machinery instead of buying." },
    commodities: ["diesel"],
  },
  {
    id: "bike",
    emoji: "🏍️",
    name: { hi: "बाइक सर्विस व पंक्चर", en: "Bike service & puncture" },
    baseInvestment: 180000,
    margin: 0.14,
    tags: [],
    why: { hi: "हर घर में दोपहिया, सर्विस की मांग लगातार।", en: "Two-wheelers in every home keep service demand steady." },
    commodities: ["tyre", "oil"],
  },
  {
    id: "ro",
    emoji: "💧",
    name: { hi: "RO पानी प्लांट", en: "RO water plant" },
    baseInvestment: 160000,
    margin: 0.13,
    tags: ["arid", "coastal", "island"],
    why: { hi: "पानी खारा है, गाँव जार का पानी खरीदता है।", en: "Groundwater is saline, so households buy jar water." },
    commodities: ["water"],
  },
  {
    id: "tailor",
    emoji: "🧵",
    name: { hi: "सिलाई केंद्र", en: "Tailoring centre" },
    baseInvestment: 38000,
    margin: 0.22,
    tags: ["handloom"],
    why: { hi: "शादी के मौसम में काम दोगुना हो जाता है।", en: "Work doubles during the wedding season." },
    commodities: ["cloth"],
  },
  {
    id: "handloom",
    emoji: "🧶",
    name: { hi: "हथकरघा व हस्तशिल्प बिक्री", en: "Handloom & craft outlet" },
    baseInvestment: 95000,
    margin: 0.18,
    tags: ["handloom", "tourism"],
    why: { hi: "स्थानीय कारीगरी की शहर और ऑनलाइन अच्छी मांग है।", en: "Local craft sells well in towns and online." },
    commodities: ["cloth", "craft"],
  },
  {
    id: "homestay",
    emoji: "🏡",
    name: { hi: "होमस्टे", en: "Homestay" },
    baseInvestment: 250000,
    margin: 0.12,
    tags: ["tourism", "hill", "island"],
    why: { hi: "सैलानी आते हैं पर ठहरने की जगह कम है।", en: "Tourists arrive but rooms nearby are scarce." },
    commodities: ["room", "food"],
  },
  {
    id: "fishdry",
    emoji: "🐟",
    name: { hi: "मछली सुखाना व बिक्री", en: "Fish drying & sale" },
    baseInvestment: 70000,
    margin: 0.19,
    tags: ["coastal", "island"],
    why: { hi: "ताज़ा पकड़ सस्ती है, सुखाकर दाम दोगुना मिलता है।", en: "Fresh catch is cheap; dried fish fetches double." },
    commodities: ["fish"],
  },
  {
    id: "spice",
    emoji: "🌶️",
    name: { hi: "मसाला पिसाई यूनिट", en: "Spice grinding unit" },
    baseInvestment: 85000,
    margin: 0.17,
    tags: ["spices", "horticulture"],
    why: { hi: "स्थानीय मसाला कच्चा बिकता है, पिसाई से मुनाफ़ा बढ़ता है।", en: "Local spice sells raw; grinding adds real margin." },
    commodities: ["chilli", "turmeric"],
  },
  {
    id: "fruitpulp",
    emoji: "🍎",
    name: { hi: "फल ग्रेडिंग व पैकिंग", en: "Fruit grading & packing" },
    baseInvestment: 220000,
    margin: 0.12,
    tags: ["horticulture", "hill"],
    why: { hi: "बाग़ का फल बिना ग्रेडिंग के सस्ता बिकता है।", en: "Orchard fruit sells cheap without grading." },
    commodities: ["apple", "mango"],
  },
  {
    id: "tea",
    emoji: "🍃",
    name: { hi: "चाय पत्ती पैकिंग", en: "Tea leaf packing" },
    baseInvestment: 130000,
    margin: 0.15,
    tags: ["tea"],
    why: { hi: "बगान की पत्ती को पैक कर सीधे बेचने में मुनाफ़ा।", en: "Packing garden leaf for direct sale lifts margins." },
    commodities: ["tea"],
  },
  {
    id: "goat",
    emoji: "🐐",
    name: { hi: "बकरी पालन", en: "Goat rearing" },
    baseInvestment: 60000,
    margin: 0.16,
    tags: ["arid", "forest", "hill"],
    why: { hi: "कम चारे में पलती है, त्योहारों पर अच्छा दाम।", en: "Needs little fodder and fetches good festival prices." },
    commodities: ["goat"],
  },
  {
    id: "poultry",
    emoji: "🐔",
    name: { hi: "मुर्गी पालन", en: "Poultry farm" },
    baseInvestment: 140000,
    margin: 0.15,
    tags: ["paddy", "forest", "coastal"],
    why: { hi: "अंडे-चिकन की मांग पूरे साल रहती है।", en: "Egg and chicken demand holds all year." },
    commodities: ["egg", "chicken"],
  },
  {
    id: "solar",
    emoji: "🔆",
    name: { hi: "सोलर पैनल बिक्री व मरम्मत", en: "Solar panel sales & repair" },
    baseInvestment: 190000,
    margin: 0.14,
    tags: ["arid", "island", "forest"],
    why: { hi: "बिजली कटौती ज़्यादा, सब्सिडी से मांग बढ़ रही है।", en: "Frequent power cuts plus subsidies are driving demand." },
    commodities: ["panel", "battery"],
  },
  {
    id: "csc",
    emoji: "🖥️",
    name: { hi: "कॉमन सर्विस सेंटर (CSC)", en: "Common Service Centre (CSC)" },
    baseInvestment: 75000,
    margin: 0.18,
    tags: [],
    why: { hi: "आधार, पेंशन, बैंकिंग के काम के लिए लोग दूर जाते हैं।", en: "People travel far for Aadhaar, pension and banking work." },
    commodities: ["service"],
  },
  {
    id: "coaching",
    emoji: "📚",
    name: { hi: "ट्यूशन / कोचिंग सेंटर", en: "Tuition & coaching centre" },
    baseInvestment: 40000,
    margin: 0.25,
    tags: [],
    why: { hi: "बहुत कम लागत, हर घर बच्चों की पढ़ाई पर खर्च करता है।", en: "Very low cost and every family spends on schooling." },
    commodities: ["service"],
  },
  {
    id: "medical",
    emoji: "💊",
    name: { hi: "दवा की दुकान", en: "Medical store" },
    baseInvestment: 230000,
    margin: 0.13,
    tags: [],
    why: { hi: "नज़दीकी दवा दुकान कस्बे में है, आपात में दिक्कत।", en: "The nearest chemist is in town, a problem in emergencies." },
    commodities: ["medicine"],
  },
  {
    id: "sweets",
    emoji: "🍬",
    name: { hi: "मिठाई व नाश्ता दुकान", en: "Sweets & snacks shop" },
    baseInvestment: 100000,
    margin: 0.17,
    tags: ["tourism", "handloom"],
    why: { hi: "बाज़ार दिन और त्योहारों पर बिक्री कई गुना।", en: "Market days and festivals multiply sales." },
    commodities: ["milk", "oil"],
  },
];

const commodityNames: Record<string, Bilingual> = {
  milk: { hi: "दूध", en: "Milk" },
  ghee: { hi: "घी", en: "Ghee" },
  feed: { hi: "पशु चारा", en: "Cattle feed" },
  husk: { hi: "भूसा", en: "Husk" },
  flour: { hi: "आटा", en: "Flour" },
  wheat: { hi: "गेहूँ", en: "Wheat" },
  oil: { hi: "सरसों तेल", en: "Mustard oil" },
  sugar: { hi: "चीनी", en: "Sugar" },
  water: { hi: "जार पानी", en: "Jar water" },
  cloth: { hi: "कपड़ा", en: "Cloth" },
  craft: { hi: "हस्तशिल्प", en: "Handicraft" },
  fish: { hi: "सूखी मछली", en: "Dried fish" },
  chilli: { hi: "मिर्च", en: "Chilli" },
  turmeric: { hi: "हल्दी", en: "Turmeric" },
  apple: { hi: "सेब", en: "Apple" },
  mango: { hi: "आम", en: "Mango" },
  tea: { hi: "चाय पत्ती", en: "Tea leaf" },
  goat: { hi: "बकरा", en: "Goat" },
  egg: { hi: "अंडा", en: "Egg" },
  chicken: { hi: "चिकन", en: "Chicken" },
  panel: { hi: "सोलर पैनल", en: "Solar panel" },
  battery: { hi: "बैटरी", en: "Battery" },
  medicine: { hi: "दवा", en: "Medicine" },
  potato: { hi: "आलू", en: "Potato" },
  tomato: { hi: "टमाटर", en: "Tomato" },
  urea: { hi: "यूरिया", en: "Urea" },
  seed: { hi: "बीज", en: "Seed" },
  diesel: { hi: "डीज़ल", en: "Diesel" },
  tyre: { hi: "टायर", en: "Tyre" },
  data: { hi: "मोबाइल डेटा", en: "Mobile data" },
  accessories: { hi: "मोबाइल सामान", en: "Phone accessories" },
  room: { hi: "कमरा किराया", en: "Room night" },
  food: { hi: "भोजन थाली", en: "Meal plate" },
  service: { hi: "सेवा शुल्क", en: "Service fee" },
};

const commodityBase: Record<string, number> = {
  milk: 52,
  ghee: 640,
  feed: 28,
  husk: 14,
  flour: 46,
  wheat: 27,
  oil: 142,
  sugar: 44,
  water: 25,
  cloth: 180,
  craft: 850,
  fish: 320,
  chilli: 210,
  turmeric: 145,
  apple: 96,
  mango: 68,
  tea: 260,
  goat: 9500,
  egg: 7,
  chicken: 190,
  panel: 7400,
  battery: 5200,
  medicine: 120,
  potato: 22,
  tomato: 34,
  urea: 300,
  seed: 240,
  diesel: 92,
  tyre: 1450,
  data: 239,
  accessories: 260,
  room: 1400,
  food: 130,
  service: 60,
};

function competitionFor(village: Village, idea: Idea): Competition {
  const density = village.existingShops / Math.max(1, village.population / 1000);
  const generic = idea.tags.length === 0;
  const score = density * (generic ? 1.5 : 0.8) + seedNum(village.id + idea.id, 0, 3);
  if (score < 3) return "low";
  if (score < 5.5) return "moderate";
  return "high";
}

/** Business recommendations generated for a village from its region profile. */
export function getBusinesses(villageId: string): Business[] {
  const village = villageById(villageId);
  return ideaCatalogue
    .map((idea) => {
      const matches = idea.tags.filter((t) => village.tags.includes(t)).length;
      const investment =
        Math.round((idea.baseInvestment * seedNum(village.id + idea.id + "i", 80, 125)) / 100 / 1000) *
        1000;
      const competition = competitionFor(village, idea);
      const compFactor = competition === "low" ? 1.15 : competition === "moderate" ? 1 : 0.82;
      const profit =
        Math.round(
          (investment * idea.margin * compFactor * (0.75 + village.demandScore / 200)) / 500,
        ) * 500;
      const fit = Math.max(
        42,
        Math.min(
          97,
          Math.round(
            48 +
              matches * 14 +
              (village.demandScore - 60) * 0.5 +
              (competition === "low" ? 10 : competition === "moderate" ? 3 : -6),
          ),
        ),
      );
      return {
        id: idea.id,
        emoji: idea.emoji,
        name: idea.name,
        investment,
        profit: Math.max(3000, profit),
        competition,
        paybackMonths: Math.max(3, Math.round(investment / Math.max(3000, profit))),
        fit,
        why: idea.why,
        commodities: idea.commodities,
      } satisfies Business;
    })
    .sort((a, b) => b.fit - a.fit);
}

export type Trend = { item: Bilingual; price: string; change: number; key: string };

/** Market trends for the commodities that matter to this village's best businesses. */
export function getTrends(villageId: string): Trend[] {
  const village = villageById(villageId);
  const keys: string[] = [];
  for (const b of getBusinesses(villageId)) {
    for (const c of b.commodities) if (!keys.includes(c)) keys.push(c);
  }
  return keys.slice(0, 12).map((key) => {
    const base = commodityBase[key] ?? 100;
    const price = Math.round((base * seedNum(village.id + key, 88, 118)) / 100);
    return {
      key,
      item: commodityNames[key] ?? { hi: key, en: key },
      price: "₹" + price.toLocaleString("en-IN"),
      change: seedNum(village.id + key + "c", -8, 16),
    };
  });
}

export type Shop = {
  id: string;
  name: Bilingual;
  distanceKm: number;
  sqft: number;
  rent: number;
  footfall: Bilingual;
};

const shopSpots: Bilingual[] = [
  { hi: "मुख्य बाज़ार, दुकान", en: "Main Bazaar, Shop" },
  { hi: "बस स्टॉप, दुकान", en: "Bus Stop, Shop" },
  { hi: "स्कूल रोड, दुकान", en: "School Road, Shop" },
  { hi: "पंचायत चौक, दुकान", en: "Panchayat Chowk, Shop" },
  { hi: "मंडी गेट, दुकान", en: "Mandi Gate, Shop" },
];

/** Rental shops available around the selected village. */
export function getShops(villageId: string): Shop[] {
  const village = villageById(villageId);
  return shopSpots.map((spot, i) => {
    const num = seedNum(village.id + "shop" + i, 1, 24);
    const sqft = seedNum(village.id + "sq" + i, 120, 400);
    const rentPerSqft = seedNum(village.id + "r" + i, 26, 62);
    const foot = footfallLevels[seedNum(village.id + "f" + i, 0, 3)]!;
    return {
      id: `${village.id}-s${i}`,
      name: { hi: `${spot.hi} ${num}`, en: `${spot.en} ${num}` },
      distanceKm: seedNum(village.id + "km" + i, 2, 32) / 10,
      sqft,
      rent: Math.round((sqft * rentPerSqft) / 100) * 100,
      footfall: foot,
    } satisfies Shop;
  });
}

export function formatRupees(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
