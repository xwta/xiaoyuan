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

      <el-card v-if="activeMenu === 'products'">
        <template #header>
          <div class="card-header">
            <span>商品管理</span>
            <el-button type="primary" size="small" @click="showProductDialog = true">新增商品</el-button>
          </div>
        </template>
        <el-table :data="products" stripe>
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="商品名称" min-width="160" />
          <el-table-column prop="price" label="价格" width="100">
            <template #default="scope">¥{{ Number(scope.row.price || 0).toFixed(2) }}</template>
          </el-table-column>
          <el-table-column prop="count" label="数量" width="100" />
          <el-table-column prop="categoryId" label="分类ID" width="100" />
        </el-table>
      </el-card>

      <el-card v-if="activeMenu === 'orders'">
        <template #header>订单管理</template>
        <el-table :data="orders" stripe>
          <el-table-column prop="orderNo" label="订单号" min-width="180" />
          <el-table-column prop="contactName" label="用户" width="100" />
          <el-table-column prop="phone" label="手机号" width="140" />
          <el-table-column prop="statusText" label="状态" width="100" />
          <el-table-column prop="deliveryText" label="方式" width="120" />
          <el-table-column prop="payAmount" label="金额" width="100">
            <template #default="scope">¥{{ Number(scope.row.payAmount || 0).toFixed(2) }}</template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card v-if="activeMenu === 'agents'">
        <template #header>代理点管理</template>
        <el-table :data="agents" stripe>
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="代理点" min-width="180" />
          <el-table-column prop="pickupAddress" label="自提地址" min-width="220" />
          <el-table-column prop="status" label="状态" width="100" />
          <el-table-column prop="buildingId" label="服务楼栋" width="120" />
        </el-table>
      </el-card>

      <el-dialog v-model="showProductDialog" title="新增商品" width="420px">
        <el-form label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="productForm.name" placeholder="例如：可乐 500ml" />
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="productForm.price" placeholder="例如：3.00" />
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="productForm.count" placeholder="例如：100" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="showProductDialog = false">取消</el-button>
          <el-button type="primary" @click="submitProduct">保存</el-button>
        </template>
      </el-dialog>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { createProduct, fetchAgents, fetchOrders, fetchOverview, fetchProducts } from './api';

const menus = [
  { key: 'dashboard', label: '数据看板' },
  { key: 'products', label: '商品管理' },
  { key: 'orders', label: '订单管理' },
  { key: 'agents', label: '代理点管理' }
];

const activeMenu = ref('dashboard');
const showProductDialog = ref(false);
const overview = reactive({ productCount: 0, orderCount: 0, agentCount: 0, salesAmount: '0.00' });
const productForm = reactive({ name: '', price: '', count: '' });
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

async function submitProduct() {
  if (!productForm.name) return;
  await createProduct({ ...productForm, categoryId: 1 });
  productForm.name = '';
  productForm.price = '';
  productForm.count = '';
  showProductDialog.value = false;
  await loadData();
}

onMounted(loadData);
</script>
