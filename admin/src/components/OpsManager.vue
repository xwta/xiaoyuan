<template>
  <div class="ops-grid">
    <el-card>
      <template #header>校区列表</template>
      <el-table :data="areas" stripe size="small">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="status" label="状态" width="90" />
      </el-table>
    </el-card>

    <el-card>
      <template #header>宿舍楼列表</template>
      <el-table :data="blocks" stripe size="small">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="campusId" label="校区" width="90" />
        <el-table-column prop="name" label="楼栋" />
        <el-table-column prop="status" label="状态" width="90" />
      </el-table>
    </el-card>

    <el-card>
      <template #header>代理点商品数量</template>
      <el-table :data="goods" stripe size="small">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="agentId" label="代理点" width="100" />
        <el-table-column prop="productId" label="商品" width="100" />
        <el-table-column prop="count" label="数量" width="100" />
        <el-table-column prop="warningCount" label="预警" width="100" />
        <el-table-column prop="status" label="状态" width="90" />
      </el-table>
    </el-card>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>流程记录</span>
          <div class="record-search">
            <el-input v-model="bizId" size="small" placeholder="输入业务ID" />
            <el-button size="small" type="primary" @click="loadRecords">查询</el-button>
          </div>
        </div>
      </template>
      <el-table :data="records" stripe size="small">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="bizId" label="业务ID" width="100" />
        <el-table-column prop="fromValue" label="原值" />
        <el-table-column prop="toValue" label="新值" />
        <el-table-column prop="operatorKind" label="来源" width="100" />
        <el-table-column prop="createdAt" label="时间" width="180" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetchOpsAreas, fetchOpsBlocks, fetchOpsGoods, fetchOpsRecords } from '../api';

const areas = ref([]);
const blocks = ref([]);
const goods = ref([]);
const records = ref([]);
const bizId = ref('1');

async function loadBase() {
  const [areaData, blockData, goodsData] = await Promise.all([
    fetchOpsAreas(),
    fetchOpsBlocks(),
    fetchOpsGoods()
  ]);
  areas.value = areaData;
  blocks.value = blockData;
  goods.value = goodsData;
}

async function loadRecords() {
  records.value = await fetchOpsRecords(bizId.value || '1');
}

onMounted(async () => {
  await loadBase();
  await loadRecords();
});
</script>
