import ToolFaq from "@/components/ToolFaq";
import { textToSlugConverterConfig } from "./config";

const EXAMPLES: [string, string, string][] = [
  ["10 Best Coffee Grinders of 2026", "10-best-coffee-grinders-of-2026", "10-best-coffee-grinders-2026"],
  ["How to Make Cold Brew at Home", "how-to-make-cold-brew-at-home", "how-make-cold-brew-home"],
  ["Café Crème vs. Latte: What's the Difference?", "cafe-creme-vs-latte-whats-the-difference", "cafe-creme-vs-latte-whats-difference"],
  ["Straße & Autobahn: Driving in Germany", "strasse-and-autobahn-driving-in-germany", "strasse-autobahn-driving-germany"],
  ["Q&A: Remote Work in 2026", "q-and-a-remote-work-in-2026", "q-remote-work-2026"],
];

export default function TextToSlugConverterSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = textToSlugConverterConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>What Makes a Good URL Slug</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>A <strong>slug</strong> is the readable part of a URL that identifies a page: in <code>example.com/blog/cold-brew-guide</code> it is <code>cold-brew-guide</code>. People see it in search results, links and the address bar, so it should say what the page is about in a few plain words.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>Title:&nbsp;&nbsp;&nbsp;Café Crème &amp; Cold Brew: A Beginner&apos;s Guide</p>
            <p>Slug:&nbsp;&nbsp;&nbsp;&nbsp;cafe-creme-and-cold-brew-a-beginners-guide</p>
            <p>Shorter: cafe-creme-cold-brew-beginners-guide</p>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Lowercase only.</strong> Paths can be case-sensitive on the server, so <code>/Cold-Brew</code> and <code>/cold-brew</code> may be two different pages.</li>
            <li><strong>Hyphens between words.</strong> Google recommends hyphens over underscores, which join words together.</li>
            <li><strong>Plain letters and numbers.</strong> Spaces, quotes and symbols are percent-encoded in links (<code>%20</code>, <code>%26</code>) and look broken when shared.</li>
            <li><strong>Short and stable.</strong> Leave out dates and words that will go out of date, such as &ldquo;2026&rdquo; in an evergreen guide, so the URL never has to change.</li>
          </ul>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Title to Slug Examples</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Title</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Slug</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Without stop words</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {EXAMPLES.map(([title, slug, short]) => (
                <tr key={title} className="hover:bg-gray-50 align-top">
                  <td className="py-1.5 px-3 text-xs text-gray-900">{title}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700 break-all">{slug}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700 break-all">{short}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">Stop words removed here: a, an, the, of, to, in, for, on, at, by, with, from, as, is, was, are, be, and, or, but.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Slugs in WordPress, Shopify and Other CMSs</h2>
        <div className="space-y-3 text-gray-600 leading-relaxed">
          <p>Most platforms create a slug from the title automatically, but they keep every word, so long titles give long URLs. WordPress shows the slug as the <em>Permalink</em> or <em>URL</em> field in the post settings; Shopify calls it the <em>URL handle</em> under search engine listing; Ghost, Webflow and Squarespace have a similar URL or slug field.</p>
          <p>Edit the slug before you publish. Changing it later creates a new address, so set up a 301 redirect from the old URL, which WordPress and Shopify can do automatically when you tick the redirect option.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Slug Generator</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <ToolFaq items={faq} />
    </>
  );
}
