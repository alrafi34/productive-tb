export interface ProfitMarginResult {
  grossProfit: number;
  grossMargin: number;
  netProfit: number;
  netMargin: number;
  isValid: boolean;
  warnings: string[];
}

export const calculateProfitMargin = (
  revenue: number,
  cogs: number,
  expenses: number = 0
): ProfitMarginResult => {
  const warnings: string[] = [];
  
  if (revenue <= 0) {
    warnings.push("Revenue must be greater than 0");
  }
  if (cogs < 0) {
    warnings.push("COGS cannot be negative");
  }
  if (expenses < 0) {
    warnings.push("Expenses cannot be negative");
  }
  if (cogs > revenue) {
    warnings.push("COGS cannot exceed revenue");
  }

  const isValid = warnings.length === 0;

  const grossProfit = revenue - cogs;
  const grossMargin = isValid ? (grossProfit / revenue) * 100 : 0;
  const netProfit = revenue - cogs - expenses;
  const netMargin = isValid ? (netProfit / revenue) * 100 : 0;

  return {
    grossProfit: isValid ? grossProfit : 0,
    grossMargin: isValid ? grossMargin : 0,
    netProfit: isValid ? netProfit : 0,
    netMargin: isValid ? netMargin : 0,
    isValid,
    warnings
  };
};

export const formatCurrency = (value: number, precision: number = 2): string => {
  return value.toFixed(precision);
};

export const formatPercentage = (value: number, precision: number = 2): string => {
  return value.toFixed(precision);
};

export const getHistory = (): HistoryEntry[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("profitMarginHistory");
  return stored ? JSON.parse(stored) : [];
};

export const saveToHistory = (entry: HistoryEntry): void => {
  if (typeof window === "undefined") return;
  const history = getHistory();
  history.unshift(entry);
  if (history.length > 10) history.pop();
  localStorage.setItem("profitMarginHistory", JSON.stringify(history));
};

export const clearHistory = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("profitMarginHistory");
};

export const deleteHistoryEntry = (id: string): void => {
  if (typeof window === "undefined") return;
  const history = getHistory().filter(entry => entry.id !== id);
  localStorage.setItem("profitMarginHistory", JSON.stringify(history));
};

export interface HistoryEntry {
  id: string;
  timestamp: number;
  revenue: number;
  cogs: number;
  expenses: number;
  grossProfit: number;
  grossMargin: number;
  netProfit: number;
  netMargin: number;
}

export const generateCSV = (
  revenue: number,
  cogs: number,
  expenses: number,
  result: ProfitMarginResult
): string => {
  const headers = ["Metric", "Value"];
  const rows = [
    ["Revenue", revenue.toFixed(2)],
    ["COGS", cogs.toFixed(2)],
    ["Operating Expenses", expenses.toFixed(2)],
    ["Gross Profit", result.grossProfit.toFixed(2)],
    ["Gross Margin (%)", result.grossMargin.toFixed(2)],
    ["Net Profit", result.netProfit.toFixed(2)],
    ["Net Margin (%)", result.netMargin.toFixed(2)]
  ];

  const csv = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");

  return csv;
};

export const downloadCSV = (csvContent: string): void => {
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `profit-margin-${Date.now()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
