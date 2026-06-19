import axios from 'axios';

const http = axios.create({
  baseURL: '/api',
  timeout: 10000
});

export function fetchProducts() {
  return http.get('/products').then(res => res.data);
}

export function fetchOrders() {
  return http.get('/orders').then(res => res.data);
}

export function fetchAgentSummary() {
  return http.get('/agent/summary').then(res => res.data);
}

export default http;
