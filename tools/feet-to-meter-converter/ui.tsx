"use client";

import UnitConverter from "@/components/UnitConverter";
import HeightConverter from "./HeightConverter";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function FeetToMeterConverterUI() {
  return (
    <div className="max-w-4xl mx-auto">
      <UnitConverter
        from={{ symbol: "ft", name: "Feet" }}
        to={{ symbol: "m", name: "Meters" }}
        factor={0.3048}
        factorLabel="0.3048"
        initial={6}
        quickValues={[1, 3, 5, 6, 10, 100]}
        chart={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 100, 500, 1000, 5280]}
        decimals={4}
      />
      <HeightConverter />
      <RelatedStrip />
      <ToolSEOContent />
      <div className="mt-12">
        <RelatedTools />
      </div>
    </div>
  );
}
