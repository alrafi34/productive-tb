export function removeExtraSpaces(text: string): string {
  return text.replace(/[ \t]+/g, ' ').replace(/^ +| +$/gm, '');
}

export function fixLineBreaks(text: string): string {
  return text.replace(/\n{3,}/g, '\n\n').replace(/([^\n])\n([^\n])/g, '$1 $2');
}

export function trimEmptyLines(text: string): string {
  return text.split('\n').filter(line => line.trim()).join('\n');
}

export function formatParagraphs(text: string, options?: { wrapLength?: number }): string {
  let formatted = removeExtraSpaces(text);
  formatted = formatted.replace(/\n{2,}/g, '\n\n');
  
  if (options?.wrapLength) {
    const paragraphs = formatted.split('\n\n');
    formatted = paragraphs.map(para => {
      const words = para.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      
      words.forEach(word => {
        if ((currentLine + ' ' + word).length <= options.wrapLength!) {
          currentLine += (currentLine ? ' ' : '') + word;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) lines.push(currentLine);
      return lines.join('\n');
    }).join('\n\n');
  }
  
  return formatted;
}

export function autoFormat(text: string): string {
  let result = removeExtraSpaces(text);
  result = result.replace(/\n{3,}/g, '\n\n');
  result = result.replace(/([.!?])\s*\n\s*([a-z])/g, '$1 $2');
  return result.trim();
}
