import { CopyFormat } from './types';

export async function copyToClipboard(text: string, format: CopyFormat = 'plain'): Promise<boolean> {
  try {
    if (format === 'html') {
      const blob = new Blob([text], { type: 'text/html' });
      const data = [new ClipboardItem({ 'text/html': blob })];
      await navigator.clipboard.write(data);
    } else {
      await navigator.clipboard.writeText(text);
    }
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}

export function addLineNumbers(text: string): string {
  const lines = text.split('\n');
  return lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
}

export function formatAsMarkdown(text: string): string {
  return `\`\`\`\n${text}\n\`\`\``;
}

export function formatAsHTML(text: string): string {
  return `<pre><code>${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
}

export function removeExtraSpaces(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function selectText(element: HTMLTextAreaElement | HTMLDivElement) {
  if (element instanceof HTMLTextAreaElement) {
    element.select();
  } else {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}
