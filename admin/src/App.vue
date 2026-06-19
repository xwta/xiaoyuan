<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="logo">校园零食后台</div>
      <div
        v-for="item in menus"
        :key="item.key"
        class="menu"
        :class="{ active: activeMenu === item.key }"
        @click="activeMenu = item.key"
      >
        {{ item.label }}
      </div>
    </aside>

    <main class="main">
      <header class="header">
        <div>
          <h1>{{ currentTitle }}</h1>
          <p>校园零食平台运营管理</p>
        </div>
        <el-button type="primary" @click="loadData">刷新数据</el-button>
      </header>

      <template v-if="activeMenu === 'dashboard'">
        <section class="stats">
          <el-card class="stat-card">
            <div class="label">订单数量</div>
            <div class="value">{{ overview.orderCount }}</div>
          </el-card>
          <el-card class="stat-card">
            <div class="label">销售金额</div>
            <div class="value">¥{{ overview.salesAmount }}</div>
          </el-card>
          <el-card class="stat-card">
            <div class="label">代理点</div>
            <div class="value">{{ overview.agentCount }}</div>
          </el-card>
          <el-card class="stat-card">
            <div class="label">商品数量</div>
            <div class="value">{{ overview.productCount }}</div>
          </el-card>
        </section>

        <section class="content-grid">
          <el-card>
            <template #header>最近订单</template>
            <el-table :data="orders" size="small" stripe>
              <el-table-column prop="orderNo" label="订单号" min-width="160" />
              <el-table-column prop="statusText" label="状态" width="100" />
              <el-table-column prop="deliveryText" label="方式" width="120" />
              <el-table-column prop="payAmount" label="金额" width="100">
                <template #default="scope">¥{{ Number(scope.row.payAmount || 0).toFixed(2) }}</template>
              </el-table-column>
            </el-table>
          </el-card>

          <el-card>
            <template #header>商品列表</template>
            <el-table :data="products" size="small" stripe>
              <el-table-column prop="name" label="商品" min-width="120" />
              <el-table-column prop="price" label="价格" width="90">
                <template #default="scope">¥{{ Number(scope.row.price || 0).toFixed(2) }}</template>
              </el-table-column>
              <el-table-column prop="count" label="数量" width="90" />
            </el-table>
          </el-card>
        </section>
      </template>

      <ProductManager v-if="activeMenu === 'products'" :products="products" @refresh="loadData" />
      <OrderManager v-if="activeMenu === 'orders'" :orders="orders" @refresh="loadData" />
      <AgentManager v-if="activeMenu === 'agents'" :agents="agents" @refresh="loadData" />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import AgentManager from './components/AgentManager.vue';
import OrderManager from './components/OrderManager.vue';
import ProductManager from './components/ProductManager.vue';
import { fetchAgents, fetchOrders, fetchOverview, fetchProducts } from './api';

const menus = [
  { key: 'dashboard', label: '数据看板' },
  { key: 'products', label: '商品管理' },
  { key: 'orders', label: '订单管理' },
  { key: 'agents', label: '代理点管理' }
];

const activeMenu = ref('dashboard');
const overview = reactive({ productCount: 0, orderCount: 0, agentCount: 0, salesAmount: '0.00' });
const products = ref([]);
const orders = ref([]);
const agents = ref([]);

const currentTitle = computed(() => menus.find(item => item.key === activeMenu.value)?.label || '数据看板');

async function loadData() {
  const [overviewData, productData, orderData, agentData] = await Promise.all([
    fetchOverview(),
    fetchProducts(),
    fetchOrders(),
    fetchAgents()
  ]);

  overview.productCount = overviewData.productCount || 0;
  overview.orderCount = overviewData.orderCount || 0;
  overview.agentCount = overviewData.agentCount || 0;
  overview.salesAmount = Number(overviewData.salesAmount || 0).toFixed(2);
  products.value = productData;
  orders.value = orderData;
  agents.value = agentData;
}

onMounted(loadData);
</script>
