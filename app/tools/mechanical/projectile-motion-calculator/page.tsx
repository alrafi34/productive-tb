import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ProjectileMotionCalculatorUI from "@/tools/projectile-motion-calculator/ui";
import { toolConfig } from "@/tools/projectile-motion-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Projectile+Motion+Calculator", width: 1200, height: 630, alt: "Projectile Motion Calculator" }],
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    images: ["/og?title=Projectile+Motion+Calculator"],
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function ProjectileMotionCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
    >
      <ProjectileMotionCalculatorUI />
    </ToolLayout>
  );
}
