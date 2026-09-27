import { siteConfig } from "@/config/site";

export const fenceMaterialCalculatorConfig = {
  name: "Fence Material Calculator",
  slug: "fence-material-calculator",
  description: "Estimate fence panels, posts, concrete, and rails needed for your fencing project. Supports wood, vinyl, chain link, and metal fences.",
  category: "land",
  icon: "🪵",
  free: true,
  seo: {
    title: "Fence Calculator – Panels, Posts & Concrete",
    description: "Work out fence panels, posts, concrete bags and gates from the fence length or yard size, for wood, vinyl, chain link and metal fences. Feet or meters.",
    keywords: [
      "fence material calculator",
      "fence post calculator",
      "how much fence do i need",
      "fence estimator",
      "fence planning calculator",
      "fence panel calculator",
      "fence cost estimator",
      "fence post spacing calculator",
    ],
    og: {
      title: "Fence Material Calculator – Estimate Fence Panels, Posts & Materials",
      description: "Calculate fence materials instantly. Estimate fence panels, posts, concrete, and rails for wood, vinyl, chain link, and metal fencing.",
      url: `${siteConfig.url}/tools/land/fence-material-calculator`,
    },
    howToSteps: [
      { name: "Pick the fence type", text: "Choose wood, vinyl, chain link, metal or privacy fencing." },
      { name: "Enter the length", text: "Type the fence length, or the yard width and length to fence the whole perimeter." },
      { name: "Set height and spacing", text: "Choose the fence height and the post spacing or panel width (8 ft is common in the US)." },
      { name: "Add a gate and waste", text: "Enter the gate width if there is one and a waste allowance." },
      { name: "Read the materials", text: "See the number of panels, posts, gate posts and concrete bags to buy." },
    ],
    faq: [
      { q: "How many fence panels and posts do I need?", a: "Panels = fence length ÷ panel width, rounded up; posts = panels + 1 for a straight run. 100 ft of fence with 8 ft panels needs 13 panels and 14 posts." },
      { q: "How far apart should fence posts be?", a: "About 6–8 ft (1.8–2.4 m) for wood and vinyl privacy fences and up to 10 ft (3 m) for chain link. Closer spacing is stronger in windy areas." },
      { q: "How deep should fence posts be set?", a: "About one-third of the post length above ground, and at least 24 in (60 cm) deep; below the frost line in cold climates. A 6 ft fence typically uses 8 ft posts set 2 ft deep." },
      { q: "How much concrete does each post need?", a: "Roughly one to two 50 lb bags of fast-setting concrete per post for a 4 × 4 in post in a 10–12 in diameter hole 2 ft deep. The calculator uses 2 bags per post for wood, vinyl and metal and 1 for chain link." },
      { q: "Do I need a permit for a fence?", a: "Many US cities require a permit for fences over 6 ft or front-yard fences over 3–4 ft, and HOAs often set styles. In England, fences over 2 m (or 1 m next to a road) need planning permission." },
    ],
  },
};
