import axios from 'axios';

// Create an Axios instance pointed at your backend API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // e.g. http://localhost:5001/api
});

/** Fetch all products */
export async function fetchProducts() {
  const res = await api.get('/products');
  return res.data;
}

/** Fetch single product by ID */
export async function fetchProductById(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

/** Create a new product (Admin) */
export async function createProduct(productData, token) {
  const res = await api.post(
    '/products',
    productData,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

/** Update a product (Admin) */
export async function updateProduct(id, updates, token) {
  const res = await api.put(
    `/products/${id}`,
    updates,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

/** Delete a product (Admin) */
export async function deleteProduct(id, token) {
  const res = await api.delete(
    `/products/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

/** Register a new user */
export async function registerUser({ name, email, password }) {
  const res = await api.post('/users', { name, email, password });
  return res.data;
}

/** Authenticate user and get token */
export async function authUser({ email, password }) {
  const res = await api.post('/users/login', { email, password });
  return res.data;
}

/** Get USD→PHP exchange rate */
export async function fetchUSDtoPHP() {
  const res = await axios.get('https://api.exchangerate.host/latest', {
    params: { base: 'USD', symbols: 'PHP' },
  });
  return res.data.rates.PHP;
}

export default api;