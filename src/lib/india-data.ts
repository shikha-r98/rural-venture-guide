export type Bi = { hi: string; en: string };

export type RegionTag =
  | "dairy"
  | "paddy"
  | "wheat"
  | "coastal"
  | "hill"
  | "arid"
  | "forest"
  | "tea"
  | "horticulture"
  | "tourism"
  | "handloom"
  | "cotton"
  | "spices"
  | "island";

export type VillageSeed = {
  id: string;
  name: Bi;
  district: Bi;
};

export type StateSeed = {
  id: string;
  name: Bi;
  tags: RegionTag[];
  villages: VillageSeed[];
};

export const states: StateSeed[] = [
  {
    id: "andhra-pradesh",
    name: { hi: "आंध्र प्रदेश", en: "Andhra Pradesh" },
    tags: ["paddy", "coastal", "spices"],
    villages: [
      { id: "ap-kondapur", name: { hi: "कोंडापुर", en: "Kondapur" }, district: { hi: "गुंटूर", en: "Guntur" } },
      { id: "ap-veeravalli", name: { hi: "वीरवल्ली", en: "Veeravalli" }, district: { hi: "पश्चिम गोदावरी", en: "West Godavari" } },
      { id: "ap-ramapuram", name: { hi: "रामापुरम", en: "Ramapuram" }, district: { hi: "चित्तूर", en: "Chittoor" } },
    ],
  },
  {
    id: "arunachal-pradesh",
    name: { hi: "अरुणाचल प्रदेश", en: "Arunachal Pradesh" },
    tags: ["hill", "forest", "tourism"],
    villages: [
      { id: "ar-ziro", name: { hi: "जीरो गाँव", en: "Ziro Village" }, district: { hi: "लोअर सुबनसिरी", en: "Lower Subansiri" } },
      { id: "ar-mechuka", name: { hi: "मेचुका", en: "Mechuka" }, district: { hi: "शि योमी", en: "Shi Yomi" } },
    ],
  },
  {
    id: "assam",
    name: { hi: "असम", en: "Assam" },
    tags: ["tea", "paddy", "forest"],
    villages: [
      { id: "as-sualkuchi", name: { hi: "सुआलकुची", en: "Sualkuchi" }, district: { hi: "कामरूप", en: "Kamrup" } },
      { id: "as-titabor", name: { hi: "तीताबोर", en: "Titabor" }, district: { hi: "जोरहाट", en: "Jorhat" } },
      { id: "as-bokakhat", name: { hi: "बोकाखाट", en: "Bokakhat" }, district: { hi: "गोलाघाट", en: "Golaghat" } },
    ],
  },
  {
    id: "bihar",
    name: { hi: "बिहार", en: "Bihar" },
    tags: ["paddy", "dairy", "handloom"],
    villages: [
      { id: "br-madhopur", name: { hi: "माधोपुर", en: "Madhopur" }, district: { hi: "समस्तीपुर", en: "Samastipur" } },
      { id: "br-barh", name: { hi: "बाढ़ ग्राम", en: "Barh Gram" }, district: { hi: "पटना", en: "Patna" } },
      { id: "br-sonbarsa", name: { hi: "सोनबरसा", en: "Sonbarsa" }, district: { hi: "सीतामढ़ी", en: "Sitamarhi" } },
    ],
  },
  {
    id: "chhattisgarh",
    name: { hi: "छत्तीसगढ़", en: "Chhattisgarh" },
    tags: ["forest", "paddy"],
    villages: [
      { id: "cg-kurud", name: { hi: "कुरुद", en: "Kurud" }, district: { hi: "धमतरी", en: "Dhamtari" } },
      { id: "cg-tokapal", name: { hi: "तोकापाल", en: "Tokapal" }, district: { hi: "बस्तर", en: "Bastar" } },
    ],
  },
  {
    id: "goa",
    name: { hi: "गोवा", en: "Goa" },
    tags: ["coastal", "tourism"],
    villages: [
      { id: "ga-loutolim", name: { hi: "लौटोलिम", en: "Loutolim" }, district: { hi: "दक्षिण गोवा", en: "South Goa" } },
      { id: "ga-parra", name: { hi: "पर्रा", en: "Parra" }, district: { hi: "उत्तर गोवा", en: "North Goa" } },
    ],
  },
  {
    id: "gujarat",
    name: { hi: "गुजरात", en: "Gujarat" },
    tags: ["dairy", "cotton", "arid"],
    villages: [
      { id: "gj-anand-gamdi", name: { hi: "गामड़ी", en: "Gamdi" }, district: { hi: "आणंद", en: "Anand" } },
      { id: "gj-bhuj-madhapar", name: { hi: "माधापर", en: "Madhapar" }, district: { hi: "कच्छ", en: "Kutch" } },
      { id: "gj-dhrangadhra", name: { hi: "ध्रांगध्रा ग्राम", en: "Dhrangadhra Gram" }, district: { hi: "सुरेन्द्रनगर", en: "Surendranagar" } },
    ],
  },
  {
    id: "haryana",
    name: { hi: "हरियाणा", en: "Haryana" },
    tags: ["dairy", "wheat"],
    villages: [
      { id: "hr-bhiwani-kharak", name: { hi: "खरक", en: "Kharak" }, district: { hi: "भिवानी", en: "Bhiwani" } },
      { id: "hr-karnal-nigdhu", name: { hi: "निगधू", en: "Nigdhu" }, district: { hi: "करनाल", en: "Karnal" } },
    ],
  },
  {
    id: "himachal-pradesh",
    name: { hi: "हिमाचल प्रदेश", en: "Himachal Pradesh" },
    tags: ["hill", "horticulture", "tourism"],
    villages: [
      { id: "hp-thanedar", name: { hi: "ठाणेदार", en: "Thanedar" }, district: { hi: "शिमला", en: "Shimla" } },
      { id: "hp-naggar", name: { hi: "नग्गर", en: "Naggar" }, district: { hi: "कुल्लू", en: "Kullu" } },
    ],
  },
  {
    id: "jharkhand",
    name: { hi: "झारखंड", en: "Jharkhand" },
    tags: ["forest", "paddy"],
    villages: [
      { id: "jh-angara", name: { hi: "अनगड़ा", en: "Angara" }, district: { hi: "रांची", en: "Ranchi" } },
      { id: "jh-chandil", name: { hi: "चांडिल ग्राम", en: "Chandil Gram" }, district: { hi: "सरायकेला", en: "Seraikela" } },
    ],
  },
  {
    id: "karnataka",
    name: { hi: "कर्नाटक", en: "Karnataka" },
    tags: ["horticulture", "spices", "dairy"],
    villages: [
      { id: "ka-hesaraghatta", name: { hi: "हेसरघट्टा", en: "Hesaraghatta" }, district: { hi: "बेंगलुरु ग्रामीण", en: "Bengaluru Rural" } },
      { id: "ka-sakleshpur", name: { hi: "साकलेशपुर ग्राम", en: "Sakleshpur Gram" }, district: { hi: "हासन", en: "Hassan" } },
      { id: "ka-gadag-lakkundi", name: { hi: "लक्कुंडी", en: "Lakkundi" }, district: { hi: "गदग", en: "Gadag" } },
    ],
  },
  {
    id: "kerala",
    name: { hi: "केरल", en: "Kerala" },
    tags: ["coastal", "spices", "tourism"],
    villages: [
      { id: "kl-kumarakom", name: { hi: "कुमारकोम", en: "Kumarakom" }, district: { hi: "कोट्टायम", en: "Kottayam" } },
      { id: "kl-wayanad-meppadi", name: { hi: "मेप्पाडी", en: "Meppadi" }, district: { hi: "वायनाड", en: "Wayanad" } },
    ],
  },
  {
    id: "madhya-pradesh",
    name: { hi: "मध्य प्रदेश", en: "Madhya Pradesh" },
    tags: ["wheat", "forest", "dairy"],
    villages: [
      { id: "mp-sanchi-gram", name: { hi: "सांची ग्राम", en: "Sanchi Gram" }, district: { hi: "रायसेन", en: "Raisen" } },
      { id: "mp-pachmarhi", name: { hi: "पचमढ़ी ग्राम", en: "Pachmarhi Gram" }, district: { hi: "नर्मदापुरम", en: "Narmadapuram" } },
      { id: "mp-khargone-bistan", name: { hi: "बिस्टान", en: "Bistan" }, district: { hi: "खरगोन", en: "Khargone" } },
    ],
  },
  {
    id: "maharashtra",
    name: { hi: "महाराष्ट्र", en: "Maharashtra" },
    tags: ["cotton", "horticulture", "dairy"],
    villages: [
      { id: "mh-hiware-bazar", name: { hi: "हिवरे बाज़ार", en: "Hiware Bazar" }, district: { hi: "अहमदनगर", en: "Ahmednagar" } },
      { id: "mh-ralegan", name: { hi: "रालेगण सिद्धि", en: "Ralegan Siddhi" }, district: { hi: "अहमदनगर", en: "Ahmednagar" } },
      { id: "mh-nashik-ozar", name: { hi: "ओझर", en: "Ozar" }, district: { hi: "नाशिक", en: "Nashik" } },
    ],
  },
  {
    id: "manipur",
    name: { hi: "मणिपुर", en: "Manipur" },
    tags: ["hill", "handloom", "paddy"],
    villages: [
      { id: "mn-andro", name: { hi: "अंद्रो", en: "Andro" }, district: { hi: "इंफाल पूर्व", en: "Imphal East" } },
      { id: "mn-moirang", name: { hi: "मोइरांग", en: "Moirang" }, district: { hi: "बिष्णुपुर", en: "Bishnupur" } },
    ],
  },
  {
    id: "meghalaya",
    name: { hi: "मेघालय", en: "Meghalaya" },
    tags: ["hill", "forest", "tourism"],
    villages: [
      { id: "ml-mawlynnong", name: { hi: "मावलिननॉन्ग", en: "Mawlynnong" }, district: { hi: "पूर्वी खासी हिल्स", en: "East Khasi Hills" } },
      { id: "ml-nongriat", name: { hi: "नोंगरिआट", en: "Nongriat" }, district: { hi: "पूर्वी खासी हिल्स", en: "East Khasi Hills" } },
    ],
  },
  {
    id: "mizoram",
    name: { hi: "मिज़ोरम", en: "Mizoram" },
    tags: ["hill", "forest"],
    villages: [
      { id: "mz-reiek", name: { hi: "रेइक", en: "Reiek" }, district: { hi: "मामित", en: "Mamit" } },
      { id: "mz-hmuifang", name: { hi: "हमुइफांग", en: "Hmuifang" }, district: { hi: "आइजोल", en: "Aizawl" } },
    ],
  },
  {
    id: "nagaland",
    name: { hi: "नागालैंड", en: "Nagaland" },
    tags: ["hill", "forest", "tourism"],
    villages: [
      { id: "nl-khonoma", name: { hi: "खोनोमा", en: "Khonoma" }, district: { hi: "कोहिमा", en: "Kohima" } },
      { id: "nl-longwa", name: { hi: "लोंगवा", en: "Longwa" }, district: { hi: "मोन", en: "Mon" } },
    ],
  },
  {
    id: "odisha",
    name: { hi: "ओडिशा", en: "Odisha" },
    tags: ["coastal", "paddy", "handloom"],
    villages: [
      { id: "od-raghurajpur", name: { hi: "रघुराजपुर", en: "Raghurajpur" }, district: { hi: "पुरी", en: "Puri" } },
      { id: "od-pipili", name: { hi: "पिपली ग्राम", en: "Pipili Gram" }, district: { hi: "पुरी", en: "Puri" } },
    ],
  },
  {
    id: "punjab",
    name: { hi: "पंजाब", en: "Punjab" },
    tags: ["wheat", "dairy"],
    villages: [
      { id: "pb-raipura", name: { hi: "रायपुरा", en: "Raipura" }, district: { hi: "पटियाला", en: "Patiala" } },
      { id: "pb-sultanpur", name: { hi: "सुल्तानपुर ग्राम", en: "Sultanpur Gram" }, district: { hi: "कपूरथला", en: "Kapurthala" } },
      { id: "pb-nurmahal", name: { hi: "नूरमहल", en: "Nurmahal" }, district: { hi: "जालंधर", en: "Jalandhar" } },
    ],
  },
  {
    id: "rajasthan",
    name: { hi: "राजस्थान", en: "Rajasthan" },
    tags: ["arid", "handloom", "tourism"],
    villages: [
      { id: "rj-tahliya", name: { hi: "तहलिया", en: "Tahliya" }, district: { hi: "जालोर", en: "Jalore" } },
      { id: "rj-khimsar", name: { hi: "खींवसर", en: "Khimsar" }, district: { hi: "नागौर", en: "Nagaur" } },
      { id: "rj-bagru", name: { hi: "बगरू", en: "Bagru" }, district: { hi: "जयपुर", en: "Jaipur" } },
    ],
  },
  {
    id: "sikkim",
    name: { hi: "सिक्किम", en: "Sikkim" },
    tags: ["hill", "horticulture", "tourism"],
    villages: [
      { id: "sk-yuksom", name: { hi: "युकसोम", en: "Yuksom" }, district: { hi: "पश्चिम सिक्किम", en: "West Sikkim" } },
      { id: "sk-lachung", name: { hi: "लाचुंग", en: "Lachung" }, district: { hi: "उत्तर सिक्किम", en: "North Sikkim" } },
    ],
  },
  {
    id: "tamil-nadu",
    name: { hi: "तमिलनाडु", en: "Tamil Nadu" },
    tags: ["paddy", "coastal", "handloom"],
    villages: [
      { id: "tn-kanadukathan", name: { hi: "कनाडुकाथन", en: "Kanadukathan" }, district: { hi: "शिवगंगा", en: "Sivaganga" } },
      { id: "tn-thiruvaiyaru", name: { hi: "तिरुवैयारु", en: "Thiruvaiyaru" }, district: { hi: "तंजावुर", en: "Thanjavur" } },
    ],
  },
  {
    id: "telangana",
    name: { hi: "तेलंगाना", en: "Telangana" },
    tags: ["cotton", "paddy", "handloom"],
    villages: [
      { id: "tg-pochampally", name: { hi: "पोचमपल्ली", en: "Pochampally" }, district: { hi: "यादाद्री", en: "Yadadri" } },
      { id: "tg-siddipet-gram", name: { hi: "सिद्दीपेट ग्राम", en: "Siddipet Gram" }, district: { hi: "सिद्दीपेट", en: "Siddipet" } },
    ],
  },
  {
    id: "tripura",
    name: { hi: "त्रिपुरा", en: "Tripura" },
    tags: ["forest", "handloom"],
    villages: [
      { id: "tr-melaghar", name: { hi: "मेलाघर", en: "Melaghar" }, district: { hi: "सिपाहीजला", en: "Sepahijala" } },
      { id: "tr-jampui", name: { hi: "जम्पुई", en: "Jampui" }, district: { hi: "उत्तर त्रिपुरा", en: "North Tripura" } },
    ],
  },
  {
    id: "uttar-pradesh",
    name: { hi: "उत्तर प्रदेश", en: "Uttar Pradesh" },
    tags: ["dairy", "wheat", "handloom"],
    villages: [
      { id: "up-kheri", name: { hi: "खेड़ी", en: "Kheri" }, district: { hi: "मेरठ", en: "Meerut" } },
      { id: "up-bhadohi-gram", name: { hi: "भदोही ग्राम", en: "Bhadohi Gram" }, district: { hi: "भदोही", en: "Bhadohi" } },
      { id: "up-chitrakoot-gram", name: { hi: "मऊ ग्राम", en: "Mau Gram" }, district: { hi: "चित्रकूट", en: "Chitrakoot" } },
    ],
  },
  {
    id: "uttarakhand",
    name: { hi: "उत्तराखंड", en: "Uttarakhand" },
    tags: ["hill", "horticulture", "tourism"],
    villages: [
      { id: "uk-munsiyari", name: { hi: "मुनस्यारी", en: "Munsiyari" }, district: { hi: "पिथौरागढ़", en: "Pithoragarh" } },
      { id: "uk-kanatal", name: { hi: "कनाताल", en: "Kanatal" }, district: { hi: "टिहरी गढ़वाल", en: "Tehri Garhwal" } },
    ],
  },
  {
    id: "west-bengal",
    name: { hi: "पश्चिम बंगाल", en: "West Bengal" },
    tags: ["paddy", "handloom", "coastal"],
    villages: [
      { id: "wb-shantiniketan", name: { hi: "शांतिनिकेतन ग्राम", en: "Shantiniketan Gram" }, district: { hi: "बीरभूम", en: "Birbhum" } },
      { id: "wb-bishnupur", name: { hi: "विष्णुपुर ग्राम", en: "Bishnupur Gram" }, district: { hi: "बांकुड़ा", en: "Bankura" } },
    ],
  },
  {
    id: "andaman-nicobar",
    name: { hi: "अंडमान व निकोबार", en: "Andaman & Nicobar" },
    tags: ["island", "coastal", "tourism"],
    villages: [
      { id: "an-wandoor", name: { hi: "वांडूर", en: "Wandoor" }, district: { hi: "दक्षिण अंडमान", en: "South Andaman" } },
    ],
  },
  {
    id: "chandigarh",
    name: { hi: "चंडीगढ़", en: "Chandigarh" },
    tags: ["dairy"],
    villages: [
      { id: "ch-badheri", name: { hi: "बढ़ेड़ी", en: "Badheri" }, district: { hi: "चंडीगढ़", en: "Chandigarh" } },
    ],
  },
  {
    id: "dadra-nagar-haveli-daman-diu",
    name: { hi: "दादरा नगर हवेली व दमन दीव", en: "Dadra & Nagar Haveli and Daman & Diu" },
    tags: ["coastal", "forest"],
    villages: [
      { id: "dd-khanvel", name: { hi: "खानवेल", en: "Khanvel" }, district: { hi: "दादरा नगर हवेली", en: "Dadra & Nagar Haveli" } },
    ],
  },
  {
    id: "delhi",
    name: { hi: "दिल्ली", en: "Delhi" },
    tags: ["dairy", "wheat"],
    villages: [
      { id: "dl-najafgarh", name: { hi: "नजफगढ़ ग्राम", en: "Najafgarh Gram" }, district: { hi: "दक्षिण पश्चिम दिल्ली", en: "South West Delhi" } },
      { id: "dl-bakhtawarpur", name: { hi: "बख्तावरपुर", en: "Bakhtawarpur" }, district: { hi: "उत्तर दिल्ली", en: "North Delhi" } },
    ],
  },
  {
    id: "jammu-kashmir",
    name: { hi: "जम्मू-कश्मीर", en: "Jammu & Kashmir" },
    tags: ["hill", "horticulture", "handloom"],
    villages: [
      { id: "jk-pahalgam-gram", name: { hi: "पहलगाम ग्राम", en: "Pahalgam Gram" }, district: { hi: "अनंतनाग", en: "Anantnag" } },
      { id: "jk-bhaderwah", name: { hi: "भद्रवाह ग्राम", en: "Bhaderwah Gram" }, district: { hi: "डोडा", en: "Doda" } },
    ],
  },
  {
    id: "ladakh",
    name: { hi: "लद्दाख", en: "Ladakh" },
    tags: ["hill", "arid", "tourism"],
    villages: [
      { id: "la-turtuk", name: { hi: "तुरतुक", en: "Turtuk" }, district: { hi: "लेह", en: "Leh" } },
      { id: "la-hemis", name: { hi: "हेमिस ग्राम", en: "Hemis Gram" }, district: { hi: "लेह", en: "Leh" } },
    ],
  },
  {
    id: "lakshadweep",
    name: { hi: "लक्षद्वीप", en: "Lakshadweep" },
    tags: ["island", "coastal"],
    villages: [
      { id: "ld-kavaratti-gram", name: { hi: "कवरत्ती ग्राम", en: "Kavaratti Gram" }, district: { hi: "लक्षद्वीप", en: "Lakshadweep" } },
    ],
  },
  {
    id: "puducherry",
    name: { hi: "पुडुचेरी", en: "Puducherry" },
    tags: ["coastal", "tourism"],
    villages: [
      { id: "py-kottakuppam", name: { hi: "कोट्टकुप्पम", en: "Kottakuppam" }, district: { hi: "पुडुचेरी", en: "Puducherry" } },
    ],
  },
];

