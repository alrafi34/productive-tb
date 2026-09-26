/* A tool page's FAQ, rendered from the same list as its FAQPage schema
   (config.seo.faq) so the visible questions and the markup always match. */
export default function ToolFaq({ items }: { items: readonly { q: string; a: string }[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {items.map(({ q, a }, i) => (
          <div key={q} className={i < items.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
            <p className="text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
