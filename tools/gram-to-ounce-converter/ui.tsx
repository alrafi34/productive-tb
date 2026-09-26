"use client";

import UnitConverter from "@/components/UnitConverter";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function GramToOunceConverterUI() {
  return (
    <div className="max-w-4xl mx-auto">
      <UnitConverter
        from={{ symbol: "g", name: "Grams" }}
        to={{ symbol: "oz", name: "Ounces" }}
        factor={1 / 28.349523125}
        factorLabel="0.035274"
        initial={100}
        quickValues={[25, 50, 100, 250, 454, 500]}
        chart={[1, 5, 10, 25, 50, 100, 125, 150, 200, 250, 300, 400, 454, 500, 750, 1000]}
        decimals={3}
      />
      <RelatedStrip />
      <ToolSEOContent />
      <div className="mt-12">
        <RelatedTools />
      </div>
    </div>
  );
}
