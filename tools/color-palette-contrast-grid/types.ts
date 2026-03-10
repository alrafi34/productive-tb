export interface PaletteColor {
  id: string;
  hex: string;
  name?: string;
}

export interface ContrastResult {
  textColor: string;
  backgroundColor: string;
  ratio: number;
  wcagLevel: 'AAA' | 'AA' | 'AA Large' | 'Fail';
  normalTextPass: boolean;
  largeTextPass: boolean;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: PaletteColor[];
}

export interface ContrastGridState {
  palette: PaletteColor[];
  previewText: string;
  textSize: 'normal' | 'large';
  sortBy: 'highest' | 'lowest' | 'accessible' | 'fail';
  filterBy: 'all' | 'aaa' | 'aa' | 'accessible' | 'fail';
  selectedPair: ContrastResult | null;
}