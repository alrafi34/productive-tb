export interface UpsideDownOptions {
  reverseText: boolean;
  preserveSpaces: boolean;
  preservePunctuation: boolean;
  preserveLineBreaks: boolean;
  realtimeConvert: boolean;
}

export type FlipMode = 'upside-down' | 'mirror' | 'no-reverse';
export type PresetType = 'classic' | 'mirrored' | 'fully-flipped';
