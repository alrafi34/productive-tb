export const toolConfig = {
  slug: "dice-roller",
  name: "Dice Roller Simulator",
  description: "Roll custom dice sets (D4, D6, D8, D12, D20) with animated 3D roll effect and history log.",
  category: "creator",
  icon: "🎲",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "Which dice can I roll?", a: "D4, D6, D8, D10, D12 and D20, and several of each at once, for example 2d6 for board games or 1d20 for tabletop RPGs." },
      { q: "Are the rolls random?", a: "Yes. Every face has an equal chance of coming up on each roll, and each roll is independent of the ones before." },
      { q: "Does it add up the total?", a: "Yes. Each roll shows every die and the total, and the history keeps your recent rolls." },
      { q: "What does 2d6 mean?", a: "Roll two six-sided dice and add them. The total ranges from 2 to 12, and 7 is the most likely result." },
      { q: "Is it free?", a: "Yes, with no sign-up. Rolls happen in your browser." },
    ],
    title: "Dice Roller – Roll D4, D6, D8, D10, D12 and D20 Online",
    description: "Roll virtual dice for board games and tabletop RPGs: D4, D6, D8, D10, D12 and D20, several at once, with totals and a history of rolls.",
    keywords: [
      "dice roller",
      "online dice roller",
      "D20 dice roller",
      "RPG dice simulator",
      "roll dice online",
      "virtual dice",
      "tabletop RPG dice",
      "board game dice",
      "D&D dice roller",
      "random dice"
    ],
    openGraph: {
      title: "Dice Roller Simulator - Roll D4, D6, D8, D12, D20 Online",
      description: "Fast, animated dice roller for tabletop RPGs, board games, and probability demonstrations. Roll multiple dice with history tracking.",
      type: "website",
      url: "/tools/dice-roller"
    }
  },
  features: [
    "Roll D4, D6, D8, D10, D12, and D20 dice",
    "Smooth 300-700ms roll animations",
    "Customizable animation speed (fast, normal, slow)",
    "Roll history tracking (last 20 rolls)",
    "Copy results to clipboard",
    "Export roll history as JSON",
    "Keyboard shortcut (Spacebar to roll)",
    "Responsive design for all devices",
    "Local storage persistence"
  ]
};

export const diceRollerConfig = toolConfig;
