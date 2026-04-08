export interface AudioVisualizerState {
  isPlaying: boolean;
  isMicrophoneActive: boolean;
  visualizationStyle: 'bars' | 'waveform' | 'circular' | 'radial';
  sensitivity: number;
  fftSize: number;
  currentTime: number;
  duration: number;
}

let audioContext: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let mediaSource: MediaStreamAudioSourceNode | null = null;
let microphone: MediaStream | null = null;

export const initAudioContext = () => {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.error("Failed to create audio context:", e);
      throw new Error("Web Audio API not supported");
    }
  }
  return audioContext;
};

export const createAnalyser = (fftSize: number) => {
  const ctx = initAudioContext();
  if (!analyser) {
    analyser = ctx.createAnalyser();
    analyser.connect(ctx.destination);
  }
  analyser.fftSize = fftSize;
  return analyser;
};

export const loadAudioFile = (file: File): Promise<HTMLAudioElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const audio = new Audio();
      audio.src = e.target?.result as string;
      audio.crossOrigin = "anonymous";
      
      audio.oncanplay = () => {
        try {
          const ctx = initAudioContext();
          if (!mediaSource) {
            const source = (ctx as any).createMediaElementAudioSource(audio);
            source.connect(analyser!);
            mediaSource = source as any;
          }
          resolve(audio);
        } catch (err) {
          reject(err);
        }
      };
      
      audio.onerror = () => reject(new Error("Failed to load audio file"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export const startMicrophone = async (): Promise<MediaStream> => {
  try {
    // Resume audio context if suspended
    const ctx = initAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    // Ensure analyser exists
    if (!analyser) {
      createAnalyser(256);
    }

    // Request microphone with fallback
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
    } catch (e) {
      // Fallback to basic audio request
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    }
    
    if (!stream) {
      throw new Error("Failed to get microphone stream");
    }

    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length === 0) {
      throw new Error("No audio tracks in microphone stream");
    }

    microphone = stream;
    
    // Disconnect old source if it exists
    if (mediaSource) {
      try {
        mediaSource.disconnect();
      } catch (e) {
        // Ignore
      }
      mediaSource = null;
    }
    
    // Create new media stream source
    try {
      const source = (ctx as any).createMediaStreamSource(stream);
      if (!source) {
        throw new Error("createMediaStreamSource returned null");
      }
      source.connect(analyser);
      mediaSource = source;
    } catch (e) {
      console.error("Failed to connect microphone:", e);
      throw new Error("Failed to connect microphone to audio system");
    }
    
    return stream;
  } catch (error) {
    const err = error as any;
    
    if (err.name === 'NotAllowedError') {
      throw new Error("Microphone permission denied. Please allow microphone access in your browser settings.");
    } else if (err.name === 'NotFoundError') {
      throw new Error("No microphone found. Please connect a microphone.");
    } else if (err.name === 'NotReadableError') {
      throw new Error("Microphone is already in use by another application.");
    } else if (err.name === 'SecurityError') {
      throw new Error("Microphone access requires HTTPS or localhost.");
    } else if (err.name === 'OverconstrainedError') {
      throw new Error("Microphone does not support the requested audio constraints.");
    }
    
    throw error;
  }
};

export const stopMicrophone = () => {
  if (microphone) {
    microphone.getTracks().forEach(track => track.stop());
    microphone = null;
  }
};

export const getFrequencyData = (): Uint8Array => {
  if (!analyser) return new Uint8Array(0);
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);
  return dataArray;
};

export const getWaveformData = (): Uint8Array => {
  if (!analyser) return new Uint8Array(0);
  const dataArray = new Uint8Array(analyser.fftSize);
  analyser.getByteTimeDomainData(dataArray);
  return dataArray;
};

export const resumeAudioContext = () => {
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
};

export const isAudioContextSupported = (): boolean => {
  return !!(window.AudioContext || (window as any).webkitAudioContext);
};

export const isMicrophoneSupported = (): boolean => {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};
