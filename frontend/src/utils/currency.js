const USD_TO_PHP_RATE = 56;  
export function toPHP(usdAmount) {
  return Math.round(usdAmount * USD_TO_PHP_RATE);
}
