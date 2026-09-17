import type { Bilingual, Business } from "./grambiz-data";

export type Scheme = {
  id: string;
  name: Bilingual;
  who: Bilingual;
  benefit: Bilingual;
  rate: Bilingual;
  link: string;
};

const allSchemes: (Scheme & { match: (b: Business) => boolean })[] = [
  {
    id: "mudra-shishu",
    name: { hi: "प्रधानमंत्री मुद्रा – शिशु", en: "PM Mudra Loan – Shishu" },
    who: { hi: "₹50,000 तक का छोटा धंधा", en: "Micro business up to ₹50,000" },
    benefit: { hi: "बिना गारंटी ₹50,000 तक कर्ज़", en: "Collateral-free loan up to ₹50,000" },
    rate: { hi: "लगभग 9–12% ब्याज", en: "About 9–12% interest" },
    link: "https://www.mudra.org.in/",
    match: (b) => b.investment <= 50000,
  },
  {
    id: "mudra-kishore",
    name: { hi: "प्रधानमंत्री मुद्रा – किशोर", en: "PM Mudra Loan – Kishore" },
    who: { hi: "₹50,000 से ₹5 लाख तक", en: "₹50,000 to ₹5 lakh" },
    benefit: { hi: "बिना गारंटी ₹5 लाख तक कर्ज़", en: "Collateral-free loan up to ₹5 lakh" },
    rate: { hi: "लगभग 10–14% ब्याज", en: "About 10–14% interest" },
    link: "https://www.mudra.org.in/",
    match: (b) => b.investment > 50000 && b.investment <= 500000,
  },
  {
    id: "mudra-tarun",
    name: { hi: "प्रधानमंत्री मुद्रा – तरुण", en: "PM Mudra Loan – Tarun" },
    who: { hi: "₹5 लाख से ₹10 लाख तक", en: "₹5 lakh to ₹10 lakh" },
    benefit: { hi: "बड़े सेटअप के लिए ₹10 लाख तक", en: "Up to ₹10 lakh for larger setups" },
    rate: { hi: "लगभग 11–15% ब्याज", en: "About 11–15% interest" },
    link: "https://www.mudra.org.in/",
    match: (b) => b.investment > 500000,
  },
  {
    id: "pmegp",
    name: { hi: "PMEGP (खादी बोर्ड)", en: "PMEGP (KVIC)" },
    who: { hi: "नया ग्रामीण उद्यम, 18+ उम्र", en: "New rural enterprise, age 18+" },
    benefit: {
      hi: "गाँव में परियोजना लागत पर 25–35% सब्सिडी",
      en: "25–35% subsidy on project cost in rural areas",
    },
    rate: { hi: "बाकी रकम बैंक कर्ज़ पर", en: "Balance as bank term loan" },
    link: "https://www.kviconline.gov.in/pmegp/",
    match: () => true,
  },
  {
    id: "pmfme",
    name: { hi: "PM-FME (खाद्य प्रसंस्करण)", en: "PM-FME (food processing)" },
    who: { hi: "आटा चक्की, मसाला, अचार, डेयरी जैसे काम", en: "Flour mill, spices, pickles, dairy units" },
    benefit: { hi: "35% सब्सिडी, अधिकतम ₹10 लाख", en: "35% subsidy, max ₹10 lakh" },
    rate: { hi: "बैंक कर्ज़ के साथ मिलता है", en: "Credit-linked with bank loan" },
    link: "https://pmfme.mofpi.gov.in/",
    match: (b) =>
      ["flourmill", "spice", "fruitpulp", "dairy", "fishdry", "sweets", "tea"].includes(b.id),
  },
  {
    id: "nabard-deds",
    name: { hi: "NABARD पशुपालन योजना", en: "NABARD animal husbandry scheme" },
    who: { hi: "डेयरी, बकरी, मुर्गी पालन", en: "Dairy, goat and poultry farming" },
    benefit: { hi: "25% (SC/ST 33%) पूँजी सब्सिडी", en: "25% (33% for SC/ST) capital subsidy" },
    rate: { hi: "बैंक कर्ज़ के साथ", en: "Along with bank loan" },
    link: "https://www.nabard.org/",
    match: (b) => ["dairy", "goat", "poultry", "feed"].includes(b.id),
  },
  {
    id: "kcc",
    name: { hi: "किसान क्रेडिट कार्ड", en: "Kisan Credit Card" },
    who: { hi: "खेती और उससे जुड़े काम", en: "Farming and allied work" },
    benefit: { hi: "₹3 लाख तक 4% ब्याज (समय पर चुकाने पर)", en: "Up to ₹3 lakh at 4% if repaid on time" },
    rate: { hi: "4% असरदार ब्याज", en: "4% effective interest" },
    link: "https://www.myscheme.gov.in/schemes/kcc",
    match: (b) => ["seeds", "tractor", "coldstore", "dairy", "goat", "poultry", "feed"].includes(b.id),
  },
  {
    id: "standup",
    name: { hi: "स्टैंड-अप इंडिया", en: "Stand-Up India" },
    who: { hi: "महिला / SC / ST उद्यमी", en: "Women, SC and ST entrepreneurs" },
    benefit: { hi: "₹10 लाख से ₹1 करोड़ तक कर्ज़", en: "Loan from ₹10 lakh to ₹1 crore" },
    rate: { hi: "बैंक दर + 3% तक", en: "Bank base rate + up to 3%" },
    link: "https://www.standupmitra.in/",
    match: () => true,
  },
];

export function schemesFor(business: Business): Scheme[] {
  return allSchemes.filter((s) => s.match(business)).slice(0, 5);
}

export type LoanPlan = {
  ownFunds: number;
  loanAmount: number;
  emi: number;
  totalInterest: number;
  totalRepaid: number;
  monthlyProfitAfterEmi: number;
  breakEvenMonths: number;
  yearOneProfit: number;
  annualRoi: number;
};

/** Equated monthly instalment for a reducing-balance loan. */
export function emiFor(principal: number, annualRatePct: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 12 / 100;
  if (r === 0) return Math.round(principal / months);
  const f = Math.pow(1 + r, months);
  return Math.round((principal * r * f) / (f - 1));
}

export function buildPlan(
  business: Business,
  loanPct: number,
  annualRatePct: number,
  months: number,
): LoanPlan {
  const loanAmount = Math.round((business.investment * loanPct) / 100);
  const ownFunds = business.investment - loanAmount;
  const emi = emiFor(loanAmount, annualRatePct, months);
  const totalRepaid = emi * months;
  const net = business.profit - emi;
  return {
    ownFunds,
    loanAmount,
    emi,
    totalInterest: Math.max(0, totalRepaid - loanAmount),
    totalRepaid,
    monthlyProfitAfterEmi: net,
    breakEvenMonths: net > 0 ? Math.ceil(ownFunds / net) : 0,
    yearOneProfit: net * 12,
    annualRoi: business.investment > 0 ? Math.round(((business.profit * 12) / business.investment) * 100) : 0,
  };
}

/** Simple monthly running-cost split used for the profit breakdown. */
export function costBreakdown(business: Business, rent: number) {
  const revenue = Math.round(business.profit * 3.2);
  const stock = Math.round(revenue * 0.55);
  const labour = Math.round(revenue * 0.08);
  const power = Math.round(revenue * 0.04);
  const misc = Math.max(0, revenue - stock - labour - power - rent - business.profit);
  return { revenue, stock, labour, power, rent, misc };
}
