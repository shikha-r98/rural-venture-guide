export type Bilingual = { hi: string; en: string };

export type Village = {
  id: string;
  name: Bilingual;
  district: Bilingual;
  population: number;
  demandScore: number;
  existingShops: number;
  footfall: Bilingual;
};

export const villages: Village[] = [
  {
    id: "raipura",
    name: { hi: "रायपुरा", en: "Raipura" },
    district: { hi: "जिला पटियाला", en: "Patiala district" },
    population: 4200,
    demandScore: 82,
    existingShops: 11,
    footfall: { hi: "अच्छी", en: "Good" },
  },
  {
    id: "kheri",
    name: { hi: "खेड़ी", en: "Kheri" },
    district: { hi: "जिला मेरठ", en: "Meerut district" },
    population: 3200,
    demandScore: 74,
    existingShops: 7,
    footfall: { hi: "मध्यम", en: "Medium" },
  },
  {
    id: "tahliya",
    name: { hi: "तहलिया", en: "Tahliya" },
    district: { hi: "जिला जालोर", en: "Jalore district" },
    population: 2600,
    demandScore: 68,
    existingShops: 5,
    footfall: { hi: "कम", en: "Low" },
  },
];

export const budgets = [
  { value: 50000, label: { hi: "₹ 50,000 तक", en: "Up to ₹50,000" } },
  { value: 100000, label: { hi: "₹ 1,00,000 तक", en: "Up to ₹1,00,000" } },
  { value: 200000, label: { hi: "₹ 2,00,000 तक", en: "Up to ₹2,00,000" } },
  { value: 400000, label: { hi: "₹ 4,00,000 तक", en: "Up to ₹4,00,000" } },
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
};

export const businessesByVillage: Record<string, Business[]> = {
  raipura: [
    {
      id: "dairy",
      emoji: "🥛",
      name: { hi: "दूध दुकान", en: "Dairy shop" },
      investment: 150000,
      profit: 18000,
      competition: "low",
      paybackMonths: 9,
      fit: 92,
      why: {
        hi: "1 किमी में सिर्फ़ 2 दूध दुकानें, रोज़ की मांग बहुत ज़्यादा।",
        en: "Only 2 dairy shops within 1 km and daily demand is very high.",
      },
    },
    {
      id: "feed",
      emoji: "🌾",
      name: { hi: "पशु चारा", en: "Animal feed" },
      investment: 200000,
      profit: 26000,
      competition: "moderate",
      paybackMonths: 8,
      fit: 84,
      why: {
        hi: "गाँव में 900+ मवेशी, चारा अभी शहर से आता है।",
        en: "900+ cattle in the village; feed is currently bought from town.",
      },
    },
    {
      id: "bike",
      emoji: "🏍️",
      name: { hi: "बाइक सर्विस", en: "Bike service" },
      investment: 350000,
      profit: 34000,
      competition: "high",
      paybackMonths: 11,
      fit: 71,
      why: {
        hi: "कमाई अच्छी, पर 3 मैकेनिक पहले से मौजूद हैं।",
        en: "Good earnings, but 3 mechanics already operate here.",
      },
    },
  ],
  kheri: [
    {
      id: "kirana",
      emoji: "🏪",
      name: { hi: "किराना दुकान", en: "Kirana grocery" },
      investment: 120000,
      profit: 15000,
      competition: "moderate",
      paybackMonths: 8,
      fit: 88,
      why: {
        hi: "बस स्टैंड के पास रोज़ की खरीदारी सबसे ज़्यादा।",
        en: "Daily purchases peak near the bus stand.",
      },
    },
    {
      id: "recharge",
      emoji: "📱",
      name: { hi: "मोबाइल रिचार्ज व मरम्मत", en: "Mobile recharge & repair" },
      investment: 45000,
      profit: 9500,
      competition: "low",
      paybackMonths: 5,
      fit: 80,
      why: {
        hi: "कम पैसे में शुरू, गाँव में कोई मरम्मत की दुकान नहीं।",
        en: "Low start-up cost and no repair shop in the village.",
      },
    },
    {
      id: "flourmill",
      emoji: "⚙️",
      name: { hi: "आटा चक्की", en: "Flour mill" },
      investment: 90000,
      profit: 12000,
      competition: "low",
      paybackMonths: 8,
      fit: 76,
      why: {
        hi: "पास की चक्की 4 किमी दूर है।",
        en: "The nearest mill is 4 km away.",
      },
    },
  ],
  tahliya: [
    {
      id: "feed2",
      emoji: "🌾",
      name: { hi: "पशु चारा दुकान", en: "Feed store" },
      investment: 45000,
      profit: 18000,
      competition: "low",
      paybackMonths: 3,
      fit: 82,
      why: {
        hi: "बाज़ार से 200 मीटर, कोई चारा दुकान नहीं।",
        en: "200 m from the market and no feed store nearby.",
      },
    },
    {
      id: "water",
      emoji: "💧",
      name: { hi: "पानी RO प्लांट", en: "RO water plant" },
      investment: 160000,
      profit: 21000,
      competition: "low",
      paybackMonths: 8,
      fit: 78,
      why: {
        hi: "पानी खारा है, गाँव जार का पानी खरीदता है।",
        en: "Groundwater is saline; the village buys jar water.",
      },
    },
    {
      id: "tailor",
      emoji: "🧵",
      name: { hi: "सिलाई केंद्र", en: "Tailoring centre" },
      investment: 38000,
      profit: 9000,
      competition: "moderate",
      paybackMonths: 5,
      fit: 69,
      why: {
        hi: "शादी के मौसम में काम दोगुना हो जाता है।",
        en: "Work doubles during the wedding season.",
      },
    },
  ],
};

