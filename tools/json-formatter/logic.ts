export interface ValidationResult {
  valid: boolean;
  error?: string;
  position?: number;
}

export interface FormatResult {
  success: boolean;
  output?: string;
  error?: string;
}

export interface Analysis {
  characterCount: number;
  lineCount: number;
  size: string;
  depth: number;
  keyCount: number;
}

export interface TreeNode {
  key: string;
  value: any;
  type: "object" | "array" | "string" | "number" | "boolean" | "null";
  children?: TreeNode[];
  expanded?: boolean;
}

export function validateJSON(input: string): ValidationResult {
  if (!input.trim()) {
    return { valid: false, error: "JSON input is empty" };
  }

  try {
    JSON.parse(input);
    return { valid: true };
  } catch (error) {
    const errorMessage = error instanceof SyntaxError ? error.message : String(error);
    const positionMatch = errorMessage.match(/position (\d+)/);
    const position = positionMatch ? parseInt(positionMatch[1]) : undefined;

    return {
      valid: false,
      error: errorMessage,
      position
    };
  }
}

export function formatJSON(input: string, spaces: number | string = 2): FormatResult {
  try {
    const parsed = JSON.parse(input);
    const indent = spaces === "tab" ? "\t" : Number(spaces);
    const formatted = JSON.stringify(parsed, null, indent);
    return { success: true, output: formatted };
  } catch (error) {
    return {
      success: false,
      error: error instanceof SyntaxError ? error.message : String(error)
    };
  }
}

export function minifyJSON(input: string): FormatResult {
  try {
    const parsed = JSON.parse(input);
    const minified = JSON.stringify(parsed);
    return { success: true, output: minified };
  } catch (error) {
    return {
      success: false,
      error: error instanceof SyntaxError ? error.message : String(error)
    };
  }
}

export function analyzeJSON(input: string): Analysis {
  const characterCount = input.length;
  const lineCount = input.split("\n").length;
  const sizeInBytes = new Blob([input]).size;
  const size = sizeInBytes > 1024 ? `${(sizeInBytes / 1024).toFixed(2)} KB` : `${sizeInBytes} B`;

  let depth = 0;
  let maxDepth = 0;
  let keyCount = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "{" || char === "[") {
      depth++;
      maxDepth = Math.max(maxDepth, depth);
    } else if (char === "}" || char === "]") {
      depth--;
    } else if (char === ":") {
      keyCount++;
    }
  }

  return {
    characterCount,
    lineCount,
    size,
    depth: maxDepth,
    keyCount
  };
}

export function buildTree(obj: any, key: string = "root"): TreeNode {
  let type: TreeNode["type"] = "null";
  let children: TreeNode[] = [];

  if (obj === null) {
    type = "null";
  } else if (Array.isArray(obj)) {
    type = "array";
    children = obj.map((item, idx) => buildTree(item, `[${idx}]`));
  } else if (typeof obj === "object") {
    type = "object";
    children = Object.entries(obj).map(([k, v]) => buildTree(v, k));
  } else if (typeof obj === "string") {
    type = "string";
  } else if (typeof obj === "number") {
    type = "number";
  } else if (typeof obj === "boolean") {
    type = "boolean";
  }

  return {
    key,
    value: obj,
    type,
    children: children.length > 0 ? children : undefined,
    expanded: true
  };
}

export function getErrorContext(input: string, position?: number): { line: number; column: number; context: string } {
  if (!position) {
    return { line: 1, column: 1, context: "" };
  }

  const lines = input.substring(0, position).split("\n");
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;
  const contextStart = Math.max(0, position - 20);
  const contextEnd = Math.min(input.length, position + 20);
  const context = input.substring(contextStart, contextEnd);

  return { line, column, context };
}

export function downloadJSON(content: string, filename: string = "data.json"): void {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function syntaxHighlight(json: string): string {
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
    let cls = "number";
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = "key";
      } else {
        cls = "string";
      }
    } else if (/true|false/.test(match)) {
      cls = "boolean";
    } else if (/null/.test(match)) {
      cls = "null";
    }
    return `<span class="json-${cls}">${match}</span>`;
  });
}
