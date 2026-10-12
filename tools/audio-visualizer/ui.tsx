"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AudioEngine, downloadBlob, extensionFor, formatSize, formatTime, safeName, startRecording, videoMimeType } from "./logic";
import { ASPECTS, THEMES, Spectrogram, drawFrame, type Aspect, type Scene, type VisualStyle } from "./render";
import AudioVisualizerSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

type Source = "none" | "file" | "mic";
type Notice = { kind: "error" | "info"; text: string } | null;

const STYLES: [VisualStyle, string][] = [
  ["bars", "Bars"], ["mirror", "Mirror bars"], ["wave", "Waveform"], ["circle", "Circle"], ["spectrogram", "Spectrogram"],
];
const DETAIL: [number, string][] = [[1024, "Low (512 bins)"], [2048, "Medium (1,024 bins)"], [4096, "High (2,048 bins)"], [8192, "Very high (4,096 bins)"]];

const btn = "px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
const card = "bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6";
const field = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary";
const heading = "text-base font-semibold text-gray-800 mb-3";

function AudioVisualizerContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const engineRef = useRef<AudioEngine | null>(null);
  const spectroRef = useRef(new Spectrogram());
  const rafRef = useRef(0);
  const recRef = useRef<{ recorder: MediaRecorder; endAt: number } | null>(null);
  // Title filled in from the file name, replaced when another file is added
  const autoTitleRef = useRef("");

  const [source, setSource] = useState<Source>("none");
  const [fileName, setFileName] = useState("");
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [notice, setNotice] = useState<Notice>(null);
  const [dragging, setDragging] = useState(false);

  const [style, setStyle] = useState<VisualStyle>("bars");
  const [themeIdx, setThemeIdx] = useState(0);
  const [customColor, setCustomColor] = useState("");
  const [bg, setBg] = useState(THEMES[0].bg);
  const [image, setImage] = useState<ImageBitmap | null>(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [aspect, setAspect] = useState<Aspect>("16:9");
  const [sensitivity, setSensitivity] = useState(1.2);
  const [smoothing, setSmoothing] = useState(0.8);
  const [fftSize, setFftSize] = useState(4096);
  const [volume, setVolume] = useState(1);

  const [mime, setMime] = useState<string | null>(null);
  const [range, setRange] = useState({ whole: true, from: 0, to: 0 });
  const [exporting, setExporting] = useState<{ start: number; end: number } | null>(null);
  const [result, setResult] = useState<{ size: number; name: string } | null>(null);

  const theme = THEMES[themeIdx];
  const colors = customColor ? [customColor, customColor] : theme.colors;
  const scene: Scene = { style, colors, bg, image, title, artist, sensitivity, sampleRate: 44100 };
  const sceneRef = useRef(scene);
  useEffect(() => { sceneRef.current = scene; });

  useEffect(() => { setMime(videoMimeType()); }, []);

  const getEngine = useCallback((): AudioEngine => {
    if (!engineRef.current) engineRef.current = new AudioEngine(fftSize, smoothing);
    return engineRef.current;
  }, [fftSize, smoothing]);

  useEffect(() => () => { cancelAnimationFrame(rafRef.current); engineRef.current?.dispose(); }, []);
  useEffect(() => { engineRef.current?.setFftSize(fftSize); }, [fftSize]);
  useEffect(() => { engineRef.current?.setSmoothing(smoothing); }, [smoothing]);
  useEffect(() => { if (engineRef.current) engineRef.current.volume.gain.value = volume; }, [volume]);

  const active = playing || source === "mic";

  /* One frame; live frames advance the spectrogram */
  const paint = useCallback((live: boolean) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const eng = engineRef.current;
    const s = { ...sceneRef.current, sampleRate: eng?.ctx.sampleRate ?? 44100 };
    if (eng && live) {
      eng.sample();
      drawFrame(ctx, eng.freq, eng.wave, s, spectroRef.current, true);
    } else {
      drawFrame(ctx, new Uint8Array(1024), new Uint8Array(2048).fill(128), s, spectroRef.current, false);
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    const loop = () => {
      paint(true);
      const a = engineRef.current?.audio;
      if (a) {
        setTime(a.currentTime);
        const rec = recRef.current;
        if (rec && a.currentTime >= rec.endAt && rec.recorder.state === "recording") rec.recorder.stop();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, paint]);

  // A new video size starts a fresh spectrogram
  useEffect(() => {
    spectroRef.current.reset();
  }, [aspect]);

  // Still frame when nothing plays, so settings show straight away
  useEffect(() => {
    if (!active) paint(false);
  }, [active, paint, aspect, style, themeIdx, customColor, bg, image, title, artist, sensitivity]);

  // ---- Sources ----
  const loadFile = async (file: File) => {
    if (!file.type.startsWith("audio/") && !file.type.startsWith("video/") && !/\.(mp3|wav|m4a|aac|ogg|oga|opus|flac|webm|mp4)$/i.test(file.name)) {
      setNotice({ kind: "error", text: `“${file.name}” is not an audio file. Choose an MP3, WAV, M4A, OGG or FLAC file.` });
      return;
    }
    setNotice(null);
    setResult(null);
    try {
      const eng = getEngine();
      setPlaying(false);
      const audio = await eng.loadFile(file);
      audio.onplay = () => setPlaying(true);
      audio.onpause = () => setPlaying(false);
      audio.onended = () => {
        setPlaying(false);
        if (recRef.current?.recorder.state === "recording") recRef.current.recorder.stop();
      };
      audio.ontimeupdate = () => setTime(audio.currentTime);
      setDuration(audio.duration);
      setTime(0);
      setRange({ whole: true, from: 0, to: Math.floor(audio.duration) });
      setSource("file");
      setFileName(file.name);
      const auto = file.name.replace(/\.[^.]+$/, "").replace(/[_]+/g, " ");
      const previous = autoTitleRef.current;
      autoTitleRef.current = auto;
      setTitle((t) => (!t || t === previous ? auto : t));
    } catch (e) {
      setSource("none");
      setFileName("");
      setNotice({ kind: "error", text: e instanceof Error ? e.message : "The file could not be opened." });
    }
  };

  const togglePlay = async () => {
    const eng = engineRef.current;
    const a = eng?.audio;
    if (!eng || !a) return;
    await eng.resume();
    if (a.paused) a.play().catch(() => setNotice({ kind: "error", text: "Playback could not start. Press Play again." }));
    else a.pause();
  };

  const toggleMic = async () => {
    if (source === "mic") {
      if (exporting) recRef.current?.recorder.stop();
      engineRef.current?.stopSource();
      setSource("none");
      setFileName("");
      return;
    }
    setNotice(null);
    setResult(null);
    try {
      const eng = getEngine();
      await eng.resume();
      setPlaying(false);
      await eng.startMic();
      setSource("mic");
      setFileName("");
      setDuration(0);
    } catch (e) {
      setNotice({ kind: "error", text: e instanceof Error ? e.message : "The microphone could not be started." });
    }
  };

  const seek = (t: number) => {
    const a = engineRef.current?.audio;
    if (!a) return;
    a.currentTime = t;
    setTime(t);
  };

  const onImage = async (file: File | undefined) => {
    if (!file) return;
    try {
      setImage(await createImageBitmap(file));
    } catch {
      setNotice({ kind: "error", text: "That image could not be opened. Use a JPG, PNG or WebP image." });
    }
  };

  // ---- Output ----
  const snapshot = () => {
    canvasRef.current?.toBlob((b) => b && downloadBlob(b, `${safeName(title || fileName || "visualizer")}.png`), "image/png");
  };

  const fullscreen = () => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.().catch(() => {});
  };

  const exportVideo = async () => {
    const eng = engineRef.current;
    const canvas = canvasRef.current;
    if (!eng || !canvas || !mime) return;
    const isMic = source === "mic";
    const a = eng.audio;
    const start = isMic || range.whole ? 0 : Math.max(0, Math.min(range.from, duration));
    const end = isMic ? Infinity : range.whole ? duration : Math.min(duration, Math.max(range.to, start + 1));
    setResult(null);
    setNotice(null);
    try {
      await eng.resume();
      if (a) {
        a.pause();
        a.currentTime = start;
        await new Promise((r) => a.addEventListener("seeked", r, { once: true }));
      }
      spectroRef.current.reset();
      const { recorder, done } = startRecording(canvas, eng.recordDest.stream, mime);
      recRef.current = { recorder, endAt: end };
      setExporting({ start, end });
      if (a) await a.play();
      const blob = await done;
      a?.pause();
      const name = `${safeName(title || fileName || "visualizer")}-visualizer.${extensionFor(mime)}`;
      downloadBlob(blob, name);
      setResult({ size: blob.size, name });
    } catch (e) {
      setNotice({ kind: "error", text: e instanceof Error ? e.message : "The video could not be created." });
      if (recRef.current?.recorder.state === "recording") recRef.current.recorder.stop();
    } finally {
      recRef.current = null;
      setExporting(null);
    }
  };

  const stopExport = () => {
    if (recRef.current?.recorder.state === "recording") recRef.current.recorder.stop();
  };

  const progress = exporting && source === "file" ? Math.min(1, (time - exporting.start) / Math.max(0.1, exporting.end - exporting.start)) : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="space-y-6">
        {/* Stage */}
        <div className="space-y-4 min-w-0">
          <div
            ref={stageRef}
            className={`relative rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center ${dragging ? "ring-4 ring-primary" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files?.[0]; if (f) loadFile(f); }}
          >
            <canvas ref={canvasRef} width={ASPECTS[aspect].w} height={ASPECTS[aspect].h} className="block max-w-full max-h-[70vh] w-auto h-auto" aria-label="Audio visualization" />
            {source === "none" && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/90 hover:text-white"
              >
                <span className="text-4xl">🎵</span>
                <span className="font-semibold text-lg">Drop an audio file here or click to choose</span>
                <span className="text-sm text-white/70">MP3, WAV, M4A, OGG, FLAC • or use your microphone</span>
              </button>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.opus,.flac" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); e.target.value = ""; }} />

          {notice && (
            <div role={notice.kind === "error" ? "alert" : "status"} className={`rounded-xl p-3 text-sm flex justify-between gap-3 ${notice.kind === "error" ? "bg-red-50 border border-red-200 text-red-800" : "bg-blue-50 border border-blue-200 text-blue-800"}`}>
              <span>{notice.text}</span>
              <button onClick={() => setNotice(null)} aria-label="Dismiss" className="font-bold shrink-0">✕</button>
            </div>
          )}

          {/* Transport */}
          <div className={card}>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => fileInputRef.current?.click()} disabled={!!exporting} className={`${btn} bg-gray-100 hover:bg-gray-200 text-gray-800`}>📂 {source === "file" ? "Change file" : "Choose audio file"}</button>
              <button onClick={toggleMic} disabled={!!exporting && source !== "mic"} className={`${btn} ${source === "mic" ? "bg-red-100 hover:bg-red-200 text-red-700" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}>
                🎤 {source === "mic" ? "Stop microphone" : "Use microphone"}
              </button>
              <span className="flex-1" />
              <button onClick={snapshot} className={`${btn} bg-gray-100 hover:bg-gray-200 text-gray-800`}>📷 PNG</button>
              <button onClick={fullscreen} className={`${btn} bg-gray-100 hover:bg-gray-200 text-gray-800`}>⛶ Fullscreen</button>
            </div>

            {source === "file" && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 truncate mb-2">{fileName}</p>
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} disabled={!!exporting} aria-label={playing ? "Pause" : "Play"} className={`${btn} bg-primary hover:bg-primary-hover text-white w-14`}>
                    {playing ? "❚❚" : "▶"}
                  </button>
                  <span className="text-xs text-gray-600 font-mono w-10 text-right">{formatTime(time)}</span>
                  <input type="range" min={0} max={duration || 0} step="any" value={Math.min(time, duration || 0)} disabled={!!exporting}
                    onChange={(e) => seek(parseFloat(e.target.value))} aria-label="Position" className="flex-1 accent-primary" />
                  <span className="text-xs text-gray-600 font-mono w-10">{formatTime(duration)}</span>
                </div>
                <label className="mt-3 flex items-center gap-3 text-sm text-gray-700">
                  Volume
                  <input type="range" min={0} max={1} step={0.05} value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-40 accent-primary" />
                  <span className="text-xs text-gray-500">(does not affect the exported video)</span>
                </label>
              </div>
            )}
            {source === "mic" && (
              <p className="mt-3 text-sm text-green-700">🎤 Listening to your microphone. The sound is not played back, so there is no echo.</p>
            )}
          </div>

          {/* Export */}
          <div className={card}>
            <h2 className={heading} style={{ fontFamily: "var(--font-heading)" }}>Create a video</h2>
            {!mime ? (
              <p className="text-sm text-gray-600">This browser cannot record video. Use a current version of Chrome, Edge, Firefox or Safari to export.</p>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="text-sm font-medium text-gray-700">
                    Size
                    <select value={aspect} onChange={(e) => setAspect(e.target.value as Aspect)} disabled={!!exporting} className={`${field} mt-1`}>
                      {(Object.keys(ASPECTS) as Aspect[]).map((k) => <option key={k} value={k}>{ASPECTS[k].label} – {ASPECTS[k].w}×{ASPECTS[k].h}</option>)}
                    </select>
                  </label>
                  {source === "file" && (
                    <div className="text-sm font-medium text-gray-700">
                      Part of the track
                      <div className="mt-1 flex items-center gap-2">
                        <select value={range.whole ? "whole" : "part"} onChange={(e) => setRange((r) => ({ ...r, whole: e.target.value === "whole" }))} disabled={!!exporting} className={field}>
                          <option value="whole">Whole track ({formatTime(duration)})</option>
                          <option value="part">From – to (seconds)</option>
                        </select>
                      </div>
                      {!range.whole && (
                        <div className="mt-2 flex items-center gap-2">
                          <input type="number" min={0} max={duration} value={range.from} onChange={(e) => setRange((r) => ({ ...r, from: Math.max(0, parseFloat(e.target.value) || 0) }))} className={field} aria-label="From second" />
                          <span>–</span>
                          <input type="number" min={0} max={duration} value={range.to} onChange={(e) => setRange((r) => ({ ...r, to: Math.max(0, parseFloat(e.target.value) || 0) }))} className={field} aria-label="To second" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  {exporting ? (
                    <div>
                      {source === "file" ? (
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: `${progress * 100}%` }} /></div>
                      ) : (
                        <p className="text-sm text-red-700 font-medium">● Recording…</p>
                      )}
                      <div className="mt-2 flex items-center justify-between gap-3 text-sm text-gray-600">
                        <span>Recording in real time — keep this tab open and visible.</span>
                        <button onClick={stopExport} className={`${btn} bg-red-100 hover:bg-red-200 text-red-700`}>{source === "mic" ? "Stop and save" : "Stop early and save"}</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={exportVideo} disabled={source === "none"} className={`${btn} w-full py-3 bg-primary hover:bg-primary-hover text-white`}>
                      🎬 {source === "mic" ? "Record video from microphone" : `Export ${extensionFor(mime).toUpperCase()} video`}
                    </button>
                  )}
                  {source === "none" && <p className="mt-2 text-xs text-gray-500">Choose an audio file or start the microphone first.</p>}
                  {result && <p className="mt-2 text-sm text-green-700">✓ Saved {result.name} ({formatSize(result.size)}).</p>}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className={card}>
            <h2 className={heading} style={{ fontFamily: "var(--font-heading)" }}>Style</h2>
            <div className="grid grid-cols-2 gap-2">
              {STYLES.map(([s, label]) => (
                <button key={s} onClick={() => setStyle(s)} aria-pressed={style === s}
                  className={`${btn} px-2 ${style === s ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>{label}</button>
              ))}
            </div>
          </div>

          <div className={card}>
            <h2 className={heading} style={{ fontFamily: "var(--font-heading)" }}>Colours</h2>
            <div className="grid grid-cols-3 gap-2">
              {THEMES.map((t, i) => (
                <button key={t.name} onClick={() => { setThemeIdx(i); setCustomColor(""); setBg(t.bg); }} aria-pressed={themeIdx === i && !customColor}
                  className={`rounded-lg p-1.5 text-xs font-semibold border ${themeIdx === i && !customColor ? "border-primary ring-2 ring-primary/30" : "border-gray-200"}`}>
                  <span className="block h-4 rounded" style={{ background: `linear-gradient(90deg, ${t.colors.join(",")})` }} />
                  <span className="block mt-1 text-gray-700">{t.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
              <label className="flex items-center gap-2">Bar colour
                <input type="color" value={customColor || theme.colors[1]} onChange={(e) => setCustomColor(e.target.value)} className="w-8 h-8 rounded border border-gray-200" />
              </label>
              <label className="flex items-center gap-2">Background
                <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-8 h-8 rounded border border-gray-200" />
              </label>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <label className={`${btn} px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer`}>
                🖼️ Background image
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { onImage(e.target.files?.[0]); e.target.value = ""; }} />
              </label>
              {image && <button onClick={() => setImage(null)} className="text-red-600 text-xs font-semibold">Remove</button>}
            </div>
          </div>

          <div className={card}>
            <h2 className={heading} style={{ fontFamily: "var(--font-heading)" }}>Text</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Track title" className={field} aria-label="Track title" maxLength={80} />
            <input value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist or channel name" className={`${field} mt-2`} aria-label="Artist" maxLength={80} />
          </div>

          <div className={card}>
            <h2 className={heading} style={{ fontFamily: "var(--font-heading)" }}>Response</h2>
            <label className="block text-sm text-gray-700">Sensitivity: {sensitivity.toFixed(1)}×
              <input type="range" min={0.5} max={3} step={0.1} value={sensitivity} onChange={(e) => setSensitivity(parseFloat(e.target.value))} className="w-full accent-primary" />
            </label>
            <label className="block text-sm text-gray-700 mt-2">Smoothing: {Math.round(smoothing * 100)}%
              <input type="range" min={0} max={0.95} step={0.05} value={smoothing} onChange={(e) => setSmoothing(parseFloat(e.target.value))} className="w-full accent-primary" />
            </label>
            <label className="block text-sm text-gray-700 mt-2">Frequency detail
              <select value={fftSize} onChange={(e) => setFftSize(parseInt(e.target.value, 10))} className={`${field} mt-1`}>
                {DETAIL.map(([n, label]) => <option key={n} value={n}>{label}</option>)}
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AudioVisualizerUI() {
  return (
    <>
      <AudioVisualizerContent />
      <RelatedStrip />
      <AudioVisualizerSEOContent />
      <RelatedTools />
    </>
  );
}
