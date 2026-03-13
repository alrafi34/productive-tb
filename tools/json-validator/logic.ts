export function validateJSON(input: string): { valid: boolean; error?: string; position?: number } {
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

export function formatJSON(input: string, spaces: number = 2): { success: boolean; output?: string; error?: string } {
  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, spaces);
    return { success: true, output: formatted };
  } catch (error) {
    return {
      success: false,
      error: error instanceof SyntaxError ? error.message : String(error)
    };
  }
}

export function minifyJSON(input: string): { success: boolean; output?: string; error?: string } {
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

export function analyzeJSON(input: string): {
  characterCount: number;
  lineCount: number;
  size: string;
  depth: number;
  keyCount: number;
} {
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

export function saveToHistory(json: string): void {
  try {
    const history = JSON.parse(localStorage.getItem("jsonValidatorHistory") || "[]");
    const entry = {
      json: json.substring(0, 100),
      timestamp: new Date().toISOString(),
      fullJson: json
    };

    history.unshift(entry);
    if (history.length > 10) {
      history.pop();
    }

    localStorage.setItem("jsonValidatorHistory", JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save to history:", error);
  }
}

export function getHistory(): Array<{ json: string; timestamp: string; fullJson: string }> {
  try {
    return JSON.parse(localStorage.getItem("jsonValidatorHistory") || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem("jsonValidatorHistory");
}
