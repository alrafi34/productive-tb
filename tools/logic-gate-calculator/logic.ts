import { LogicGate, LogicGateInputs, LogicGateResult, TruthTableRow, HistoryEntry } from "./types";

// Calculate logic gate output
export function calculateLogicGate(inputs: LogicGateInputs): LogicGateResult {
  const { gate, inputs: inputValues } = inputs;
  
  let output: number;
  let explanation: string;
  
  if (gate === 'NOT') {
    // NOT gate only uses first input
    output = inputValues[0] ? 0 : 1;
    explanation = `NOT gate: Output is the inverse of input. NOT ${inputValues[0]} = ${output}`;
  } else if (gate === 'XOR' || gate === 'XNOR') {
    // XOR and XNOR only work with exactly 2 inputs
    const a = inputValues[0] || 0;
    const b = inputValues[1] || 0;
    
    if (gate === 'XOR') {
      output = (a !== b) ? 1 : 0;
      explanation = `XOR gate: Output is 1 when inputs are different. ${a} XOR ${b} = ${output}`;
    } else {
      output = (a === b) ? 1 : 0;
      explanation = `XNOR gate: Output is 1 when inputs are the same. ${a} XNOR ${b} = ${output}`;
    }
  } else {
    // AND, OR, NAND, NOR support multiple inputs
    switch (gate) {
      case 'AND':
        output = inputValues.every(val => val === 1) ? 1 : 0;
        explanation = `AND gate: Output is 1 only when ALL inputs are 1. ${inputValues.join(' AND ')} = ${output}`;
        break;
      case 'OR':
        output = inputValues.some(val => val === 1) ? 1 : 0;
        explanation = `OR gate: Output is 1 when at least one input is 1. ${inputValues.join(' OR ')} = ${output}`;
        break;
      case 'NAND':
        output = inputValues.every(val => val === 1) ? 0 : 1;
        explanation = `NAND gate: Output is 0 only when ALL inputs are 1. ${inputValues.join(' NAND ')} = ${output}`;
        break;
      case 'NOR':
        output = inputValues.some(val => val === 1) ? 0 : 1;
        explanation = `NOR gate: Output is 1 only when ALL inputs are 0. ${inputValues.join(' NOR ')} = ${output}`;
        break;
      default:
        output = 0;
        explanation = 'Unknown gate';
    }
  }
  
  const truthTable = generateTruthTable(gate, inputValues.length);
  
  return {
    output,
    truthTable,
    explanation
  };
}

// Generate truth table for a gate
export function generateTruthTable(gate: LogicGate, numInputs: number): TruthTableRow[] {
  const table: TruthTableRow[] = [];
  
  if (gate === 'NOT') {
    // NOT gate has only one input
    table.push({ inputs: [0], output: 1 });
    table.push({ inputs: [1], output: 0 });
    return table;
  }
  
  if (gate === 'XOR' || gate === 'XNOR') {
    // XOR and XNOR only work with 2 inputs
    numInputs = 2;
  }
  
  // Generate all possible combinations
  const totalRows = Math.pow(2, numInputs);
  
  for (let i = 0; i < totalRows; i++) {
    const inputs: number[] = [];
    
    // Convert row number to binary inputs
    for (let j = numInputs - 1; j >= 0; j--) {
      inputs.unshift((i >> j) & 1);
    }
    
    let output: number;
    
    switch (gate) {
      case 'AND':
        output = inputs.every(val => val === 1) ? 1 : 0;
        break;
      case 'OR':
        output = inputs.some(val => val === 1) ? 1 : 0;
        break;
      case 'NAND':
        output = inputs.every(val => val === 1) ? 0 : 1;
        break;
      case 'NOR':
        output = inputs.some(val => val === 1) ? 0 : 1;
        break;
      case 'XOR':
        output = (inputs[0] !== inputs[1]) ? 1 : 0;
        break;
      case 'XNOR':
        output = (inputs[0] === inputs[1]) ? 1 : 0;
        break;
      default:
        output = 0;
    }
    
    table.push({ inputs, output });
  }
  
  return table;
}

// Get gate description
export function getGateDescription(gate: LogicGate): string {
  const descriptions: Record<LogicGate, string> = {
    'AND': 'Output is 1 only when both inputs are 1',
    'OR': 'Output is 1 when at least one input is 1',
    'NOT': 'Output is the inverse of the input',
    'NAND': 'Output is 0 only when both inputs are 1 (NOT AND)',
    'NOR': 'Output is 1 only when both inputs are 0 (NOT OR)',
    'XOR': 'Output is 1 when inputs are different (Exclusive OR)',
    'XNOR': 'Output is 1 when inputs are the same (NOT XOR)'
  };
  
  return descriptions[gate];
}

