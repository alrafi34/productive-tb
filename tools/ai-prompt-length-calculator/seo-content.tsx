export default function AIPromptLengthCalculatorSEO() {
  return (
    <section className="mt-16 space-y-10 text-sm text-gray-600 leading-relaxed">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How the AI Prompt Length Calculator Works</h2>
        <p>
          This tool analyzes your AI prompt in real time, estimating token count, measuring text statistics,
          and comparing your prompt size against the context windows of popular language models like GPT-4, Claude,
          and Gemini. All processing happens locally in your browser — nothing is sent to any server.
        </p>
        <p className="mt-3">
          Since exact tokenization requires model-specific algorithms (BPE, SentencePiece), this tool uses
          well-calibrated heuristics that are accurate to within 5–10% for most English prompts. Use the
          Code-Heavy or Multilingual modes for better accuracy on those input types.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Token Estimation Methods</h2>
        <pre className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto">
{`Fast Estimate (English prose):
  Tokens ≈ Characters ÷ 4
  Example: 800 chars → ~200 tokens

Accurate Estimate (blended):
  Tokens ≈ (Chars ÷ 4 × 0.75) + (Words × 1.3 × 0.25)

Code-Heavy Estimate:
  Tokens ≈ Characters ÷ 3.2
  (Code has more unique tokens — punctuation, brackets, keywords)

Multilingual Estimate:
  Latin chars: ÷ 4   |   Non-Latin (CJK, Arabic): ÷ 1.5
  (CJK characters each often map to a single token)

Context Usage:
  Usage % = (Token Count ÷ Model Context Window) × 100`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Model Context Windows</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Model</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Provider</th>
                <th className="text-right px-4 py-3 border border-gray-200 font-semibold text-gray-700">Context Window</th>
                <th className="text-right px-4 py-3 border border-gray-200 font-semibold text-gray-700">Input $/1M</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["GPT-4o Mini",       "OpenAI",    "128K",  "$0.15"],
                ["GPT-4o",            "OpenAI",    "128K",  "$2.50"],
                ["GPT-4.1",           "OpenAI",    "1M",    "$2.00"],
                ["OpenAI o1",         "OpenAI",    "200K",  "$15.00"],
                ["Claude 3 Sonnet",   "Anthropic", "200K",  "$3.00"],
                ["Claude 3 Opus",     "Anthropic", "200K",  "$15.00"],
                ["Gemini 2.5 Pro",    "Google",    "1M",    "$1.25"],
                ["Gemini 1.5 Pro",    "Google",    "2M",    "$1.25"],
                ["Llama 3.1 70B",     "Meta",      "128K",  "$0.90"],
                ["Mistral Large",     "Mistral",   "128K",  "$3.00"],
              ].map(([model, provider, ctx, price]) => (
                <tr key={model} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 font-medium text-gray-800">{model}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-500">{provider}</td>
                  <td className="px-4 py-2.5 border border-gray-200 font-mono text-right">{ctx}</td>
                  <td className="px-4 py-2.5 border border-gray-200 font-mono text-right">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is a Token?</h2>
        <p>
          Tokens are the chunks that AI models use to process text. They don't map 1-to-1 with words or characters.
          In English, one token averages roughly 4 characters or ¾ of a word.
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li>100 tokens ≈ 75 words ≈ ~½ page of text</li>
          <li>A typical chat message: 20–100 tokens</li>
          <li>A detailed system prompt: 200–2,000 tokens</li>
          <li>A full research document: 10,000–100,000 tokens</li>
          <li>Code-heavy prompts use more tokens per character than prose</li>
          <li>CJK (Chinese, Japanese, Korean) characters use ~1 token each</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "How accurate is the token estimate?",
              a: "For standard English text, the Fast Estimate is typically within 5–10% of the actual token count used by OpenAI models. Code prompts are best estimated with the Code-Heavy mode. For critical applications, use OpenAI's Tiktoken library for exact counts.",
            },
            {
              q: "What happens if my prompt exceeds the context window?",
              a: "The API will return an error. For OpenAI models this is a 400 error with a context_length_exceeded message. You need to either shorten your prompt, truncate conversation history, or switch to a model with a larger context window.",
            },
            {
              q: "Why do output tokens cost more than input tokens?",
              a: "Generating tokens requires significantly more GPU compute than processing input tokens. The model must run a full forward pass for each generated token, while input tokens are processed in parallel.",
            },
            {
              q: "How can I reduce my token usage?",
              a: "Common strategies: shorten system prompts, remove redundant context, use structured formats instead of prose instructions, implement prompt caching for repeated prefixes, and truncate conversation history to a rolling window.",
            },
            {
              q: "Does this tool work for non-English text?",
              a: "Yes. Switch to Multilingual Estimate mode for better accuracy with CJK, Arabic, Hebrew, or other non-Latin scripts. These languages tokenize differently — each CJK character is often a single token while Latin text averages 4 characters per token.",
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
