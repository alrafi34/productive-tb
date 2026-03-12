export interface EmiResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  principal: number;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface SimulationResult {
  newTermMonths: number;
  monthsSaved: number;
  interestSaved: number;
  newTotalInterest: number;
}

export function calculateEmiValue(principal: number, annualRate: number, tenureMonths: number): EmiResult {
  if (principal <= 0 || tenureMonths <= 0) return { emi: 0, totalInterest: 0, totalPayment: principal, principal };
  
  if (annualRate <= 0) {
    const emi = principal / tenureMonths;
    return {
      emi,
      totalInterest: 0,
      totalPayment: principal,
      principal
    };
  }

  const r = (annualRate / 12) / 100; // monthly interest rate
  const n = tenureMonths;
  let emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  // If rate calculation yields infinity or NaN somehow
  if (isNaN(emi) || !isFinite(emi)) emi = 0;

  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  return {
    emi,
    totalInterest,
    totalPayment,
    principal
  };
}

export function generateAmortizationSchedule(principal: number, annualRate: number, tenureMonths: number, extraMonthlyPayment: number = 0): AmortizationRow[] {
  if (principal <= 0 || tenureMonths <= 0) return [];
  
  const schedule: AmortizationRow[] = [];
  let balance = principal;
  
  const r = (annualRate / 12) / 100;
  
  // Calculate Standard EMI required natively before extra payments
  let standardEmi = 0;
  if (annualRate > 0) {
     standardEmi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  } else {
     standardEmi = principal / tenureMonths;
  }

  let month = 1;
  // Guard max iterations to prevent infinite loop on edge cases
  const MAX_MONTHS = 1200; // 100 years

  while (balance > 0.01 && month <= MAX_MONTHS) {
    let interestPayment = balance * r;
    let principalPayment = standardEmi - interestPayment + extraMonthlyPayment;
    
    // Last payment block overriding if we overpay
    if (principalPayment >= balance) {
      principalPayment = balance;
    }

    balance -= principalPayment;
    if (balance < 0) balance = 0;

    let rowPayment = principalPayment + interestPayment;

    schedule.push({
      month,
      payment: rowPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance
    });

    month++;
  }

  return schedule;
}

export function simulateExtraPayments(principal: number, annualRate: number, originalMonths: number, extraPayment: number): SimulationResult {
  const baseStats = calculateEmiValue(principal, annualRate, originalMonths);
  const baseInterest = baseStats.totalInterest;

  if (extraPayment <= 0 || principal <= 0) {
    return {
      newTermMonths: originalMonths,
      monthsSaved: 0,
      interestSaved: 0,
      newTotalInterest: baseInterest
    };
  }

  const schedule = generateAmortizationSchedule(principal, annualRate, originalMonths, extraPayment);
  
  const newTermMonths = schedule.length;
  const monthsSaved = originalMonths - newTermMonths;
  
  const newTotalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
  const interestSaved = baseInterest - newTotalInterest;

  return {
    newTermMonths,
    monthsSaved: Math.max(0, monthsSaved),
    interestSaved: Math.max(0, interestSaved),
    newTotalInterest
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  // Try to use native Intl.NumberFormat if standard currency provided
  try {
     const formatter = new Intl.NumberFormat(undefined, {
       style: currency !== 'NONE' ? 'currency' : 'decimal',
       currency: currency !== 'NONE' ? currency : undefined,
       maximumFractionDigits: 0
     });
     return formatter.format(Math.round(amount));
  } catch (e) {
     return Math.round(amount).toLocaleString(); // Fallback
  }
}
