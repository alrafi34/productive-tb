export interface DiscountStep {
  id: string;
  type: 'percent' | 'fixed';
  value: number;
}

export interface CalculationResult {
  originalPrice: number;
  finalPrice: number;
  discountAmount: number;
  savingsPercentage: number;
  taxAmount: number;
  calculationSteps: string[];
}

export function calculateDiscount(
  originalPrice: number,
  discounts: DiscountStep[],
  taxPercent: number
): CalculationResult {
  let currentPrice = originalPrice;
  let totalDiscount = 0;
  const steps: string[] = [`Original Price: $${originalPrice.toFixed(2)}`];

  for (let i = 0; i < discounts.length; i++) {
    const discount = discounts[i];
    if (discount.value <= 0) continue;
    
    let stepDiscount = 0;
    if (discount.type === 'percent') {
      stepDiscount = currentPrice * (discount.value / 100);
      const afterStep = currentPrice - stepDiscount;
      steps.push(`Discount ${i+1} (${discount.value}%): -$${stepDiscount.toFixed(2)} -> $${afterStep.toFixed(2)}`);
    } else {
      stepDiscount = Math.min(discount.value, currentPrice);
      const afterStep = currentPrice - stepDiscount;
      steps.push(`Discount ${i+1} ($${discount.value}): -$${stepDiscount.toFixed(2)} -> $${afterStep.toFixed(2)}`);
    }
    
    currentPrice -= stepDiscount;
    totalDiscount += stepDiscount;
  }

  let taxAmount = 0;
  if (taxPercent > 0) {
    taxAmount = currentPrice * (taxPercent / 100);
    steps.push(`Tax (${taxPercent}%): +$${taxAmount.toFixed(2)} -> $${(currentPrice + taxAmount).toFixed(2)}`);
    currentPrice += taxAmount;
  }

  const finalPrice = currentPrice;
  const savingsPercentage = originalPrice > 0 ? (totalDiscount / originalPrice) * 100 : 0;

  return {
    originalPrice,
    finalPrice,
    discountAmount: totalDiscount,
    savingsPercentage,
    taxAmount,
    calculationSteps: steps
  };
}

export function calculateOriginalPrice(salePrice: number, discountPercent: number): number {
  if (discountPercent >= 100) return 0;
  if (discountPercent <= 0) return salePrice;
  return salePrice / (1 - (discountPercent / 100));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
