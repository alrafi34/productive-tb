"use client";

import { useState, useMemo } from "react";
import { MortgageInputs, calculateMortgage, generateAmortizationSchedule, compareLoanTerms, formatCurrency, exportScheduleToCSV, validateInputs } from "./logic";
import MortgageCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type Mode = 'calculator' | 'compare' | 'schedule';

export default function MortgageCalculatorUI() {
  const [mode, setMode] = useState<Mode>('calculator');
  
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [downPayment, setDownPayment] = useState(60000);
  const [extraPayment, setExtraPayment] = useState(0);
  
  const [copied, setCopied] = useState("");

  const inputs: MortgageInputs = { loanAmount, interestRate, loanTermYears, downPayment, extraPayment };
  const error = validateInputs(inputs);
  
  const result = useMemo(() => error ? null : calculateMortgage(inputs), [loanAmount, interestRate, loanTermYears, downPayment, extraPayment, error]);
  const resultNoExtra = useMemo(() => error ? null : calculateMortgage({ ...inputs, extraPayment: 0 }), [loanAmount, interestRate, loanTermYears, downPayment, error]);
  
  const schedule = useMemo(() => {
    if (mode === 'schedule' && !error) {
      return generateAmortizationSchedule(inputs);
    }
    return [];
  }, [mode, loanAmount, interestRate, loanTermYears, downPayment, extraPayment, error]);

  const comparison = useMemo(() => {
    if (mode === 'compare' && !error) {
      return compareLoanTerms(loanAmount, downPayment, interestRate, [15, 20, 30]);
    }
    return [];
  }, [mode, loanAmount, downPayment, interestRate, error]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const getSummaryText = () => {
    if (!result) return "";
    return `Mortgage Summary:\nHome Price: ${formatCurrency(loanAmount)}\nDown Payment: ${formatCurrency(downPayment)}\nLoan Amount: ${formatCurrency(result.principalAmount)}\nInterest Rate: ${interestRate}%\nLoan Term: ${loanTermYears} years\nMonthly Payment: ${formatCurrency(result.monthlyPayment)}\nTotal Interest: ${formatCurrency(result.totalInterest)}\nTotal Payment: ${formatCurrency(result.totalPayment)}\nCalculated via Productive Toolbox`;
  };

  const monthsSaved = resultNoExtra && result ? resultNoExtra.totalMonths - result.totalMonths : 0;
  const interestSaved = resultNoExtra && result ? resultNoExtra.totalInterest - result.totalInterest : 0;

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm gap-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setMode('calculator')} 
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${mode === 'calculator' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Calculator
            </button>
            <button 
              onClick={() => setMode('compare')} 
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${mode === 'compare' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Compare Terms
            </button>
            <button 
              onClick={() => setMode('schedule')} 
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${mode === 'schedule' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Schedule
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-8">
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Home Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input 
                      type="number" 
                      value={loanAmount} 
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-36 bg-gray-50 border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="50000" 
                  max="2000000" 
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Down Payment</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input 
                      type="number" 
                      value={downPayment} 
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-36 bg-gray-50 border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={loanAmount * 0.5} 
                  step="5000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <p className="text-xs text-gray-500 font-medium">
                  {((downPayment / loanAmount) * 100).toFixed(1)}% down payment
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Interest Rate (%)</label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                    <input 
                      type="number" 
                      value={interestRate} 
                      step="0.1"
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-24 bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="15" 
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Loan Term (Years)</label>
                  <input 
                    type="number" 
                    value={loanTermYears} 
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    className="w-20 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="40" 
                  step="1"
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {mode === 'calculator' && (
                <div className="pt-4 mt-4 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-0.5">
                      <label className="text-sm font-bold text-primary uppercase tracking-wide">Extra Monthly Payment</label>
                      <p className="text-[10px] text-gray-400 font-medium">Pay off faster & save interest</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40 font-bold">$</span>
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

            {mode === 'calculator' && extraPayment > 0 && monthsSaved > 0 && (
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg shadow-green-200">
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-80 mb-4">Total Savings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold">{monthsSaved} months</p>
                    <p className="text-[10px] font-bold uppercase opacity-70">Faster Payoff</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{formatCurrency(interestSaved)}</p>
                    <p className="text-[10px] font-bold uppercase opacity-70">Interest Saved</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs font-medium italic opacity-90">
                    By paying {formatCurrency(extraPayment)} extra monthly, you finish {Math.floor(monthsSaved / 12)}y {monthsSaved % 12}m earlier!
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 space-y-6">
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm font-medium">
                {error}
              </div>
            )}

            {mode === 'calculator' && result && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Monthly Payment</p>
                  <h2 className="text-6xl font-black text-gray-900 tracking-tight mb-2">
                    <span className="text-3xl align-top mr-1 font-bold text-primary">$</span>
                    {result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => copyToClipboard(Math.round(result.monthlyPayment).toString(), 'payment')}
                      className="text-xs bg-gray-50 border border-gray-200 hover:bg-gray-100 px-3 py-1.5 rounded-lg font-bold text-gray-600 transition-all"
                    >
                      {copied === 'payment' ? 'Copied' : '📋 Copy'}
                    </button>
                    <button 
                      onClick={() => copyToClipboard(getSummaryText(), 'summary')}
                      className="text-xs bg-gray-900 border border-gray-900 hover:bg-black px-3 py-1.5 rounded-lg font-bold text-white transition-all shadow-md"
                    >
                      {copied === 'summary' ? 'Copied' : '📋 Copy Summary'}
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Loan Amount</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(result.principalAmount)}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Interest</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(result.totalInterest)}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Payment</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(result.totalPayment)}</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Payment Breakdown</h4>
                    <span className="text-[10px] font-bold text-gray-400">Principal vs Interest</span>
                  </div>
                  <div className="w-full h-8 bg-gray-100 rounded-lg overflow-hidden flex shadow-inner">
                    <div 
                      className="bg-primary h-full flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500" 
                      style={{ width: `${(result.principalAmount / result.totalPayment) * 100}%` }}
                    >
                      {Math.round((result.principalAmount / result.totalPayment) * 100)}%
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

            {mode === 'compare' && comparison.length > 0 && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-bold text-gray-900">Compare Loan Terms</h3>
                    <p className="text-xs text-gray-500 mt-1">See how different loan terms affect your payments</p>
                  </div>
                  <div className="p-6 space-y-4">
                    {comparison.map((comp) => (
                      <div key={comp.term} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-bold text-gray-900">{comp.term}-Year Mortgage</h4>
                          <span className="text-2xl font-black text-primary">{formatCurrency(comp.monthlyPayment)}<span className="text-xs text-gray-500 font-normal">/mo</span></span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Interest</p>
                            <p className="font-bold text-gray-900">{formatCurrency(comp.totalInterest)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Payment</p>
                            <p className="font-bold text-gray-900">{formatCurrency(comp.totalPayment)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mode === 'schedule' && schedule.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full max-h-[800px]">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">Amortization Schedule</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monthly breakdown for {loanTermYears} years</p>
                  </div>
                  <button 
                    onClick={() => exportScheduleToCSV(schedule)}
                    className="text-xs bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-bold shadow-sm transition-all"
                  >
                    💾 Export CSV
                  </button>
                </div>
                
                <div className="flex-1 overflow-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-white sticky top-0 uppercase tracking-wide text-[10px] text-gray-400 font-bold border-b border-gray-100 shadow-sm z-10">
                      <tr>
                        <th className="px-5 py-4">Month</th>
                        <th className="px-5 py-4">Payment</th>
                        <th className="px-5 py-4">Principal</th>
                        <th className="px-5 py-4">Interest</th>
                        <th className="px-5 py-4 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {schedule.map((row) => (
                        <tr key={row.month} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-4 font-bold text-gray-900">{row.month}</td>
                          <td className="px-5 py-4 font-medium text-gray-600">{formatCurrency(row.payment)}</td>
                          <td className="px-5 py-4 font-medium text-green-600">{formatCurrency(row.principal)}</td>
                          <td className="px-5 py-4 font-medium text-red-500">{formatCurrency(row.interest)}</td>
                          <td className="px-5 py-4 text-right font-mono font-bold text-gray-900">{formatCurrency(row.balance)}</td>
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

      <MortgageCalculatorSEO />

      <RelatedTools 
        currentTool="mortgage-calculator"
        tools={['loan-emi-calculator', 'simple-interest-calculator', 'discount-calculator']}
      />
    </>
  );
}
