export interface ConversionResult {
  success: boolean;
  output?: string;
  error?: string;
  position?: number;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  position?: number;
}

// Simple YAML parser - handles basic YAML structures
function parseYAML(yaml: string): any {
  const lines = yaml.split('\n');
  const root: any = {};
  const stack: any[] = [{ obj: root, indent: -1 }];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();

    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = line.length - trimmed.length;
    const match = trimmed.match(/^([^:]+):\s*(.*?)$/);

    if (!match) {
      if (trimmed.startsWith('-')) {
        const parent = stack[stack.length - 1];
        if (!Array.isArray(parent.obj)) {
          const lastKey = Object.keys(parent.obj).pop();
          if (lastKey && !Array.isArray(parent.obj[lastKey])) {
            parent.obj[lastKey] = [];
          }
        }
        const itemStr = trimmed.slice(1).trim();
        const itemMatch = itemStr.match(/^([^:]+):\s*(.*?)$/);
        if (itemMatch) {
          const item: any = {};
          item[itemMatch[1]] = parseValue(itemMatch[2]);
          if (Array.isArray(parent.obj)) {
            parent.obj.push(item);
          } else {
            const lastKey = Object.keys(parent.obj).pop();
            if (lastKey) {
              parent.obj[lastKey].push(item);
            }
          }
        } else {
          if (Array.isArray(parent.obj)) {
            parent.obj.push(parseValue(itemStr));
          } else {
            const lastKey = Object.keys(parent.obj).pop();
            if (lastKey) {
              parent.obj[lastKey].push(parseValue(itemStr));
            }
          }
        }
      }
      continue;
    }

    const key = match[1].trim();
    const value = match[2].trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];

    if (value === '' || value === '[]' || value === '{}') {
      const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
      const nextIndent = nextLine.length - nextLine.trimStart().length;

      if (value === '[]' || (nextLine.trimStart().startsWith('-') && nextIndent > indent)) {
        parent.obj[key] = [];
        stack.push({ obj: parent.obj[key], indent, key });
      } else if (value === '{}' || (nextIndent > indent && !nextLine.trimStart().startsWith('-'))) {
        parent.obj[key] = {};
        stack.push({ obj: parent.obj[key], indent, key });
      } else {
        parent.obj[key] = null;
      }
    } else {
      parent.obj[key] = parseValue(value);
    }
  }

  return root;
}

function parseValue(value: string): any {
  if (value === 'null' || value === '~') return null;
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === '') return null;

  const num = Number(value);
  if (!isNaN(num) && value.trim() !== '') return num;

  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  return value;
}

export function validateYAML(yaml: string): ValidationResult {
  if (!yaml.trim()) {
    return { valid: true };
  }

  try {
    parseYAML(yaml);
    return { valid: true };
  } catch (error: any) {
    return {
      valid: false,
      error: error.message || 'Invalid YAML syntax',
      position: error.position || 0,
    };
  }
}

export function convertYAMLToJSON(yaml: string, indentSize: number | 'tab' = 2): ConversionResult {
  try {
    const parsed = parseYAML(yaml);
    const indent = indentSize === 'tab' ? '\t' : ' '.repeat(indentSize as number);
    const json = JSON.stringify(parsed, null, indent);
    return { success: true, output: json };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Conversion failed',
    };
  }
}

export function minifyJSON(json: string): ConversionResult {
  try {
    const parsed = JSON.parse(json);
    return { success: true, output: JSON.stringify(parsed) };
  } catch (error: any) {
    return { success: false, error: 'Invalid JSON' };
  }
}

export function downloadJSON(content: string, filename: string) {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getErrorContext(yaml: string, position: number) {
  const lines = yaml.split('\n');
  let currentPos = 0;
  for (let i = 0; i < lines.length; i++) {
    const lineLength = lines[i].length + 1;
    if (currentPos + lineLength > position) {
      return {
        line: i + 1,
        column: position - currentPos + 1,
      };
    }
    currentPos += lineLength;
  }
  return { line: 1, column: 1 };
}
