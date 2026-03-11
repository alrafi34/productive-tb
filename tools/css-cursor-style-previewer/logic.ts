import { CursorType, CustomCursor, InteractiveElement } from './types';

export const cursorTypes: CursorType[] = [
  // Basic cursors
  {
    name: 'auto',
    value: 'auto',
    description: 'Browser determines cursor based on context',
    category: 'basic',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Default behavior, let browser decide'
  },
  {
    name: 'default',
    value: 'default',
    description: 'Default arrow cursor',
    category: 'basic',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Standard arrow pointer'
  },
  {
    name: 'none',
    value: 'none',
    description: 'No cursor visible',
    category: 'special',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Hide cursor completely'
  },
  
  // Interactive cursors
  {
    name: 'pointer',
    value: 'pointer',
    description: 'Hand pointer for clickable elements',
    category: 'interactive',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Links, buttons, clickable elements'
  },
  {
    name: 'help',
    value: 'help',
    description: 'Question mark or help cursor',
    category: 'interactive',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Help tooltips, info icons'
  },
  {
    name: 'context-menu',
    value: 'context-menu',
    description: 'Context menu available cursor',
    category: 'interactive',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Right-click menu areas'
  },
  {
    name: 'progress',
    value: 'progress',
    description: 'Background process running',
    category: 'interactive',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Loading states, background tasks'
  },
  {
    name: 'wait',
    value: 'wait',
    description: 'System busy, wait cursor',
    category: 'interactive',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Loading screens, system busy'
  },
  
  // Text cursors
  {
    name: 'text',
    value: 'text',
    description: 'I-beam cursor for text selection',
    category: 'text',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Text inputs, editable content'
  },
  {
    name: 'vertical-text',
    value: 'vertical-text',
    description: 'Vertical text selection cursor',
    category: 'text',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Vertical text editing'
  },
  
  // Drag cursors
  {
    name: 'grab',
    value: 'grab',
    description: 'Open hand for grabbable elements',
    category: 'drag',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Draggable elements, maps'
  },
  {
    name: 'grabbing',
    value: 'grabbing',
    description: 'Closed hand while dragging',
    category: 'drag',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Active dragging state'
  },
  {
    name: 'move',
    value: 'move',
    description: 'Four-way arrow for moving',
    category: 'drag',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Moveable elements, drag handles'
  },
  {
    name: 'copy',
    value: 'copy',
    description: 'Copy operation cursor',
    category: 'drag',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Copy/duplicate operations'
  },
  {
    name: 'alias',
    value: 'alias',
    description: 'Alias/shortcut creation cursor',
    category: 'drag',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Creating shortcuts or aliases'
  },
  
  // Resize cursors
  {
    name: 'col-resize',
    value: 'col-resize',
    description: 'Column resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Table column resizing'
  },
  {
    name: 'row-resize',
    value: 'row-resize',
    description: 'Row resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Table row resizing'
  },
  {
    name: 'n-resize',
    value: 'n-resize',
    description: 'North resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Resize from top edge'
  },
  {
    name: 'e-resize',
    value: 'e-resize',
    description: 'East resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Resize from right edge'
  },
  {
    name: 's-resize',
    value: 's-resize',
    description: 'South resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Resize from bottom edge'
  },
  {
    name: 'w-resize',
    value: 'w-resize',
    description: 'West resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Resize from left edge'
  },
  {
    name: 'ne-resize',
    value: 'ne-resize',
    description: 'Northeast resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Resize from top-right corner'
  },
  {
    name: 'nw-resize',
    value: 'nw-resize',
    description: 'Northwest resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Resize from top-left corner'
  },
  {
    name: 'se-resize',
    value: 'se-resize',
    description: 'Southeast resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Resize from bottom-right corner'
  },
  {
    name: 'sw-resize',
    value: 'sw-resize',
    description: 'Southwest resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Resize from bottom-left corner'
  },
  {
    name: 'ew-resize',
    value: 'ew-resize',
    description: 'East-west resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Horizontal resizing'
  },
  {
    name: 'ns-resize',
    value: 'ns-resize',
    description: 'North-south resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Vertical resizing'
  },
  {
    name: 'nesw-resize',
    value: 'nesw-resize',
    description: 'Northeast-southwest resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Diagonal resizing'
  },
  {
    name: 'nwse-resize',
    value: 'nwse-resize',
    description: 'Northwest-southeast resize cursor',
    category: 'resize',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Diagonal resizing'
  },
  
  // Zoom cursors
  {
    name: 'zoom-in',
    value: 'zoom-in',
    description: 'Zoom in cursor',
    category: 'zoom',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Zoom in functionality'
  },
  {
    name: 'zoom-out',
    value: 'zoom-out',
    description: 'Zoom out cursor',
    category: 'zoom',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Zoom out functionality'
  },
  
  // Special cursors
  {
    name: 'crosshair',
    value: 'crosshair',
    description: 'Crosshair cursor for precise selection',
    category: 'special',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Drawing tools, precise selection'
  },
  {
    name: 'cell',
    value: 'cell',
    description: 'Cell selection cursor',
    category: 'special',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Spreadsheet cell selection'
  },
  {
    name: 'all-scroll',
    value: 'all-scroll',
    description: 'All-direction scroll cursor',
    category: 'special',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Pan/scroll in all directions'
  },
  {
    name: 'no-drop',
    value: 'no-drop',
    description: 'Invalid drop target cursor',
    category: 'special',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Invalid drop zones'
  },
  {
    name: 'not-allowed',
    value: 'not-allowed',
    description: 'Action not allowed cursor',
    category: 'special',
    compatibility: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    useCase: 'Disabled elements, forbidden actions'
  }
];

