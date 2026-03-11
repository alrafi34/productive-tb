export interface CursorType {
  name: string;
  value: string;
  description: string;
  category: 'basic' | 'interactive' | 'resize' | 'drag' | 'zoom' | 'text' | 'special';
  compatibility: string[];
  useCase: string;
}

export interface CustomCursor {
  name: string;
  url: string;
  hotspotX: number;
  hotspotY: number;
  fallback: string;
}

export interface CursorPreviewState {
  selectedCursor: string;
  searchQuery: string;
  filteredCursors: CursorType[];
  customCursors: CustomCursor[];
  showCompatibility: boolean;
  previewScale: number;
}

export interface InteractiveElement {
  id: string;
  type: 'button' | 'input' | 'link' | 'draggable' | 'resizable' | 'text';
  label: string;
  defaultCursor: string;
}