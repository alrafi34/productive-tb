export const GOOGLE_FONTS = [
  "Inter",
  "Roboto",
  "Poppins",
  "Playfair Display",
  "Lato",
  "Open Sans",
  "Montserrat",
  "Raleway",
  "Source Sans Pro",
  "Nunito",
  "Work Sans",
  "Oswald",
  "Merriweather",
  "Bebas Neue",
  "Quicksand",
  "Dosis",
  "Cabin",
  "Crimson Text",
  "Cormorant Garamond",
  "Libre Baskerville",
  "Inconsolata",
  "IBM Plex Mono",
  "JetBrains Mono",
  "Fira Code",
  "Space Mono",
  "Courier Prime",
  "Bitter",
  "Lora",
  "Slabo 27px",
  "Abril Fatface",
];

export const FONT_WEIGHTS = [300, 400, 500, 600, 700];

export const POPULAR_PAIRS = [
  { heading: "Playfair Display", body: "Inter" },
  { heading: "Montserrat", body: "Open Sans" },
  { heading: "Bebas Neue", body: "Roboto" },
  { heading: "Raleway", body: "Lato" },
  { heading: "Merriweather", body: "Source Sans Pro" },
];

const fontCache = new Set<string>();

export function loadFont(fontName: string): void {
  if (fontCache.has(fontName)) return;

  const fontParam = fontName.replace(/\s+/g, "+");
  const link = document.createElement("link");
  link.href = `https://fonts.googleapis.com/css2?family=${fontParam}:wght@300;400;500;600;700&display=swap`;
  link.rel = "stylesheet";
  document.head.appendChild(link);
  fontCache.add(fontName);
}

export function getRandomFont(): string {
  return GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)];
}

export function getRandomPair(): { heading: string; body: string } {
  return {
    heading: getRandomFont(),
    body: getRandomFont(),
  };
}

export function generateGoogleFontsLink(fonts: string[]): string {
  const uniqueFonts = [...new Set(fonts)];
  const fontParams = uniqueFonts.map(f => f.replace(/\s+/g, "+")).join("&family=");
  return `<link href="https://fonts.googleapis.com/css2?family=${fontParams}:wght@300;400;500;600;700&display=swap" rel="stylesheet">`;
}

export function generateCSSSnippet(headingFont: string, bodyFont: string, headingWeight: number, bodyWeight: number): string {
  return `/* Heading Font */
font-family: '${headingFont}', serif;
font-weight: ${headingWeight};

/* Body Font */
font-family: '${bodyFont}', sans-serif;
font-weight: ${bodyWeight};`;
}

export function saveFavoritePair(heading: string, body: string): void {
  const favorites = JSON.parse(localStorage.getItem("fontPairerFavorites") || "[]");
  const pair = { heading, body };
  if (!favorites.some((p: any) => p.heading === heading && p.body === body)) {
    favorites.push(pair);
    localStorage.setItem("fontPairerFavorites", JSON.stringify(favorites));
  }
}

export function getFavoritePairs(): Array<{ heading: string; body: string }> {
  return JSON.parse(localStorage.getItem("fontPairerFavorites") || "[]");
}

export function removeFavoritePair(heading: string, body: string): void {
  const favorites = JSON.parse(localStorage.getItem("fontPairerFavorites") || "[]");
  const filtered = favorites.filter((p: any) => !(p.heading === heading && p.body === body));
  localStorage.setItem("fontPairerFavorites", JSON.stringify(filtered));
}

export function isFavoritePair(heading: string, body: string): boolean {
  const favorites = getFavoritePairs();
  return favorites.some(p => p.heading === heading && p.body === body);
}
