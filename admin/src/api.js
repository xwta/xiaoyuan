import axios from 'axios';

const http = axios.create({
  baseURL: '/api',
  timeout: 10000
});

export function fetchOverview() {
  return http.get('/admin/overview').then(res => res.data);
}

export function fetchProducts() {
  return http.get('/admin/products').then(res => res.data);
}

export function createProduct(data) {
  return http.post('/admin/products', data).then(res => res.data);
}

export function fetchOrders() {
  return http.get('/admin/orders').then(res => res.data);
}

export function fetchAgents() {
  return http.get('/admin/agents').then(res => res.data);
}

export function fetchAgentSummary() {
  return http.get('/agent/summary').then(res => res.data);
}

export default http;
