export interface IdealWeightResult {
  devine: number;
  robinson: number;
  miller: number;
  broca: number;
  min: number;
  max: number;
}

export interface CalculationInput {
  heightCm: number;
  gender: 'male' | 'female';
  unit: 'metric' | 'imperial';
}

export function cmToInches(cm: number): number {
  return cm / 2.54;
}

export function inchesToCm(inches: number): number {
  return inches * 2.54;
}

export function kgToLb(kg: number): number {
  return kg * 2.20462;
}

export function lbToKg(lb: number): number {
  return lb / 2.20462;
}

export function calculateIdealWeight(heightCm: number, gender: 'male' | 'female'): IdealWeightResult {
  if (heightCm <= 0) {
    return { devine: 0, robinson: 0, miller: 0, broca: 0, min: 0, max: 0 };
  }

  const heightInches = cmToInches(heightCm);
  const inchesOver5Ft = heightInches - 60;

  let devine = 0;
  let robinson = 0;
  let miller = 0;

  if (heightInches >= 60) {
    if (gender === 'male') {
      devine = 50.0 + 2.3 * inchesOver5Ft;
      robinson = 52.0 + 1.9 * inchesOver5Ft;
      miller = 56.2 + 1.41 * inchesOver5Ft;
    } else {
      devine = 45.5 + 2.3 * inchesOver5Ft;
      robinson = 49.0 + 1.7 * inchesOver5Ft;
      miller = 53.1 + 1.36 * inchesOver5Ft;
    }
  }

  const broca = heightCm - 100;
  const brocarange = broca * 0.1;

  return {
    devine: parseFloat(devine.toFixed(1)),
    robinson: parseFloat(robinson.toFixed(1)),
    miller: parseFloat(miller.toFixed(1)),
    broca: parseFloat(broca.toFixed(1)),
    min: parseFloat((broca - brocarange).toFixed(1)),
    max: parseFloat((broca + brocarange).toFixed(1))
  };
}

export function getWeightStatus(currentWeight: number, min: number, max: number): string {
  if (currentWeight < min) return 'underweight';
  if (currentWeight > max) return 'overweight';
  return 'healthy';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'underweight':
      return 'text-blue-500';
    case 'overweight':
      return 'text-orange-500';
    case 'healthy':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
}

export function getStatusBg(status: string): string {
  switch (status) {
    case 'underweight':
      return 'bg-blue-50 border-blue-200';
    case 'overweight':
      return 'bg-orange-50 border-orange-200';
    case 'healthy':
      return 'bg-green-50 border-green-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
}
