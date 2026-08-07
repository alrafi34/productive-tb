import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RoomLightingCalculatorUI from "@/tools/room-lighting-calculator/ui";
import { roomLightingCalculatorConfig } from "@/tools/room-lighting-calculator/config";

export const metadata: Metadata = {
  title: roomLightingCalculatorConfig.seo.title,
  description: roomLightingCalculatorConfig.seo.description,
  keywords: roomLightingCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Room+Lighting+Calculator", width: 1200, height: 630, alt: "Room Lighting Calculator" }],
    title: roomLightingCalculatorConfig.seo.og.title,
    description: roomLightingCalculatorConfig.seo.og.description,
    type: "website",
    url: roomLightingCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: roomLightingCalculatorConfig.seo.og.title,
    description: roomLightingCalculatorConfig.seo.og.description,
    images: ["/og?title=Room+Lighting+Calculator"],
  },
  alternates: {
    canonical: roomLightingCalculatorConfig.seo.og.url,
  },
};

export default function RoomLightingCalculatorPage() {
  return (
    <ToolLayout
      title={roomLightingCalculatorConfig.name}
      description={roomLightingCalculatorConfig.description}
      icon={roomLightingCalculatorConfig.icon}
    >
      <RoomLightingCalculatorUI />
    </ToolLayout>
  );
}
