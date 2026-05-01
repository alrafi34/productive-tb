import { EscalationType, Currency, EscalationCalculation, YearlyBreakdown, HistoryEntry } from "./types";

const HISTORY_KEY = "escalation-cost-calculator-history";
const MAX_HISTORY = 10;

export function calculateCompoundEscalation(baseCost: number, rate: number, duration: number): number {
  return baseCost * Math.pow(1 + rate, duration);
}

export function calculateSimpleEscalation(baseCost: number, rate: number, duration: number): number {
  return baseCost * (1 + (rate * duration));
}

export function calculateYearlyBreakdown(
  baseCost: number,
  rate: number,
  duration: number,
  escalationType: EscalationType
): YearlyBreakdown[] {
  const breakdown: YearlyBreakdown[] = [];
  
  for (let year = 0; year <= duration; year++) {
    let cost: number;
    
    if (escalationType === "compound") {
      cost = baseCost * Math.pow(1 + rate, year);
    } else {
      cost = baseCost * (1 + (rate * year));
    }
    
    const increase = year === 0 ? 0 : cost - (breakdown[year - 1]?.cost || baseCost);
    const cumulativeIncrease = cost - baseCost;
    
    breakdown.push({
      year,
      cost,
      increase,
      cumulativeIncrease
    });
  }
  
  return breakdown;
}

export function performEscalationCalculation(
  baseCost: number,
  duration: number,
  escalationRate: number,
  escalationType: EscalationType,
  currency: Currency
): EscalationCalculation {
  const rate = escalationRate / 100;
  
  const futureCost = escalationType === "compound"
    ? calculateCompoundEscalation(baseCost, rate, duration)
    : calculateSimpleEscalation(baseCost, rate, duration);
  
  const totalIncrease = futureCost - baseCost;
  const percentageIncrease = (totalIncrease / baseCost) * 100;
  
  const yearlyBreakdown = calculateYearlyBreakdown(baseCost, rate, duration, escalationType);
  
  return {
    baseCost,
    duration,
    escalationRate,
    escalationType,
    currency,
    futureCost,
    totalIncrease,
    percentageIncrease,
    yearlyBreakdown,
    timestamp: Date.now()
  };
}

export function validateInputs(
  baseCost: number,
  duration: number,
  escalationRate: number
): string | null {
  if (isNaN(baseCost) || baseCost <= 0) return "Base cost must be greater than 0";
  if (isNaN(duration) || duration <= 0) return "Duration must be greater than 0";
  if (isNaN(escalationRate) || escalationRate < 0) return "Escalation rate must be 0 or greater";
  if (duration > 50) return "Duration cannot exceed 50 years";
  if (escalationRate > 100) return "Escalation rate cannot exceed 100%";
  return null;
}

export function formatNumber(value: number, decimals: number = 0): string {
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatCurrency(value: number, currency: Currency, decimals: number = 0): string {
  const formatted = formatNumber(value, decimals);
  
  const symbols: Record<Currency, string> = {
    "USD": "$",
    "INR": "₹",
    "BDT": "৳",
    "EUR": "€",
    "GBP": "£"
  };
  
  return `${symbols[currency]}${formatted}`;
}

export function getCurrencySymbol(currency: Currency): string {
  const symbols: Record<Currency, string> = {
    "USD": "$",
    "INR": "₹",
    "BDT": "৳",
    "EUR": "€",
    "GBP": "£"
  };
  return symbols[currency];
}

export function getEscalationTypeLabel(type: EscalationType): string {
  return type === "compound" ? "Compound" : "Simple";
}

export function getRatePresets() {
  return [
    { label: "5%", value: 5 },
    { label: "8%", value: 8 },
    { label: "10%", value: 10 },
    { label: "12%", value: 12 },
    { label: "15%", value: 15 }
  ];
}

export function getProjectPresets() {
  return [
    {
      name: "Small Residential",
      description: "Single family home",
      baseCost: 1000000,
      duration: 2,
      escalationRate: 8
    },
    {
      name: "Medium Commercial",
      description: "Office building",
      baseCost: 5000000,
      duration: 3,
      escalationRate: 10
    },
    {
      name: "Large Infrastructure",
      description: "Bridge or highway",
      baseCost: 10000000,
      duration: 5,
      escalationRate: 12
    },
    {
      name: "High-Rise Building",
      description: "Multi-story complex",
      baseCost: 20000000,
      duration: 4,
      escalationRate: 10
    },
    {
      name: "Industrial Facility",
      description: "Factory or plant",
      baseCost: 15000000,
      duration: 3,
      escalationRate: 9
    },
    {
      name: "Public Works",
      description: "Government project",
      baseCost: 8000000,
      duration: 4,
      escalationRate: 8
    }
  ];
}

export function getEscalationIntensity(percentageIncrease: number): { level: string; description: string; color: string } {
  if (percentageIncrease < 10) {
    return {
      level: "Low",
      description: "Minimal cost increase",
      color: "green"
    };
  } else if (percentageIncrease < 25) {
    return {
      level: "Moderate",
      description: "Expected cost increase",
      color: "blue"
    };
  } else if (percentageIncrease < 50) {
    return {
      level: "High",
      description: "Significant cost increase",
      color: "yellow"
    };
  } else if (percentageIncrease < 100) {
    return {
      level: "Very High",
      description: "Major cost escalation",
      color: "orange"
    };
  } else {
    return {
      level: "Extreme",
      description: "Critical cost escalation",
      color: "red"
    };
  }
}

// History management
export function saveToHistory(calculation: EscalationCalculation): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      calculation,
      timestamp: Date.now()
    };
    
    history.unshift(entry);
    
    if (history.length > MAX_HISTORY) {
      history.splice(MAX_HISTORY);
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save to history:", error);
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load history:", error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear history:", error);
  }
}

// Export functions
export function exportToText(calculation: EscalationCalculation): string {
  const intensity = getEscalationIntensity(calculation.percentageIncrease);
  
  return `ESCALATION COST CALCULATION REPORT
Generated: ${new Date(calculation.timestamp).toLocaleString()}

PROJECT DETAILS
Base Cost: ${formatCurrency(calculation.baseCost, calculation.currency)}
Duration: ${calculation.duration} years
Escalation Rate: ${calculation.escalationRate}% per year
Calculation Type: ${getEscalationTypeLabel(calculation.escalationType)}

RESULTS
Future Cost: ${formatCurrency(calculation.futureCost, calculation.currency)}
Total Increase: ${formatCurrency(calculation.totalIncrease, calculation.currency)}
Percentage Increase: ${formatNumber(calculation.percentageIncrease, 2)}%
Escalation Level: ${intensity.level} - ${intensity.description}

YEARLY BREAKDOWN
${calculation.yearlyBreakdown.map(year => 
  `Year ${year.year}: ${formatCurrency(year.cost, calculation.currency)} (Increase: ${formatCurrency(year.increase, calculation.currency)})`
).join('\n')}
`;
}

export function exportToCSV(calculation: EscalationCalculation): string {
  const header = "Year,Cost,Yearly Increase,Cumulative Increase\n";
  const rows = calculation.yearlyBreakdown.map(year => 
    `${year.year},${year.cost.toFixed(2)},${year.increase.toFixed(2)},${year.cumulativeIncrease.toFixed(2)}`
  ).join('\n');
  
  return header + rows;
}

export function downloadFile(content: string, filename: string, type: string = 'text/plain'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
