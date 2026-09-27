import { siteConfig } from "@/config/site";

export const lightningProtectionCalculatorConfig = {
  name: "Lightning Protection Calculator",
  description: "Estimate lightning protection requirements for buildings based on height, area, and risk level. Get instant safety recommendations for electrical protection systems.",
  icon: "⚡",
  category: "electrical",
  slug: "lightning-protection-calculator",
  seo: {
    title: "Lightning Risk Calculator – Is Protection Needed?",
    description: "Estimate a building's lightning strike risk with the IEC 62305-2 / NFPA 780 collection-area method and the protection level (I–IV) it needs.",
    keywords: [
      "lightning protection calculator",
      "building lightning risk calculator",
      "lightning rod requirement estimator",
      "electrical safety calculator",
      "surge protection planning tool",
      "lightning strike probability",
      "grounding system calculator",
      "lightning protection system design",
      "building safety calculator",
      "electrical protection estimator"
    ],
    og: {
      title: "Lightning Risk Calculator – Is Protection Needed?",
      description: "Estimate a building's lightning strike risk with the IEC 62305-2 / NFPA 780 collection-area method and the protection level (I–IV) it needs.",
      url: `${siteConfig.url}/tools/electrical/lightning-protection-calculator`,
    },
    howToSteps: [
      { name: "Enter the height", text: "Type the building height in meters." },
      { name: "Enter the footprint", text: "Type the plan area in square meters; the calculator treats it as a square." },
      { name: "Choose the location", text: "Pick the lightning flash density band for your area, from low (about 0.5 flashes per km² a year) to very high (about 10)." },
      { name: "Choose the structure", text: "Select the building type, which sets the location factor and how much risk is tolerable." },
      { name: "Add ground resistance", text: "Optionally type the measured earth resistance to check it against 10 Ω." },
      { name: "Read the result", text: "See the collection area, expected and tolerable strikes per year, whether protection is recommended and at which level." },
    ],
    faq: [
      { q: "How is lightning risk calculated?", a: "The expected number of direct strikes per year is Nd = Ng × Ad × Cd × 10⁻⁶, where Ng is the ground flash density, Ad the collection area and Cd a location factor. It is compared with a tolerable frequency Nc = 1.5 × 10⁻³ ÷ C. If Nd is larger, a lightning protection system is recommended." },
      { q: "What is the collection area?", a: "The ground area that collects the same strikes as the building. For a rectangular building, Ad = L × W + 6H(L + W) + 9πH². A 150 m² house 8 m high collects about 3,100 m²." },
      { q: "How is the protection level chosen?", a: "From the efficiency the system must reach, E = 1 − Nc ÷ Nd: up to 80% needs level IV, up to 90% level III, up to 95% level II and above that level I. A higher level means a denser mesh and a smaller rolling sphere." },
      { q: "Where do I find the flash density?", a: "From lightning detection network maps: Vaisala's NLDN data for the US (NFPA 780 includes a map) and EUCLID or national maps in Europe. The choices here are typical values; your site may differ." },
      { q: "What ground resistance should I aim for?", a: "IEC 62305-3 and NFPA 780 aim for an earth termination of about 10 Ω or less, measured with an earth tester, although the arrangement of electrodes matters as much as the number." },
      { q: "Is this a full risk assessment?", a: "No. IEC 62305-2 assesses risks of loss of life, service and economic value with many more factors, and some buildings need protection by code or insurance regardless. Use this as a screening estimate." },
    ],
  },
};
