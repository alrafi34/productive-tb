export function parseJSON(jsonText: string): { success: boolean; data?: any; error?: string } {
  if (!jsonText.trim()) {
    return { success: false, error: "JSON input is empty" };
  }

  try {
    const data = JSON.parse(jsonText);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof SyntaxError ? error.message : "Invalid JSON" };
  }
}

export function flattenObject(obj: any, parentKey = "", result: any = {}): any {
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      const key = parentKey ? `${parentKey}.${index}` : String(index);
      if (typeof item === "object" && item !== null && !Array.isArray(item)) {
        flattenObject(item, key, result);
      } else if (Array.isArray(item)) {
        flattenObject(item, key, result);
      } else {
        result[key] = item;
      }
    });
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
          flattenObject(obj[key], newKey, result);
        } else if (Array.isArray(obj[key])) {
          flattenObject(obj[key], newKey, result);
        } else {
          result[newKey] = obj[key];
        }
      }
    }
  }
  return result;
}

export function jsonToCSV(
  data: any,
  options: { flatten: boolean; includeHeaders: boolean; delimiter: string }
): { success: boolean; output?: string; error?: string } {
  try {
    let rows: any[] = [];

    if (Array.isArray(data)) {
      rows = data;
    } else if (typeof data === "object" && data !== null) {
      rows = [data];
    } else {
      return { success: false, error: "JSON must be an array or object" };
    }

    if (rows.length === 0) {
      return { success: false, error: "No data to convert" };
    }

    let processedRows = rows;
    if (options.flatten) {
      processedRows = rows.map(row => flattenObject(row));
    }

    const allKeys = new Set<string>();
    processedRows.forEach(row => {
      Object.keys(row).forEach(key => allKeys.add(key));
    });

    const columns = Array.from(allKeys).sort();

    if (columns.length === 0) {
      return { success: false, error: "No columns found in data" };
    }

    let csv = "";

    if (options.includeHeaders) {
      csv += columns.map(col => escapeCSVField(col)).join(options.delimiter) + "\n";
    }

    csv += processedRows
      .map(row =>
        columns
          .map(col => escapeCSVField(String(row[col] ?? "")))
          .join(options.delimiter)
      )
      .join("\n");

    return { success: true, output: csv };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Conversion failed" };
  }
}

export function escapeCSVField(field: string): string {
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

export function saveToHistory(json: string): void {
  try {
    const history = JSON.parse(localStorage.getItem("jsonToCsvHistory") || "[]");
    const entry = {
      json: json.substring(0, 100),
      timestamp: new Date().toISOString(),
      fullJson: json
    };

    history.unshift(entry);
    if (history.length > 10) {
      history.pop();
    }

    localStorage.setItem("jsonToCsvHistory", JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save to history:", error);
  }
}

export function getHistory(): Array<{ json: string; timestamp: string; fullJson: string }> {
  try {
    return JSON.parse(localStorage.getItem("jsonToCsvHistory") || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem("jsonToCsvHistory");
}
