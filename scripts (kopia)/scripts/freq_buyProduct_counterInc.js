/*
 * description: The script increments one of buyProduct counters.
 * arguments: ["name==buy", "product"]
 */


var counterPrefix = 'buyProduct_',
  productType = $event.product.name.replace(/\s+/g, ''),
  amount = $event.product.productAmount || 0;

if (!productType) {
  throw new Error('Product name is required');
}

$self.counters().inc(counterPrefix+productType, amount);