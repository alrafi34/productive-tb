export interface AsciiConfig {
  mode: "text" | "image";
  text: string;
  image: string | null;
  density: number;
  width: number;
  charset: string;
  style: "block" | "outline" | "shadow" | "simple" | "terminal";
}

export interface AsciiHistory {
  id: number;
  config: AsciiConfig;
  output: string;
  timestamp: number;
}

export const CHARACTER_SETS: Record<string, string> = {
  standard: "@%#*+=-:. ",
  detailed: "@%#*+=-:.~`'\"",
  minimal: "@#*-. ",
  custom: "@#$%*+=:-. ",
};

export const STYLES: Record<string, string> = {
  block: "@%#*+=-:. ",
  outline: "#*-=+:. ",
  shadow: "@#%*+=-:. ",
  simple: "#*-. ",
  terminal: "@#$%*+=:-. ",
};
