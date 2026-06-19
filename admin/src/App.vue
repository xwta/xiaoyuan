<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="logo">校园零食后台</div>
      <div class="menu active">数据看板</div>
      <div class="menu">商品管理</div>
      <div class="menu">订单管理</div>
      <div class="menu">代理点管理</div>
      <div class="menu">佣金结算</div>
    </aside>

    <main class="main">
      <header class="header">
        <div>
          <h1>数据看板</h1>
          <p>校园零食平台运营概览</p>
        </div>
        <el-button type="primary" @click="loadData">刷新数据</el-button>
      </header>

      <section class="stats">
        <el-card class="stat-card">
          <div class="label">今日订单</div>
          <div class="value">{{ summary.todayOrders }}</div>
        </el-card>
        <el-card class="stat-card">
          <div class="label">今日销售额</div>
          <div class="value">¥{{ summary.todaySales }}</div>
        </el-card>
        <el-card class="stat-card">
          <div class="label">今日佣金</div>
          <div class="value">¥{{ summary.todayCommission }}</div>
        </el-card>
        <el-card class="stat-card">
          <div class="label">商品数量</div>
          <div class="value">{{ products.length }}</div>
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
    </main>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { fetchAgentSummary, fetchOrders, fetchProducts } from './api';

const summary = reactive({
  todayOrders: 0,
  todaySales: '0.00',
  todayCommission: '0.00'
});
const products = ref([]);
const orders = ref([]);

async function loadData() {
  const [summaryData, productData, orderData] = await Promise.all([
    fetchAgentSummary(),
    fetchProducts(),
    fetchOrders()
  ]);

  summary.todayOrders = summaryData.todayOrders || 0;
  summary.todaySales = Number(summaryData.todaySales || 0).toFixed(2);
  summary.todayCommission = Number(summaryData.todayCommission || 0).toFixed(2);
  products.value = productData;
  orders.value = orderData;
}

onMounted(loadData);
</script>
