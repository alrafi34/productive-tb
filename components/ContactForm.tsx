"use client";

import { useState } from "react";

const CONTACT_EMAIL = "contact@productivetoolbox.com";

const TOPICS = [
  "Report a bug or wrong result",
  "Request a new tool",
  "Suggest a correction to a formula",
  "Advertising or business enquiry",
  "Privacy or data request",
  "Something else",
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  /* Opens the visitor's own mail client with everything pre-filled.
     No server, no third-party processor, so nothing to store or leak. */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = [
      `Name: ${name || "(not given)"}`,
      `Reply-to: ${email || "(not given)"}`,
      `Topic: ${topic}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `[${topic}] — Productive Toolbox`
    )}&body=${encodeURIComponent(body)}`;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable — the address is visible on screen anyway */
    }
  }

  const field =
    "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all";
  const label = "block text-sm font-semibold text-slate-800 mb-2";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className={label} style={{ fontFamily: "var(--font-heading)" }}>
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Jane Doe"
              className={field}
            />
          </div>

          <div>
            <label htmlFor="email" className={label} style={{ fontFamily: "var(--font-heading)" }}>
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={field}
            />
          </div>
        </div>

        <div>
          <label htmlFor="topic" className={label} style={{ fontFamily: "var(--font-heading)" }}>
            What is this about?
          </label>
          <select
            id="topic"
            name="topic"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className={`${field} cursor-pointer`}
          >
            {TOPICS.map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className={label} style={{ fontFamily: "var(--font-heading)" }}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="If you're reporting a wrong result, please include the tool name and the numbers you entered — it makes it far quicker to fix."
            className={`${field} resize-y`}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-xl transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Open in my email app →
        </button>

        <p className="text-xs text-slate-500 text-center leading-relaxed">
          This form opens your own email application with the message ready to send. Nothing is submitted to
          or stored on our servers.
        </p>
      </form>

      <div className="mt-7 pt-7 border-t border-slate-100">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Or email us directly
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[15px] font-semibold text-primary hover:underline break-all"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {CONTACT_EMAIL}
          </a>
          <button
            onClick={copyEmail}
            className="text-xs font-medium text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
