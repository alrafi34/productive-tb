export type CalculationMode = 'basic' | 'reverse' | 'multi' | 'batch';
export type BasicFormula = 'percentOf' | 'increase' | 'decrease' | 'whatPercent';

export function formatResultNumber(num: number): string {
  if (!isFinite(num)) return "0";
  // If no decimal part, return as integer string
  if (Number.isInteger(num)) return num.toString();
  // Otherwise, limit to 4 decimal places without trailing zeros
  return parseFloat(num.toFixed(4)).toString();
}

/** 
 * X% of Y -> Result = (X / 100) * Y
 */
export function calcPercentOfNumber(percent: number, value: number): number {
  return (percent / 100) * value;
}

/** 
 * Increase Y by X% -> Result = Y + (Y * X / 100)
 */
export function calcPercentIncrease(value: number, percent: number): number {
  return value + (value * (percent / 100));
}

/** 
 * Decrease Y by X% -> Result = Y - (Y * X / 100)
 */
export function calcPercentDecrease(value: number, percent: number): number {
  return value - (value * (percent / 100));
}

/** 
 * X is what % of Y -> (X / Y) * 100
 */
export function calcWhatPercentIs(x: number, y: number): number {
  if (y === 0) return 0;
  return (x / y) * 100;
}

/**
 * Reverse %: Find original value before % increase/decrease
 */
export function calcReversePercent(finalValue: number, changePercent: number, isIncrease: boolean): number {
  if (isIncrease) {
    return finalValue / (1 + (changePercent / 100));
  } else {
    if (changePercent >= 100) return 0;
    return finalValue / (1 - (changePercent / 100));
  }
}

export interface MultiStep {
  id: string;
  type: 'increase' | 'decrease';
  percent: number;
}

export function calcMultiStep(startValue: number, steps: MultiStep[]): {
  finalValue: number;
  history: string[];
} {
  let currentValue = startValue;
  const history: string[] = [`Starting Value: ${formatResultNumber(startValue)}`];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    if (step.percent <= 0) continue;

    let nextValue = currentValue;
    let amount = currentValue * (step.percent / 100);

    if (step.type === 'increase') {
      nextValue = currentValue + amount;
      history.push(`Step ${i+1} (+${step.percent}%): +${formatResultNumber(amount)} -> ${formatResultNumber(nextValue)}`);
    } else {
      nextValue = currentValue - amount;
      history.push(`Step ${i+1} (-${step.percent}%): -${formatResultNumber(amount)} -> ${formatResultNumber(nextValue)}`);
    }

    currentValue = nextValue;
  }

  return {
    finalValue: currentValue,
    history
  };
}
