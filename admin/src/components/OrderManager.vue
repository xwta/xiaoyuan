<template>
  <el-card>
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
      <el-table-column label="状态操作" width="260" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="changeStatus(scope.row, 'pending_accept', '待接单')">待接单</el-button>
          <el-button size="small" @click="changeStatus(scope.row, 'accepted', '已接单')">已接单</el-button>
          <el-button size="small" type="success" @click="changeStatus(scope.row, 'completed', '已完成')">完成</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { updateOrderStatus } from '../api';

const props = defineProps({
  orders: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['refresh']);

async function changeStatus(row, status, statusText) {
  await updateOrderStatus(row.id, { status, statusText });
  emit('refresh');
}
</script>
