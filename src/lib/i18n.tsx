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
  map: { hi: "नक्शा", en: "Map" },
  mapTitle: { hi: "गाँव का नक्शा", en: "Village map" },
  radius: { hi: "दायरा", en: "Search radius" },
  allTypes: { hi: "सभी तरह", en: "All types" },
  shopsWithin: { hi: "दुकानें इस दायरे में", en: "shops within" },
  sameTypeNearby: { hi: "इसी तरह की पास की दुकानें", en: "Same type of shops nearby" },
  noShopsHere: {
    hi: "इस दायरे में इस तरह की कोई दुकान नहीं — यहाँ अच्छा मौका है।",
    en: "No shop of this type in this radius — a good opening for you.",
  },
  openNow: { hi: "अभी खुली", en: "Open now" },
  closedNow: { hi: "अभी बंद", en: "Closed" },
  gapHere: { hi: "खाली मौका", en: "Open gap" },
  someHere: { hi: "कुछ दुकानें", en: "Some shops" },
  crowdedHere: { hi: "भीड़-भाड़", en: "Crowded" },
  notifications: { hi: "सूचनाएँ", en: "Notifications" },
  markAllRead: { hi: "सब पढ़ लिया", en: "Mark all read" },
  noNotifications: { hi: "कोई नई सूचना नहीं", en: "No new notifications" },
  language: { hi: "भाषा", en: "Language" },
};


export type UiLang = "hi" | "en" | "bn" | "mr" | "ta" | "te" | "gu" | "kn" | "ml" | "pa";

export const languages: { id: UiLang; label: string; name: string }[] = [
  { id: "hi", label: "हिंदी", name: "Hindi" },
  { id: "en", label: "English", name: "English" },
  { id: "bn", label: "বাংলা", name: "Bengali" },
  { id: "mr", label: "मराठी", name: "Marathi" },
  { id: "ta", label: "தமிழ்", name: "Tamil" },
  { id: "te", label: "తెలుగు", name: "Telugu" },
  { id: "gu", label: "ગુજરાતી", name: "Gujarati" },
  { id: "kn", label: "ಕನ್ನಡ", name: "Kannada" },
  { id: "ml", label: "മലയാളം", name: "Malayalam" },
  { id: "pa", label: "ਪੰਜਾਬੀ", name: "Punjabi" },
];