// Get gate symbol
export function getGateSymbol(gate: LogicGate): string {
  const symbols: Record<LogicGate, string> = {
    'AND': '∧',
    'OR': '∨',
    'NOT': '¬',
    'NAND': '⊼',
    'NOR': '⊽',
    'XOR': '⊕',
    'XNOR': '⊙'
  };
  
  return symbols[gate];
}

// Validate inputs
export function validateInputs(inputs: LogicGateInputs): string | null {
  const { inputs: inputValues, gate } = inputs;
  
  if (!inputValues || inputValues.length === 0) {
    return "At least one input is required";
  }
  
  if (gate === 'NOT' && inputValues.length > 1) {
    return "NOT gate only accepts 1 input";
  }
  
  if ((gate === 'XOR' || gate === 'XNOR') && inputValues.length !== 2) {
    return `${gate} gate requires exactly 2 inputs`;
  }
  
  for (let i = 0; i < inputValues.length; i++) {
    if (inputValues[i] !== 0 && inputValues[i] !== 1) {
      return `Input ${i + 1} must be 0 or 1`;
    }
  }
  
  return null;
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// History management
const HISTORY_KEY = 'logic-gate-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: LogicGateInputs, result: LogicGateResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result
    };
    
    history.unshift(entry);
    
    if (history.length > MAX_HISTORY) {
      history.splice(MAX_HISTORY);
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

// Export truth table to CSV
export function exportTruthTableToCSV(gate: LogicGate, truthTable: TruthTableRow[]): string {
  let csv = `Logic Gate: ${gate}\n\n`;
  
  if (truthTable.length === 0) return csv;
  
  // Generate header based on number of inputs
  const numInputs = truthTable[0].inputs.length;
  const headers: string[] = [];
  for (let i = 0; i < numInputs; i++) {
    headers.push(`Input ${String.fromCharCode(65 + i)}`);
  }
  headers.push('Output');
  csv += headers.join(',') + '\n';
  
  // Add rows
  truthTable.forEach(row => {
    const values = [...row.inputs, row.output];
    csv += values.join(',') + '\n';
  });
  
  return csv;
}

// Export to text
export function exportToText(inputs: LogicGateInputs, result: LogicGateResult): string {
  const lines: string[] = [];
  
  lines.push('LOGIC GATE CALCULATOR - REPORT');
  lines.push('='.repeat(60));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('GATE CONFIGURATION:');
  lines.push('-'.repeat(60));
  lines.push(`Gate Type: ${inputs.gate}`);
  lines.push(`Symbol: ${getGateSymbol(inputs.gate)}`);
  lines.push(`Description: ${getGateDescription(inputs.gate)}`);
  lines.push('');
  lines.push('INPUTS:');
  lines.push('-'.repeat(60));
  inputs.inputs.forEach((value, index) => {
    lines.push(`Input ${String.fromCharCode(65 + index)}: ${value}`);
  });
  lines.push('');
  lines.push('OUTPUT:');
  lines.push('-'.repeat(60));
  lines.push(`Result: ${result.output}`);
  lines.push(`Explanation: ${result.explanation}`);
  lines.push('');
  lines.push('TRUTH TABLE:');
  lines.push('-'.repeat(60));
  
  // Generate header
  const numInputs = inputs.inputs.length;
  const headerParts: string[] = [];
  for (let i = 0; i < numInputs; i++) {
    headerParts.push(String.fromCharCode(65 + i));
  }
  headerParts.push('Output');
  lines.push(headerParts.join(' | '));
  lines.push('-'.repeat(headerParts.length * 4));
  
  // Generate rows
  result.truthTable.forEach(row => {
    const rowParts = [...row.inputs, row.output].map(v => v.toString());
    lines.push(rowParts.join(' | '));
  });
  
  lines.push('');
  lines.push('='.repeat(60));
  lines.push('Generated by Logic Gate Calculator');
  
  return lines.join('\n');
}

// Download file
export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Save last used settings
const SETTINGS_KEY = 'logic-gate-calculator-settings';

export function saveSettings(settings: Partial<LogicGateInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<LogicGateInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

// Get all available gates
export function getAllGates(): LogicGate[] {
  return ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];
}
