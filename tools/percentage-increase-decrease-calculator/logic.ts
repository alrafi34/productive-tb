export function parseNumber(val: string | number): number {
  if (typeof val === 'number') return val;
  const normalized = val.replace(/,/g, '').replace(/\s/g, '');
  return parseFloat(normalized);
}

/* Percent change from oldVal to newVal. A change from 0 has no percentage
   (any rise from nothing is infinitely large), so percent is null then. */
export function calculatePercentageChange(oldVal: number, newVal: number): {
  change: number;
  percent: number | null;
  type: 'increase' | 'decrease' | 'none';
} {
  const change = newVal - oldVal;
  const type = change > 0 ? 'increase' : change < 0 ? 'decrease' : 'none';
  if (oldVal === 0) return { change, percent: change === 0 ? 0 : null, type };
  return { change, percent: (change / Math.abs(oldVal)) * 100, type };
}

/* "12.50%", or a note when there is no percentage */
export function formatPercentChange(percent: number | null): string {
  return percent === null ? 'n/a (from 0)' : `${Math.abs(percent).toFixed(2)}%`;
}

/* final = original × (1 + percent/100). A 100% decrease leaves 0 whatever
   the original was, so there is no answer at or below −100%. */
export function calculateOriginalValue(finalValue: number, percentChange: number): number | null {
  if (!(percentChange > -100)) return null;
  return finalValue / (1 + percentChange / 100);
}

export interface StepChange {
  id: string;
  type: 'increase' | 'decrease';
  percent: number;
}

export function simulateSteps(baseValue: number, steps: StepChange[]) {
  let current = baseValue;
  const results = steps.map(step => {
    const change = step.type === 'increase' ? step.percent : -step.percent;
    const amount = current * (change / 100);
    const before = current;
    current += amount;
    return {
      before,
      after: current,
      amount,
      step
    };
  });
  
  const totalChangePercent = baseValue === 0 ? null : ((current - baseValue) / Math.abs(baseValue)) * 100;
  
  return {
    finalValue: current,
    totalChangePercent,
    results
  };
}

export function calculateBatchChanges(numbers: number[]) {
  const results = [];
  for (let i = 0; i < numbers.length - 1; i++) {
    const from = numbers[i];
    const to = numbers[i+1];
    results.push({
      from,
      to,
      ...calculatePercentageChange(from, to)
    });
  }
  return results;
}
