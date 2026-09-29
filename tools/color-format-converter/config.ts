import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "color-format-converter",
  name: "Color Format Converter",
  description: "Convert any color between HEX, RGB, RGBA, HSL, HSLA, HSV and CMYK, from a code, a CSS color name or a color picker.",
  category: "design",
  icon: "🎨",
  seo: {
    title: "Color Converter – HEX, RGB, HSL, HSV & CMYK",
    description: "Convert colors between HEX, RGB, HSL, HSV and CMYK instantly. Paste #F53, rgba(), hsl() or a CSS name like tomato; includes 8-digit HEX with alpha.",
    keywords: [
      "color converter",
      "hex to rgb",
      "rgb to hex",
      "hex to hsl",
      "rgb to cmyk",
      "hsl to hex",
      "color code converter",
      "hex to rgba",
      "cmyk to hex",
      "hsv to hex",
    ],
    og: {
      title: "Color Converter – HEX, RGB, HSL, HSV & CMYK",
      description: "Convert colors between HEX, RGB, HSL, HSV and CMYK instantly. Paste #F53, rgba(), hsl() or a CSS name like tomato; includes 8-digit HEX with alpha.",
      url: `${siteConfig.url}/tools/design/color-format-converter`,
    },
    howToSteps: [
      { name: "Enter a color", text: "Type or paste a HEX code (#F53 or #FF5733), rgb() or rgba(), hsl() or hsla(), cmyk() or a CSS color name, or pick one with the color picker." },
      { name: "Fine-tune it", text: "Adjust the red, green and blue sliders and the opacity; every format updates at once." },
      { name: "Copy the format you need", text: "Copy HEX, 8-digit HEX with alpha, RGB, RGBA, HSL, HSLA, HSV/HSB or CMYK, or copy all formats together." },
      { name: "Reuse recent colors", text: "Click a swatch in Recent Colors to bring back a color you converted earlier." },
    ],
    faq: [
      { q: "How do I convert HEX to RGB?", a: "Split the six-digit code into three pairs and convert each pair from base 16 to base 10. For #FF5733: FF = 255, 57 = 87 and 33 = 51, so the color is rgb(255, 87, 51). A three-digit code doubles each digit: #F53 is #FF5533." },
      { q: "What is the difference between RGB and HSL?", a: "Both describe the same colors on screen. RGB mixes red, green and blue light from 0 to 255. HSL describes hue (0–360° around the color wheel), saturation and lightness as percentages, which makes it easier to create lighter, darker or less saturated versions of a color by changing one number." },
      { q: "What is HSV or HSB?", a: "Hue, saturation and value (or brightness), the model used by color pickers in Photoshop, Figma and most design apps. It shares the hue with HSL but measures brightness differently: pure red is hsl(0, 100%, 50%) but HSV 0°, 100%, 100%." },
      { q: "How do I add transparency to a HEX color?", a: "Add two more hex digits for the alpha channel: #RRGGBBAA. 80 is about 50% opacity, so #FF573380 is the same as rgba(255, 87, 51, 0.5). All modern browsers support 8-digit HEX in CSS." },
      { q: "Is the RGB to CMYK conversion exact?", a: "No. CMYK values depend on the printer, paper and ink, so professional printing uses an ICC color profile. This tool uses the standard device-independent formula, which is fine for a starting point, but ask your printer for their profile before printing brand colors." },
      { q: "Which CSS color formats can I paste?", a: "3, 4, 6 and 8-digit HEX with or without #, rgb() and rgba() with commas or spaces and an optional / alpha, hsl() and hsla() with or without deg, cmyk() on a 0–100 or 0–1 scale, and any of the 148 CSS color names such as tomato or rebeccapurple." },
    ],
  },
};
