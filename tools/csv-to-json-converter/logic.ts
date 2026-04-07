export interface ParseResult {
  success: boolean;
  data?: any[];
  error?: string;
}

export interface ConversionOptions {
  delimiter: string;
  useFirstRowAsHeaders: boolean;
  trimValues: boolean;
  handleQuotes: boolean;
}

const DEFAULT_OPTIONS: ConversionOptions = {
  delimiter: ",",
  useFirstRowAsHeaders: true,
  trimValues: true,
  handleQuotes: true,
};

function parseCSVLine(line: string, delimiter: string, handleQuotes: boolean): string[] {
  if (!handleQuotes) {
    return line.split(delimiter).map(v => v.trim());
  }

  const result: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === delimiter && !insideQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

export function parseCSV(csvText: string, options: Partial<ConversionOptions> = {}): ParseResult {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  if (!csvText || !csvText.trim()) {
    return { success: false, error: "Please paste CSV data or upload a file." };
  }

  try {
    const lines = csvText.trim().split("\n").filter(line => line.trim());

    if (lines.length === 0) {
      return { success: false, error: "No data found in CSV." };
    }

    const headers = parseCSVLine(lines[0], opts.delimiter, opts.handleQuotes);

    if (!opts.useFirstRowAsHeaders) {
      const data = lines.map((line, idx) => {
        const values = parseCSVLine(line, opts.delimiter, opts.handleQuotes);
        const obj: any = {};
        headers.forEach((_, i) => {
          obj[`column_${i + 1}`] = values[i] || "";
        });
        return obj;
      });
      return { success: true, data };
    }

    const data = lines.slice(1).map((line, idx) => {
      const values = parseCSVLine(line, opts.delimiter, opts.handleQuotes);
      const obj: any = {};

      headers.forEach((header, i) => {
        const key = opts.trimValues ? header.trim() : header;
        obj[key] = values[i] || "";
      });

      return obj;
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error: `Parse error: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}

export function convertToJSON(data: any[], pretty: boolean = true): string {
  try {
    return JSON.stringify(data, null, pretty ? 2 : 0);
  } catch (error) {
    return "";
  }
}

export function downloadJSON(jsonString: string, filename: string = "data.json") {
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function detectDelimiter(csvText: string): string {
  const firstLine = csvText.split("\n")[0];
  const delimiters = [",", ";", "\t", "|"];

  let maxCount = 0;
  let detectedDelimiter = ",";

  for (const delim of delimiters) {
    const count = (firstLine.match(new RegExp(`\\${delim}`, "g")) || []).length;
    if (count > maxCount) {
      maxCount = count;
      detectedDelimiter = delim;
    }
  }

  return detectedDelimiter;
}

export function getTablePreview(data: any[], maxRows: number = 200): any[] {
  return data.slice(0, maxRows);
}

export function getStats(data: any[]): { rows: number; columns: number } {
  return {
    rows: data.length,
    columns: data.length > 0 ? Object.keys(data[0]).length : 0,
  };
}
