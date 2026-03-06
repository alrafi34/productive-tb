import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";

import { toolConfig as wordCounterConfig } from "@/tools/word-counter/config";
import WordCounterUI from "@/tools/word-counter/ui";

const TOOLS = [
  { config: wordCounterConfig, Component: WordCounterUI },
];

export async function generateMetadata(
  { params }: { params: Promise<{ tool: string }> }
): Promise<Metadata> {
  const { tool: slug } = await params;
  const entry = TOOLS.find(t => t.config.slug === slug);
  if (!entry) return {};
  return { title: entry.config.seo.title, description: entry.config.seo.description };
}

export default async function ToolPage(
  { params }: { params: Promise<{ tool: string }> }
) {
  const { tool: slug } = await params;
  const entry = TOOLS.find(t => t.config.slug === slug);
  if (!entry) notFound();
  const { config, Component } = entry;
  return (
    <ToolLayout title={config.name} description={config.description} icon={config.icon}>
      <Component />
    </ToolLayout>
  );
}
