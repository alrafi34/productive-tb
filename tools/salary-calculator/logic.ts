export interface SalaryResult {
  annual: number;
  monthly: number;
  weekly: number;
  daily: number;
  hourly: number;
}

export interface SalarySettings {
  workHoursPerWeek: number;
  workDaysPerWeek: number;
  currency: string;
}

export function calculateSalary(
  annualSalary: number,
  workHoursPerWeek: number,
  workDaysPerWeek: number
): SalaryResult {
  const monthly = annualSalary / 12;
  const weekly = annualSalary / 52;
  const daily = weekly / workDaysPerWeek;
  const hourly = weekly / workHoursPerWeek;

  return {
    annual: annualSalary,
    monthly,
    weekly,
    daily,
    hourly
  };
}

export function formatCurrency(amount: number, precision: number = 2, currency: string = "USD"): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(amount);
}

export function formatNumber(amount: number, precision: number = 2): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

export function getSettings(): SalarySettings {
  if (typeof window === 'undefined') {
    return { workHoursPerWeek: 40, workDaysPerWeek: 5, currency: 'USD' };
  }
  
  const saved = localStorage.getItem('salaryCalculatorSettings');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return { workHoursPerWeek: 40, workDaysPerWeek: 5, currency: 'USD' };
    }
  }
  return { workHoursPerWeek: 40, workDaysPerWeek: 5, currency: 'USD' };
}

export function saveSettings(settings: SalarySettings): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('salaryCalculatorSettings', JSON.stringify(settings));
  }
}

export function getSalaryHistory(): Array<{ salary: number; timestamp: number }> {
  if (typeof window === 'undefined') return [];
  
  const saved = localStorage.getItem('salaryCalculatorHistory');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

export function addToHistory(salary: number): void {
  if (typeof window === 'undefined') return;
  
  const history = getSalaryHistory();
  history.unshift({ salary, timestamp: Date.now() });
  if (history.length > 10) history.pop();
  localStorage.setItem('salaryCalculatorHistory', JSON.stringify(history));
}

export function clearHistory(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('salaryCalculatorHistory');
  }
}
