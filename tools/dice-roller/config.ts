export const toolConfig = {
  slug: "dice-roller",
  name: "Dice Roller Simulator",
  description: "Roll custom dice sets (D4, D6, D8, D12, D20) with animated 3D roll effect and history log.",
  category: "creator",
  icon: "🎲",
  free: true,
  backend: false,
  seo: {
    title: "Dice Roller Simulator – Roll D4, D6, D8, D12, D20 Dice Online | Productive Toolbox",
    description: "Roll virtual dice instantly with animated effects. Supports D4, D6, D8, D10, D12, and D20 dice with history tracking and totals. Perfect for tabletop RPGs and board games.",
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
