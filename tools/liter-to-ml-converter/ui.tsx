"use client";

import UnitConverter, { formatNumber } from "@/components/UnitConverter";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function LiterToMlConverterUI() {
  return (
    <div className="max-w-4xl mx-auto">
      <UnitConverter
        from={{ symbol: "L", name: "Liters" }}
        to={{ symbol: "mL", name: "Milliliters" }}
        factor={1000}
        factorLabel="1,000"
        initial={1}
        quickValues={[0.25, 0.5, 1, 1.5, 2, 5]}
        chart={[0.1, 0.2, 0.25, 0.33, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5, 10]}
        decimals={4}
      extra={(liters) => {
        const ml = liters * 1000;
        return (
          <p>
            = <strong>{formatNumber(ml / 236.5882365, 2)}</strong> US cups · <strong>{formatNumber(ml / 29.5735295625, 2)}</strong> US fl oz ·{" "}
            <strong>{formatNumber(ml / 28.4130625, 2)}</strong> UK fl oz
          </p>
        );
      }}
      />
      <RelatedStrip />
      <ToolSEOContent />
      <div className="mt-12">
        <RelatedTools />
      </div>
    </div>
  );
}
