import axios from 'axios';

export async function fetchUSDtoPHP() {
  const res = await axios.get('https://api.exchangerate.host/latest', {
    params: { base: 'USD', symbols: 'PHP' }
  });
  return res.data.rates.PHP;
}
