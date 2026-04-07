export interface DiceSet {
  sides: number;
  count: number;
}

export interface RollResult {
  id: string;
  timestamp: number;
  time: string;
  rolls: number[];
  total: number;
  diceConfig: string;
}

export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function rollDiceSet(diceSet: DiceSet[]): number[] {
  const results: number[] = [];
  diceSet.forEach((die) => {
    for (let i = 0; i < die.count; i++) {
      results.push(rollDie(die.sides));
    }
  });
  return results;
}

export function calculateTotal(rolls: number[]): number {
  return rolls.reduce((sum, roll) => sum + roll, 0);
}

export function formatDiceConfig(diceSet: DiceSet[]): string {
  return diceSet
    .filter((d) => d.count > 0)
    .map((d) => `D${d.sides}×${d.count}`)
    .join(" + ");
}

export function saveRollToHistory(
  rolls: number[],
  diceConfig: string,
  uniqueId?: string
): RollResult {
  const now = new Date();
  return {
    id: uniqueId || Date.now().toString() + Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    rolls,
    total: calculateTotal(rolls),
    diceConfig,
  };
}

export function exportHistoryAsJSON(history: RollResult[]): string {
  return JSON.stringify(
    history.map((h) => ({
      rolls: h.rolls,
      total: h.total,
      config: h.diceConfig,
      time: h.time,
    })),
    null,
    2
  );
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
