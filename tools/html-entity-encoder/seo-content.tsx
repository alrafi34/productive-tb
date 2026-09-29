import ToolFaq from "@/components/ToolFaq";
import { htmlEntityEncoderConfig } from "./config";

// [character, named, decimal, hex, description]
const COMMON: [string, string, string, string, string][] = [
  ["&", "&amp;", "&#38;", "&#x26;", "Ampersand (must be escaped)"],
  ["<", "&lt;", "&#60;", "&#x3C;", "Less-than sign (must be escaped)"],
  [">", "&gt;", "&#62;", "&#x3E;", "Greater-than sign"],
  ['"', "&quot;", "&#34;", "&#x22;", "Double quote (in attributes)"],
  ["'", "&#39;", "&#39;", "&#x27;", "Apostrophe (&apos; in HTML5)"],
  [" ", "&nbsp;", "&#160;", "&#xA0;", "Non-breaking space"],
  ["©", "&copy;", "&#169;", "&#xA9;", "Copyright sign"],
  ["®", "&reg;", "&#174;", "&#xAE;", "Registered trademark"],
  ["™", "&trade;", "&#8482;", "&#x2122;", "Trademark"],
  ["€", "&euro;", "&#8364;", "&#x20AC;", "Euro sign"],
  ["£", "&pound;", "&#163;", "&#xA3;", "Pound sign"],
  ["¥", "&yen;", "&#165;", "&#xA5;", "Yen sign"],
  ["¢", "&cent;", "&#162;", "&#xA2;", "Cent sign"],
  ["°", "&deg;", "&#176;", "&#xB0;", "Degree sign"],
  ["±", "&plusmn;", "&#177;", "&#xB1;", "Plus-minus"],
  ["×", "&times;", "&#215;", "&#xD7;", "Multiplication sign"],
  ["÷", "&divide;", "&#247;", "&#xF7;", "Division sign"],
  ["½", "&frac12;", "&#189;", "&#xBD;", "One half"],
  ["–", "&ndash;", "&#8211;", "&#x2013;", "En dash (ranges: 9–5)"],
  ["—", "&mdash;", "&#8212;", "&#x2014;", "Em dash"],
  ["…", "&hellip;", "&#8230;", "&#x2026;", "Ellipsis"],
  ["“ ”", "&ldquo; &rdquo;", "&#8220; &#8221;", "&#x201C; &#x201D;", "Curly double quotes"],
  ["‘ ’", "&lsquo; &rsquo;", "&#8216; &#8217;", "&#x2018; &#x2019;", "Curly single quotes"],
  ["«  »", "&laquo; &raquo;", "&#171; &#187;", "&#xAB; &#xBB;", "Guillemets (French, German quotes)"],
  ["•", "&bull;", "&#8226;", "&#x2022;", "Bullet"],
  ["→", "&rarr;", "&#8594;", "&#x2192;", "Right arrow"],
  ["≤ ≥", "&le; &ge;", "&#8804; &#8805;", "&#x2264; &#x2265;", "Less / greater than or equal"],
  ["é", "&eacute;", "&#233;", "&#xE9;", "e with acute accent"],
  ["ü", "&uuml;", "&#252;", "&#xFC;", "u with umlaut"],
  ["ñ", "&ntilde;", "&#241;", "&#xF1;", "n with tilde"],
  ["ß", "&szlig;", "&#223;", "&#xDF;", "German sharp s"],
  ["😀", "—", "&#128512;", "&#x1F600;", "Emoji (numeric references only)"],
];

export default function HTMLEntityEncoderSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = htmlEntityEncoderConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>What HTML Entities Are and When to Use Them</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>A browser reads <code>&lt;</code> as the start of a tag and <code>&amp;</code> as the start of an entity, so those characters cannot appear as plain text in HTML. An <strong>HTML entity</strong> writes such a character as a code the browser displays but never treats as markup.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>Named:&nbsp;&nbsp;&nbsp;&amp;name;&nbsp;&nbsp;&nbsp;&nbsp;&amp;lt; &amp;eacute; &amp;euro;</p>
            <p>Decimal: &amp;#number;&nbsp;&nbsp;&nbsp;&amp;#60; &amp;#233; &amp;#8364;</p>
            <p>Hex:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&amp;#xhex;&nbsp;&nbsp;&nbsp;&nbsp;&amp;#x3C; &amp;#xE9; &amp;#x20AC;</p>
          </div>
          <p>The number in a numeric reference is the character&apos;s Unicode code point, so every character, including emoji, has one. Only about 2,200 characters have a name, and names are case-sensitive: <code>&amp;Eacute;</code> is É and <code>&amp;eacute;</code> is é.</p>
          <p>On a modern page saved as UTF-8, you only need to escape <code>&amp;</code> and <code>&lt;</code> in text, plus the quote character that wraps an attribute value. Typing é, € or — directly is fine and easier to read; entities for them are for older systems, some email templates, and places where the source must stay plain ASCII.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Common HTML Entities Chart</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Char</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Named</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Decimal</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Hex</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {COMMON.map(([ch, named, dec, hex, desc]) => (
                <tr key={named + dec} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 text-gray-900">{ch === " " ? "(space)" : ch}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700">{named}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700">{dec}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700">{hex}</td>
                  <td className="py-1.5 px-3 text-xs text-gray-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Escaping in Practice</h2>
        <ul className="space-y-3 text-gray-600 leading-relaxed list-disc pl-5">
          <li><strong>Showing code on a page:</strong> <code>&lt;div class=&quot;box&quot;&gt;</code> must be written as <code>&amp;lt;div class=&amp;quot;box&amp;quot;&amp;gt;</code> inside a <code>&lt;pre&gt;</code> or <code>&lt;code&gt;</code> block, or the browser will render an actual div.</li>
          <li><strong>Attribute values:</strong> in <code>title=&quot;Say &amp;quot;hi&amp;quot;&quot;</code> the inner quotes must be escaped, or they end the attribute early.</li>
          <li><strong>Double escaping:</strong> text that shows <code>&amp;amp;</code> or <code>&amp;lt;</code> on screen was escaped twice, often once by a CMS and once by a template. Decode it one level at a time here to find where it happened.</li>
          <li><strong>Security:</strong> escaping stops user text from being read as HTML, but JavaScript, URLs and CSS need their own escaping. Frameworks such as React, Vue and Django escape text for you; avoid bypasses like <code>dangerouslySetInnerHTML</code> for user input.</li>
        </ul>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the HTML Entity Encoder</h2>
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
