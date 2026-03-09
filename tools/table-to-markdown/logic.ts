import { TableData, ConversionOptions, ConversionResult, DelimiterType, ColumnAlignment } from './types';

export function parseTableData(input: string, delimiter: DelimiterType = 'auto'): TableData {
  if (!input.trim()) {
    return { headers: [], rows: [] };
  }

  const lines = input.trim().split('\n').filter(line => line.trim());
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  let detectedDelimiter = delimiter;
  if (delimiter === 'auto') {
    detectedDelimiter = detectDelimiter(lines[0]);
  }

  const allRows = lines.map(line => splitByDelimiter(line, detectedDelimiter));
  const maxColumns = Math.max(...allRows.map(row => row.length));
  const normalizedRows = allRows.map(row => {
    while (row.length < maxColumns) {
      row.push('');
    }
    return row;
  });

  return {
    headers: normalizedRows[0] || [],
    rows: normalizedRows.slice(1)
  };
}

function detectDelimiter(line: string): DelimiterType {
  const tabCount = (line.match(/\t/g) || []).length;
  const commaCount = (line.match(/,/g) || []).length;
  const pipeCount = (line.match(/\|/g) || []).length;

  if (tabCount > 0) return 'tab';
  if (pipeCount > 1) return 'pipe';
  if (commaCount > 0) return 'comma';
  return 'space';
}

function splitByDelimiter(line: string, delimiter: DelimiterType): string[] {
  let parts: string[];

  switch (delimiter) {
    case 'tab':
      parts = line.split('\t');
      break;
    case 'comma':
      parts = parseCSVLine(line);
      break;
    case 'pipe':
      parts = line.split('|').filter(p => p.trim());
      break;
    case 'space':
      parts = line.split(/\s{2,}/).filter(p => p.trim());
      break;
    default:
      parts = line.split('\t');
  }

  return parts.map(p => p.trim());
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

export function convertToMarkdown(tableData: TableData, options: ConversionOptions): ConversionResult {
  if (!tableData.headers.length && !tableData.rows.length) {
    return { markdown: '', html: '', rowCount: 0, columnCount: 0 };
  }

  let headers: string[];
  let rows: string[][];

  if (options.headerMode === 'custom' && options.customHeaders.length > 0) {
    headers = options.customHeaders;
    rows = [tableData.headers, ...tableData.rows];
  } else if (options.headerMode === 'no-header') {
    headers = tableData.headers.map((_, i) => `Column ${i + 1}`);
    rows = [tableData.headers, ...tableData.rows];
  } else {
    headers = tableData.headers;
    rows = tableData.rows;
  }

  const columnCount = headers.length;

  while (options.columnAlignments.length < columnCount) {
    options.columnAlignments.push('left');
  }

  if (options.escapeSpecialChars) {
    headers = headers.map(h => escapeMarkdown(h));
    rows = rows.map(row => row.map(cell => escapeMarkdown(cell)));
  }

  if (options.wrapInBackticks) {
    headers = headers.map(h => `\`${h}\``);
    rows = rows.map(row => row.map(cell => `\`${cell}\``));
  }

  let columnWidths: number[] = [];
  if (options.prettyFormat) {
    columnWidths = calculateColumnWidths(headers, rows);
  }

  let markdown = '';

  markdown += '|';
  headers.forEach((header, i) => {
    const content = options.prettyFormat ? padCell(header, columnWidths[i]) : ` ${header} `;
    markdown += content + '|';
  });
  markdown += '\n';

  markdown += '|';
  headers.forEach((_, i) => {
    const alignment = options.columnAlignments[i] || 'left';
    const separator = createSeparator(alignment, options.prettyFormat ? columnWidths[i] : 3);
    markdown += separator + '|';
  });
  markdown += '\n';

  rows.forEach(row => {
    markdown += '|';
    row.forEach((cell, i) => {
      const content = options.prettyFormat ? padCell(cell, columnWidths[i]) : ` ${cell} `;
      markdown += content + '|';
    });
    markdown += '\n';
  });

  const html = markdownTableToHtml(headers, rows, options.columnAlignments);

  return {
    markdown: markdown.trim(),
    html,
    rowCount: rows.length,
    columnCount
  };
}

function calculateColumnWidths(headers: string[], rows: string[][]): number[] {
  const widths = headers.map(h => h.length);

  rows.forEach(row => {
    row.forEach((cell, i) => {
      if (i < widths.length) {
        widths[i] = Math.max(widths[i], cell.length);
      }
    });
  });

  return widths.map(w => w + 2);
}

function padCell(content: string, width: number): string {
  const padding = width - content.length;
  const leftPad = Math.floor(padding / 2);
  const rightPad = padding - leftPad;
  return ' '.repeat(leftPad) + content + ' '.repeat(rightPad);
}

function createSeparator(alignment: ColumnAlignment, width: number): string {
  const dashes = '-'.repeat(Math.max(3, width - 2));
  
  switch (alignment) {
    case 'left':
      return `:${dashes} `;
    case 'center':
      return `:${dashes}:`;
    case 'right':
      return ` ${dashes}:`;
    default:
      return ` ${dashes} `;
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/([\\`*_{}[\]()#+\-.!|])/g, '\\$1');
}

function markdownTableToHtml(headers: string[], rows: string[][], alignments: ColumnAlignment[]): string {
  let html = '<table class="border-collapse border border-gray-300">';
  
  html += '<thead><tr>';
  headers.forEach((header, i) => {
    const align = alignments[i] || 'left';
    html += `<th class="border border-gray-300 px-4 py-2 bg-gray-100" style="text-align: ${align}">${header}</th>`;
  });
  html += '</tr></thead>';

  html += '<tbody>';
  rows.forEach(row => {
    html += '<tr>';
    row.forEach((cell, i) => {
      const align = alignments[i] || 'left';
      html += `<td class="border border-gray-300 px-4 py-2" style="text-align: ${align}">${cell}</td>`;
    });
    html += '</tr>';
  });
  html += '</tbody>';

  html += '</table>';
  return html;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
}

export function downloadAsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
