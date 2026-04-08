export const PLATFORM_LIMITS = {
  twitter: 280,
  linkedin: 3000,
  instagram: 2200,
  facebook: 63206,
};

export type Platform = 'twitter' | 'linkedin' | 'instagram' | 'facebook';

export interface PreviewData {
  text: string;
  charCount: number;
  remaining: number;
  isOverLimit: boolean;
  platform: Platform;
}

export function getPreviewData(text: string, platform: Platform): PreviewData {
  const limit = PLATFORM_LIMITS[platform];
  const charCount = text.length;
  const remaining = limit - charCount;

  return {
    text,
    charCount,
    remaining,
    isOverLimit: charCount > limit,
    platform,
  };
}

export function extractHashtags(text: string): string[] {
  const regex = /#[\w]+/g;
  const matches = text.match(regex);
  return matches ? [...new Set(matches)] : [];
}

export function extractMentions(text: string): string[] {
  const regex = /@[\w]+/g;
  const matches = text.match(regex);
  return matches ? [...new Set(matches)] : [];
}

export function extractUrls(text: string): string[] {
  const regex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(regex);
  return matches ? [...new Set(matches)] : [];
}

export function getCharacterCountColor(remaining: number, limit: number): string {
  if (remaining < 0) return "text-red-600";
  if (remaining < limit * 0.1) return "text-orange-500";
  return "text-green-600";
}

export function getProgressBarColor(charCount: number, limit: number): string {
  const percentage = (charCount / limit) * 100;
  if (percentage > 100) return "bg-red-500";
  if (percentage > 90) return "bg-orange-500";
  return "bg-primary";
}

export function getPlatformLabel(platform: Platform): string {
  const labels: Record<Platform, string> = {
    twitter: "𝕏 Twitter",
    linkedin: "in LinkedIn",
    instagram: "📷 Instagram",
    facebook: "f Facebook",
  };
  return labels[platform];
}