// Core UI words in regional languages; anything missing falls back to English.
const K = ["appTagline","findBusiness","village","budget","search","topPicks","invest","profit","perMonth","competition","low","moderate","high","marketTrends","nearbyShops","home","trends","shops","chat","map","send","ask","viewPlan","govtSchemes","radius","notifications"] as const;
const rows: Record<Exclude<UiLang, "hi" | "en">, string[]> = {
  bn: ["গ্রামের জন্য ব্যবসার পরামর্শ","নতুন ব্যবসা খুঁজুন","গ্রাম / শহর","বাজেট","খুঁজুন","সেরা পরামর্শ","বিনিয়োগ","লাভ","/মাস","প্রতিযোগিতা","কম","মাঝারি","বেশি","বাজারের প্রবণতা","কাছের দোকান","হোম","ট্রেন্ড","দোকান","চ্যাট","মানচিত্র","পাঠান","জিজ্ঞাসা করুন","পুরো হিসাব দেখুন","সরকারি প্রকল্প","দূরত্ব","বিজ্ঞপ্তি"],
  mr: ["गावासाठी व्यवसाय सल्ला","नवीन व्यवसाय शोधा","गाव / शहर","बजेट","शोधा","सर्वोत्तम शिफारसी","गुंतवणूक","नफा","/महिना","स्पर्धा","कमी","मध्यम","जास्त","बाजार कल","जवळची दुकाने","होम","ट्रेंड्स","दुकाने","चॅट","नकाशा","पाठवा","विचारा","पूर्ण हिशोब पहा","सरकारी योजना","अंतर","सूचना"],
  ta: ["கிராமத்திற்கான வணிக ஆலோசனை","புதிய தொழில் தேடுங்கள்","கிராமம் / ஊர்","பட்ஜெட்","தேடு","சிறந்த பரிந்துரைகள்","முதலீடு","லாபம்","/மாதம்","போட்டி","குறைவு","நடுத்தரம்","அதிகம்","சந்தை போக்குகள்","அருகிலுள்ள கடைகள்","முகப்பு","போக்குகள்","கடைகள்","அரட்டை","வரைபடம்","அனுப்பு","கேள்","முழு திட்டம்","அரசு திட்டங்கள்","சுற்றளவு","அறிவிப்புகள்"],
  te: ["గ్రామానికి వ్యాపార సలహా","కొత్త వ్యాపారం కనుగొనండి","గ్రామం / పట్టణం","బడ్జెట్","వెతకండి","ఉత్తమ సూచనలు","పెట్టుబడి","లాభం","/నెల","పోటీ","తక్కువ","మధ్యస్థం","ఎక్కువ","మార్కెట్ ధోరణులు","దగ్గరి దుకాణాలు","హోమ్","ట్రెండ్స్","దుకాణాలు","చాట్","మ్యాప్","పంపు","అడగండి","పూర్తి ప్లాన్","ప్రభుత్వ పథకాలు","పరిధి","నోటిఫికేషన్లు"],
  gu: ["ગામ માટે ધંધાની સલાહ","નવો ધંધો શોધો","ગામ / નગર","બજેટ","શોધો","શ્રેષ્ઠ ભલામણો","રોકાણ","નફો","/મહિનો","સ્પર્ધા","ઓછી","મધ્યમ","વધુ","બજાર વલણ","નજીકની દુકાનો","હોમ","ટ્રેન્ડ્સ","દુકાનો","ચેટ","નકશો","મોકલો","પૂછો","પૂરો હિસાબ જુઓ","સરકારી યોજનાઓ","અંતર","સૂચનાઓ"],
  kn: ["ಹಳ್ಳಿಗೆ ವ್ಯಾಪಾರ ಸಲಹೆ","ಹೊಸ ವ್ಯಾಪಾರ ಹುಡುಕಿ","ಹಳ್ಳಿ / ಪಟ್ಟಣ","ಬಜೆಟ್","ಹುಡುಕಿ","ಉತ್ತಮ ಶಿಫಾರಸುಗಳು","ಹೂಡಿಕೆ","ಲಾಭ","/ತಿಂಗಳು","ಸ್ಪರ್ಧೆ","ಕಡಿಮೆ","ಮಧ್ಯಮ","ಹೆಚ್ಚು","ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿ","ಹತ್ತಿರದ ಅಂಗಡಿಗಳು","ಮುಖಪುಟ","ಟ್ರೆಂಡ್ಸ್","ಅಂಗಡಿಗಳು","ಚಾಟ್","ನಕ್ಷೆ","ಕಳುಹಿಸಿ","ಕೇಳಿ","ಪೂರ್ಣ ಯೋಜನೆ","ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು","ವ್ಯಾಪ್ತಿ","ಅಧಿಸೂಚನೆಗಳು"],
  ml: ["ഗ്രാമത്തിനുള്ള ബിസിനസ് ഉപദേശം","പുതിയ ബിസിനസ് കണ്ടെത്തുക","ഗ്രാമം / പട്ടണം","ബജറ്റ്","തിരയുക","മികച്ച നിർദ്ദേശങ്ങൾ","നിക്ഷേപം","ലാഭം","/മാസം","മത്സരം","കുറവ്","ഇടത്തരം","കൂടുതൽ","വിപണി പ്രവണത","അടുത്തുള്ള കടകൾ","ഹോം","ട്രെൻഡ്സ്","കടകൾ","ചാറ്റ്","മാപ്പ്","അയയ്ക്കുക","ചോദിക്കുക","പൂർണ്ണ പ്ലാൻ","സർക്കാർ പദ്ധതികൾ","ദൂരപരിധി","അറിയിപ്പുകൾ"],
  pa: ["ਪਿੰਡ ਲਈ ਕਾਰੋਬਾਰ ਸਲਾਹ","ਨਵਾਂ ਕਾਰੋਬਾਰ ਲੱਭੋ","ਪਿੰਡ / ਕਸਬਾ","ਬਜਟ","ਲੱਭੋ","ਵਧੀਆ ਸਿਫ਼ਾਰਸ਼ਾਂ","ਨਿਵੇਸ਼","ਮੁਨਾਫ਼ਾ","/ਮਹੀਨਾ","ਮੁਕਾਬਲਾ","ਘੱਟ","ਦਰਮਿਆਨਾ","ਜ਼ਿਆਦਾ","ਬਾਜ਼ਾਰ ਰੁਝਾਨ","ਨੇੜਲੀਆਂ ਦੁਕਾਨਾਂ","ਹੋਮ","ਟ੍ਰੈਂਡ","ਦੁਕਾਨਾਂ","ਚੈਟ","ਨਕਸ਼ਾ","ਭੇਜੋ","ਪੁੱਛੋ","ਪੂਰਾ ਹਿਸਾਬ ਵੇਖੋ","ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ","ਦਾਇਰਾ","ਸੂਚਨਾਵਾਂ"],
};

type Ctx = {
  /** Base language for data text (hi or en) */
  lang: Lang;
  uiLang: UiLang;
  setLang: (l: UiLang) => void;
  tr: (k: keyof typeof t | string) => string;
};

const LangContext = createContext<Ctx>({ lang: "hi", uiLang: "hi", setLang: () => {}, tr: (k) => String(k) });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [uiLang, setUi] = useState<UiLang>("hi");

  useEffect(() => {
    const saved = window.localStorage.getItem("grambiz-lang") as UiLang | null;
    if (saved && languages.some((l) => l.id === saved)) setUi(saved);
  }, []);

  const setLang = (l: UiLang) => {
    setUi(l);
    window.localStorage.setItem("grambiz-lang", l);
  };

  const lang: Lang = uiLang === "hi" ? "hi" : "en";
  const tr = (k: string) => {
    if (uiLang !== "hi" && uiLang !== "en") {
      const i = (K as readonly string[]).indexOf(k);
      if (i >= 0) return rows[uiLang][i]!;
    }
    return t[k]?.[lang] ?? k;
  };

  return (
    <LangContext.Provider value={{ lang, uiLang, setLang, tr }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function bi(hi: string, en: string, lang: Lang) {
  return lang === "hi" ? hi : en;
}
