export const ventilationCalculatorConfig = {
  name: "Ventilation Calculator",
  slug: "ventilation-calculator",
  category: "architecture",
  description: "Calculate required airflow (CFM, m³/h, L/s) for proper ventilation in rooms and buildings. Essential for HVAC design and air quality planning.",
  icon: "💨",
  color: "#058554",
  featured: false,
  keywords: [
    "ventilation calculator",
    "CFM calculator",
    "airflow calculator",
    "ACH calculator",
    "HVAC calculator",
    "air changes per hour",
    "ventilation requirements",
    "air quality calculator",
    "room ventilation",
    "building ventilation"
  ],
  seo: {
    title: "Ventilation Calculator – CFM, m³/h & L/s",
    description: "Work out the airflow a room needs from air changes per hour or from occupancy, in CFM, m³/h or L/s, with presets for homes, offices, kitchens and more.",
    keywords: "ventilation calculator, CFM calculator, airflow calculator, ACH calculator, HVAC calculator, air changes per hour",
    og: {
      title: "Ventilation Calculator – Free HVAC Airflow Tool",
      description: "Calculate required airflow for proper ventilation instantly with multiple unit support.",
      type: "website",
      url: "/tools/architecture/ventilation-calculator"
    },
    howToSteps: [
      { name: "Choose the method", text: "Pick room volume with air changes per hour, or occupancy with airflow per person." },
      { name: "Enter the room or people", text: "Type the room length, width and height, or the number of people." },
      { name: "Set the rate", text: "Enter the air changes per hour or L/s per person, or use a room preset." },
      { name: "Choose the output unit", text: "Select CFM, m³/h or L/s and read the required airflow." },
    ],
    faq: [
      { q: "How do I calculate ventilation from air changes per hour?", a: "CFM = room volume in cu ft × ACH ÷ 60. A 12 × 15 × 8 ft room (1,440 cu ft) at 6 ACH needs 144 CFM, which is 245 m³/h or 68 L/s." },
      { q: "How much fresh air does each person need?", a: "ASHRAE 62.1 asks for 5 CFM (2.5 L/s) per person plus 0.06 CFM per sq ft for offices. European standard EN 16798-1 suggests about 7–10 L/s per person for good indoor air." },
      { q: "How many air changes does a room need?", a: "Guidelines vary by use: homes about 0.35–1 ACH of fresh air (ASHRAE 62.2 sets a whole-house minimum), offices 4–6, kitchens 8–15 when cooking, bathrooms 6–10, workshops and laboratories 6–12 or more." },
      { q: "How do I convert CFM to m³/h and L/s?", a: "1 CFM = 1.699 m³/h = 0.472 L/s. 100 CFM is 170 m³/h or 47.2 L/s." },
      { q: "Which method should I use?", a: "Occupancy for offices, classrooms and meeting rooms, where people are the main pollution source; air changes for kitchens, bathrooms, workshops and rooms with fumes or moisture. For design, check both and use the larger." },
    ],
  },
  relatedTools: [
    "hvac-load-calculator",
    "room-volume-calculator",
    "air-quality-calculator"
  ]
};
