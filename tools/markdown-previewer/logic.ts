import { MarkdownStats } from './types';

export function parseMarkdown(markdown: string): string {
  let html = markdown;

  // Escape HTML
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Headers
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang || 'plaintext'}">${code.trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr />');
  html = html.replace(/^\*\*\*$/gm, '<hr />');

  // Blockquotes
  html = html.replace(/^&gt;\s+(.+)$/gm, '<blockquote>$1</blockquote>');

  // Task lists
  html = html.replace(/^- \[ \]\s+(.+)$/gm, '<label><input type="checkbox" disabled /> $1</label>');
  html = html.replace(/^- \[x\]\s+(.+)$/gm, '<label><input type="checkbox" checked disabled /> $1</label>');

  // Unordered lists
  html = html.replace(/^\*\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/^-\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

  // Paragraphs
  html = html.replace(/^(?!<[hupol]|<blockquote|<pre|<hr)(.+)$/gm, '<p>$1</p>');

  // Line breaks
  html = html.replace(/  \n/g, '<br />');

  return html;
}

export function calculateStats(markdown: string): MarkdownStats {
  return {
    characters: markdown.length,
    words: markdown.trim().split(/\s+/).filter(Boolean).length,
    lines: markdown.split('\n').length,
    headings: (markdown.match(/^#{1,6}\s+/gm) || []).length,
    links: (markdown.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []).length,
    images: (markdown.match(/!\[([^\]]*)\]\(([^)]+)\)/g) || []).length,
    codeBlocks: (markdown.match(/```/g) || []).length / 2,
  };
}

export function downloadFile(content: string, filename: string, type: 'text/markdown' | 'text/html') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export const DEFAULT_MARKDOWN = `# Welcome to Markdown Previewer

## Features
- **Real-time preview**
- *Syntax highlighting*
- ~~Strikethrough text~~
- \`Inline code\`

### Code Blocks
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists
1. First item
2. Second item
3. Third item

- Unordered item
- Another item

### Links & Images
[Visit Example](https://example.com)

### Blockquotes
> This is a blockquote
> It can span multiple lines

### Task Lists
- [ ] Todo item
- [x] Completed item

---

**Start typing to see your Markdown rendered in real-time!**
`;
