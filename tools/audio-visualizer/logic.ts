/* Audio graph for the visualizer.

   file:  <audio> → source ─┬→ analyser
                            ├→ volume → speakers
                            └→ recorder (video export)
   mic:   stream  → source ─┬→ analyser
                            └→ recorder          (never to the speakers, so no echo)

   An <audio> element can feed only one MediaElementSource, so each file
   gets a fresh element and the old one is torn down. */

type AnyWindow = Window & { webkitAudioContext?: typeof AudioContext };

export class AudioEngine {
  ctx: AudioContext;
  analyser: AnalyserNode;
  volume: GainNode;
  recordDest: MediaStreamAudioDestinationNode;
  audio: HTMLAudioElement | null = null;
  private url: string | null = null;
  private source: AudioNode | null = null;
  private mic: MediaStream | null = null;
  freq: Uint8Array<ArrayBuffer>;
  wave: Uint8Array<ArrayBuffer>;

  constructor(fftSize: number, smoothing: number) {
    const Ctor = window.AudioContext || (window as AnyWindow).webkitAudioContext;
    if (!Ctor) throw new Error("This browser does not support audio processing. Use a current version of Chrome, Edge, Firefox or Safari.");
    this.ctx = new Ctor();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = fftSize;
    this.analyser.smoothingTimeConstant = smoothing;
    this.analyser.minDecibels = -90;
    this.analyser.maxDecibels = -15;
    this.volume = this.ctx.createGain();
    this.volume.connect(this.ctx.destination);
    this.recordDest = this.ctx.createMediaStreamDestination();
    this.freq = new Uint8Array(this.analyser.frequencyBinCount);
    this.wave = new Uint8Array(this.analyser.fftSize);
  }

  setFftSize(n: number) {
    this.analyser.fftSize = n;
    this.freq = new Uint8Array(this.analyser.frequencyBinCount);
    this.wave = new Uint8Array(this.analyser.fftSize);
  }

  setSmoothing(v: number) {
    this.analyser.smoothingTimeConstant = v;
  }

  sample() {
    this.analyser.getByteFrequencyData(this.freq);
    this.analyser.getByteTimeDomainData(this.wave);
  }

  async resume() {
    if (this.ctx.state === "suspended") await this.ctx.resume();
  }

  private detach() {
    try { this.source?.disconnect(); } catch { /* already disconnected */ }
    this.source = null;
    if (this.audio) {
      this.audio.pause();
      this.audio.removeAttribute("src");
      this.audio.load();
      this.audio = null;
    }
    if (this.url) { URL.revokeObjectURL(this.url); this.url = null; }
    this.mic?.getTracks().forEach((t) => t.stop());
    this.mic = null;
  }

  /* Resolves once the file's length is known; rejects if it cannot be played */
  loadFile(file: File): Promise<HTMLAudioElement> {
    this.detach();
    const audio = new Audio();
    audio.preload = "auto";
    this.url = URL.createObjectURL(file);
    audio.src = this.url;
    const src = this.ctx.createMediaElementSource(audio);
    src.connect(this.analyser);
    src.connect(this.volume);
    src.connect(this.recordDest);
    this.source = src;
    this.audio = audio;
    return new Promise((resolve, reject) => {
      audio.onloadedmetadata = () => resolve(audio);
      audio.onerror = () => reject(new Error(`This browser cannot play “${file.name}”. Try an MP3, WAV, M4A, OGG or FLAC file.`));
    });
  }

  async startMic(): Promise<void> {
    this.detach();
    if (!navigator.mediaDevices?.getUserMedia) throw new Error("This browser does not allow microphone access.");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
    } catch (e) {
      const name = (e as DOMException).name;
      if (name === "NotAllowedError" || name === "SecurityError") throw new Error("Microphone access is blocked. Allow the microphone for this site in the address bar, then try again.");
      if (name === "NotFoundError") throw new Error("No microphone was found. Connect one and try again.");
      if (name === "NotReadableError") throw new Error("The microphone is being used by another app. Close it and try again.");
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    }
    this.mic = stream;
    const src = this.ctx.createMediaStreamSource(stream);
    src.connect(this.analyser);
    src.connect(this.recordDest);
    this.source = src;
  }

  stopSource() {
    this.detach();
  }

  dispose() {
    this.detach();
    this.ctx.close().catch(() => {});
  }
}

// ---- Video export ----

/* H.264 MP4 plays everywhere, so it comes first. A browser that would put
   VP9 in an MP4 gets WebM instead; plain "video/mp4" is for Safari, which
   records H.264 but has no WebM recorder. */
const VIDEO_TYPES = [
  "video/mp4;codecs=avc1.42E01F,mp4a.40.2",
  "video/mp4;codecs=avc1,mp4a",
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
  "video/mp4",
];

export function videoMimeType(): string | null {
  if (typeof MediaRecorder === "undefined") return null;
  return VIDEO_TYPES.find((t) => MediaRecorder.isTypeSupported(t)) ?? null;
}

export const extensionFor = (mime: string) => (mime.startsWith("video/mp4") ? "mp4" : "webm");

export function startRecording(canvas: HTMLCanvasElement, audio: MediaStream, mime: string): { recorder: MediaRecorder; done: Promise<Blob> } {
  const video = canvas.captureStream(30);
  const stream = new MediaStream([...video.getVideoTracks(), ...audio.getAudioTracks()]);
  const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 6_000_000, audioBitsPerSecond: 192_000 });
  const chunks: Blob[] = [];
  recorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
  let started = 0;
  recorder.onstart = () => { started = performance.now(); };
  const done = new Promise<Blob>((resolve, reject) => {
    recorder.onstop = async () => {
      video.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunks, { type: mime.split(";")[0] });
      if (!mime.startsWith("video/webm")) return resolve(blob);
      // Recorded WebM has no duration, so players cannot seek it until fixed
      try {
        const { default: fixWebmDuration } = await import("fix-webm-duration");
        resolve(await fixWebmDuration(blob, performance.now() - started, { logger: false }));
      } catch {
        resolve(blob);
      }
    };
    recorder.onerror = () => reject(new Error("The video could not be recorded."));
  });
  recorder.start(1000);
  return { recorder, done };
}

export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export const safeName = (s: string) =>
  s.replace(/\.[^.]+$/, "").replace(/[^\w.-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "audio";

export function formatTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export function formatSize(bytes: number): string {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