export const interactiveElements: InteractiveElement[] = [
  {
    id: 'button',
    type: 'button',
    label: 'Click Me',
    defaultCursor: 'pointer'
  },
  {
    id: 'input',
    type: 'input',
    label: 'Type here...',
    defaultCursor: 'text'
  },
  {
    id: 'link',
    type: 'link',
    label: 'Visit Link',
    defaultCursor: 'pointer'
  },
  {
    id: 'draggable',
    type: 'draggable',
    label: 'Drag Me',
    defaultCursor: 'grab'
  },
  {
    id: 'resizable',
    type: 'resizable',
    label: 'Resize Box',
    defaultCursor: 'nw-resize'
  },
  {
    id: 'text',
    type: 'text',
    label: 'Select this text content',
    defaultCursor: 'text'
  }
];

export const filterCursors = (cursors: CursorType[], query: string): CursorType[] => {
  if (!query.trim()) return cursors;
  
  const searchTerm = query.toLowerCase();
  return cursors.filter(cursor => 
    cursor.name.toLowerCase().includes(searchTerm) ||
    cursor.description.toLowerCase().includes(searchTerm) ||
    cursor.category.toLowerCase().includes(searchTerm) ||
    cursor.useCase.toLowerCase().includes(searchTerm)
  );
};

export const getCursorsByCategory = (cursors: CursorType[]) => {
  const categories = cursors.reduce((acc, cursor) => {
    if (!acc[cursor.category]) {
      acc[cursor.category] = [];
    }
    acc[cursor.category].push(cursor);
    return acc;
  }, {} as Record<string, CursorType[]>);
  
  return categories;
};

export const generateCursorCSS = (cursorValue: string, customCursor?: CustomCursor): string => {
  if (customCursor) {
    return `cursor: url('${customCursor.url}') ${customCursor.hotspotX} ${customCursor.hotspotY}, ${customCursor.fallback};`;
  }
  return `cursor: ${cursorValue};`;
};

export const generateCursorRule = (selector: string, cursorValue: string, customCursor?: CustomCursor): string => {
  const cursorCSS = generateCursorCSS(cursorValue, customCursor);
  return `${selector} {\n  ${cursorCSS}\n}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
};

export const createCustomCursor = (file: File): Promise<CustomCursor> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      resolve({
        name: file.name,
        url,
        hotspotX: 0,
        hotspotY: 0,
        fallback: 'auto'
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const validateCursorFile = (file: File): boolean => {
  const validTypes = ['image/png', 'image/svg+xml', 'image/x-icon'];
  const maxSize = 2 * 1024 * 1024; // 2MB
  
  return validTypes.includes(file.type) && file.size <= maxSize;
};

export const getCategoryColor = (category: string): string => {
  const colors = {
    basic: 'bg-blue-100 text-blue-800',
    interactive: 'bg-green-100 text-green-800',
    text: 'bg-purple-100 text-purple-800',
    drag: 'bg-orange-100 text-orange-800',
    resize: 'bg-red-100 text-red-800',
    zoom: 'bg-yellow-100 text-yellow-800',
    special: 'bg-gray-100 text-gray-800'
  };
  return colors[category as keyof typeof colors] || colors.basic;
};