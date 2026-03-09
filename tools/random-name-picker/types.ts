export interface PickerOptions {
  numberOfWinners: number;
  removeDuplicates: boolean;
  removeWinnerAfterPick: boolean;
  animationEnabled: boolean;
}

export interface WinnerResult {
  name: string;
  round: number;
  timestamp: Date;
}
