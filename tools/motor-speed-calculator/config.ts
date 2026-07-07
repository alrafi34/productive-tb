import { siteConfig } from "@/config/site";

export const motorSpeedCalculatorConfig = {
  name: "Motor Speed Calculator",
  description: "Calculate motor speed (RPM) from frequency, number of poles, and slip percentage.",
  icon: "⚙️",
  category: "electrical",
  slug: "motor-speed-calculator",
  seo: {
    title: "Motor Speed Calculator – Calculate RPM from Frequency & Poles",
    description: "Easily calculate motor speed (RPM) using frequency, poles, and slip. Free online motor speed calculator with instant results for engineers and students.",
    keywords: [
      "motor speed calculator",
      "RPM calculator",
      "synchronous speed formula",
      "motor RPM calculation",
      "electrical motor speed",
      "induction motor speed",
      "motor slip calculator",
      "AC motor speed",
      "motor frequency calculator",
      "electric motor RPM"
    ],
    og: {
      title: "Motor Speed Calculator – Calculate RPM from Frequency & Poles",
      description: "Calculate motor speed (RPM) instantly using frequency, number of poles, and slip percentage. Get synchronous and actual motor speeds.",
      url: `${siteConfig.url}/tools/electrical/motor-speed-calculator`
    }
  }
};
