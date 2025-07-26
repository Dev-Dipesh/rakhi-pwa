export function generateValidGifts(min: number, max: number): number[] {
  if (min > max) {
    throw new Error('Minimum amount cannot be greater than maximum amount');
  }

  const validAmounts: number[] = [];
  
  for (let n = 0; ; n++) {
    const amount = 10 * n + 1;
    if (amount > max) break;
    if (amount >= min) {
      validAmounts.push(amount);
    }
  }

  if (validAmounts.length === 0) {
    throw new Error(`No valid gift amounts found between ₹${min} and ₹${max}. Please try a wider range.`);
  }

  if (validAmounts.length < 3) {
    throw new Error(`Only ${validAmounts.length} valid amounts found. Need at least 3 for envelope selection.`);
  }

  const shuffled = [...validAmounts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export function isValidAmount(amount: number): boolean {
  return amount > 0 && (amount - 1) % 10 === 0;
}