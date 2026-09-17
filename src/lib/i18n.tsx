import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "hi" | "en";

type Dict = Record<string, { hi: string; en: string }>;

export const t: Dict = {
  appTagline: { hi: "गाँव के लिए धंधे की सलाह", en: "Business advice for your village" },
  findBusiness: { hi: "नया व्यवसाय खोजें", en: "Find a new business" },
  findBusinessSub: {
    hi: "अपना गाँव और बजट चुनिए",
    en: "Choose your village and budget",
  },
  village: { hi: "गाँव / कस्बा", en: "Village / town" },
  budget: { hi: "बजट", en: "Budget" },
  search: { hi: "खोजें", en: "Search" },
  locationAnalysis: { hi: "स्थान विश्लेषण", en: "Location analysis" },
  demand: { hi: "स्थानीय मांग", en: "Local demand" },
  topPicks: { hi: "टॉप सिफारिशें", en: "Top picks" },
  invest: { hi: "निवेश", en: "Invest" },
  profit: { hi: "मुनाफ़ा", en: "Profit" },
  perMonth: { hi: "/माह", en: "/month" },
  competition: { hi: "प्रतिस्पर्धा", en: "Competition" },
  low: { hi: "कम", en: "Low" },
  moderate: { hi: "मध्यम", en: "Moderate" },
  high: { hi: "ज़्यादा", en: "High" },
  highDemand: { hi: "अधिक मांग", en: "High demand" },
  marketTrends: { hi: "बाज़ार रुझान", en: "Market trends" },
  nearbyShops: { hi: "पास की दुकानें", en: "Nearby shops" },
  aiHelp: { hi: "GramBiz सहायता", en: "GramBiz AI help" },
  askPlaceholder: { hi: "अपना सवाल लिखिए…", en: "Type your question…" },
  ask: { hi: "सवाल पूछें", en: "Ask" },
  send: { hi: "भेजें", en: "Send" },
  home: { hi: "होम", en: "Home" },
  trends: { hi: "ट्रेंड्स", en: "Trends" },
  shops: { hi: "दुकानें", en: "Shops" },
  chat: { hi: "चैट", en: "Chat" },
  population: { hi: "जनसंख्या", en: "Population" },
  existingShops: { hi: "मौजूदा दुकानें", en: "Existing shops" },
  footfall: { hi: "आवाजाही", en: "Footfall" },
  roi: { hi: "पैसा वापस", en: "Payback" },
  months: { hi: "महीने", en: "months" },
  viewAll: { hi: "सब देखें", en: "View all" },
  thinking: { hi: "सोच रहा हूँ…", en: "Thinking…" },
  chatError: {
    hi: "अभी जवाब नहीं मिल पाया। थोड़ी देर बाद कोशिश कीजिए।",
    en: "Couldn't get an answer right now. Please try again shortly.",
  },
  competitionTitle: { hi: "प्रतिस्पर्धा अनुमान", en: "Competition forecast" },
  marketSize: { hi: "बाज़ार आकार", en: "Market size" },
  notFound: { hi: "यह धंधा नहीं मिला", en: "Business not found" },
  backToPicks: { hi: "सिफारिशों पर वापस", en: "Back to picks" },
  loanCalc: { hi: "कर्ज़ और किश्त गणना", en: "Loan & EMI calculator" },
  loanShare: { hi: "कर्ज़ का हिस्सा", en: "Loan share" },
  interestRate: { hi: "ब्याज दर", en: "Interest rate" },
  tenure: { hi: "अवधि", en: "Tenure" },
  ownFunds: { hi: "अपना पैसा", en: "Your own money" },
  loanAmount: { hi: "कर्ज़ राशि", en: "Loan amount" },
  emi: { hi: "मासिक किश्त (EMI)", en: "Monthly EMI" },
  totalInterest: { hi: "कुल ब्याज", en: "Total interest" },
  totalRepaid: { hi: "कुल चुकाना", en: "Total repayment" },
  profitAfterEmi: { hi: "किश्त के बाद मुनाफ़ा", en: "Profit after EMI" },
  yearOne: { hi: "पहले साल की बचत", en: "First-year earnings" },
  breakEven: { hi: "पैसा वापस", en: "Break-even" },
  annualRoi: { hi: "सालाना रिटर्न", en: "Annual return" },
  monthlyMath: { hi: "महीने का हिसाब", en: "Monthly maths" },
  revenue: { hi: "कुल बिक्री", en: "Sales" },
  stockCost: { hi: "माल की लागत", en: "Stock cost" },
  labourCost: { hi: "मज़दूरी", en: "Labour" },
  powerCost: { hi: "बिजली", en: "Electricity" },
  rentCost: { hi: "दुकान किराया", en: "Shop rent" },
  miscCost: { hi: "अन्य खर्च", en: "Other costs" },
  estimateNote: {
    hi: "ये अनुमान हैं — असली आंकड़े गाँव और मौसम से बदल सकते हैं।",
    en: "These are estimates — real numbers vary by village and season.",
  },
  govtSchemes: { hi: "सरकारी योजनाएँ", en: "Government schemes" },
  viewPlan: { hi: "पूरा हिसाब देखें", en: "View full plan" },
};


type Ctx = { lang: Lang; setLang: (l: Lang) => void; tr: (k: keyof typeof t | string) => string };

const LangContext = createContext<Ctx>({ lang: "hi", setLang: () => {}, tr: (k) => String(k) });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("hi");

  useEffect(() => {
    const saved = window.localStorage.getItem("grambiz-lang");
    if (saved === "hi" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("grambiz-lang", l);
  };

  const tr = (k: string) => t[k]?.[lang] ?? k;

  return <LangContext.Provider value={{ lang, setLang, tr }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function bi(hi: string, en: string, lang: Lang) {
  return lang === "hi" ? hi : en;
}
