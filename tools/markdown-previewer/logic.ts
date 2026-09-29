import { marked, type Token, type Tokens } from 'marked';
import DOMPurify from 'dompurify';
import { MarkdownStats } from './types';

/* GitHub Flavored Markdown (tables, task lists, strikethrough, autolinks),
   parsed by marked, a CommonMark-compliant parser. */
marked.setOptions({ gfm: true, breaks: false });

let hookAdded = false;

/* Markdown → HTML. In the browser the HTML is sanitised with DOMPurify:
   raw HTML in the Markdown is allowed, but scripts, event handlers and
   javascript: links are removed, and links open in a new tab. */
export function parseMarkdown(markdown: string): string {
  const html = marked.parse(markdown, { async: false }) as string;
  if (typeof window === 'undefined') return html;
  if (!hookAdded) {
    DOMPurify.addHook('afterSanitizeAttributes', (node) => {
      if (node.tagName === 'A' && node.getAttribute('href')) {
        node.setAttribute('target', '_blank');
        node.setAttribute('rel', 'noopener noreferrer');
      }
    });
    hookAdded = true;
  }
  return DOMPurify.sanitize(html);
}

/* Counts come from the parsed document, so a "# comment" inside a code
   block is not counted as a heading. */
export function calculateStats(markdown: string): MarkdownStats {
  let headings = 0, links = 0, images = 0, codeBlocks = 0;
  const walk = (tokens: Token[] | undefined) => {
    for (const t of tokens ?? []) {
      if (t.type === 'heading') headings++;
      else if (t.type === 'code') codeBlocks++;
      else if (t.type === 'link') links++;
      else if (t.type === 'image') images++;
      const withChildren = t as Tokens.Generic;
      walk(withChildren.tokens);
      if (t.type === 'list') for (const item of (t as Tokens.List).items) walk(item.tokens);
      if (t.type === 'table') {
        const table = t as Tokens.Table;
        for (const cell of [...table.header, ...table.rows.flat()]) walk(cell.tokens);
      }
    }
  };
  walk(marked.lexer(markdown));
  return {
    characters: markdown.length,
    words: markdown.trim().split(/\s+/).filter(Boolean).length,
    lines: markdown.split('\n').length,
    headings,
    links,
    images,
    codeBlocks,
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

### Links
[Visit Example](https://example.com) or just paste https://example.com

### Tables
| Format | Syntax | Result |
| --- | :---: | ---: |
| Bold | \`**text**\` | **text** |
| Italic | \`*text*\` | *text* |

### Blockquotes
> This is a blockquote
> It can span multiple lines

### Task Lists
- [ ] Todo item
- [x] Completed item

---

**Start typing to see your Markdown rendered in real-time!**
`;
