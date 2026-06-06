export default function AITokenCostCalculatorSEO() {
  return (
    <section className="mt-16 space-y-10 text-sm text-gray-600 leading-relaxed">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How the AI Token Cost Calculator Works</h2>
        <p>
          This tool estimates the cost of using large language model (LLM) APIs based on token consumption.
          All major AI providers — OpenAI, Anthropic, Google, Meta, and Mistral — charge per million tokens
          processed. This calculator converts your token usage into dollar amounts instantly using their published rates.
        </p>
        <p className="mt-3">
          Tokens are not the same as words. A token is roughly 4 characters or ¾ of a word in English.
          100 tokens ≈ 75 words. Most LLM APIs charge input (prompt) tokens and output (completion) tokens at
          different rates, with output tokens typically costing 2–5× more.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Formula</h2>
        <pre className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto">
{`Input Cost  = (Input Tokens  ÷ 1,000,000) × Input Price per 1M
Output Cost = (Output Tokens ÷ 1,000,000) × Output Price per 1M
Total Cost  = Input Cost + Output Cost

Per-timeframe cost:
  Daily Cost   = Total Cost per call × Requests per day
  Monthly Cost = Daily Cost × 30
  Yearly Cost  = Daily Cost × 365

Example: GPT-4o Mini, 2,000 input + 500 output per request, 1,000 req/month
  Input:  (2000 ÷ 1,000,000) × $0.15 × 1000 = $0.30
  Output: (500  ÷ 1,000,000) × $0.60 × 1000 = $0.30
  Total:  $0.60 / month`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Model Pricing Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Model</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Provider</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Input /1M</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Output /1M</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["GPT-4o Mini",       "OpenAI",    "$0.15",  "$0.60"],
                ["GPT-4.1 Mini",      "OpenAI",    "$0.40",  "$1.60"],
                ["GPT-4o",            "OpenAI",    "$2.50",  "$10.00"],
                ["Claude Haiku 3.5",  "Anthropic", "$0.80",  "$4.00"],
                ["Claude Sonnet 4",   "Anthropic", "$3.00",  "$15.00"],
                ["Gemini 2.5 Flash",  "Google",    "$0.30",  "$2.50"],
                ["Gemini 2.5 Pro",    "Google",    "$1.25",  "$10.00"],
                ["Llama 3.1 8B",      "Meta/3rd",  "$0.05",  "$0.05"],
                ["Mistral Small",     "Mistral",   "$0.20",  "$0.60"],
              ].map(([model, provider, input, output]) => (
                <tr key={model} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 font-medium text-gray-800">{model}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-600">{provider}</td>
                  <td className="px-4 py-2.5 border border-gray-200 font-mono">{input}</td>
                  <td className="px-4 py-2.5 border border-gray-200 font-mono">{output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-400">Prices shown are approximate and subject to change. Always verify with the official provider pricing page.</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is a Token?</h2>
        <p>
          Tokens are the basic units that LLMs use to process text. In English, one token is approximately 4 characters
          or ¾ of a word. The exact tokenization depends on the model's vocabulary (BPE, SentencePiece, etc.).
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li>1,000 tokens ≈ 750 words ≈ ~1.5 pages of text</li>
          <li>A typical chatbot prompt: 200–500 tokens</li>
          <li>A document summary task: 2,000–50,000 tokens</li>
          <li>A full codebase analysis: 100,000+ tokens</li>
          <li>GPT-4o context window: 128,000 tokens</li>
          <li>Gemini 1.5 Pro context window: 2,097,152 tokens</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "How accurate are these cost estimates?",
              a: "The estimates are based on publicly available pricing from each provider as of mid-2025. Actual costs may vary due to pricing changes, volume discounts, caching, or batch API rates. Always verify with the official provider dashboard.",
            },
            {
              q: "What is the difference between input and output tokens?",
              a: "Input tokens (also called prompt tokens) are the tokens you send to the model — your system prompt, conversation history, and user message. Output tokens (completion tokens) are generated by the model in its response. Output tokens typically cost more because generation is computationally intensive.",
            },
            {
              q: "How do I estimate tokens for my use case?",
              a: "A quick rule of thumb: 1 token ≈ 4 characters. For English text, divide word count by 0.75. For code, tokens per character are often lower. OpenAI's Tokenizer tool and the Tiktoken library can give exact counts.",
            },
            {
              q: "Which model is cheapest for a chatbot?",
              a: "For most chatbot use cases, GPT-4o Mini, Gemini 2.5 Flash, Claude Haiku, or Llama 3.1 8B (via Groq) offer the best price-to-performance ratio. Use the comparison tab to see side-by-side costs for your exact token usage.",
            },
            {
              q: "Does caching reduce token costs?",
              a: "Yes. OpenAI's prompt caching and Anthropic's cache-control feature allow repeated prompt prefixes to be cached, reducing input token costs by up to 75–90% for matching cached segments.",
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold text-gray-800 mb-1">{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
