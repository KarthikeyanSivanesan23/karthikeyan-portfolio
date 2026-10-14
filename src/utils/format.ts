export function formatPrice(price: string | null, currency = 'INR') {
  if (price === null) return 'Let’s talk'
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(Number(price))
}
