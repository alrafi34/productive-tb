export function parseNumber(val: string | number): number {
  if (typeof val === 'number') return val;
  const normalized = val.replace(/,/g, '').replace(/\s/g, '');
  return parseFloat(normalized);
}

export function calculatePercentageChange(oldVal: number, newVal: number) {
  if (oldVal === 0) return { change: 0, percent: 0, type: 'none' };
  const change = newVal - oldVal;
  const percent = (change / Math.abs(oldVal)) * 100;
  return {
    change,
    percent,
    type: percent > 0 ? 'increase' : percent < 0 ? 'decrease' : 'none'
  };
}

export function calculateOriginalValue(finalValue: number, percentChange: number) {
  // final = original * (1 + percent/100)
  // original = final / (1 + percent/100)
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
  
  const totalChangePercent = ((current - baseValue) / Math.abs(baseValue)) * 100;
  
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
