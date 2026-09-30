import { siteConfig } from "@/config/site";

export const hexToRgbaConverterConfig = {
  slug: "hex-to-rgba-converter",
  name: "HEX to RGBA Converter",
  description: "Add transparency to a HEX color: get rgba(), 8-digit HEX and Android #AARRGGBB, preview it on white and black, and see the solid color it produces.",
  category: "design",
  icon: "🎨",
  free: true,
  backend: false,
  seo: {
    title: "HEX to RGBA Converter – Opacity, 8-Digit HEX & Alpha Chart",
    description: "Turn a HEX color into rgba() with an opacity slider. Get 8-digit HEX, Android #AARRGGBB, a preview on white and black, and an alpha-to-hex chart.",
    keywords: [
      "hex to rgba",
      "hex to rgba converter",
      "hex opacity",
      "8 digit hex color",
      "hex with alpha",
      "hex transparency chart",
      "rgba to hex",
      "android color alpha",
      "css opacity color",
      "transparent hex color",
    ],
    og: {
      title: "HEX to RGBA Converter – Opacity, 8-Digit HEX & Alpha Chart",
      description: "Turn a HEX color into rgba() with an opacity slider. Get 8-digit HEX, Android #AARRGGBB, a preview on white and black, and an alpha-to-hex chart.",
      url: `${siteConfig.url}/tools/design/hex-to-rgba-converter`,
    },
    howToSteps: [
      { name: "Enter a HEX color", text: "Type a HEX code (#3498DB), pick one with the color picker, or paste an 8-digit code such as #3498DB80 to load its transparency." },
      { name: "Set the opacity", text: "Drag the alpha slider from 0 (fully transparent) to 1 (fully opaque); every output updates as you drag." },
      { name: "Check it on light and dark", text: "The previews show the color over white, black and a checkerboard, with the solid color it produces on each background." },
      { name: "Copy the format you need", text: "Copy rgba(), the modern rgb( / %) syntax, 8-digit HEX for CSS, #AARRGGBB for Android, HSLA, or the solid equivalent." },
    ],
    faq: [
      { q: "How do I convert HEX to RGBA?", a: "Convert the HEX code to RGB and add the alpha as a fourth value from 0 to 1. #3498DB is rgb(52, 152, 219), so at 50% opacity it is rgba(52, 152, 219, 0.5)." },
      { q: "How do I add opacity to a HEX color?", a: "Append two hex digits for the alpha: alpha × 255, converted to hex. 50% is 128 = 80, so #3498DB at 50% is #3498DB80. Common values: 100% FF, 75% BF, 50% 80, 25% 40, 10% 1A. All current browsers support 8-digit HEX in CSS." },
      { q: "Why does Android use #AARRGGBB instead of #RRGGBBAA?", a: "Android color resources and .NET put the alpha first, while CSS puts it last. The same 50% blue is #803498DB in an Android colors.xml file and #3498DB80 in CSS, so copy the format that matches your platform." },
      { q: "What is the difference between rgba() and opacity in CSS?", a: "rgba() makes only that color transparent, for example a background, while the opacity property fades the whole element, including its text and children. Use rgba() for see-through backgrounds with solid text." },
      { q: "What solid color does a transparent color look like?", a: "On a solid background each channel becomes alpha × color + (1 − alpha) × background. rgba(52, 152, 219, 0.5) over white looks like #9ACCED and over black like #1A4C6E. Use the solid equivalent when a tool or email client does not support transparency." },
      { q: "Is rgba() still needed in modern CSS?", a: "No, but it still works everywhere. In current CSS, rgb() accepts alpha too, written rgb(52 152 219 / 50%), and rgba() is kept as an alias of rgb()." },
    ],
  },
};
