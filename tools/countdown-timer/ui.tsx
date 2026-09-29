"use client";

import { useEffect, useState } from "react";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { PRESETS, nextOccurrence, remaining, toLocalInput } from "./logic";
import CountdownTimerSEO from "./seo-content";

const LOCAL_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

export default function CountdownTimerUI() {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  // The current time differs between server and browser, so nothing is counted before hydration
  const [now, setNow] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const date = params.get("date") ?? "";
      if (LOCAL_RE.test(date)) {
        setName(params.get("event") ?? "");
        setTarget(date);
      } else {
        const christmas = PRESETS.find((p) => p.id === "christmas")!;
        setName(christmas.name);
        setTarget(toLocalInput(nextOccurrence(christmas, new Date())));
      }
      setNow(Date.now());
    });
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  const choosePreset = (id: string) => {
    const p = PRESETS.find((x) => x.id === id)!;
    setName(p.name);
    setTarget(toLocalInput(nextOccurrence(p, new Date())));
  };

  const targetMs = LOCAL_RE.test(target) ? new Date(target).getTime() : NaN;
  const left = now !== null && Number.isFinite(targetMs) ? remaining(targetMs, now) : null;

  const shareUrl = () => {
    const params = new URLSearchParams();
    if (name.trim()) params.set("event", name.trim());
    params.set("date", target);
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  };
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", shareUrl());
    }
  };

  const units: [string, number][] = left
    ? [["Days", left.days], ["Hours", left.hours], ["Minutes", left.minutes], ["Seconds", left.seconds]]
    : [];
  const whole = (n: number) => Math.floor(n).toLocaleString("en-US");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cd-name" className="block text-sm font-medium text-gray-700 mb-1">Event</label>
            <input
              id="cd-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My birthday, vacation, deadline…"
              maxLength={80}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#058554]"
            />
          </div>
          <div>
            <label htmlFor="cd-date" className="block text-sm font-medium text-gray-700 mb-1">Date and time</label>
            <input
              id="cd-date"
              type="datetime-local"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#058554]"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.id} onClick={() => choosePreset(p.id)} className="px-3 py-1.5 rounded-full border border-gray-300 text-sm text-gray-700 hover:border-primary hover:text-primary">
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-primary rounded-xl p-6 sm:p-8 text-white shadow-lg shadow-primary/20">
        {left ? (
          <>
            <p className="text-center text-primary-100 text-sm mb-1">{left.past ? "Time since" : "Time left until"}</p>
            <p className="text-center text-xl sm:text-2xl font-semibold break-words">{name.trim() || "your event"}</p>
            <p className="text-center text-primary-100 text-sm mt-1">
              {new Intl.DateTimeFormat(undefined, { dateStyle: "full", timeStyle: "short" }).format(targetMs)}
            </p>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-6" aria-live="off">
              {units.map(([label, value]) => (
                <div key={label} className="bg-white/10 rounded-lg py-4 text-center">
                  <p className="text-3xl sm:text-5xl font-bold tabular-nums" data-testid={`cd-${label.toLowerCase()}`}>{label === "Days" ? value.toLocaleString("en-US") : String(value).padStart(2, "0")}</p>
                  <p className="text-primary-100 text-xs sm:text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>
            {left.past && <p className="text-center mt-4 text-amber-200">This date has passed; the timer is counting up since then.</p>}
            <p className="text-center text-primary-100 text-sm mt-4">
              {whole(left.totalMs / 604_800_000)} weeks · {whole(left.totalMs / 3_600_000)} hours · {whole(left.totalMs / 60_000)} minutes
            </p>
            <div className="flex justify-center mt-4">
              <button onClick={copyLink} className="px-4 py-2 rounded-lg bg-white text-primary text-sm font-semibold hover:bg-gray-100">
                {copied ? "Link copied" : "Copy share link"}
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-primary-100 py-8">{now === null ? "Loading…" : "Pick a date and time to start the countdown."}</p>
        )}
      </div>

      <RelatedStrip />
      <CountdownTimerSEO />
      <RelatedTools />
    </div>
  );
}
