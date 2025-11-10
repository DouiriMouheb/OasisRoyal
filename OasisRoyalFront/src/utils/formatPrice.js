/**
 * Format price with currency symbol
 * @param {number} price - Price to format
 * @param {string} currency - Currency code (default: TND)
 * @returns {string} Formatted price
 */
export const formatPrice = (price, currency = 'TND') => {
  if (typeof price !== 'number') {
    return '0.00 TND'
  }
  
  return new Intl.NumberFormat('fr-TN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(price)
}

/**
 * Calculate discount percentage
 * @param {number} original - Original price
 * @param {number} discounted - Discounted price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (original, discounted) => {
  if (!original || !discounted) return 0
  return Math.round(((original - discounted) / original) * 100)
}
