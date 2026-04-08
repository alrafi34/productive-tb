export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
}

export interface TimelineConfig {
  layout: "horizontal" | "vertical";
  nodeColor: string;
  lineColor: string;
  spacing: number;
  autoSort: boolean;
}

export const DEFAULT_CONFIG: TimelineConfig = {
  layout: "horizontal",
  nodeColor: "#2563eb",
  lineColor: "#d1d5db",
  spacing: 60,
  autoSort: true,
};

export function sortEventsByDate(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function validateEvent(event: Partial<TimelineEvent>): boolean {
  return !!(event.title?.trim() && event.date);
}

export function generateTimelineHTML(
  events: TimelineEvent[],
  config: TimelineConfig
): string {
  if (events.length === 0) return "<p>No events added yet</p>";

  const sorted = config.autoSort ? sortEventsByDate(events) : events;
  const isHorizontal = config.layout === "horizontal";

  let html = `<div class="timeline-container ${config.layout}">`;
  html += `<div class="timeline-line" style="background-color: ${config.lineColor}"></div>`;
  html += `<div class="timeline-events">`;

  sorted.forEach((event, index) => {
    html += `
      <div class="timeline-event" style="--spacing: ${config.spacing}px">
        <div class="timeline-node" style="background-color: ${config.nodeColor}"></div>
        <div class="timeline-content">
          <div class="timeline-date">${new Date(event.date).toLocaleDateString()}</div>
          <div class="timeline-title">${escapeHtml(event.title)}</div>
          ${event.description ? `<div class="timeline-description">${escapeHtml(event.description)}</div>` : ""}
        </div>
      </div>
    `;
  });

  html += `</div></div>`;
  return html;
}

export function generateTimelineCSS(config: TimelineConfig): string {
  const isHorizontal = config.layout === "horizontal";

  return `
    .timeline-container {
      position: relative;
      padding: 40px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .timeline-container.horizontal {
      display: flex;
      align-items: center;
      gap: 0;
    }

    .timeline-container.vertical {
      display: block;
    }

    .timeline-line {
      position: absolute;
      ${isHorizontal ? `
        top: 50%;
        left: 0;
        right: 0;
        height: 2px;
        transform: translateY(-50%);
      ` : `
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        transform: translateX(-50%);
      `}
    }

    .timeline-events {
      position: relative;
      display: flex;
      ${isHorizontal ? "flex-direction: row; gap: var(--spacing);" : "flex-direction: column; gap: var(--spacing);"}
    }

    .timeline-event {
      position: relative;
      display: flex;
      ${isHorizontal ? "flex-direction: column; align-items: center;" : "flex-direction: row; align-items: flex-start;"}
      flex: 1;
    }

    .timeline-node {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 0 2px #333;
      z-index: 10;
      flex-shrink: 0;
      ${isHorizontal ? "margin-bottom: 20px;" : "margin-right: 20px;"}
    }

    .timeline-content {
      text-align: ${isHorizontal ? "center" : "left"};
      ${isHorizontal ? "width: 100%;" : "flex: 1;"}
    }

    .timeline-date {
      font-size: 12px;
      color: #666;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .timeline-title {
      font-size: 14px;
      font-weight: 700;
      color: #333;
      margin-bottom: 4px;
    }

    .timeline-description {
      font-size: 12px;
      color: #666;
      line-height: 1.4;
    }
  `;
}

export function exportTimelineAsImage(
  svgString: string,
  filename: string = "timeline.png"
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error("Document not available"));
      return;
    }
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          link.click();
          URL.revokeObjectURL(url);
          resolve();
        } else {
          reject(new Error("Failed to create blob"));
        }
      }, "image/png");
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = "data:image/svg+xml;base64," + btoa(svgString);
  });
}

export function copyTimelineToClipboard(svgString: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error("Document not available"));
      return;
    }
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          navigator.clipboard
            .write([new ClipboardItem({ "image/png": blob })])
            .then(resolve)
            .catch(reject);
        } else {
          reject(new Error("Failed to create blob"));
        }
      }, "image/png");
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = "data:image/svg+xml;base64," + btoa(svgString);
  });
}

