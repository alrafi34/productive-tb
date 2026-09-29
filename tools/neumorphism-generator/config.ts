import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "neumorphism-generator",
  name: "Neumorphism Generator",
  description: "Design soft UI (neumorphism) cards and buttons with a live preview and copy the CSS box-shadow for raised or pressed elements.",
  category: "design",
  icon: "🔘",
  seo: {
    title: "Neumorphism Generator – Soft UI CSS Box Shadow",
    description: "Create neumorphic (soft UI) cards and buttons and copy the CSS: two box-shadows, one lighter and one darker than the background, raised or pressed.",
    keywords: [
      "neumorphism generator",
      "neumorphism css",
      "soft ui generator",
      "neumorphic button",
      "neumorphism box shadow",
      "neumorphic design",
      "soft ui css",
      "inset box shadow",
      "neumorphism dark mode",
    ],
    og: {
      title: "Neumorphism Generator – Soft UI CSS Box Shadow",
      description: "Create neumorphic (soft UI) cards and buttons and copy the CSS: two box-shadows, one lighter and one darker than the background, raised or pressed.",
      url: `${siteConfig.url}/tools/design/neumorphism-generator`,
    },
    howToSteps: [
      { name: "Pick the background color", text: "Choose the color of the page behind the element; neumorphism only works when the element and its background are the same color." },
      { name: "Shape the shadow", text: "Set the distance, blur and intensity of the shadows, the corner radius, and the direction the light comes from." },
      { name: "Choose raised or pressed", text: "Raised puts the shadows outside so the element seems to rise from the surface; pressed uses inset shadows so it looks pushed in." },
      { name: "Copy the CSS", text: "Copy the background, border-radius and box-shadow rules into your stylesheet, or start from a preset such as a card, a button or an input field." },
    ],
    faq: [
      { q: "What is neumorphism?", a: "A soft UI style that became popular on Dribbble around 2019–2020. Elements look extruded from, or pressed into, the background, because they share its color and are lit by two shadows: a light one on the side facing the light source and a dark one on the opposite side." },
      { q: "How is neumorphism made in CSS?", a: "With two box-shadows on an element that has the same background color as its parent. For a #e0e0e0 background: box-shadow: -8px -8px 16px #ffffff, 8px 8px 16px #b3b3b3. The first shadow is lighter than the background, the second darker; adding inset to both makes the pressed version." },
      { q: "How are the shadow colors calculated?", a: "Each red, green and blue value of the background is raised or lowered by the intensity percentage. At 20% intensity, #e0e0e0 (224) gives #ffffff for the light shadow (capped at 255) and #b3b3b3 (179) for the dark shadow." },
      { q: "Is neumorphism accessible?", a: "Often not. Its low contrast makes buttons hard to tell apart from the background, and WCAG 2.1 asks for a contrast of at least 3:1 for the visual boundaries of controls. Add a visible border, an icon, a colored state or a stronger text color to key actions, and don't rely on shadow alone to show that something is pressed." },
      { q: "Does neumorphism work in dark mode?", a: "Yes, but the effect is subtler because there is less room to go darker. Use a dark gray rather than black (for example #2d2d2d), and turn on dark mode here so the dark shadow is deepened more than the light one." },
      { q: "Why does the effect disappear on a white background?", a: "A pure white background cannot have a lighter shadow, so only the dark half shows. Use an off-white such as #e0e0e0 or #f0f0f0 so both the highlight and the shadow are visible." },
    ],
  },
};
