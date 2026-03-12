"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  EmiResult, 
  AmortizationRow, 
  SimulationResult,
  calculateEmiValue,
  generateAmortizationSchedule,
  simulateExtraPayments,
  formatCurrency
} from "./logic";
import LoanEmiCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type Mode = 'calculator' | 'compare' | 'schedule';

const CURRENCIES = [
  { code: 'USD', name: 'USD ($)', symbol: '$' },
  { code: 'EUR', name: 'EUR (€)', symbol: '€' },
  { code: 'GBP', name: 'GBP (£)', symbol: '£' },
  { code: 'INR', name: 'INR (₹)', symbol: '₹' },
  { code: 'NONE', name: 'Generic', symbol: '' },
];

export default function LoanEmiCalculatorUI() {
  const [mode, setMode] = useState<Mode>('calculator');
  const [currency, setCurrency] = useState('USD');

  // Primary Loan Inputs
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(5);
  const [tenureUnit, setTenureUnit] = useState<'years' | 'months'>('years');
  const [extraPayment, setExtraPayment] = useState(0);

  // Comparison Loan Inputs
  const [principalB, setPrincipalB] = useState(500000);
  const [rateB, setRateB] = useState(8);
  const [tenureB, setTenureB] = useState(5);

  const [copied, setCopied] = useState("");

  const months = tenureUnit === 'years' ? tenure * 12 : tenure;
  const monthsB = tenure * 12; // tenureUnit in compare usually matches A

  const result = useMemo(() => calculateEmiValue(principal, rate, months), [principal, rate, months]);
  const resultB = useMemo(() => calculateEmiValue(principalB, rateB, monthsB), [principalB, rateB, monthsB]);
  
  const simulation = useMemo(() => simulateExtraPayments(principal, rate, months, extraPayment), [principal, rate, months, extraPayment]);
  
  const schedule = useMemo(() => {
    if (mode === 'schedule') {
        return generateAmortizationSchedule(principal, rate, months, extraPayment);
    }
    return [];
  }, [principal, rate, months, extraPayment, mode]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const exportCSV = () => {
    const fullSchedule = generateAmortizationSchedule(principal, rate, months, extraPayment);
    if (fullSchedule.length === 0) return;

    let csv = "Month,EMI,Principal,Interest,Balance\n";
    fullSchedule.forEach(row => {
      csv += `${row.month},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "amortization_schedule.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getSummaryText = () => {
    return `Loan Summary:
Loan Amount: ${formatCurrency(principal, currency)}
Interest Rate: ${rate}%
Tenure: ${tenure} ${tenureUnit}
Monthly EMI: ${formatCurrency(result.emi, currency)}
Total Interest: ${formatCurrency(result.totalInterest, currency)}
Total Payment: ${formatCurrency(result.totalPayment, currency)}
Calculated via Productive Toolbox`;
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header & Settings */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm gap-4">
           <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setMode('calculator')} 
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${mode === 'calculator' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                EMI Calculator
              </button>
              <button 
                onClick={() => setMode('compare')} 
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${mode === 'compare' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Compare Loans
              </button>
              <button 
                onClick={() => setMode('schedule')} 
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${mode === 'schedule' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Schedule
              </button>
           </div>

           <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Currency:</span>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
           </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* INPUT PANEL */}
          <div className="lg:col-span-5 space-y-6">
             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-8">
                
                {/* Loan Amount */}
                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Loan Amount</label>
                      <div className="relative">
                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{CURRENCIES.find(c => c.code === currency)?.symbol}</span>
                         <input 
                           type="number" 
                           value={principal} 
                           onChange={(e) => setPrincipal(Number(e.target.value))}
                           className="w-32 bg-gray-50 border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                         />
                      </div>
                   </div>
                   <input 
                     type="range" 
                     min="10000" 
                     max="10000000" 
                     step="10000"
                     value={principal}
                     onChange={(e) => setPrincipal(Number(e.target.value))}
                     className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                   />
                </div>

                {/* Interest Rate */}
                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Interest Rate (%)</label>
                      <div className="relative">
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                         <input 
                           type="number" 
                           value={rate} 
                           step="0.1"
                           onChange={(e) => setRate(Number(e.target.value))}
                           className="w-24 bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                         />
                      </div>
                   </div>
                   <input 
                     type="range" 
                     min="1" 
                     max="30" 
                     step="0.1"
                     value={rate}
                     onChange={(e) => setRate(Number(e.target.value))}
                     className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                   />
                </div>

                {/* Loan Tenure */}
                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Loan Tenure</label>
                      <div className="flex gap-2">
                         <input 
                           type="number" 
                           value={tenure} 
                           onChange={(e) => setTenure(Number(e.target.value))}
                           className="w-20 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                         />
                         <select 
                           value={tenureUnit}
                           onChange={(e) => setTenureUnit(e.target.value as 'years' | 'months')}
                           className="bg-gray-100 border border-gray-200 rounded-lg px-2 py-2 text-sm font-bold text-gray-600 focus:outline-none"
                         >
                            <option value="years">Years</option>
                            <option value="months">Months</option>
                         </select>
                      </div>
                   </div>
                   <input 
                     type="range" 
                     min="1" 
                     max={tenureUnit === 'years' ? 50 : 600} 
                     step="1"
                     value={tenure}
                     onChange={(e) => setTenure(Number(e.target.value))}
                     className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                   />
                </div>

                {/* Extra Payment (Savings Simulator) */}
                {mode === 'calculator' && (
                  <div className="pt-4 mt-4 border-t border-gray-100 space-y-4">
                     <div className="flex justify-between items-end">
                        <div className="space-y-0.5">
                           <label className="text-sm font-bold text-primary uppercase tracking-wide">Extra Monthly Payment</label>
                           <p className="text-[10px] text-gray-400 font-medium">See how much interest you save</p>
                        </div>
                        <div className="relative">
                           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40 font-bold">{CURRENCIES.find(c => c.code === currency)?.symbol}</span>
                           <input 
                             type="number" 
                             value={extraPayment} 
                             onChange={(e) => setExtraPayment(Number(e.target.value))}
                             className="w-28 bg-primary/5 border border-primary/10 rounded-lg pl-7 pr-3 py-2 text-right font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                           />
                        </div>
                     </div>
                  </div>
                )}
             </div>

             {/* Dynamic Savings Card */}
             {mode === 'calculator' && extraPayment > 0 && simulation.monthsSaved > 0 && (
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg shadow-green-200">
                   <h4 className="text-xs font-bold uppercase tracking-widest opacity-80 mb-4">Total Long-term Savings</h4>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <p className="text-2xl font-bold">{simulation.monthsSaved} months</p>
                         <p className="text-[10px] font-bold uppercase opacity-70">Faster Repayment</p>
                      </div>
                      <div>
                         <p className="text-2xl font-bold">{formatCurrency(simulation.interestSaved, 'NONE')} <span className="text-sm font-normal opacity-80">{currency}</span></p>
                         <p className="text-[10px] font-bold uppercase opacity-70">Interest Saved</p>
                      </div>
                   </div>
                   <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs font-medium italic opacity-90">By paying {formatCurrency(extraPayment, currency)} extra monthly, you finish {Math.floor(simulation.monthsSaved / 12)}y {simulation.monthsSaved % 12}m earlier!</p>
                   </div>
                </div>
             )}
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-7 space-y-6">
             
             {/* MAIN EMI DISPLAY */}
             {mode === 'calculator' && (
                <div className="space-y-6">
                   <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Monthly Installment (EMI)</p>
                      <h2 className="text-6xl font-black text-gray-900 tracking-tight mb-2">
                        {currency !== 'NONE' && <span className="text-3xl align-top mr-1 font-bold text-primary">{CURRENCIES.find(c => c.code === currency)?.symbol}</span>}
                        {result.emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </h2>
                      <div className="flex gap-2">
                         <button 
                           onClick={() => copyToClipboard(Math.round(result.emi).toString(), 'emi')}
                           className="text-xs bg-gray-50 border border-gray-200 hover:bg-gray-100 px-3 py-1.5 rounded-lg font-bold text-gray-600 transition-all"
                         >
                            {copied === 'emi' ? 'Copied' : '📋 Copy EMI'}
                         </button>
                         <button 
                           onClick={() => copyToClipboard(getSummaryText(), 'summary')}
                           className="text-xs bg-gray-900 border border-gray-900 hover:bg-black px-3 py-1.5 rounded-lg font-bold text-white transition-all shadow-md"
                         >
                            {copied === 'summary' ? 'Copied Sum' : '📋 Copy Summary'}
                         </button>
                      </div>
                   </div>

                   <div className="grid sm:grid-cols-3 gap-6">
                      <div className="bg-white rounded-xl border border-gray-100 p-5">
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Principal</p>
                         <p className="text-lg font-bold text-gray-900">{formatCurrency(result.principal, currency)}</p>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-100 p-5">
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Interest</p>
                         <p className="text-lg font-bold text-gray-900">{formatCurrency(result.totalInterest, currency)}</p>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-100 p-5">
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Payment</p>
                         <p className="text-lg font-bold text-gray-900">{formatCurrency(result.totalPayment, currency)}</p>
                      </div>
                   </div>

                   {/* Visual scale chart */}
                   <div className="bg-white rounded-xl border border-gray-100 p-6">
                      <div className="flex justify-between items-center mb-3">
                         <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Breakdown Percentage</h4>
                         <span className="text-[10px] font-bold text-gray-400">Principal vs Interest</span>
                      </div>
                      <div className="w-full h-8 bg-gray-100 rounded-lg overflow-hidden flex shadow-inner">
                         <div 
                           className="bg-primary h-full flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500" 
                           style={{ width: `${(result.principal / result.totalPayment) * 100}%` }}
                         >
                            {Math.round((result.principal / result.totalPayment) * 100)}%
                         </div>
                         <div 
                           className="bg-gray-300 h-full flex items-center justify-center text-[10px] font-bold text-gray-600 transition-all duration-500" 
                           style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
                         >
                            {Math.round((result.totalInterest / result.totalPayment) * 100)}%
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {/* COMPARE MODE */}
             {mode === 'compare' && (
                <div className="space-y-6">
                   <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                         <h3 className="font-bold text-gray-900">Compare with Alternative Loan</h3>
                      </div>
                      <div className="p-6 grid grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loan Option A (Current)</h4>
                            <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                               <p className="text-xs font-medium text-gray-500">EMI</p>
                               <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.emi, currency)}</p>
                               <p className="text-[10px] font-bold text-primary mt-2">Rate: {rate}%</p>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <div className="flex justify-between items-center">
                               <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Loan Option B</h4>
                               <div className="flex gap-1 items-center">
                                  <input 
                                    type="number" 
                                    value={rateB} 
                                    onChange={(e) => setRateB(Number(e.target.value))}
                                    className="w-12 bg-white border border-gray-200 rounded px-1 py-0.5 text-xs font-bold text-gray-900"
                                  />
                                  <span className="text-[10px] font-bold text-gray-400">%</span>
                               </div>
                            </div>
                            <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                               <p className="text-xs font-medium text-gray-500">EMI</p>
                               <p className="text-2xl font-bold text-primary">{formatCurrency(resultB.emi, currency)}</p>
                               <input 
                                 type="range" 
                                 min="1" 
                                 max="30" 
                                 step="0.1" 
                                 value={rateB} 
                                 onChange={(e) => setRateB(Number(e.target.value))}
                                 className="w-full h-1 mt-3 bg-primary/20 rounded appearance-none accent-primary"
                               />
                            </div>
                         </div>
                      </div>

                      {/* Comparison Findings */}
                      <div className="p-6 bg-gray-900 text-white rounded-b-2xl">
                         <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="text-center sm:text-left">
                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Lifetime Cost Difference</p>
                               <h3 className="text-3xl font-bold">
                                 {formatCurrency(Math.abs(result.totalPayment - resultB.totalPayment), currency)}
                               </h3>
                               <p className={`text-xs font-bold mt-1 ${result.totalPayment > resultB.totalPayment ? 'text-green-400' : 'text-red-400'}`}>
                                 {result.totalPayment > resultB.totalPayment 
                                   ? `Option B saves you more over ${tenure} years` 
                                   : `Option A is the better choice internally`}
                               </p>
                            </div>
                            <div className="text-center bg-white/10 p-3 rounded-xl border border-white/10">
                               <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Monthly Difference</p>
                               <p className="text-xl font-bold">{formatCurrency(Math.abs(result.emi - resultB.emi), currency)}</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {/* SCHEDULE MODE */}
             {mode === 'schedule' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full max-h-[800px]">
                   <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-3">
                      <div>
                         <h3 className="font-bold text-gray-900 leading-tight">Amortization Schedule</h3>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monthly Breakdown for {tenure} {tenureUnit}</p>
                      </div>
                      <button 
                        onClick={exportCSV}
                        className="text-xs bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-bold shadow-sm transition-all"
                      >
                         💾 Export CSV
                      </button>
                   </div>
                   
                   <div className="flex-1 overflow-auto custom-scrollbar">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                         <thead className="bg-white sticky top-0 uppercase tracking-wide text-[10px] text-gray-400 font-bold border-b border-gray-100 shadow-sm z-10">
                            <tr>
                               <th className="px-5 py-4">Month</th>
                               <th className="px-5 py-4">EMI</th>
                               <th className="px-5 py-4">Principal</th>
                               <th className="px-5 py-4">Interest</th>
                               <th className="px-5 py-4 text-right">Balance</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100 bg-white">
                            {schedule.map((row) => (
                               <tr key={row.month} className="hover:bg-gray-50/50 transition-colors">
                                  <td className="px-5 py-4 font-bold text-gray-900">{row.month}</td>
                                  <td className="px-5 py-4 font-medium text-gray-600">{formatCurrency(row.payment, currency)}</td>
                                  <td className="px-5 py-4 font-medium text-green-600">{formatCurrency(row.principal, currency)}</td>
                                  <td className="px-5 py-4 font-medium text-red-500">{formatCurrency(row.interest, currency)}</td>
                                  <td className="px-5 py-4 text-right font-mono font-bold text-gray-900">{formatCurrency(row.balance, currency)}</td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             )}

          </div>

        </div>
      </div>

      <LoanEmiCalculatorSEO />

      <RelatedTools 
        currentTool="loan-emi-calculator"
        tools={['bmi-calculator', 'age-calculator', 'percentage-calculator']}
      />
    </>
  );
}
