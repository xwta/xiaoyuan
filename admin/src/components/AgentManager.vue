<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>代理点管理</span>
        <el-button type="primary" size="small" @click="visible = true">新增代理点</el-button>
      </div>
    </template>

    <el-table :data="agents" stripe>
      <el-table-column prop="id" label="ID" width="90" />
      <el-table-column prop="name" label="代理点" min-width="180" />
      <el-table-column prop="pickupAddress" label="自提地址" min-width="220" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'closed' ? 'info' : 'success'">
            {{ scope.row.status === 'closed' ? '停用' : '营业' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="buildingId" label="服务楼栋" width="120" />
      <el-table-column label="操作" width="130" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="toggleStatus(scope.row)">
            {{ scope.row.status === 'closed' ? '启用' : '停用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="visible" title="新增代理点" width="460px">
      <el-form label-width="90px">
        <el-form-item label="代理点名">
          <el-input v-model="form.name" placeholder="例如：6号楼校园代理点" />
        </el-form-item>
        <el-form-item label="自提地址">
          <el-input v-model="form.pickupAddress" placeholder="例如：6号楼一楼大厅旁" />
        </el-form-item>
        <el-form-item label="服务楼栋">
          <el-input v-model="form.buildingId" placeholder="例如：1" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { createAgent, updateAgentStatus } from '../api';

const props = defineProps({
  agents: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['refresh']);

const visible = ref(false);
const form = reactive({ name: '', pickupAddress: '', buildingId: '' });

async function submit() {
  if (!form.name) return;
  await createAgent({ ...form, buildingId: Number(form.buildingId || 1) });
  form.name = '';
  form.pickupAddress = '';
  form.buildingId = '';
  visible.value = false;
  emit('refresh');
}

async function toggleStatus(row) {
  await updateAgentStatus(row.id, { status: row.status === 'closed' ? 'open' : 'closed' });
  emit('refresh');
}
</script>
