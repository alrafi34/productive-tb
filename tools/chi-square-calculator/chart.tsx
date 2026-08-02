"use client";

// Cell background color for a contribution heatmap — scales from neutral to primary/red based on magnitude.
export function contributionColor(contribution: number, maxContribution: number): string {
  if (!Number.isFinite(contribution) || maxContribution <= 0) return "transparent";
  const t = Math.min(1, contribution / maxContribution);
  // 0 → very light, 1 → strong red (high contribution = high deviation from expected)
  const alpha = 0.08 + t * 0.55;
  return `rgba(220, 38, 38, ${alpha.toFixed(3)})`;
}

export function residualColor(residual: number): string {
  if (!Number.isFinite(residual)) return "transparent";
  const t = Math.min(1, Math.abs(residual) / 3);
  const alpha = 0.08 + t * 0.5;
  return residual >= 0 ? `rgba(5, 133, 84, ${alpha.toFixed(3)})` : `rgba(220, 38, 38, ${alpha.toFixed(3)})`;
}
