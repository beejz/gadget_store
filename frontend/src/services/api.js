import axios from 'axios';

// Create an Axios instance pointed at your backend API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

/** Fetch all gadgets */
export async function fetchProducts() {
  const { data } = await api.get('/gadgets');
  return data;
}

/** Fetch single gadget by ID */
export async function fetchProductById(id) {
  const { data } = await api.get(`/gadgets/${id}`);
  return data;
}

/** Create a new gadget (Admin) — no auth header */
export async function createProduct(productData) {
  const { data } = await api.post('/gadgets', productData);
  return data;
}

/** Update a gadget (Admin) — no auth header */
export async function updateProduct(id, updates) {
  const { data } = await api.put(`/gadgets/${id}`, updates);
  return data;
}

/** Delete a gadget (Admin) — no auth header */
export async function deleteProduct(id) {
  const { data } = await api.delete(`/gadgets/${id}`);
  return data;
}

/** Register a new user */
export async function registerUser({ name, email, password }) {
  const res = await api.post('/users', { name, email, password });
  const { token, user } = res.data;
  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  return res.data;
}

/** Authenticate user and get token */
export async function authUser({ email, password }) {
  const res = await api.post('/users/login', { email, password });
  const { token, user } = res.data;
  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  return res.data;
}

/** Get USD→PHP exchange rate (external) */
export async function fetchUSDtoPHP() {
  const res = await axios.get('https://api.exchangerate.host/latest', {
    params: { base: 'USD', symbols: 'PHP' },
  });
  return res.data.rates.PHP;
}

export default api;
