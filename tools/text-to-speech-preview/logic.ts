export interface VoiceOption {
  name: string;
  lang: string;
}

export const LANGUAGE_CODES: Record<string, string> = {
  'en': 'en-US',
  'es': 'es-ES',
  'fr': 'fr-FR',
  'de': 'de-DE',
  'it': 'it-IT',
  'pt': 'pt-BR',
  'ja': 'ja-JP',
  'zh': 'zh-CN',
  'ko': 'ko-KR',
  'ru': 'ru-RU',
};

export function getAvailableVoices(): VoiceOption[] {
  if (typeof window === 'undefined') return [];
  
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  
  return voices.map(voice => ({
    name: voice.name,
    lang: voice.lang
  }));
}

export function filterVoicesByLanguage(voices: VoiceOption[], language: string): VoiceOption[] {
  if (language === 'auto') return voices;
  
  const langCode = LANGUAGE_CODES[language] || language;
  return voices.filter(v => v.lang.startsWith(langCode.split('-')[0]));
}

export function speak(
  text: string,
  voice: VoiceOption | null,
  rate: number,
  pitch: number,
  volume: number
): void {
  if (typeof window === 'undefined') return;
  
  const synth = window.speechSynthesis;
  synth.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  if (voice) {
    const selectedVoice = synth.getVoices().find(v => v.name === voice.name);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
  }
  
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;
  
  synth.speak(utterance);
}

export function pause(): void {
  if (typeof window === 'undefined') return;
  window.speechSynthesis.pause();
}

export function resume(): void {
  if (typeof window === 'undefined') return;
  window.speechSynthesis.resume();
}

export function stop(): void {
  if (typeof window === 'undefined') return;
  window.speechSynthesis.cancel();
}

export function isSpeaking(): boolean {
  if (typeof window === 'undefined') return false;
  return window.speechSynthesis.speaking;
}

export function isPaused(): boolean {
  if (typeof window === 'undefined') return false;
  return window.speechSynthesis.paused;
}

export function saveSettings(settings: any): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('tts-settings', JSON.stringify(settings));
}

export function loadSettings(): any {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem('tts-settings');
  return saved ? JSON.parse(saved) : null;
}

export function downloadAsText(text: string): void {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'text-to-speech.txt';
  link.click();
  URL.revokeObjectURL(url);
}

export async function downloadAsMP3(
  text: string,
  voice: VoiceOption | null,
  rate: number,
  pitch: number,
  volume: number,
  onProgress?: (status: string) => void
): Promise<void> {
  if (typeof window === 'undefined') return;

  return new Promise((resolve, reject) => {
    try {
      const synth = window.speechSynthesis;
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      if (voice) {
        const selectedVoice = synth.getVoices().find(v => v.name === voice.name);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }

      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;

      // Create audio context for recording
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const mediaStreamDestination = (audioContext as any).createMediaStreamAudioDestination?.() || 
                                     (audioContext as any).createMediaStreamDestination?.();
      
      if (!mediaStreamDestination) {
        reject(new Error('Audio recording not supported in this browser'));
        return;
      }

      const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'text-to-speech.webm';
        link.click();
        URL.revokeObjectURL(url);
        resolve();
      };

      mediaRecorder.onerror = () => {
        reject(new Error('Recording failed'));
      };

      mediaRecorder.start();
      onProgress?.('Recording audio...');
      synth.speak(utterance);

      utterance.onend = () => {
        mediaRecorder.stop();
        onProgress?.('Audio saved!');
      };

      utterance.onerror = (event) => {
        mediaRecorder.stop();
        reject(new Error(`Speech error: ${event.error}`));
      };
    } catch (error) {
      reject(error);
    }
  });
}