export function exportAsJSON(events: TimelineEvent[], config: TimelineConfig): string {
  return JSON.stringify({ events, config }, null, 2);
}

export function importFromJSON(jsonString: string): { events: TimelineEvent[]; config: TimelineConfig } | null {
  try {
    const data = JSON.parse(jsonString);
    if (Array.isArray(data.events) && data.config) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export function generateSVGTimeline(
  events: TimelineEvent[],
  config: TimelineConfig,
  width: number = 1200,
  height: number = 400
): string {
  if (events.length === 0) return `<svg width="${width}" height="${height}"></svg>`;

  const sorted = config.autoSort ? sortEventsByDate(events) : events;
  const isHorizontal = config.layout === "horizontal";
  const padding = 60;
  const nodeRadius = 8;

  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="white"/>`;

  if (isHorizontal) {
    const contentHeight = height - padding * 2;
    const centerY = height / 2;
    const eventSpacing = (width - padding * 2) / Math.max(sorted.length - 1, 1);

    svg += `<line x1="${padding}" y1="${centerY}" x2="${width - padding}" y2="${centerY}" stroke="${config.lineColor}" stroke-width="2"/>`;

    sorted.forEach((event, index) => {
      const x = padding + index * eventSpacing;
      const y = centerY;

      svg += `<circle cx="${x}" cy="${y}" r="${nodeRadius}" fill="${config.nodeColor}" stroke="white" stroke-width="2"/>`;

      const textY = y + 40;
      const dateStr = new Date(event.date).toLocaleDateString();

      svg += `<text x="${x}" y="${textY}" text-anchor="middle" font-size="12" font-weight="600" fill="#666">${dateStr}</text>`;
      svg += `<text x="${x}" y="${textY + 18}" text-anchor="middle" font-size="14" font-weight="700" fill="#333">${escapeHtml(event.title)}</text>`;

      if (event.description) {
        const descLines = event.description.split("\n").slice(0, 2);
        descLines.forEach((line, i) => {
          svg += `<text x="${x}" y="${textY + 36 + i * 14}" text-anchor="middle" font-size="11" fill="#666">${escapeHtml(line.substring(0, 30))}</text>`;
        });
      }
    });
  } else {
    const contentWidth = width - padding * 2;
    const centerX = width / 2;
    const eventSpacing = (height - padding * 2) / Math.max(sorted.length - 1, 1);

    svg += `<line x1="${centerX}" y1="${padding}" x2="${centerX}" y2="${height - padding}" stroke="${config.lineColor}" stroke-width="2"/>`;

    sorted.forEach((event, index) => {
      const x = centerX;
      const y = padding + index * eventSpacing;
      const isLeft = index % 2 === 0;
      const textX = isLeft ? x - 30 : x + 30;
      const textAnchor = isLeft ? "end" : "start";

      svg += `<circle cx="${x}" cy="${y}" r="${nodeRadius}" fill="${config.nodeColor}" stroke="white" stroke-width="2"/>`;

      const dateStr = new Date(event.date).toLocaleDateString();
      svg += `<text x="${textX}" y="${y - 10}" text-anchor="${textAnchor}" font-size="12" font-weight="600" fill="#666">${dateStr}</text>`;
      svg += `<text x="${textX}" y="${y + 8}" text-anchor="${textAnchor}" font-size="14" font-weight="700" fill="#333">${escapeHtml(event.title)}</text>`;

      if (event.description) {
        const descLines = event.description.split("\n").slice(0, 2);
        descLines.forEach((line, i) => {
          svg += `<text x="${textX}" y="${y + 26 + i * 14}" text-anchor="${textAnchor}" font-size="11" fill="#666">${escapeHtml(line.substring(0, 30))}</text>`;
        });
      }
    });
  }

  svg += `</svg>`;
  return svg;
}
