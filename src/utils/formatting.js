export function formatCurrency(value, compact = false) {
  if (value === null || value === undefined) return '—';
  if (compact && Math.abs(value) >= 1_000_000) {
    return '$' + (value / 1_000_000).toFixed(2) + 'M';
  }
  if (compact && Math.abs(value) >= 1_000) {
    return '$' + (value / 1_000).toFixed(0) + 'K';
  }
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value, decimals = 2) {
  return (value * 100).toFixed(decimals) + '%';
}
