import axios from 'axios';

const http = axios.create({
  baseURL: '/api',
  timeout: 10000
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('campus_admin_token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export function createSession(data) {
  return http.post('/admin/session', data).then(res => res.data);
}

export function fetchOverview() {
  return http.get('/admin/overview').then(res => res.data);
}

export function fetchProducts() {
  return http.get('/admin/products').then(res => res.data);
}

export function createProduct(data) {
  return http.post('/admin/products', data).then(res => res.data);
}

export function updateProduct(id, data) {
  return http.put(`/admin/products/${id}`, data).then(res => res.data);
}

export function deleteProduct(id) {
  return http.delete(`/admin/products/${id}`).then(res => res.data);
}

export function fetchOrders() {
  return http.get('/admin/orders').then(res => res.data);
}

export function updateOrderStatus(id, data) {
  return http.put(`/admin/orders/${id}/status`, data).then(res => res.data);
}

export function fetchAgents() {
  return http.get('/admin/agents').then(res => res.data);
}

export function createAgent(data) {
  return http.post('/admin/agents', data).then(res => res.data);
}

export function updateAgentStatus(id, data) {
  return http.put(`/admin/agents/${id}/status`, data).then(res => res.data);
}

export function fetchAgentSummary() {
  return http.get('/agent/summary').then(res => res.data);
}

export function fetchOpsAreas() {
  return http.get('/ops/areas').then(res => res.data.data || []);
}

export function fetchOpsBlocks(params = {}) {
  return http.get('/ops/blocks', { params }).then(res => res.data.data || []);
}

export function fetchOpsGoods(params = {}) {
  return http.get('/ops/goods', { params }).then(res => res.data.data || []);
}

export function fetchOpsRecords(bizId) {
  return http.get(`/ops/records/${bizId}`).then(res => res.data.data || []);
}

export default http;