export type Trend = { item: Bilingual; price: string; change: number };

export const trends: Trend[] = [
  { item: { hi: "दूध", en: "Milk" }, price: "₹52/L", change: 6 },
  { item: { hi: "पशु चारा", en: "Cattle feed" }, price: "₹28/kg", change: 9 },
  { item: { hi: "बाजरा", en: "Millet" }, price: "₹41/kg", change: -3 },
  { item: { hi: "आटा", en: "Flour" }, price: "₹46/kg", change: 2 },
  { item: { hi: "सरसों तेल", en: "Mustard oil" }, price: "₹142/L", change: -1 },
  { item: { hi: "जार पानी", en: "Jar water" }, price: "₹25", change: 12 },
];

export type Shop = {
  id: string;
  name: Bilingual;
  distanceKm: number;
  sqft: number;
  rent: number;
  footfall: Bilingual;
};

export const rentalShops: Shop[] = [
  {
    id: "s1",
    name: { hi: "लाला चौक, दुकान 4", en: "Lala Chowk, Shop 4" },
    distanceKm: 1.2,
    sqft: 200,
    rent: 9500,
    footfall: { hi: "ज़्यादा", en: "High" },
  },
  {
    id: "s2",
    name: { hi: "बाज़ार नंबर 2, दुकान 11", en: "Bazaar No. 2, Shop 11" },
    distanceKm: 0.6,
    sqft: 150,
    rent: 7000,
    footfall: { hi: "मध्यम", en: "Medium" },
  },
  {
    id: "s3",
    name: { hi: "बस स्टॉप, दुकान 8", en: "Bus Stop, Shop 8" },
    distanceKm: 0.9,
    sqft: 180,
    rent: 8200,
    footfall: { hi: "ज़्यादा", en: "High" },
  },
  {
    id: "s4",
    name: { hi: "स्कूल रोड, दुकान 2", en: "School Road, Shop 2" },
    distanceKm: 1.8,
    sqft: 260,
    rent: 6400,
    footfall: { hi: "कम", en: "Low" },
  },
];

export function formatRupees(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
