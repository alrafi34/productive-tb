import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RoomLightingCalculatorUI from "@/tools/room-lighting-calculator/ui";
import { roomLightingCalculatorConfig } from "@/tools/room-lighting-calculator/config";

export const metadata: Metadata = {
  title: roomLightingCalculatorConfig.seo.title,
  description: roomLightingCalculatorConfig.seo.description,
  keywords: roomLightingCalculatorConfig.seo.keywords,
  openGraph: {
    title: roomLightingCalculatorConfig.seo.og.title,
    description: roomLightingCalculatorConfig.seo.og.description,
    type: "website",
    url: roomLightingCalculatorConfig.seo.og.url,
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