type PlaceRow = readonly [id: string, nameEn: string, nameHi: string, districtEn: string, districtHi: string];

const additionalPlaces: Record<string, PlaceRow[]> = {
  "andhra-pradesh": [
    ["ap-bapatla", "Bapatla", "बापटला", "Bapatla", "बापटला"],
    ["ap-mangalagiri", "Mangalagiri", "मंगलगिरि", "Guntur", "गुंटूर"],
  ],
  "arunachal-pradesh": [
    ["ar-itanagar", "Itanagar", "ईटानगर", "Papum Pare", "पापुम पारे"],
    ["ar-pasighat", "Pasighat", "पासीघाट", "East Siang", "पूर्व सियांग"],
    ["ar-bomdila", "Bomdila", "बोमडिला", "West Kameng", "पश्चिम कामेंग"],
  ],
  assam: [
    ["as-majuli", "Majuli", "माजुली", "Majuli", "माजुली"],
    ["as-haflong", "Haflong", "हाफलोंग", "Dima Hasao", "दीमा हसाओ"],
  ],
  bihar: [
    ["br-madhubani", "Madhubani", "मधुबनी", "Madhubani", "मधुबनी"],
    ["br-gaya", "Gaya", "गया", "Gaya", "गया"],
  ],
  chhattisgarh: [
    ["cg-arang", "Arang", "आरंग", "Raipur", "रायपुर"],
    ["cg-dantewada", "Dantewada", "दंतेवाड़ा", "Dantewada", "दंतेवाड़ा"],
    ["cg-kanker", "Kanker", "कांकेर", "Kanker", "कांकेर"],
  ],
  goa: [
    ["ga-saligao", "Saligao", "सालीगांव", "North Goa", "उत्तर गोवा"],
    ["ga-canacona", "Canacona", "कनाकोना", "South Goa", "दक्षिण गोवा"],
    ["ga-benaulim", "Benaulim", "बेनाउलिम", "South Goa", "दक्षिण गोवा"],
  ],
  gujarat: [
    ["gj-dholka", "Dholka", "ढोलका", "Ahmedabad", "अहमदाबाद"],
    ["gj-patan", "Patan", "पाटन", "Patan", "पाटन"],
  ],
  haryana: [
    ["hr-barwala", "Barwala", "बरवाला", "Hisar", "हिसार"],
    ["hr-pehowa", "Pehowa", "पेहोवा", "Kurukshetra", "कुरुक्षेत्र"],
    ["hr-ratia", "Ratia", "रतिया", "Fatehabad", "फतेहाबाद"],
  ],
  "himachal-pradesh": [
    ["hp-palampur", "Palampur", "पालमपुर", "Kangra", "कांगड़ा"],
    ["hp-banjar", "Banjar", "बंजार", "Kullu", "कुल्लू"],
    ["hp-kalpa", "Kalpa", "कल्पा", "Kinnaur", "किन्नौर"],
  ],
  jharkhand: [
    ["jh-deoghar", "Deoghar", "देवघर", "Deoghar", "देवघर"],
    ["jh-khunti", "Khunti", "खूंटी", "Khunti", "खूंटी"],
    ["jh-dumka", "Dumka", "दुमका", "Dumka", "दुमका"],
  ],
  karnataka: [
    ["ka-gokarna", "Gokarna", "गोकर्ण", "Uttara Kannada", "उत्तर कन्नड़"],
    ["ka-channapatna", "Channapatna", "चन्नपटना", "Ramanagara", "रामनगर"],
  ],
  kerala: [
    ["kl-vythiri", "Vythiri", "वायथिरी", "Wayanad", "वायनाड"],
    ["kl-vaikom", "Vaikom", "वैकोम", "Kottayam", "कोट्टायम"],
    ["kl-kuttanad", "Kuttanad", "कुट्टनाड", "Alappuzha", "अलप्पुझा"],
  ],
  "madhya-pradesh": [
    ["mp-mandu", "Mandu", "मांडू", "Dhar", "धार"],
    ["mp-chanderi", "Chanderi", "चंदेरी", "Ashoknagar", "अशोकनगर"],
  ],
  maharashtra: [
    ["mh-paithan", "Paithan", "पैठण", "Chhatrapati Sambhajinagar", "छत्रपति संभाजीनगर"],
    ["mh-sawantwadi", "Sawantwadi", "सावंतवाड़ी", "Sindhudurg", "सिंधुदुर्ग"],
  ],
  manipur: [
    ["mn-ukhrul", "Ukhrul", "उखरूल", "Ukhrul", "उखरूल"],
    ["mn-thoubal", "Thoubal", "थौबल", "Thoubal", "थौबल"],
    ["mn-kakching", "Kakching", "काकचिंग", "Kakching", "काकचिंग"],
  ],
  meghalaya: [
    ["ml-sohra", "Sohra", "सोहरा", "East Khasi Hills", "पूर्वी खासी हिल्स"],
    ["ml-tura", "Tura", "तुरा", "West Garo Hills", "पश्चिम गारो हिल्स"],
    ["ml-jowai", "Jowai", "जोवाई", "West Jaintia Hills", "पश्चिम जयंतिया हिल्स"],
  ],
  mizoram: [
    ["mz-lunglei", "Lunglei", "लुंगलेई", "Lunglei", "लुंगलेई"],
    ["mz-champhai", "Champhai", "चम्फाई", "Champhai", "चम्फाई"],
    ["mz-serchhip", "Serchhip", "सेरछिप", "Serchhip", "सेरछिप"],
  ],
  nagaland: [
    ["nl-mokokchung", "Mokokchung", "मोकोकचुंग", "Mokokchung", "मोकोकचुंग"],
    ["nl-wokha", "Wokha", "वोखा", "Wokha", "वोखा"],
    ["nl-tuensang", "Tuensang", "तुएनसांग", "Tuensang", "तुएनसांग"],
  ],
  odisha: [
    ["od-konark", "Konark", "कोणार्क", "Puri", "पुरी"],
    ["od-koraput", "Koraput", "कोरापुट", "Koraput", "कोरापुट"],
    ["od-jeypore", "Jeypore", "जयपुर", "Koraput", "कोरापुट"],
  ],
  punjab: [
    ["pb-qadian", "Qadian", "कादियां", "Gurdaspur", "गुरदासपुर"],
    ["pb-kila-raipur", "Kila Raipur", "किला रायपुर", "Ludhiana", "लुधियाना"],
  ],
  rajasthan: [
    ["rj-phalodi", "Phalodi", "फलोदी", "Jodhpur", "जोधपुर"],
    ["rj-barmer", "Barmer", "बाड़मेर", "Barmer", "बाड़मेर"],
  ],
  sikkim: [
    ["sk-namchi", "Namchi", "नामची", "Namchi", "नामची"],
    ["sk-ravangla", "Ravangla", "रावंगला", "Namchi", "नामची"],
    ["sk-mangan", "Mangan", "मंगन", "Mangan", "मंगन"],
  ],
  "tamil-nadu": [
    ["tn-coonoor", "Coonoor", "कुन्नूर", "Nilgiris", "नीलगिरि"],
    ["tn-kumbakonam", "Kumbakonam", "कुंभकोणम", "Thanjavur", "तंजावुर"],
    ["tn-tiruchendur", "Tiruchendur", "तिरुचेंदूर", "Thoothukudi", "थूथुकुडी"],
  ],
  telangana: [
    ["tg-nirmal", "Nirmal", "निर्मल", "Nirmal", "निर्मल"],
    ["tg-bhongir", "Bhongir", "भोंगीर", "Yadadri Bhuvanagiri", "यादाद्रि भुवनगिरि"],
    ["tg-mancherial", "Mancherial", "मंचेरियल", "Mancherial", "मंचेरियल"],
  ],
  tripura: [
    ["tr-udaipur", "Udaipur", "उदयपुर", "Gomati", "गोमती"],
    ["tr-amarpur", "Amarpur", "अमरपुर", "Gomati", "गोमती"],
    ["tr-dharmanagar", "Dharmanagar", "धर्मनगर", "North Tripura", "उत्तर त्रिपुरा"],
  ],
  "uttar-pradesh": [
    ["up-chunar", "Chunar", "चुनार", "Mirzapur", "मिर्जापुर"],
    ["up-bisalpur", "Bisalpur", "बीसलपुर", "Pilibhit", "पीलीभीत"],
  ],
  uttarakhand: [
    ["uk-bageshwar", "Bageshwar", "बागेश्वर", "Bageshwar", "बागेश्वर"],
    ["uk-almora", "Almora", "अल्मोड़ा", "Almora", "अल्मोड़ा"],
    ["uk-lansdowne", "Lansdowne", "लैंसडाउन", "Pauri Garhwal", "पौड़ी गढ़वाल"],
  ],
  "west-bengal": [
    ["wb-kalimpong", "Kalimpong", "कालिम्पोंग", "Kalimpong", "कालिम्पोंग"],
    ["wb-bolpur", "Bolpur", "बोलपुर", "Birbhum", "बीरभूम"],
    ["wb-cooch-behar", "Cooch Behar", "कूच बिहार", "Cooch Behar", "कूच बिहार"],
  ],
  "andaman-nicobar": [
    ["an-port-blair", "Port Blair", "पोर्ट ब्लेयर", "South Andaman", "दक्षिण अंडमान"],
    ["an-rangat", "Rangat", "रंगत", "North and Middle Andaman", "उत्तर एवं मध्य अंडमान"],
    ["an-diglipur", "Diglipur", "डिगलीपुर", "North and Middle Andaman", "उत्तर एवं मध्य अंडमान"],
    ["an-car-nicobar", "Car Nicobar", "कार निकोबार", "Nicobars", "निकोबार"],
  ],
  chandigarh: [
    ["ch-khuda-alisher", "Khuda Alisher", "खुदा अलीशेर", "Chandigarh", "चंडीगढ़"],
    ["ch-sarangpur", "Sarangpur", "सारंगपुर", "Chandigarh", "चंडीगढ़"],
    ["ch-dhanas", "Dhanas", "धनास", "Chandigarh", "चंडीगढ़"],
    ["ch-maloya", "Maloya", "मलोया", "Chandigarh", "चंडीगढ़"],
  ],
  "dadra-nagar-haveli-daman-diu": [
    ["dd-silvassa", "Silvassa", "सिलवासा", "Dadra and Nagar Haveli", "दादरा और नगर हवेली"],
    ["dd-daman", "Daman", "दमन", "Daman", "दमन"],
    ["dd-moti-daman", "Moti Daman", "मोती दमन", "Daman", "दमन"],
    ["dd-diu", "Diu", "दीव", "Diu", "दीव"],
  ],
  delhi: [
    ["dl-alipur", "Alipur", "अलीपुर", "North Delhi", "उत्तर दिल्ली"],
    ["dl-kanjhawala", "Kanjhawala", "कंझावला", "North West Delhi", "उत्तर पश्चिम दिल्ली"],
    ["dl-chhawla", "Chhawla", "छावला", "South West Delhi", "दक्षिण पश्चिम दिल्ली"],
  ],
  "jammu-kashmir": [
    ["jk-tangmarg", "Tangmarg", "टंगमर्ग", "Baramulla", "बारामूला"],
    ["jk-katra", "Katra", "कटरा", "Reasi", "रियासी"],
    ["jk-handwara", "Handwara", "हंदवाड़ा", "Kupwara", "कुपवाड़ा"],
  ],
  ladakh: [
    ["la-kargil", "Kargil", "कारगिल", "Kargil", "कारगिल"],
    ["la-diskit", "Diskit", "डिस्कित", "Leh", "लेह"],
    ["la-alchi", "Alchi", "अलची", "Leh", "लेह"],
  ],
  lakshadweep: [
    ["ld-andrott", "Andrott", "अंद्रोत्त", "Lakshadweep", "लक्षद्वीप"],
    ["ld-agatti", "Agatti", "अगत्ती", "Lakshadweep", "लक्षद्वीप"],
    ["ld-minicoy", "Minicoy", "मिनिकॉय", "Lakshadweep", "लक्षद्वीप"],
    ["ld-amini", "Amini", "अमिनी", "Lakshadweep", "लक्षद्वीप"],
  ],
  puducherry: [
    ["py-villianur", "Villianur", "विल्लियानूर", "Puducherry", "पुडुचेरी"],
    ["py-karaikal", "Karaikal", "कराईकल", "Karaikal", "कराईकल"],
    ["py-mahe", "Mahe", "माहे", "Mahe", "माहे"],
    ["py-yanam", "Yanam", "यानम", "Yanam", "यानम"],
  ],
};

for (const state of states) {
  state.villages.push(
    ...(additionalPlaces[state.id] ?? []).map(([id, nameEn, nameHi, districtEn, districtHi]) => ({
      id,
      name: { en: nameEn, hi: nameHi },
      district: { en: districtEn, hi: districtHi },
    })),
  );
}

/** Stable pseudo-random number from a string seed. */
export function seedNum(seed: string, min: number, max: number) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const x = Math.abs(h % 10000) / 10000;
  return Math.round(min + x * (max - min));
}
