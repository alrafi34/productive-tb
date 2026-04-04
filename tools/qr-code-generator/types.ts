export interface QROptions {
  text: string;
  size: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  foregroundColor: string;
  backgroundColor: string;
}

export interface QRHistory {
  id: string;
  text: string;
  timestamp: number;
  options: QROptions;
}

export type QRPreset = 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'sms';

export interface WiFiConfig {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}