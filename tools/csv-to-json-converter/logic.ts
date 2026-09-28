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

/* Splits CSV text into rows of fields (RFC 4180): quoted fields may contain
   the delimiter, line breaks and doubled quotes (""), and both LF and CRLF
   line endings work. */
function parseRecords(text: string, delimiter: string, handleQuotes: boolean): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let quoted = false; // the current field started with a quote

  const endField = () => {
    row.push(field);
    field = "";
    quoted = false;
  };
  const endRow = () => {
    endField();
    // Skip blank lines
    if (row.length > 1 || row[0] !== "") rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else if (handleQuotes && char === '"' && (field.trim() === "" && !quoted)) {
      inQuotes = true;
      quoted = true;
      field = "";
    } else if (char === delimiter) {
      endField();
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      endRow();
    } else {
      field += char;
    }
  }
  if (field !== "" || row.length) endRow();
  return rows;
}

export function parseCSV(csvText: string, options: Partial<ConversionOptions> = {}): ParseResult {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  if (!csvText || !csvText.trim()) {
    return { success: false, error: "Please paste CSV data or upload a file." };
  }

  try {
    // Excel adds a byte-order mark to UTF-8 CSV files
    const text = csvText.replace(/^\uFEFF/, "");
    const clean = (v: string) => (opts.trimValues ? v.trim() : v);
    const rows = parseRecords(text, opts.delimiter, opts.handleQuotes).map((r) => r.map(clean));

    if (rows.length === 0) {
      return { success: false, error: "No data found in CSV." };
    }

    const width = Math.max(...rows.map((r) => r.length));

    if (!opts.useFirstRowAsHeaders) {
      const data = rows.map((values) => {
        const obj: Record<string, string> = {};
        for (let i = 0; i < width; i++) obj[`column_${i + 1}`] = values[i] ?? "";
        return obj;
      });
      return { success: true, data };
    }

    // Blank or repeated headers get a name of their own so no column is lost
    const seen = new Map<string, number>();
    const headers = Array.from({ length: width }, (_, i) => {
      const base = (rows[0][i] ?? "").trim() || `column_${i + 1}`;
      const n = (seen.get(base) ?? 0) + 1;
      seen.set(base, n);
      return n === 1 ? base : `${base}_${n}`;
    });

    const data = rows.slice(1).map((values) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header] = values[i] ?? "";
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
  const firstLine = csvText.replace(/^\uFEFF/, "").split(/\r?\n/)[0];
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
